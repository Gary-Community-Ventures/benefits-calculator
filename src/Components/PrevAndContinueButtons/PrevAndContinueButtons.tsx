import PreviousButton from '../PreviousButton/PreviousButton';
import FormContinueButton from '../ContinueButton/FormContinueButton';
import { FormattedMessageType } from '../../Types/Questions';

type PrevAndContinueButtonsProps = {
  backNavigationFunction: () => void;
};

const PrevAndContinueButtons = ({ backNavigationFunction }: PrevAndContinueButtonsProps) => {
  return (
    <div className="question-buttons">
      <PreviousButton navFunction={backNavigationFunction} />
      <FormContinueButton />
    </div>
  );
};

export default PrevAndContinueButtons;
