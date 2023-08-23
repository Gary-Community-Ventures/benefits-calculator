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
import ReactGA from 'react-ga4';
import './LandingPage.css';

interface LandingPageProps {
  setFetchedScreen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCheckboxChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const LandingPage = ({ setFetchedScreen, handleCheckboxChange }: LandingPageProps) => {
  const { formData, locale } = useContext(Context);
  let { uuid } = useParams();
  const navigate = useNavigate();
  const errorController = useErrorController(termsOfServiceHasError, displayAgreeToTermsErrorMessage);

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
    errorController.updateError(formData.agreeToTermsOfService);
  }, [formData.agreeToTermsOfService]);

  const handleContinue = async () => {
    errorController.updateError(formData.agreeToTermsOfService);
    errorController.incrementSubmitted();
    if (formData.agreeToTermsOfService) {
      if (uuid) {
        navigate(`/${uuid}/step-2`);
      } else {
        const response = await createScreen(formData);
        setFetchedScreen(true);
        navigate(`/${response.uuid}/step-2`);
      }
    }
  };

  const getLinksForCheckbox = () => {
    switch (locale) {
      case 'en-US':
        return {
          privacyPolicyLink: 'https://www.myfriendben.org/en/data-privacy-policy',
          addTermsConsentToContact: 'https://www.myfriendben.org/en/additional-terms-and-consent-to-contact',
        };
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
    }
  };

  const createCheckboxLabel = () => {
    return (
      <>
        <FormattedMessage
          id="disclaimer-label"
          defaultMessage="By proceeding, you confirm that you have read and agree to the "
        />
        <Link href={getLinksForCheckbox()?.privacyPolicyLink} target="_blank" rel="noopener noreferrer">
          <FormattedMessage id="landingPage-policyText" defaultMessage="Privacy Policy," />
        </Link>
        &nbsp;
        <Link href={getLinksForCheckbox()?.addTermsConsentToContact} target="_blank" rel="noopener noreferrer">
          <FormattedMessage
            id="landingPage-additionalTerms"
            defaultMessage="Additional Terms, and Consent to Contact"
          />
        </Link>
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
                    setTimeout(() => {
                      ReactGA.event({ category: 'outbound link', action: 'share link click' });
                    });
                  }}
                >
                  <FormattedMessage
                    id="landingPage.publicChargeLink"
                    defaultMessage="Colorado Department of Human Services Public Charge Rule."
                  />
                </a>
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.agreeToTermsOfService}
              onChange={handleCheckboxChange}
              sx={errorController.showError && formData.agreeToTermsOfService === false ? { color: '#c6252b' } : {}}
            />
          }
          label={createCheckboxLabel()}
          value="agreeToTermsOfService"
        />
        {errorController.showError && errorController.message(null)}
      </Box>
      <CardActions sx={{ mt: '1rem', ml: '-.5rem' }}>
        <Box>
          <Button variant="contained" onClick={handleContinue}>
            <FormattedMessage id="continue-button" defaultMessage="Continue" />
          </Button>
        </Box>
      </CardActions>
    </main>
  );
};

export default LandingPage;
