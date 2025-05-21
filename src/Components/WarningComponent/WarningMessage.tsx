import { ReactComponent as WarningIcon } from '../../Assets/icons/General/warning.svg';
import './WarningMessage.css';
import ResultsTranslate from '../Results/Translate/Translate';
import { Translation } from '../../Types/Results';

type WarningMessageProps = {
  warning: {
    message: Translation;
    link_url: Translation;
    link_text: Translation;
  };
};

const WarningMessage = ({ warning }: WarningMessageProps) => {
  return (
    <div className="warning-message">
      <WarningIcon className="warning-icon" />
      <p>
        <ResultsTranslate translation={warning.message} />
        {warning.link_url.default_message && warning.link_text.default_message && (
          <span className="warning-message-link">
            <a href={warning.link_url.default_message} target="_blank" className="link-color">
              <ResultsTranslate translation={warning.link_text} />
            </a>
          </span>
        )}
      </p>
    </div>
  );
};

export default WarningMessage;
