import { useContext } from 'react';
import { Context } from '../../Wrapper/Wrapper.tsx';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { STARTING_QUESTION_NUMBER } from '../../../Assets/stepDirectory.ts';
import { createScreen, updateScreen } from '../../../Assets/updateScreen.ts';
import { Checkbox, FormControlLabel } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import dataLayerPush from '../../../Assets/analytics.ts';
import QuestionHeader from '../../QuestionComponents/QuestionHeader.tsx';
import { useConfig } from '../../Config/configHook.tsx';
import ErrorMessageWrapper from '../../ErrorMessage/ErrorMessageWrapper.tsx';
import PrevAndContinueButtons from '../../PrevAndContinueButtons/PrevAndContinueButtons.tsx';
import { useQueryString } from '../../QuestionComponents/questionHooks.ts';
import './Disclaimer.css';

const isTrue = (value: boolean) => {
  return value;
};

const Disclaimer = () => {
  const { formData, setFormData, locale, screenDoneLoading } = useContext(Context);
  let { whiteLabel, uuid } = useParams();
  const navigate = useNavigate();
  const publicChargeOption = useConfig('public_charge_rule');
  const privacyLink = useConfig('privacy_policy');
  const consentToContactLink = useConfig('consent_to_contact');
  const queryString = useQueryString();
  const backNavigationFunction = () => {
    if (uuid !== undefined) {
      navigate(`/${whiteLabel}/${uuid}/step-1${queryString}`);
      return;
    }
    navigate(`/step-1${queryString}`);
  };

  const formSchema = z.object({
    agreeToTermsOfService: z.boolean().refine(isTrue),
    is13OrOlder: z.boolean().refine(isTrue),
  });

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agreeToTermsOfService: formData.agreeToTermsOfService ?? false,
      is13OrOlder: formData.is13OrOlder ?? false,
    },
  });

  const formSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (termsOfServiceAndAgeData) => {
    const updatedFormData = { ...formData, ...termsOfServiceAndAgeData };
    setFormData(updatedFormData);

    if (uuid) {
      await updateScreen(uuid, updatedFormData, locale);
      navigate(`/${whiteLabel}/${uuid}/step-${STARTING_QUESTION_NUMBER}`);
    } else {
      const response = await createScreen(updatedFormData, locale);
      screenDoneLoading();
      // TODO: add step before this
      navigate(`/co/${response.uuid}/step-${STARTING_QUESTION_NUMBER}`);
    }
  };

  const renderDisclaimerText = () => {
    return (
      <section className="disclaimer-text-section">
        <FormattedMessage
          id="landingPage.body"
          defaultMessage="MyFriendBen is a tool that can help determine benefits you are likely eligible for. Here's what you should know before you get started:"
        />
        <ul className="disclaimer-list-container">
          <li>
            <FormattedMessage
              id="landingPage.firstBulletItem"
              defaultMessage="MyFriendBen only provides estimates of what you may qualify for. You should not rely on these estimates. You must confirm your final eligibility and benefit amount with the proper agency or other decision maker."
            />
          </li>
          <li>
            <div>
              <FormattedMessage
                id="landingPage.publicCharge"
                defaultMessage="Some benefits are available to Non-U.S. citizens. Non-U.S. citizens planning to apply for legal permanent residency or a visa should consider how applying for any benefits may affect their immigration status. For more information, please review the "
              />
              <a
                className="link-color"
                href={publicChargeOption.link}
                onClick={() => {
                  dataLayerPush({
                    event: 'public_charge',
                    action: 'public charge link click',
                  });
                }}
              >
                <FormattedMessage
                  id="landingPage.publicChargeLink"
                  defaultMessage="Colorado Department of Human Services Public Charge Rule"
                />
              </a>
              <FormattedMessage id="landingPage.publicCharge.afterLink" defaultMessage="." />
            </div>
          </li>
        </ul>
      </section>
    );
  };

  const getLinksForCheckbox = () => {
    if (locale in privacyLink && locale in consentToContactLink) {
      return {
        privacyPolicyLink: privacyLink[locale],
        addTermsConsentToContact: consentToContactLink[locale],
      };
    } else {
      return {
        privacyPolicyLink: privacyLink['en-us'],
        addTermsConsentToContact: consentToContactLink['en-us'],
      };
    }
  };

  const createAgreeTTSCheckboxLabel = () => {
    return (
      <div className="disclaimer-font">
        <FormattedMessage
          id="disclaimer-label"
          defaultMessage="By proceeding, you confirm that you have read and agree to the "
        />
        <a href={getLinksForCheckbox().privacyPolicyLink} target="_blank" className="link-color">
          <FormattedMessage id="landingPage-policyText" defaultMessage="Privacy Policy" />
        </a>
        <FormattedMessage id="landingPage-and-text" defaultMessage=" and " />
        <a href={getLinksForCheckbox().addTermsConsentToContact} target="_blank" className="link-color">
          <FormattedMessage id="landingPage-additionalTerms" defaultMessage="Additional Terms & Consent to Contact" />
        </a>
        <FormattedMessage id="landingPage-disclaimer-lable-end" defaultMessage="." />
      </div>
    );
  };

  const renderCheckboxHelperText = () => {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="disclaimer.error" defaultMessage="Please check the box to continue." />
      </ErrorMessageWrapper>
    );
  };

  return (
    <main className="benefits-form">
      <QuestionHeader>
        <FormattedMessage id="disclaimer.header" defaultMessage="What you should know: " />
      </QuestionHeader>
      {renderDisclaimerText()}
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <div className="checkbox-container">
          <Controller
            name="agreeToTermsOfService"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={getValues('agreeToTermsOfService')}
                      sx={errors.agreeToTermsOfService ? { color: '#c6252b' } : {}}
                    />
                  }
                  label={createAgreeTTSCheckboxLabel()}
                />
                {errors.agreeToTermsOfService && renderCheckboxHelperText()}
              </>
            )}
          />
          <Controller
            name="is13OrOlder"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={getValues('is13OrOlder')}
                      sx={errors.is13OrOlder ? { color: '#c6252b' } : {}}
                    />
                  }
                  label={
                    <div className="disclaimer-font">
                      <FormattedMessage
                        id="disclaimer-label-age"
                        defaultMessage="I confirm I am 13 years of age or older."
                      />
                    </div>
                  }
                  className="top-margin"
                />
                {errors.is13OrOlder && renderCheckboxHelperText()}
              </>
            )}
          />
        </div>
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
    </main>
  );
};

export default Disclaimer;
