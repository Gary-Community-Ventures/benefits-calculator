import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useIntl } from 'react-intl';
import './CloseButton.css';

type CloseButtonProps = {
  handleClose: () => void;
};

const CloseButton = ({ handleClose }: CloseButtonProps) => {
  const intl = useIntl();
  const closeAriaLabelProps = {
    id: 'emailResults.close-AL',
    defaultMsg: 'close',
  };

  return (
    <>
      <IconButton
        size="small"
        aria-label={intl.formatMessage(closeAriaLabelProps)}
        color="inherit"
        onClick={handleClose}
        className="close-button"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
};

export default CloseButton;
