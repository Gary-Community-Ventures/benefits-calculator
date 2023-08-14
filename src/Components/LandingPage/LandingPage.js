import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { createScreen } from '../../Assets/updateScreen.js';
import ReactGA from 'react-ga4';
import './LandingPage.css';

const LandingPage = ({ setFetchedScreen }) => {
  const { formData } = useContext(Context);
  let { uuid } = useParams();

  const navigate = useNavigate();
  const handleContinue = async () => {
    if (uuid) {
      navigate(`/${uuid}/step-1`);
    } else {
      const response = await createScreen(formData);
      setFetchedScreen(true);
      navigate(`/${response.uuid}/step-1`);
    }
  };
  useEffect(() => {
    const continueOnEnter = (event) => {
      if (event.key === 'Enter') {
        handleContinue();
      }
    };
    document.addEventListener('keyup', continueOnEnter);
    return () => {
      document.removeEventListener('keyup', continueOnEnter); // remove event listener on onmount
    };
  });

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
                  defaultMessage="Non-U.S. citizens planning to apply for legal permanent residency or a visa should consider how applying for any benefits on this site may affect their immigration status. For more information, please review the "
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
                    defaultMessage="Colorado Department of Human Services Public Charge Rule"
                  />
                </a>
              </p>
            </li>
            <li>
              {/* <FormattedMessage
                id="landingPage.thirdBulletItem"
                defaultMessage="We take data security seriously. We collect the minimum data we need to provide you with accurate results. The screener never requires personal identifiable information such as first and last name or address. You may opt in to providing this information in order to receive paid opportunities for feedback, or future notifications about benefits that you are likely eligible for."
              /> */}
            </li>
          </ul>
        </CardContent>
      </Card>
      <CardActions sx={{ mt: '1rem', ml: '-.5rem' }}>
        <Button variant="contained" onClick={handleContinue}>
          <FormattedMessage id="continue-button" defaultMessage="Continue" />
        </Button>
      </CardActions>
    </main>
  );
};

export default LandingPage;
