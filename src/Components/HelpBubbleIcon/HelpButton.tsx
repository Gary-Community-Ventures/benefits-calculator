import { IconButton } from '@mui/material';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as HelpBubble } from '../../Assets/helpBubble.svg';

const HelpButton = ({
  className,
  helpText,
  helpId,
  isVisible,
}: {
  className?: string;
  helpText: string;
  helpId: string;
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
          <HelpBubble style={{ height: '20px', width: '20px' }} />
        </IconButton>
        <p className={`${className} question-description help-text`}>
          {showHelpText && <FormattedMessage id={helpId} defaultMessage={helpText} />}
        </p>
      </>
    )
  );
};

export default HelpButton;
