import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { STARTING_QUESTION_NUMBER, useStepDirectory } from '../../Assets/stepDirectory';
import { useEffect } from 'react';
import PreviousButton from '../PreviousButton/PreviousButton';
import './Confirmation.css';
import QuestionHeader from '../QuestionComponents/QuestionHeader';
import STEP_CONFIRMATIONS from './ConfirmationSteps';

const Confirmation = () => {
  const { uuid, whiteLabel } = useParams();
  const navigate = useNavigate();
  const stepDirectory = useStepDirectory();

  useEffect(() => {
    const continueOnEnter = (event) => {
      if (event.key === 'Enter') {
        navigate(`/${whiteLabel}/${uuid}/results/benefits`);
      }
    };
    document.addEventListener('keydown', continueOnEnter);
    return () => {
      document.removeEventListener('keydown', continueOnEnter); // remove event listener on onmount
    };
  });

  const displayAllFormData = () => {
    return stepDirectory.map((step) => {
      return STEP_CONFIRMATIONS[step];
    });
  };

  const totalNumberOfQuestions = useStepDirectory().length + STARTING_QUESTION_NUMBER;

  return (
    <main className="benefits-form">
      <QuestionHeader>
        <FormattedMessage id="confirmation.return-subheader" defaultMessage="Is all of your information correct?" />
      </QuestionHeader>
      <div className="confirmation-container">{displayAllFormData()}</div>
      <div className="prev-continue-results-buttons confirmation">
        <PreviousButton navFunction={() => navigate(`/${whiteLabel}/${uuid}/step-${totalNumberOfQuestions - 1}`)} />
        <Button variant="contained" onClick={() => navigate(`/${whiteLabel}/${uuid}/results/benefits`)}>
          <FormattedMessage id="continueButton" defaultMessage="Continue" />
        </Button>
      </div>
    </main>
  );
};

export default Confirmation;
