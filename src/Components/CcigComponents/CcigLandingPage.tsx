import { Button, Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { Context } from '../Wrapper/Wrapper';
import ccigLandingPageImage from '../../Assets/CCIG/ccigLandingPage.png';
import './CcigLandingPage.css';

export default function CcigLandingPage() {
  const navigate = useNavigate();
  const { formData } = useContext(Context);
  const externalId = formData.externalID;
  const referrer = formData.immutableReferrer;
  const { formatMessage } = useIntl();

  const handleGetStarted = () => {
    const query = new URLSearchParams();

    if (externalId !== undefined) {
      query.append('externalid', externalId);
    }

    if (referrer !== undefined && referrer !== '') {
      query.append('referrer', referrer);
    }

    let queryString = query.toString();
    if (queryString !== '') {
      queryString = '?' + queryString;
    }

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
        <p className='ccig-landing-page-text'>hello</p>
        <Button variant="contained" onClick={handleGetStarted}>
          <FormattedMessage id="jeffco-getStarted-button" defaultMessage="Get Started" />
        </Button>
    </main>
  );
}
