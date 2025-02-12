import { useContext, useEffect } from 'react';
import { QUESTION_TITLES } from '../../../Assets/pageTitleTags';
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
    document.title = QUESTION_TITLES.energyCalculatorRedirectToMFB;
  }, []);

  const backNavigationFunction = () => {
    if (uuid === undefined) {
      throw new Error('uuid is undefined');
    }

    navigate(`/${whiteLabel}/${uuid}/step-${expensesStepId}`);
  };

  return (
    <div className="no-expenses-container">
      <img src={errorIcon} className="no-expenses-error-icon" alt={errorIconAlt} />
      <div className="no-expenses-text-container">
        <QuestionHeader>
          <FormattedMessage
            id="noExpenses.qHeader"
            defaultMessage="Oops! It looks like you may not have any utility expenses."
          />
        </QuestionHeader>
        <article className="noExpenses-body-text">
          <FormattedMessage
            id="noExpenses.bodyText"
            defaultMessage="We're sorry. Based on the information provided so far, it looks like you may not have any utility expenses and therefore may not qualify for any of the energy assistance programs in this screener. If you would like to see what other benefits you may be eligible for outside of energy programs, please visit MyFriendBen."
          />
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
    </div>
  );
};

export default NoExpenses;
