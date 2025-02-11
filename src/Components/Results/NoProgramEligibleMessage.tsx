import { FormattedMessage } from 'react-intl';

export default function NoProgramEligibleMessage({id, defaultMessage}) {
  return (
    <div className="back-to-screen-message">
      <FormattedMessage
        id={`${id}`}
        defaultMessage={`${defaultMessage}`}
      />
    </div>
  );
}
