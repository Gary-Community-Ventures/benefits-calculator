import { CardContent } from '@mui/material';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Context } from '../../Wrapper/Wrapper.tsx';
import BackAndSaveButtons from '../BackAndSaveButtons/BackAndSaveButtons.tsx';
import { useParams } from 'react-router-dom';
import { calculateTotalValue, useResultsContext } from '../Results.tsx';
import '../../Results/Results.css';

type ResultsHeaderProps = {
  type: 'program' | 'need';
  handleTextfieldChange: (event: Event) => void;
};

const ProgramsHeader = () => {
  const { programs } = useResultsContext();
  const { theme } = useContext(Context);
  const taxCredit = calculateTotalValue(programs, 'Tax Credits');

  const estimatedMonthlySavings = programs.reduce(
    (eachEstimatedMonthlySavings: number, program: { estimated_value: number }) =>
      eachEstimatedMonthlySavings + program.estimated_value,
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
  const { theme } = useContext(Context);

  return (
    <div className="results-needs-header-background">
      <section className="results-needs-header">
        <div className="results-needs-header-programs">{needs.length}</div>
        <div className="results-needs-header-programs-text">Resources Found</div>
      </section>
    </div>
  );
};

const ResultsHeader = ({ type, handleTextfieldChange }: ResultsHeaderProps) => {
  const { uuid } = useParams();

  return (
    <>
      <BackAndSaveButtons
        handleTextfieldChange={handleTextfieldChange}
        navigateToLink={`/${uuid}/confirm-information`}
        BackToThisPageText={<FormattedMessage id="results.back-to-screen-btn" defaultMessage="BACK TO SCREENER" />}
      />
      <div className="results-header-container">{type === 'need' ? <NeedsHeader /> : <ProgramsHeader />}</div>
    </>
  );
};

export default ResultsHeader;
