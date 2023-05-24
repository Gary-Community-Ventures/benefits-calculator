import { Typography, FormControlLabel, Checkbox } from '@mui/material';
import Grid from '@mui/material/Grid';
import { FormattedMessage } from 'react-intl';
import { Context } from '../Wrapper/Wrapper';
import { useContext } from 'react';
import Textfield from '../Textfield/Textfield';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import {
  nameHasError,
  displayFirstNameHelperText,
  displayLastNameHelperText,
  emailHasError,
  displayEmailHelperText,
  phoneHasError,
  displayPhoneHasErrorHelperText,
  signUpFormHasError,
  displaySignUpFormHelperText,
} from '../../Assets/validationFunctions';

const SignUp = ({ handleTextfieldChange, handleCheckboxChange }) => {
  const context = useContext(Context);
  const locale = context.locale.toLowerCase();
  const { formData } = context;
  let privacyLink =
    'https://20208592.hs-sites.com/en/data-privacy-policy?__hstc=144746475.066f707c0b490f88f5429b1856cf0908.1663037963489.1663086538117.1663095192641.3&__hssc=144746475.1.1663095192641&__hsfp=2418539872';

  if (locale === 'es') {
    privacyLink = 'https://20208592.hs-sites.com/es/data-privacy-policy';
  } else if (locale === 'vi') {
    privacyLink = 'https://www.myfriendben.org/vi/data-privacy-policy';
  }

  const createFirstNameTextfield = () => {
    const firstNameProps = {
      inputType: 'text',
      inputName: 'firstName',
      inputLabel: <FormattedMessage id="signUp.createFirstNameTextfield-label" defaultMessage="First Name" />,
      inputError: nameHasError,
      inputHelperText: displayFirstNameHelperText,
    };

    return createTextfield(firstNameProps);
  };

  const createLastNameTextfield = () => {
    const lastNameProps = {
      inputType: 'text',
      inputName: 'lastName',
      inputLabel: <FormattedMessage id="signUp.createLastNameTextfield-label" defaultMessage="Last Name" />,
      inputError: nameHasError,
      inputHelperText: displayLastNameHelperText,
    };

    return createTextfield(lastNameProps);
  };

  const createEmailTextfield = () => {
    const emailProps = {
      inputType: 'text',
      inputName: 'email',
      inputLabel: <FormattedMessage id="signUp.createEmailTextfield-label" defaultMessage="Email" />,
      inputError: emailHasError,
      inputHelperText: displayEmailHelperText,
    };

    return createTextfield(emailProps);
  };

  const createPhoneTextfield = () => {
    const phoneProps = {
      inputType: 'tel',
      inputName: 'phone',
      inputLabel: <FormattedMessage id="signUp.createPhoneTextfield-label" defaultMessage="Cell Phone" />,
      inputError: phoneHasError,
      inputHelperText: displayPhoneHasErrorHelperText,
    };

    return createTextfield(phoneProps);
  };

  const createTextfield = (componentProps) => {
    return (
      <Textfield
        componentDetails={componentProps}
        data={formData.signUpInfo}
        handleTextfieldChange={handleTextfieldChange}
        index="0"
      />
    );
  };

  const displayDisclosureSection = () => {
    return (
      <>
        <Typography variant="body1" sx={{ mt: '1rem' }} style={{ fontWeight: 600 }}>
          <FormattedMessage
            id="signUp.displayDisclosureSection-consentText"
            defaultMessage="By filling out this form, you agree to future contact from Gary Philanthropy or our affiliates regarding your use of the benefits calculator or to offer additional programs that may be of interest to you and your family. Standard message and data costs may apply to these communications. You may opt out of receiving these communications at any time through the opt-out link in the communication."
          />
        </Typography>
        <FormControlLabel
          sx={{ mb: 1 }}
          control={
            <Checkbox
              checked={formData.signUpInfo.commConsent}
              onChange={handleCheckboxChange}
              name="commConsent"
              required
            />
          }
          label={
            <div>
              <FormattedMessage
                id="signUp.displayDisclosureSection-consentCheck1"
                defaultMessage="I have read, understand, and agree to the terms of My Friend Ben's "
              />
              <FormattedMessage
                id="emailResults.return-consentCheck"
                defaultMessage="{linkVal}"
                values={{
                  linkVal: (
                    <a
                      className="sign-up-data-privacy-link"
                      href={privacyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FormattedMessage
                        id="signUp.displayDisclosureSection-consentCheckLink"
                        defaultMessage="data privacy policy "
                      />
                    </a>
                  ),
                }}
              />
              <FormattedMessage
                id="signUp.displayDisclosureSection-consentCheck4"
                defaultMessage=" and consent to contact."
              />
            </div>
          }
        />
      </>
    );
  };

  const displayErrorMessage = () => {
    if (signUpFormHasError(formData.signUpInfo)) {
      return <ErrorMessage error={displaySignUpFormHelperText(formData.signUpInfo)} />;
    }
  };

  return (
    <>
      <div className="bottom-border">
        <Grid xs={12} item marginTop={'1.5rem'}>
          {createFirstNameTextfield()}
          {createLastNameTextfield()}
        </Grid>
        <Grid xs={12} item>
          {createEmailTextfield()}
        </Grid>
        <Grid xs={12} item>
          {createPhoneTextfield()}
        </Grid>
        <Grid xs={12} item marginBottom={'1rem'}>
          {displayDisclosureSection()}
        </Grid>
      </div>
      <Grid xs={12} item>
        {displayErrorMessage()}
      </Grid>
    </>
  );
};

export default SignUp;
