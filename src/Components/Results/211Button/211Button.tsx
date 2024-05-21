import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './211Button.css';
import TranslateAriaLabel from '../Translate/TranslateAriaLabel';

const HelpButton = () => {
  const { uuid } = useParams();
  const moreHelpALProps = {
    id: 'helpButton.AL',
    defaultMsg: 'more help button'
  }

  return (
    <div className="help-text-for-211-button">
      <h2 className="text-center help-text-for-211-button-font">
        <FormattedMessage id="moreHelp.211-header" defaultMessage="Can't find what you need?" />
      </h2>
      <Link to={`/${uuid}/results/more-help`} className="button211" aria-label={TranslateAriaLabel(moreHelpALProps)}>
        <FormattedMessage id="moreHelp.211-link" defaultMessage="More Help" />
      </Link>
    </div>
  );
};

export default HelpButton;
