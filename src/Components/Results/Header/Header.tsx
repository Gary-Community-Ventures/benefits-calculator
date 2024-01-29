import { useResultsContext } from '../Results';
import { useContext } from 'react';
import { Context } from '../../Wrapper/Wrapper';

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
  const { theme } = useContext(Context);

  return (
    <div style={{ backgroundColor: theme.secondaryBackgroundColor, padding: '1rem' }}>
      <section className="results-needs-header">
        <div className="results-needs-header-programs">{needs.length}</div>
        <div className="results-needs-header-programs-text">Resources Found</div>
      </section>
    </div>
  );
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
