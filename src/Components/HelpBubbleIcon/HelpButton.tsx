import { IconButton } from '@mui/material';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ReactComponent as HelpBubble } from '../../Assets/icons/helpBubble.svg';

const HelpButton = ({ className, helpText, helpId }: { className?: string; helpText: string; helpId: string }) => {
  const intl = useIntl();
  const [showHelpText, setShowHelpText] = useState(false);
  const handleClick = () => {
    setShowHelpText((setShow) => !setShow);
  };
  const translatedAriaLabel = intl.formatMessage({ id: 'helpButton.ariaText', defaultMessage: 'help button' });

  return (
    <>
      <IconButton onClick={handleClick} aria-label={translatedAriaLabel}>
        <HelpBubble style={{ height: '20px', width: '20px' }} />
      </IconButton>
      {showHelpText && (
        <p className={`help-text ${className}`}>
          <FormattedMessage id={helpId} defaultMessage={helpText} />
        </p>
      )}
    </>
  );
};

export default HelpButton;
