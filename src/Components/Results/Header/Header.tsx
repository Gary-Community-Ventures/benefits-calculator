import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { useResultsContext } from '../Results';
import LeftArrowIcon from '@mui/icons-material/KeyboardArrowLeft';
import SaveIcon from '@mui/icons-material/Save';
import '../../Results/Results.css';

type ResultsHeaderProps = {
  type: 'program' | 'need';
};

const Buttons = () => {
  const navigate = useNavigate();
  const { uuid: screenerId } = useParams();

  return (
    <div className='results-back-save-btn-container'>
      <button
        className="results-back-save-buttons"
        onClick={() => {
          navigate(`/${screenerId}/confirm-information`);
        }}
      >
        <LeftArrowIcon />
        <FormattedMessage id="results.back-to-screen-btn" defaultMessage="BACK TO SCREENER" />
      </button>
      <button className="results-back-save-buttons">
        <FormattedMessage id="results.save-results-btn" defaultMessage="SAVE MY RESULTS" />
        <SaveIcon className='save-icon'/>
      </button>
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

const ResultsHeader = ({ type }: ResultsHeaderProps) => {
  return (
    <>
      <Buttons />
      {type === 'need' ? <NeedsHeader /> : <ProgramsHeader />}
    </>
  );
};

export default ResultsHeader;
