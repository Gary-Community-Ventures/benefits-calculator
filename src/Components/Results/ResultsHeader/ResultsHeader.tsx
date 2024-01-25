import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Context } from '../../Wrapper/Wrapper.tsx';
import { calculateTotalValue, useResultsContext } from '../Results';
import EmailResults from '../../EmailResults/EmailResults';
import LeftArrowIcon from '@mui/icons-material/KeyboardArrowLeft';
import { ReactComponent as SaveIcon } from '../../../Assets/save.svg';
import { Modal, CardContent } from '@mui/material';
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

const ProgramsHeader = () => {
  const { programs } = useResultsContext();
  const { theme } = useContext(Context);
  const taxCredit = calculateTotalValue(programs, 'Tax Credit');

  const estimatedMonthlySavings = programs.reduce(
    (eachEstimatedMonthlySavings, program) => eachEstimatedMonthlySavings + program.estimated_value,
    0,
  );

  return (
    <CardContent sx={{ backgroundColor: theme.secondaryBackgroundColor }}>
      <header className="results-header">
        <section className="results-header-programs-count-text">
          <div className="results-header-programs-count">{programs.length}</div>
          <div>Programs Found</div>
        </section>
        <section className="column-row">
          <section className="results-data-cell">
            <div className="results-header-values">${Math.round(estimatedMonthlySavings / 12).toLocaleString()}</div>
            <div className="results-header-label">Estimated Monthly Savings</div>
          </section>
          <section className="results-data-cell">
            <div className="results-header-values">${taxCredit}</div>
            <div className="results-header-label">Annual Tax Credit</div>
          </section>
        </section>
      </header>
    </CardContent>
  );
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
