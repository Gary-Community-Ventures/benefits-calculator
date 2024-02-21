import { FormattedMessage } from 'react-intl';
import './211Button.css';

const HelpButton = () => {
  return (
    <div className="help-text-for-211-button">
      <h2 className="text-center help-text-for-211-button-font">
        <FormattedMessage id="moreHelp.211-header" defaultMessage="Can't find what you need?" />
      </h2>
      <a href="https://www.211colorado.org/" className="button211" target="_blank" aria-label="More Help at 2-1-1">
        <FormattedMessage id="moreHelp.211-link" defaultMessage="More Help at 2-1-1" />
      </a>
    </div>
  );
};

export default HelpButton;
