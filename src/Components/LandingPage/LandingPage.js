import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import questions from '../../Assets/questions';
import './LandingPage.css';

const LandingPage = ({ clearLocalStorageFormDataAndResults }) => {
  const navigate = useNavigate();

  useEffect(() => {
    clearLocalStorageFormDataAndResults();
  }, []);

  return (
    <div className='benefits-form'>
      <p className='step-progress-title'>
        <FormattedMessage
          id='landingPage.step-header'
          defaultMessage='Step 0 of ' />
          { questions.length + 2 }
      </p>
      <h2 className='sub-header'>
        <FormattedMessage
          id='disclaimer.header'
          defaultMessage='What you should know before we begin: ' />
      </h2>
      <Card variant='outlined'>
        <CardContent>
          <Typography variant='body1'>
            <FormattedMessage
              id='landingPage.body'
              defaultMessage="MyFriendBen is a tool that can help determine benefits you may be eligible for. Our goal is to increase benefit participation rates by making key information more transparent, accessible, and accurate. Here's what you should know before you get started: " />
          </Typography>
          <ul className='landing-page-list-container'>
            <li>
              <FormattedMessage
                id='landingPage.firstBulletItem'
                defaultMessage='This tool cannot guarantee eligibility. You will need to apply for benefits to get a final decision.' />
            </li>
            <li>
              <FormattedMessage
                id='landingPage.secondBulletItem'
                defaultMessage='Some benefits are available only to household members who are U.S. citizens. In some cases, even after someone becomes a U.S. citizen, there may be a waiting period before a benefit is available. When you get to the end of this tool, you will have a chance to sort results so that you see only benefits that do not require a citizen in the household.' />
            </li>
            <li>
              <FormattedMessage
                id='landingPage.thirdBulletItem'
                defaultMessage='We take data security seriously. We collect the minimum data we need to provide you with accurate results. The screener never requires personal identifiable information such as first and last name or address. You may opt in to providing this information in order to receive paid opportunities for feedback, or future notifications about benefits that you are likely eligible for.' />
            </li>
          </ul>
        </CardContent>
      </Card>
      <CardActions sx={{ mt: '1rem', ml: '-.5rem' }}>
        <Button
          variant='contained'
          onClick={() => { navigate('/step-1'); }} >
            <FormattedMessage
              id='continue-button'
              defaultMessage='Continue' />
        </Button>
      </CardActions>
    </div>
  );
}

export default LandingPage;