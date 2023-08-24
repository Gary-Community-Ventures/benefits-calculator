import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import jeffcolandingpage from '../../../Assets/JeffcoAssets/jeffcolandingpage.png';
import Stack from '@mui/material/Stack';
import { Typography, Button } from '@mui/material';
import { useContext, useEffect } from 'react';
import { Context } from '../../Wrapper/Wrapper';
import './JeffcoLandingPage.css';

const JeffcoLandingPage = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(Context);

  useEffect(() => {
    setTimeout(() => {
      setFormData({ ...formData, immutableReferrer: 'jeffcohs' });
    })
  }, []);

  const handleGetStarted = () => {
    navigate("/step-1?referrer=jeffcohs");
  };

  return (
    <main className="benefits-form">
      <Stack className="jeffco-content-container" gap={'2rem'}>
        <img src={jeffcolandingpage} alt="jeffco and my friend ben logo" className="jeffco-landing-pg-logo" />
        <Typography className="jeffco-text">
          <FormattedMessage
            id="jeffcoLandingPage-text"
            defaultMessage="Through early childhood education, adult and child protection, job training, food assistance, Medicaid, and other programs, Jefferson County Human Services helps people build better, safer lives. Take a quick screener to be sure you're receiving all of the benefits and programs you may be eligible for to achieve your own prosperity. MyFriendBen will give you an estimate of how much you may be able to receive in public benefits."
          />
        </Typography>
        <Button variant="contained" onClick={handleGetStarted}>
          <FormattedMessage id="jeffco-getStarted-button" defaultMessage="Get Started" />
        </Button>
      </Stack>
    </main>
  );
};

export default JeffcoLandingPage;
