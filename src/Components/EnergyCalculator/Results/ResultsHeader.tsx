import { CardContent } from '@mui/material';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { useResultsContext } from '../../Results/Results';
import { Context } from '../../Wrapper/Wrapper';

// TODO: fix mobile

export default function EnergyCalculatorResultsHeader() {
  const { theme } = useContext(Context);
  const { programs, energyCalculatorRebateCategories } = useResultsContext();

  const rebateCount = energyCalculatorRebateCategories.reduce((acc, category) => acc + category.rebates.length, 0);

  return (
    <CardContent sx={{ backgroundColor: theme.secondaryBackgroundColor, padding: '1rem' }}>
      <header className="results-header">
        <section className="results-header-programs-count-text">
          <div className="results-header-programs-count">{programs.length}</div>
          <div>
            <FormattedMessage id="energyCalculator.results.header.programsFound" defaultMessage="Programs Found" />
          </div>
        </section>
        {rebateCount > 0 && (
          <section className="results-header-programs-count-text">
            <div className="results-header-programs-count">{rebateCount}</div>
            <div>
              <FormattedMessage id="energyCalculator.results.header.rebatesFound" defaultMessage="Rebates Found" />
            </div>
          </section>
        )}
      </header>
    </CardContent>
  );
}
