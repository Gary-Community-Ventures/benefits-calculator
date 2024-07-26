import { CardContent } from '@mui/material';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Context } from '../../Wrapper/Wrapper.tsx';
import BackAndSaveButtons from '../BackAndSaveButtons/BackAndSaveButtons.tsx';
import { useParams } from 'react-router-dom';
import { useResultsContext } from '../Results.tsx';
import { calculateTotalValue } from '../FormattedValue.tsx';
import '../../Results/Results.css';
import { TAX_CREDIT_CATEGORY } from '../../../Assets/resultsConstants.ts';
import { useTranslateNumber } from '../../../Assets/languageOptions';

type ResultsHeaderProps = {
  type: 'program' | 'need';
  handleTextfieldChange: (event: Event) => void;
};

const ProgramsHeader = () => {
  const { programs } = useResultsContext();
  const { theme, formData } = useContext(Context);
  const taxCredit = calculateTotalValue(programs, TAX_CREDIT_CATEGORY);
  const translateNumber = useTranslateNumber();

  // don't add tax credits to total value
  const categoriesCalculated = new Set([TAX_CREDIT_CATEGORY]);
  let estimatedMonthlySavings = 0;
  for (const program of programs) {
    const category = program.category.default_message;
    if (!categoriesCalculated.has(category)) {
      // use calculate total value to account for preschool cap
      estimatedMonthlySavings += calculateTotalValue(programs, category);
      categoriesCalculated.add(category);
    }
  }

  return (
    <CardContent sx={{ backgroundColor: theme.secondaryBackgroundColor, padding: '1rem' }}>
      <header className="results-header">
        <section className="results-header-programs-count-text">
          <div className="results-header-programs-count">{translateNumber(programs.length)}</div>
          <div>
            <FormattedMessage id="results.header-programsFound" defaultMessage="Programs Found" />
          </div>
        </section>
        <section className="column-row">
          <section className="results-data-cell">
            <div className="results-header-values">
              ${translateNumber(Math.round(estimatedMonthlySavings / 12).toLocaleString())}
            </div>
            <div className="results-header-label">
              <FormattedMessage id="results.header-monthlyValue" defaultMessage="Estimated Monthly Savings" />
            </div>
          </section>
          {formData.immutableReferrer !== 'lgs' && (
            <section className="results-data-cell">
              <div className="results-header-values">${translateNumber(Math.round(taxCredit).toLocaleString())}</div>
              <div className="results-header-label">
                <FormattedMessage id="results.header-taxCredits" defaultMessage="Annual Tax Credit" />
              </div>
            </section>
          )}
        </section>
      </header>
    </CardContent>
  );
};

const NeedsHeader = () => {
  const { needs } = useResultsContext();

  return (
    <div className="results-needs-header-background">
      <section className="results-needs-header">
        <div className="results-needs-header-programs">{needs.length}</div>
        <div className="results-needs-header-programs-text">
          <FormattedMessage id="results.needHeader" defaultMessage="Resources Found" />
        </div>
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
