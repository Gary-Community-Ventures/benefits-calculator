import { FormattedMessage } from 'react-intl';

export default function CcigResultsMessage() {
  return (
    <div className="back-to-screen-message">
      <FormattedMessage
        id="ccig.results.message"
        defaultMessage="Thank you for completing your application to join the Colorado Community Insight Group by filling out MyFriendBen. Your application will be processed within 2 - 4 days. In the meantime, we encourage you to explore the benefits and resources that may be available to your family listed below. If you have any questions in the meantime, please feel free to email us at ccig@garycommunity.org."
      />
    </div>
  );
}
