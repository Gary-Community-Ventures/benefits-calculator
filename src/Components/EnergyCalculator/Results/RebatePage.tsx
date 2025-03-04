import { EnergyCalculatorRebate, EnergyCalculatorRebateCategory } from './rebateTypes';
import { FormattedMessage } from 'react-intl';
import BackAndSaveButtons from '../../Results/BackAndSaveButtons/BackAndSaveButtons';
import { useResultsLink } from '../../Results/Results';
import './RebatePage.css';
import { EnergyCalculatorRebateCalculator, EnergyCalculatorRebateCardTitle, rebateTypes } from './RebatePageMappings';
import { ReactComponent as Housing } from '../../../Assets/CategoryHeadingIcons/housing.svg';

type RebatePageProps = {
  rebateCategory: EnergyCalculatorRebateCategory;
};

export default function EnergyCalculatorRebatePage({ rebateCategory }: RebatePageProps) {
  const backLink = useResultsLink(`results/benefits`);

  return (
    <main>
      <section className="back-to-results-button-container">
        <BackAndSaveButtons
          navigateToLink={backLink}
          BackToThisPageText={<FormattedMessage id="results.back-to-results-btn" defaultMessage="BACK TO RESULTS" />}
        />
      </section>
      <div className="energy-calculator-rebate-page-container">
        <h1>
          <Housing />
          <span>{rebateCategory.name}</span>
        </h1>
        <section>
          {rebateCategory.rebates.map((rebate, i) => {
            return <RebateCard rebate={rebate} key={i} />;
          })}
        </section>
      </div>
    </main>
  );
}

type RebateProps = {
  rebate: EnergyCalculatorRebate;
};

function RebateCard({ rebate }: RebateProps) {
  return (
    <div className="energy-calculator-rebate-page-rebate-card">
      <div>
        <h2>
          <EnergyCalculatorRebateCardTitle rebate={rebate} />
        </h2>
        {<strong>{rebate.program}</strong>}
        <div className="energy-calculator-rebate-page-rebate-card-type-container">
          {rebateTypes(rebate).map((type, index) => {
            return <span key={index}>{type}</span>;
          })}
        </div>
      </div>
      <p>{rebate.short_description}</p>
      <EnergyCalculatorRebateCalculator rebate={rebate} />
      <div className="result-program-more-info-button energy-calculator-rebate-page-more-info">
        <a href={rebate.program_url} target="_blank">
          <FormattedMessage id="energyCalculator.rebatePage.applyButton" defaultMessage="Learn how to apply" />
        </a>
      </div>
    </div>
  );
}
