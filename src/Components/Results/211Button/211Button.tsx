import { FormattedMessage } from 'react-intl';
import './211Button.css';

const HelpButton = () => {
  return (
    <div className="help-text-for-211-button">
      <h2 className="help-text-for-211-button-font">{`Can't find what you need?`}</h2>
      <div className="hover-button">
        <a
          href="https://www.211colorado.org/"
          className="button211"
          target="_blank"
          rel="noreferrer"
          aria-label="More Help at 2-1-1"
        >
          <FormattedMessage id="more_help_at_2-1-1" defaultMessage="More Help at 2-1-1" />
        </a>
      </div>
    </div>
  );
};

export default HelpButton;
