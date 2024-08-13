import { FormattedMessage } from 'react-intl';

export default function CcigResultsMessage() {
  return (
    <div className="back-to-screen-message">
      <FormattedMessage
        id="ccig.results.message"
        defaultMessage="Thanks for filling out MyFriendBen. You've completed you're CCIG registration. Review programs that you might be eligible for. . . something. . . @sydney-devine will sharpen this up later."
      />
    </div>
  );
}
