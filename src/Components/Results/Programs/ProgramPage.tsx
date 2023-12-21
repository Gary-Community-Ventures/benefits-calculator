import { Program } from '../../../Types/Results';

type ProgramPageProps = {
  program: Program;
};

const ProgramPage = ({ program }: ProgramPageProps) => {
  return (
    <>
      <div>{program.name.default_message}</div>
      <div>{program.name_abbreviated}</div>
      <div>{program.estimated_value}</div>
      <div>{program.category.default_message}</div>
    </>
  );
};

export default ProgramPage;
