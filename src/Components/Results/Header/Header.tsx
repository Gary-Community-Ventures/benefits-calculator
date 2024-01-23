import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useResultsContext } from '../Results';
import EmailResults from '../../EmailResults/EmailResults';
import LeftArrowIcon from '@mui/icons-material/KeyboardArrowLeft';
import SaveIcon from '@mui/icons-material/Save';
import { Modal } from '@mui/material';
import '../../Results/Results.css';

type ResultsHeaderProps = {
  type: 'program' | 'need';
  handleTextfieldChange: (event: Event) => void;
};

const Buttons = ({ type, handleTextfieldChange }: ResultsHeaderProps) => {
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
          navigate(`/${screenerId}/confirm-information`);
        }}
        aria-label="back to screener button"
      >
        <LeftArrowIcon />
        <FormattedMessage id="results.back-to-screen-btn" defaultMessage="BACK TO SCREENER" />
      </button>
      <button
        className="results-back-save-buttons"
        onClick={() => setOpenSaveModal(!openSaveModal)}
        aria-label="save my results button"
      >
        <FormattedMessage id="results.save-results-btn" defaultMessage="SAVE MY RESULTS" />
        <SaveIcon className="save-icon" />
      </button>
      <Modal open={openSaveModal} onClose={setOpenSaveModal} aria-labelledby="email-text-results-modal">
        <EmailResults
          handleTextfieldChange={handleTextfieldChange}
          screenId={definedScreenerId}
          close={() => setOpenSaveModal(!openSaveModal)}
        />
      </Modal>
    </div>
  );
};

const ProgramsHeader = () => {
  const { programs } = useResultsContext();

  return <div>{programs.length}</div>;
};

const NeedsHeader = () => {
  const { needs } = useResultsContext();

  return <div>{needs.length}</div>;
};

const ResultsHeader = ({ type, handleTextfieldChange }: ResultsHeaderProps) => {
  return (
    <>
      <Buttons type={type} handleTextfieldChange={handleTextfieldChange} />
      {type === 'need' ? <NeedsHeader /> : <ProgramsHeader />}
    </>
  );
};

export default ResultsHeader;
