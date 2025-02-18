import { FormattedMessage } from 'react-intl';
import QuestionHeader from '../../QuestionComponents/QuestionHeader';
import QuestionQuestion from '../../QuestionComponents/QuestionQuestion';
import { useEffect } from 'react';
import { OTHER_PAGE_TITLES } from '../../../Assets/pageTitleTags';
import { ReactComponent as Apartment } from '../Icons/Apartment.svg';
import { ReactComponent as Housing } from '../../../Assets/icons/residence.svg';
import { CardActionArea, Card, Stack, CardContent, Box } from '@mui/material';
import './LandingPage.css';

const LandingPage = () => {
  useEffect(() => {
    document.title = OTHER_PAGE_TITLES.energyCalculatorLandingPage;
  }, []);

  return (
    <main className="energy-calculator-container">
      <QuestionHeader>
        <FormattedMessage id="energyCalculator-landingPage.qHeader" defaultMessage="Energy Calculator" />
      </QuestionHeader>
      <article className="energy-calculator-body-text">
        <FormattedMessage
          id="energyCalculator.bodyText"
          defaultMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, nec vehicula risus tincidunt a. Sed euismod, nisl nec aliquam."
        />
      </article>
      <QuestionQuestion>
        <FormattedMessage
          id="energyCalculator-landingPage.question"
          defaultMessage="To get started, are you a renter or homeowner?"
        />
      </QuestionQuestion>
      <div className="center-container">
        <CardActionArea
          key="homeownerCard"
          sx={{ width: '15rem' }}
          className="card-action-area"
          href="/co_energy_calculator/step-1"
        >
          <Card className="option-card">
            <Stack direction="column" justifyContent="center" sx={{ flex: 1 }}>
              <CardContent sx={{ textAlign: 'center', padding: '0.5rem' }}>
                <Box>
                  <Housing className="option-card-icon" />
                </Box>
                <FormattedMessage id="energyCalculator-paths.homeowner" defaultMessage="Homeowner" />
              </CardContent>
            </Stack>
          </Card>
        </CardActionArea>
        <CardActionArea
          key="renterCard"
          sx={{ width: '15rem' }}
          className="card-action-area"
          href="/co_energy_calculator/step-1?path=renter"
        >
          <Card className="option-card">
            <Stack direction="column" justifyContent="center" sx={{ flex: 1 }}>
              <CardContent sx={{ textAlign: 'center', padding: '0.5rem' }}>
                <Box>
                  <Apartment className="option-card-icon" />
                </Box>
                <FormattedMessage id="energyCalculator-paths.renter" defaultMessage="Renter" />
              </CardContent>
            </Stack>
          </Card>
        </CardActionArea>
      </div>
    </main>
  );
};

export default LandingPage;
