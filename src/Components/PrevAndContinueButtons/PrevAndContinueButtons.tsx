import PreviousButton from '../PreviousButton/PreviousButton';
import FormContinueButton from '../ContinueButton/FormContinueButton';
import { FormattedMessageType } from '../../Types/Questions';

type PrevAndContinueButtonsProps = {
  backNavigationFunction: () => void;
  formContinueButtonFM: FormattedMessageType;
};

const PrevAndContinueButtons = ({ backNavigationFunction, formContinueButtonFM }: PrevAndContinueButtonsProps) => {
  return (
    <div className="question-buttons">
      <PreviousButton navFunction={backNavigationFunction} />
      <FormContinueButton formattedMessage={formContinueButtonFM} />
    </div>
  );
};

export default PrevAndContinueButtons;
