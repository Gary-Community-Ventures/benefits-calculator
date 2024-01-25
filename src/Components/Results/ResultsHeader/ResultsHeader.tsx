import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Context } from '../../Wrapper/Wrapper.tsx';
import { calculateTotalValue, useResultsContext } from '../Results';
import { CardContent } from '@mui/material';
import BackAndSaveButtons from '../BackAndSaveButtons/BackAndSaveButtons.tsx';
import { useParams } from 'react-router-dom';
import '../../Results/Results.css';

type ResultsHeaderProps = {
  type: 'program' | 'need';
  handleTextfieldChange: (event: Event) => void;
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

const ResultsHeader = ({ type, handleTextfieldChange }: ResultsHeaderProps) => {
  const { uuid } = useParams();

  return (
    <>
      <BackAndSaveButtons
        handleTextfieldChange={handleTextfieldChange}
        navigateToLink={`/${uuid}/confirm-information`}
        BackToThisPageText={<FormattedMessage id="results.back-to-screen-btn" defaultMessage="BACK TO SCREENER" />}
      />
      {type === 'need' ? <NeedsHeader /> : <ProgramsHeader />}
    </>
  );
};

export default ResultsHeader;
