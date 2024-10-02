import { CardContent, Button, FormControlLabel, Checkbox, Box, Link } from '@mui/material';
import { useContext, useEffect } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { createScreen } from '../../Assets/updateScreen.ts';
import { useConfig } from '../Config/configHook.tsx';
import {
  useErrorController,
  displayAgreeToTermsErrorMessage,
  termsOfServiceHasError,
} from '../../Assets/validationFunctions.tsx';
import dataLayerPush from '../../Assets/analytics.ts';
import PreviousButton from '../PreviousButton/PreviousButton.tsx';
import { STARTING_QUESTION_NUMBER } from '../../Assets/stepDirectory.ts';
import QuestionHeader from '../QuestionComponents/QuestionHeader';
import { useQueryString } from '../QuestionComponents/questionHooks';
import './LandingPage.css';

interface LandingPageProps {
  handleCheckboxChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const LandingPage = ({ handleCheckboxChange }: LandingPageProps) => {
  const { formData, locale, screenDoneLoading, theme } = useContext(Context);
  const queryString = useQueryString();
  let { uuid } = useParams();
  const navigate = useNavigate();
  const privacyErrorController = useErrorController(termsOfServiceHasError, displayAgreeToTermsErrorMessage);
  const ageErrorController = useErrorController(termsOfServiceHasError, displayAgreeToTermsErrorMessage);
  const publicChargeOption = useConfig('public_charge_rule');
  const privacyLink = useConfig('privacy_policy');
  const consentToContactLink = useConfig('consent_to_contact');

  useEffect(() => {
    const continueOnEnter = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleContinue();
      }
    };
    document.addEventListener('keyup', continueOnEnter);
    return () => {
      document.removeEventListener('keyup', continueOnEnter); // remove event listener on onmount
    };
  });

  useEffect(() => {
    privacyErrorController.updateError(formData.agreeToTermsOfService);
  }, [formData.agreeToTermsOfService]);

  useEffect(() => {
    ageErrorController.updateError(formData.is13OrOlder);
  }, [formData.is13OrOlder]);

  const handleContinue = async () => {
    privacyErrorController.updateError(formData.agreeToTermsOfService);
    ageErrorController.updateError(formData.is13OrOlder);

    privacyErrorController.incrementSubmitted();
    ageErrorController.incrementSubmitted();

    if (formData.agreeToTermsOfService && formData.is13OrOlder) {
      if (uuid) {
        navigate(`/${uuid}/step-${STARTING_QUESTION_NUMBER}`);
      } else {
        const response = await createScreen(formData, locale);
        screenDoneLoading();
        navigate(`/${response.uuid}/step-${STARTING_QUESTION_NUMBER}`);
      }
    }
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

  const createCheckboxLabel = () => {
    return (
      <div className="landing-pg-font">
        <FormattedMessage
          id="disclaimer-label"
          defaultMessage="By proceeding, you confirm that you have read and agree to the "
        />
        <Link href={getLinksForCheckbox().privacyPolicyLink} target="_blank" sx={{ color: theme.midBlueColor }}>
          <FormattedMessage id="landingPage-policyText" defaultMessage="Privacy Policy" />
        </Link>
        <FormattedMessage id="landingPage-and-text" defaultMessage=" and " />
        <Link href={getLinksForCheckbox().addTermsConsentToContact} target="_blank" sx={{ color: theme.midBlueColor }}>
          <FormattedMessage id="landingPage-additionalTerms" defaultMessage="Additional Terms & Consent to Contact" />
        </Link>
        <FormattedMessage id="landingPage-disclaimer-lable-end" defaultMessage="." />
      </div>
    );
  };

  return (
    <main className="benefits-form">
      <QuestionHeader>
        <FormattedMessage id="disclaimer.header" defaultMessage="What you should know: " />
      </QuestionHeader>
      <CardContent sx={{ backgroundColor: theme.secondaryBackgroundColor }} className="landing-pg-font">
        <FormattedMessage
          id="landingPage.body"
          defaultMessage="MyFriendBen is a tool that can help determine benefits you are likely eligible for. Here's what you should know before you get started:"
        />
        <ul className="landing-page-list-container">
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
      </CardContent>
      <Box sx={{ mt: '.5rem' }}>
        <CardContent className="landing-pg-font">
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.agreeToTermsOfService}
                onChange={handleCheckboxChange}
                sx={privacyErrorController.showError ? { color: '#c6252b' } : {}}
              />
            }
            label={createCheckboxLabel()}
            value="agreeToTermsOfService"
          />
          {privacyErrorController.showError && privacyErrorController.message(null)}
          <Box sx={{ mt: '.5rem' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.is13OrOlder}
                  onChange={handleCheckboxChange}
                  sx={ageErrorController.showError ? { color: '#c6252b' } : {}}
                />
              }
              label={
                <div className="landing-pg-font">
                  <FormattedMessage
                    id="disclaimer-label-age"
                    defaultMessage="I confirm I am 13 years of age or older."
                  />
                </div>
              }
              value="is13OrOlder"
            />
          </Box>
          {ageErrorController.showError && ageErrorController.message(null)}
        </CardContent>
      </Box>
      <div className="back-continue-buttons">
        <PreviousButton
          navFunction={() => {
            if (uuid !== undefined) {
              navigate(`/${uuid}/step-1${queryString}`);
              return;
            }
            navigate(`/step-1${queryString}`);
          }}
        />
        <Button variant="contained" onClick={handleContinue}>
          <FormattedMessage id="continue-button" defaultMessage="Continue" />
        </Button>
      </div>
    </main>
  );
};

export default LandingPage;
