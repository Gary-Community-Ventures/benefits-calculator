import { Button } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import ccigLandingPageImage from '../../Assets/CCIG/ccigLandingPage.png';
import './CcigLandingPage.css';
import { useQueryString } from '../QuestionComponents/questionHooks';

export default function CcigLandingPage() {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const queryString = useQueryString();

  const handleGetStarted = () => {
    navigate(`/step-1${queryString}`);
  };

  return (
    <main className="benefits-form ccig-landing-page-container">
      <img
        src={ccigLandingPageImage}
        alt={formatMessage({
          id: 'ccig.landingPage.image.alt',
          defaultMessage: 'CCIG in partnership with myfriendben',
        })}
        className="ccig-landing-page-logo"
      />
      <p className="ccig-landing-page-text">hello</p>
      <Button variant="contained" onClick={handleGetStarted}>
        <FormattedMessage id="jeffco-getStarted-button" defaultMessage="Get Started" />
      </Button>
    </main>
  );
}
