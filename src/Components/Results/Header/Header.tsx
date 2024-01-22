import { CardContent } from '@mui/material';
import { calculateTotalValue, useResultsContext } from '../Results';
import { useContext } from 'react';
import { Context } from '../../Wrapper/Wrapper.tsx';

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
  const { theme } = useContext(Context);
  const taxCredit = calculateTotalValue(programs, 'Tax Credit');

  const estimatedMonthlySavings = programs.reduce(
    (eachEstimatedMonthlySavings, program) => eachEstimatedMonthlySavings + program.estimated_value,
    0,
  );

  return (
    <CardContent sx={{ backgroundColor: theme.secondaryBackgroundColor }}>
      <header className="results-header">
        <section className="results-header-programs-count-text">
          <div className="results-header-programs-count">{programs.length}</div>
          <div>Programs Found</div>
        </section>
        <section className="column-row">
          <section className="results-data-cell">
            <div className="results-header-values">${Math.round(estimatedMonthlySavings / 12).toLocaleString()}</div>
            <div className="results-header-label">Estimated Monthly Savings</div>
          </section>
          <section className="results-data-cell">
            <div className="results-header-values">${taxCredit}</div>
            <div className="results-header-label">Annual Tax Credit</div>
          </section>
        </section>
      </header>
    </CardContent>
  );
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
