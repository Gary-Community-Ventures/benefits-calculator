import { useResultsContext } from '../Results';

type ResultsHeaderProps = {
  type: 'program' | 'need';
};

const Buttons = () => {
  return (
    <div>
      <button>back to screen</button>
      <button>send results</button>
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
      <h1>{type}</h1>
      {type === 'need' ? <NeedsHeader /> : <ProgramsHeader />}
    </>
  );
};

export default ResultsHeader;
