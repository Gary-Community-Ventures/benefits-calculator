import { FormattedMessage } from 'react-intl';
import QuestionHeader from '../../QuestionComponents/QuestionHeader';
import QuestionQuestion from '../../QuestionComponents/QuestionQuestion';
import { useEffect } from 'react';
import { OTHER_PAGE_TITLES } from '../../../Assets/pageTitleTags';
import { ReactComponent as Apartment } from '../Icons/Apartment.svg';
import { ReactComponent as Housing } from '../../../Assets/icons/General/residence.svg';
import { CardActionArea, Card, Stack, CardContent, Box } from '@mui/material';
import './LandingPage.css';
import { useQueryString } from '../../QuestionComponents/questionHooks';

const LandingPage = () => {
  useEffect(() => {
    document.title = OTHER_PAGE_TITLES.energyCalculatorLandingPage;
  }, []);

  const homeownerQueryString = useQueryString();
  const renterQueryString = useQueryString({ path: 'renter' });

  return (
    <main className="energy-calculator-container">
      <QuestionHeader>
        <FormattedMessage id="energyCalculator-landingPage.qHeader" defaultMessage="Colorado Energy Savings Finder" />
      </QuestionHeader>
      <article className="energy-calculator-body-text">
        <p>
          <FormattedMessage
            id="energyCalculator.bodyText1"
            defaultMessage="Looking for a program to help you with energy-related bill assistance or rebates you are likely eligible for?"
          />
        </p>
        <p className="energy-calculator-p-spacing">
          <FormattedMessage
            id="energyCalculator.bodyText2"
            defaultMessage="We can help! All it takes is 10 minutes of your time. See all the programs this tool is screening for "
          />
          <a href="/co_energy_calculator/current-benefits" className="link-color">
            <FormattedMessage id="energyCalculator.linkText" defaultMessage="here" />
          </a>
          <FormattedMessage
            id="energyCalculator.bodyText2.2"
            defaultMessage=". Whether you're a homeowner or a renter, you may find programs like LEAP or Utility Bill Help to help pay your winter heating bills. You may also find programs that help you save money on your energy bills. For example, the Weatherization Assistance Program can help with LED light bulbs or furnace repair or replacement. Homeowners may also find savings on the cost of electric appliances."
          />
        </p>
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
          href={`/co_energy_calculator/step-1${homeownerQueryString}`}
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
          href={`/co_energy_calculator/step-1${renterQueryString}`}
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
