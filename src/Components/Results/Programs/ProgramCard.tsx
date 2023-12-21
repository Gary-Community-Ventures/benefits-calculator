import { Link, useParams } from 'react-router-dom';
import { Program } from '../../../Types/Results';
import ResultsTranslate from '../Translate/Translate';

type ProgramCardProps = {
  program: Program;
};

const ProgramCard = ({ program }: ProgramCardProps) => {
  const { uuid } = useParams();
  return (
    <div>
      <ResultsTranslate translation={program.name} />
      <ResultsTranslate translation={program.estimated_delivery_time} />
      <ResultsTranslate translation={program.estimated_application_time} />
      <Link to={`/${uuid}/results/benefits/${program.program_id}`} />
    </div>
  );
};

export default ProgramCard;
