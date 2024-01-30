import { Link, useParams } from 'react-router-dom';
import { Program } from '../../../Types/Results';
import { FormattedMessage } from 'react-intl';
import ResultsTranslate from '../Translate/Translate';

type ProgramCardProps = {
  program: Program;
};

const ProgramCard = ({ program }: ProgramCardProps) => {
  const { uuid } = useParams();

  const estimatedAppTime = program.estimated_application_time;
  const estimatedSavings = program.estimated_value;

  return (
    <div className="result-program-container">
      <div className="result-program-more-info">
        <ResultsTranslate translation={program.name} />
        <Link to={`/${uuid}/results/benefits/${program.program_id}`}>More Info</Link>
      </div>
      <hr />
      <div className="result-program-details">
        <FormattedMessage id="results.estimated_application_time" defaultMessage="Application Time: " />
        <strong>
          <ResultsTranslate translation={estimatedAppTime} />
        </strong>
      </div>
      <div className="result-program-details">
        <FormattedMessage id="results.estimated_application_time" defaultMessage="Savings " />
        <strong>{`$${estimatedSavings}/mo`}</strong>
      </div>
    </div>
  );
};

export default ProgramCard;
