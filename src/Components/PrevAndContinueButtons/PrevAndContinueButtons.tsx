import { useNavigate, useParams } from 'react-router-dom';
import PreviousButton from '../PreviousButton/PreviousButton';
import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';

type PrevAndContinueButtonsProps = {
  currentStepId: number;
};

const PrevAndContinueButtons = ({ currentStepId }: PrevAndContinueButtonsProps) => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const backNavigationFunction = () => navigate(`/${uuid}/step-${currentStepId - 1}`);

  return (
    <div className="question-buttons">
      <PreviousButton navFunction={backNavigationFunction} />
      <Button variant="contained" type="submit">
        <FormattedMessage id="continueButton" defaultMessage="Continue" />
      </Button>
    </div>
  );
};

export default PrevAndContinueButtons;
