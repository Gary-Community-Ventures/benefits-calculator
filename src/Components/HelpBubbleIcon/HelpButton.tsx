import { IconButton } from '@mui/material';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { HelpBubbleIcon } from './helpBubbleIcon.tsx';

const HelpButton = ({
  className,
  helpText,
  helpId,
  isVisible,
}: {
  className?: string;
  helpText: string;
  helpId?: string;
  isVisible: boolean;
}) => {
  const [showHelpText, setShowHelpText] = useState(false);

  const handleClick = () => {
    setShowHelpText((setShow) => !setShow);
  };

  return (
    isVisible && (
      <>
        <IconButton onClick={handleClick}>
          <HelpBubbleIcon />
        </IconButton>
        <p className={`${className} question-description help-text`}>
          {showHelpText && <FormattedMessage id={helpId} defaultMessage={helpText} />}
        </p>
      </>
    )
  );
};

export default HelpButton;
