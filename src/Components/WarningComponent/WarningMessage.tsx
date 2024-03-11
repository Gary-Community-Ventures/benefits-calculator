import { FormattedMessage } from 'react-intl';
import { ReactComponent as WarningIcon } from '../../Assets/icons/warning.svg';
import './WarningMessage.css';

type WarningMessageProps = {
  message: string;
};

const WarningMessage = ({ message }: WarningMessageProps) => {
  return (
    <div className="warning-message">
      <WarningIcon className="warning-icon" />
      <p>
        <FormattedMessage id="Warning.message" defaultMessage={message} />
      </p>
    </div>
  );
};

export default WarningMessage;
