import { FormattedMessage } from 'react-intl';

export default function NoProgramEligibleMessage() {
  return (
    <div className="back-to-screen-message">
      <FormattedMessage
        id="noprogram.results.message"
        defaultMessage="It looks like you may not qualify for benefits included in MyFriendBen at this time. If you indicated need for an immediate resource, please click on the “Near-Term Benefits” tab. For additional resources, please click the 'More Help' button below to get the resources you’re looking for."
      />
    </div>
  );
}
