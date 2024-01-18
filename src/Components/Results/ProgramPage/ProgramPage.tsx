import { Link, useParams } from 'react-router-dom';
import { Program } from '../../../Types/Results';

type ProgramPageProps = {
  program: Program;
};

const ProgramPage = ({ program }: ProgramPageProps) => {
  const { uuid, programId } = useParams();
  return (
    <>
      <div>{program.name.default_message}</div>
      <div>{program.name_abbreviated}</div>
      <div>{program.estimated_value}</div>
      <div>{program.category.default_message}</div>
      <div>
        <Link to={`/${uuid}/results/benefits/${programId}/navigators`}>Get help</Link>
      </div>
    </>
  );
};

export default ProgramPage;