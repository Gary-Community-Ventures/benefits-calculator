import { ReactComponent as WarningIcon } from '../../Assets/icons/warning.svg';
import './WarningMessage.css';
import ResultsTranslate from '../Results/Translate/Translate';
import { Translation } from '../../Types/Results';

type WarningMessageProps = {
  message: Translation;
};

const WarningMessage = ({ message }: WarningMessageProps) => {
  return (
    <div className="warning-message">
      <WarningIcon className="warning-icon" />
      <p>
        <ResultsTranslate translation={message} />
      </p>
    </div>
  );
};

export default WarningMessage;
