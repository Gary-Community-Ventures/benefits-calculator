import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import EmailResults from '../../EmailResults/EmailResults';
import LeftArrowIcon from '@mui/icons-material/KeyboardArrowLeft';
import { ReactComponent as SaveIcon } from '../../../Assets/save.svg';
import { Modal } from '@mui/material';
import { FormattedMessageType } from '../../../Types/Questions';
import TranslateAriaLabel from '../Translate/TranslateAriaLabel';
import './BackAndSaveButtons.css';

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
  const backBtnALProps = {
    id: 'backAndSaveBtns.backBtn',
    defaultMsg: "back"
  };
  const saveMyResultsBtnALProps = {
    id: 'backAndSaveBtns.saveMyResultsBtn',
    defaultMsg: "save my results"
  };
  const emailResultsModalALProps = {
    id: 'backAndSaveBtns.emailResultsModal',
    defaultMsg: 'send me my results modal'
  }

  return (
    <div className="results-back-save-btn-container">
      <button
        className="results-back-save-buttons"
        onClick={() => {
          navigate(navigateToLink);
        }}
        aria-label={TranslateAriaLabel(backBtnALProps)}
      >
        <div className="btn-icon-text-container padding-right">
          <LeftArrowIcon />
          {BackToThisPageText}
        </div>
      </button>
      <button
        className="results-back-save-buttons"
        onClick={() => setOpenSaveModal(!openSaveModal)}
        aria-label={TranslateAriaLabel(saveMyResultsBtnALProps)}
      >
        <div className="btn-icon-text-container padding-left">
          <FormattedMessage id="results.save-results-btn" defaultMessage="SAVE MY RESULTS" />
          <SaveIcon className="save-icon" />
        </div>
      </button>
      <Modal open={openSaveModal} aria-label={TranslateAriaLabel(emailResultsModalALProps)}>
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
