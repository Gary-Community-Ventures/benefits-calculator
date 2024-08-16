import PreviousButton from '../PreviousButton/PreviousButton';
import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';

type PrevAndContinueButtonsProps = {
  backNavigationFunction: () => void;
};

const PrevAndContinueButtons = ({ backNavigationFunction }: PrevAndContinueButtonsProps) => {
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
