import { IconButton } from '@mui/material';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as HelpBubble } from '../../Assets/icons/helpBubble.svg';

const HelpButton = ({ className, helpText, helpId }: { className?: string; helpText: string; helpId: string }) => {
  const [showHelpText, setShowHelpText] = useState(false);

  const handleClick = () => {
    setShowHelpText((setShow) => !setShow);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <HelpBubble style={{ height: '20px', width: '20px' }} />
      </IconButton>
      <p className={`${className} question-description help-text`}>
        {showHelpText && <FormattedMessage id={helpId} defaultMessage={helpText} />}
      </p>
    </>
  );
};

export default HelpButton;
