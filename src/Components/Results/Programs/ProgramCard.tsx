import { Link, useParams } from 'react-router-dom';
import { Program } from '../../../Types/Results';
import { FormattedMessage } from 'react-intl';
import ResultsTranslate from '../Translate/Translate';
import './ProgramCard.css';

type ProgramCardProps = {
  program: Program;
};

const ProgramCard = ({ program }: ProgramCardProps) => {
  const { uuid } = useParams();

  const estimatedAppTime = program.estimated_application_time;
  const estimatedSavings = program.estimated_value;
  const programName = program.name;
  const programId = program.program_id;
  
  return (
    <div className="result-program-container">
      {/* {program.new && <div className='new-program-flag'>hello</div>} */}
      <div className='new-program-flag'>
        <FormattedMessage id="results-new-benefit-flag" defaultMessage="New Benefit" />
      </div>
      <div className="result-program-more-info">
          <ResultsTranslate translation={programName} />
          <Link to={`/${uuid}/results/benefits/${programId}`}>More Info</Link>
      </div>
      <hr />
      <div className="result-program-details">
        <FormattedMessage id="results.estimated_application_time" defaultMessage="Application Time: " />
        <strong>
          <ResultsTranslate translation={estimatedAppTime} />
        </strong>
      </div>
      <div className="result-program-details">
        <FormattedMessage id="results.estimated_application_time" defaultMessage="Estimated Savings: " />
        <strong>{`$${estimatedSavings}/mo`}</strong>
      </div>
    </div>
  );
};

export default ProgramCard;
