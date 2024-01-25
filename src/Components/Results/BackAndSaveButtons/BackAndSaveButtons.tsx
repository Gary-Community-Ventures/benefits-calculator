import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import EmailResults from '../../EmailResults/EmailResults';
import LeftArrowIcon from '@mui/icons-material/KeyboardArrowLeft';
import { ReactComponent as SaveIcon } from '../../../Assets/save.svg';
import { Modal } from '@mui/material';
import { FormattedMessageType } from '../../../Types/Questions';
import '../../Results/Results.css';

type BackAndSaveButtons = {
  handleTextfieldChange: (event: Event) => void;
  navigateToLink: string;
  BackToThisPageText: FormattedMessageType;
};

const BackAndSaveButtons = ({ handleTextfieldChange, navigateToLink, BackToThisPageText }: BackAndSaveButtons) => {
  const navigate = useNavigate();
  const { uuid: screenerId } = useParams();
  const [openSaveModal, setOpenSaveModal] = useState(false);
  let definedScreenerId = '';
  if (screenerId) {
    definedScreenerId = screenerId;
  }

  return (
    <div className="results-back-save-btn-container">
      <button
        className="results-back-save-buttons"
        onClick={() => {
          navigate(navigateToLink);
        }}
        aria-label="back to screener button"
      >
        <LeftArrowIcon />
        {BackToThisPageText}
      </button>
      <button
        className="results-back-save-buttons"
        onClick={() => setOpenSaveModal(!openSaveModal)}
        aria-label="save my results button"
      >
        <FormattedMessage id="results.save-results-btn" defaultMessage="SAVE MY RESULTS" />
        <SaveIcon className="save-icon" />
      </button>
      <Modal open={openSaveModal} aria-labelledby="email-text-results-modal">
        <EmailResults
          handleTextfieldChange={handleTextfieldChange}
          screenId={definedScreenerId}
          close={() => setOpenSaveModal(!openSaveModal)}
        />
      </Modal>
    </div>
  );
};

export default BackAndSaveButtons;
