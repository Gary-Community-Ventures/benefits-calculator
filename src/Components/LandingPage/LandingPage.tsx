import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  Link,
} from '@mui/material';
import { useContext, useEffect } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { createScreen } from '../../Assets/updateScreen.js';
import {
  useErrorController,
  displayAgreeToTermsErrorMessage,
  termsOfServiceHasError,
} from '../../Assets/validationFunctions.tsx';
import './LandingPage.css';
import dataLayerPush from '../../Assets/analytics.ts';
import PreviousButton from '../PreviousButton/PreviousButton.js';

interface LandingPageProps {
  handleCheckboxChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const LandingPage = ({ handleCheckboxChange }: LandingPageProps) => {
  const { formData, locale, screenDoneLoading } = useContext(Context);
  const queryString = formData.immutableReferrer ? `?referrer=${formData.immutableReferrer}` : '';
  let { uuid } = useParams();
  const navigate = useNavigate();
  const privacyErrorController = useErrorController(termsOfServiceHasError, displayAgreeToTermsErrorMessage);
  const ageErrorController = useErrorController(termsOfServiceHasError, displayAgreeToTermsErrorMessage);

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
        navigate(`/${uuid}/step-3`);
      } else {
        const response = await createScreen(formData);
        screenDoneLoading();
        navigate(`/${response.uuid}/step-3`);
      }
    }
  };

  const getLinksForCheckbox = () => {
    switch (locale) {
      case 'es':
        return {
          privacyPolicyLink: 'https://www.myfriendben.org/es/data-privacy-policy',
          addTermsConsentToContact: 'https://www.myfriendben.org/es/additional-terms-and-consent-to-contact',
        };
      case 'vi':
        return {
          privacyPolicyLink: 'https://www.myfriendben.org/vi/data-privacy-policy',
          addTermsConsentToContact: 'https://www.myfriendben.org/vi/additional-terms-and-consent-to-contact',
        };
      default:
        return {
          privacyPolicyLink: 'https://www.myfriendben.org/en/data-privacy-policy',
          addTermsConsentToContact: 'https://www.myfriendben.org/en/additional-terms-and-consent-to-contact',
        };
    }
  };

  const createCheckboxLabel = () => {
    return (
      <>
        <FormattedMessage
          id="disclaimer-label"
          defaultMessage="By proceeding, you confirm that you have read and agree to the "
        />
        <Link href={getLinksForCheckbox().privacyPolicyLink} target="_blank" rel="noopener noreferrer">
          <FormattedMessage id="landingPage-policyText" defaultMessage="Privacy Policy" />
        </Link>
        <FormattedMessage id="landingPage-and-text" defaultMessage=" and " />
        <Link href={getLinksForCheckbox().addTermsConsentToContact} target="_blank" rel="noopener noreferrer">
          <FormattedMessage id="landingPage-additionalTerms" defaultMessage="Additional Terms & Consent to Contact" />
        </Link>
        .
      </>
    );
  };

  return (
    <main className="benefits-form">
      <h1 className="sub-header">
        <FormattedMessage id="disclaimer.header" defaultMessage="What you should know before we begin: " />
      </h1>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body1">
            <FormattedMessage
              id="landingPage.body"
              defaultMessage="MyFriendBen is a tool that can help determine benefits you are likely eligible for. Here's what you should know before you get started:"
            />
          </Typography>
          <ul className="landing-page-list-container">
            <li>
              <FormattedMessage
                id="landingPage.firstBulletItem"
                defaultMessage="MyFriendBen only provides estimates of what you may qualify for. You should not rely on these estimates. You must confirm your final eligibility and benefit amount with the proper agency or other decision maker."
              />
            </li>
            <li>
              <p>
                <FormattedMessage
                  id="landingPage.publicCharge"
                  defaultMessage="Some benefits are available to Non-U.S. citizens. Non-U.S. citizens planning to apply for legal permanent residency or a visa should consider how applying for any benefits may affect their immigration status. For more information, please review the "
                />
                <a
                  className="public-charge-link"
                  href="https://cdhs.colorado.gov/public-charge-rule-and-colorado-immigrants#:~:text=About%20public%20charge&text=The%20test%20looks%20at%20whether,affidavit%20of%20support%20or%20contract."
                  target="_blank"
                  rel="noreferrer"
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
                .
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Box sx={{ mt: '.5rem' }}>
        <Box>
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
        </Box>
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
              <FormattedMessage id="disclaimer-label-age" defaultMessage="I confirm I am 13 years of age or older." />
            }
            value="is13OrOlder"
          />
        </Box>
        {ageErrorController.showError && ageErrorController.message(null)}
      </Box>
      <CardActions sx={{ mt: '1rem', ml: '-.5rem' }}>
        <Box>
          <PreviousButton navFunction={() => navigate(`/step-1${queryString}`)} />
          <Button variant="contained" onClick={handleContinue}>
            <FormattedMessage id="continue-button" defaultMessage="Continue" />
          </Button>
        </Box>
      </CardActions>
    </main>
  );
};

export default LandingPage;
