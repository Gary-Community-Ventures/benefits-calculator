import { useContext, useEffect } from 'react';
import { OTHER_PAGE_TITLES } from '../../../Assets/pageTitleTags';
import QuestionHeader from '../../QuestionComponents/QuestionHeader';
import { FormattedMessage, useIntl } from 'react-intl';
import errorIcon from '../../../Assets/icons/error-icon.svg';
import { Button } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../Wrapper/Wrapper';
import { useStepNumber } from '../../../Assets/stepDirectory';
import './NoExpenses.css';

const NoExpenses = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const errorIconAlt = formatMessage({ id: 'no-expenses-error-icon-alt', defaultMessage: 'error icon' });
  const { whiteLabel } = useContext(Context);
  const expensesStepId = useStepNumber('energyCalculatorExpenses');

  useEffect(() => {
    document.title = OTHER_PAGE_TITLES.energyCalculatorRedirectToMFB;
  }, []);

  const backNavigationFunction = () => {
    if (uuid === undefined) {
      throw new Error('uuid is undefined');
    }

    navigate(`/${whiteLabel}/${uuid}/step-${expensesStepId}`);
  };

  return (
    <main className="benefits-form no-expenses-container">
      <img src={errorIcon} className="no-expenses-error-icon" alt={errorIconAlt} />
      <div className="no-expenses-text-container">
        <article>
          <p>
            <FormattedMessage
              id="noExpenses.bodyText1"
              defaultMessage="It is unlikely you will qualify for any energy assistance programs."
            />
          </p>
          <p className="no-expenses-p-margin">
            <FormattedMessage
              id="noExpenses.bodyText2"
              defaultMessage="Because you have indicated you do not pay a utility company directly, it is unlikely that you will be eligible for the energy assistance programs available in this screener. If you would like to update your responses, click "
            />
            <a onClick={backNavigationFunction} className="link-color">
              <FormattedMessage id="noExpenses.bodyHere" defaultMessage="here." />
            </a>
          </p>
          <p className="no-expenses-p-margin">
            <FormattedMessage
              id="noExpenses.bodyText3"
              defaultMessage="If you would like to see what other benefits you may be eligible for outside of energy programs, please visit MyFriendBen."
            />
          </p>
        </article>
      </div>
      <div className="question-buttons">
        <Button
          variant="outlined"
          onClick={backNavigationFunction}
          startIcon={<NavigateBeforeIcon sx={{ mr: '-8px' }} className="rtl-mirror" />}
        >
          <FormattedMessage id="previousButton" defaultMessage="Back" />
        </Button>
        <Button variant="contained" href="/co/step-1?referrer=coenergycalculator" sx={{ textTransform: 'none' }}>
          <FormattedMessage id="noExpenses.continueButton" defaultMessage="Meet MyFriendBen" />
        </Button>
      </div>
    </main>
  );
};

export default NoExpenses;
