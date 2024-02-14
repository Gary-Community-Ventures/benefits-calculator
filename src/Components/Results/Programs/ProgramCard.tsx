import { Link, useParams } from 'react-router-dom';
import { Program } from '../../../Types/Results';
import { FormattedMessage } from 'react-intl';
import { formatToUSD } from '../Results';
import ResultsTranslate from '../Translate/Translate';

type ProgramCardProps = {
  program: Program;
};

const ProgramCard = ({ program }: ProgramCardProps) => {
  const { uuid } = useParams();

  const estimatedAppTime = program.estimated_application_time;
  const estimatedMonthlySavings = program.estimated_value / 12;
  const programName = program.name;
  const programId = program.program_id;

  return (
    <div className="result-program-container">
      <div className="result-program-more-info">
        <ResultsTranslate translation={programName} />
        <Link to={`/${uuid}/results/benefits/${programId}`}>
          <FormattedMessage id="more-info" defaultMessage="More Info" />
        </Link>
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
        <strong>
          {formatToUSD(estimatedMonthlySavings)}
          <FormattedMessage id="program-card-month-txt" defaultMessage="/month" />
        </strong>
      </div>
    </div>
  );
};

export default ProgramCard;
