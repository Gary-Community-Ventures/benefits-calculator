import { FormattedMessage } from 'react-intl';
import './CustomNoRowsOverlay.css';

const CustomNoRowsOverlay = () => {
  return (
    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
      <p className="noRowsOverlay-p">
        <FormattedMessage
          id="customNoRowsOverlay.p-One"
          defaultMessage="It looks like you may not qualify for benefits included in MyFriendBen at this time. If you indicated need for an immediate resource, please click on the “Immediate Needs” tab."
        />
      </p>
      <p className="noRowsOverlay-p">
        <FormattedMessage id="customNoRowsOverlay.p-Two" defaultMessage="For additional resources, visit " />
        <a
          className="ineligibility-link navigator-info"
          target="_blank"
          rel="noreferrer"
          href="https://www.211colorado.org/"
        >
          Colorado 2-1-1
        </a>
        <FormattedMessage
          id="customNoRowsOverlay.p-Three"
          defaultMessage=" to chat with someone online or on the phone to get the resources you’re looking for."
        />
      </p>
    </div>
  );
};

export default CustomNoRowsOverlay;
