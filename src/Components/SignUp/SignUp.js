import { FormControlLabel, Checkbox } from '@mui/material';
import Grid from '@mui/material/Grid';
import { FormattedMessage } from 'react-intl';
import { Context } from '../Wrapper/Wrapper';
import { useContext, useEffect, useMemo } from 'react';
import Textfield from '../Textfield/Textfield';
import {
  nameHasError,
  displayFirstNameHelperText,
  displayLastNameHelperText,
  emailHasError,
  displayEmailHelperText,
  phoneHasError,
  displayPhoneHasErrorHelperText,
  useErrorController,
  signUpServerHasError,
  signUpServerErrorHelperText,
} from '../../Assets/validationFunctions';
import './SignUp.css';
import { useConfig } from '../Config/configHook';

const SignUp = ({ handleTextfieldChange, handleCheckboxChange, submitted }) => {
  const context = useContext(Context);
  const locale = context.locale.toLowerCase();
  const { formData, setFormData } = context;
  const privacyLinks = useConfig('privacy_policy');
  const consentToContactLinks = useConfig('consent_to_contact');

  const privacyLink = useMemo(() => privacyLinks[locale] ?? privacyLinks['en-us'], [locale, privacyLinks]);
  const consentToContactLink = useMemo(
    () => consentToContactLinks[locale] ?? consentToContactLinks['en-us'],
    [locale, consentToContactLinks],
  );

  const firstNameErrorController = useErrorController(nameHasError, displayFirstNameHelperText);
  const lastNameErrorController = useErrorController(nameHasError, displayLastNameHelperText);
  const emailErrorController = useErrorController((email) => {
    emailHasError(email) && email !== '';
  }, displayEmailHelperText);
  const phoneErrorController = useErrorController((phone) => {
    phoneHasError(phone) && phone !== '';
  }, displayPhoneHasErrorHelperText);
  const serverErrorController = useErrorController(signUpServerHasError, signUpServerErrorHelperText);

  useEffect(() => {
    firstNameErrorController.setSubmittedCount(submitted);
    lastNameErrorController.setSubmittedCount(submitted);
    emailErrorController.setSubmittedCount(submitted);
    phoneErrorController.setSubmittedCount(submitted);
    serverErrorController.setSubmittedCount(submitted);
  }, [submitted]);

  useEffect(() => {
    serverErrorController.updateError(formData.signUpInfo.serverError);
  }, [formData.signUpInfo.serverError]);

  useEffect(() => {
    setFormData({ ...formData, signUpInfo: { ...formData.signUpInfo, serverError: false } });
  }, [formData.signUpInfo.email, formData.signUpInfo.phone]);

  const createFirstNameTextfield = () => {
    const firstNameProps = {
      inputType: 'text',
      inputName: 'firstName',
      inputLabel: <FormattedMessage id="signUp.createFirstNameTextfield-label" defaultMessage="First Name" />,
      inputError: nameHasError,
      inputHelperText: displayFirstNameHelperText,
    };

    return createTextfield(firstNameProps, firstNameErrorController);
  };

  const createLastNameTextfield = () => {
    const lastNameProps = {
      inputType: 'text',
      inputName: 'lastName',
      inputLabel: <FormattedMessage id="signUp.createLastNameTextfield-label" defaultMessage="Last Name" />,
      inputError: nameHasError,
      inputHelperText: displayLastNameHelperText,
    };

    return createTextfield(lastNameProps, lastNameErrorController);
  };

  const createEmailTextfield = () => {
    const emailProps = {
      inputType: 'text',
      inputName: 'email',
      inputLabel: <FormattedMessage id="signUp.createEmailTextfield-label" defaultMessage="Email" />,
      inputError: emailHasError,
      inputHelperText: displayEmailHelperText,
    };

    return createTextfield(emailProps, emailErrorController);
  };

  const createPhoneTextfield = () => {
    const phoneProps = {
      inputType: 'tel',
      inputName: 'phone',
      inputLabel: <FormattedMessage id="signUp.createPhoneTextfield-label" defaultMessage="Cell Phone" />,
      inputError: phoneHasError,
      inputHelperText: displayPhoneHasErrorHelperText,
      numericField: true,
    };

    return createTextfield(phoneProps, phoneErrorController);
  };

  const createTextfield = (componentProps, errorController) => {
    return (
      <Textfield
        componentDetails={componentProps}
        data={formData.signUpInfo}
        handleTextfieldChange={handleTextfieldChange}
        index="0"
        submitted={errorController.submittedCount}
      />
    );
  };

  const displayDisclosureSection = () => {
    return (
      <>
        <p className="bold-disclaimer-text">
          <FormattedMessage
            id="signUp.displayDisclosureSection-consentText"
            defaultMessage="By filling out this form, you agree to future contact from Gary Philanthropy or our affiliates regarding your use of MyFriendBen or to offer additional programs that may be of interest to you and your family. Standard message and data costs may apply to these communications. You may opt out of receiving these communications at any time through the opt-out link in the communication. Additionally, a copy of your MyFriendBen results will automatically be sent to the email/phone number you provided."
          />
        </p>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.signUpInfo.commConsent}
              onChange={handleCheckboxChange}
              name="commConsent"
              required
            />
          }
          label={
            <div className="sign-up-text">
              <FormattedMessage
                id="signUp.displayDisclosureSection-consentCheck1"
                defaultMessage="I have read, understand, and agree to the terms of MyFriendBen's "
              />
              <FormattedMessage
                id="emailResults.return-consentCheck"
                defaultMessage="{linkVal}"
                values={{
                  linkVal: (
                    <a className="link-color" href={privacyLink} target="_blank">
                      <FormattedMessage
                        id="signUp.displayDisclosureSection-consentCheckLink"
                        defaultMessage="data privacy policy "
                      />
                    </a>
                  ),
                }}
              />
              <FormattedMessage id="signUp.and" defaultMessage=" and " />
              <FormattedMessage
                id="signUp.consentToContact4"
                defaultMessage="{linkVal}"
                values={{
                  linkVal: (
                    <a className="link-color" href={consentToContactLink} target="_blank">
                      <FormattedMessage id="signUp.consentToContact" defaultMessage=" consent to contact" />
                    </a>
                  ),
                }}
              />
              <FormattedMessage id="signUp.consentToContact5" defaultMessage="." />
            </div>
          }
        />
      </>
    );
  };

  return (
    <>
      <div className="bottom-border">
        <Grid item marginTop={'1rem'}>
          {createFirstNameTextfield()}
          {createLastNameTextfield()}
        </Grid>
        <Grid item>
          {createEmailTextfield()}
          {createPhoneTextfield()}
        </Grid>
        <Grid item marginBottom={'1rem'}>
          {displayDisclosureSection()}
        </Grid>
        {serverErrorController.showError && serverErrorController.message(formData.signUpInfo.serverError)}
      </div>
    </>
  );
};

export default SignUp;
