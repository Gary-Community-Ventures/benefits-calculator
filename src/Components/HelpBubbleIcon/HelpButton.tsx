import { IconButton } from '@mui/material';
import { PropsWithChildren, useState } from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as HelpBubble } from '../../Assets/icons/helpBubble.svg';
import './HelpButton.css';

type HelpButtonProps = PropsWithChildren<{ className?: string }>;
const HelpButton = ({ className, children }: HelpButtonProps) => {
  const intl = useIntl();
  const [showHelpText, setShowHelpText] = useState(false);
  const handleClick = () => {
    setShowHelpText((setShow) => !setShow);
  };
  const translatedAriaLabel = intl.formatMessage({ id: 'helpButton.ariaText', defaultMessage: 'help button' });

  return (
    <>
      <IconButton onClick={handleClick} aria-label={translatedAriaLabel}>
        <HelpBubble style={{ height: '20px', width: '20px' }} className="help-button-icon-color" />
      </IconButton>
      {showHelpText && <p className={`help-text ${className}`}>{children}</p>}
    </>
  );
};

export default HelpButton;
