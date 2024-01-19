import { Link, useParams } from 'react-router-dom';
import { Program } from '../../../Types/Results';
import ResultsTranslate from '../Translate/Translate';

type ProgramCardProps = {
  program: Program;
};

const ProgramCard = ({ program }: ProgramCardProps) => {
  const { uuid } = useParams();
  console.log('program: ', program);
  return (
    <div>
      <ResultsTranslate translation={program.name} />
      <Link to={`/${uuid}/results/benefits/${program.program_id}`}>Apply</Link>
    </div>
  );
};

export default ProgramCard;
