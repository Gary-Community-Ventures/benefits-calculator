import { EnergyCalculatorRebate, EnergyCalculatorRebateCategory } from './rebateTypes';
import { FormattedMessage } from 'react-intl';
import BackAndSaveButtons from '../../Results/BackAndSaveButtons/BackAndSaveButtons';
import { useResultsLink } from '../../Results/Results';
import './RebatePage.css';
import { EnergyCalculatorRebateCalculator, EnergyCalculatorRebateCardTitle } from './RebatePageMappings';
import { ReactComponent as Housing } from '../../../Assets/CategoryHeadingIcons/housing.svg';

type RebatePageProps = {
  rebateCategory: EnergyCalculatorRebateCategory;
};

export default function EnergyCalculatorRebatePage({ rebateCategory }: RebatePageProps) {
  const backLink = useResultsLink(`results/benefits`);

  const renderCategoryDescription = (rebateType: string) => {
    switch (rebateType) {
      case 'hvac':
        return (
          <article>
            <FormattedMessage
              id="hvac.categoryDescription"
              defaultMessage="You may qualify for savings on the cost of a heat pump to make your home heating, ventilation, and/or cooling system more efficient. Heat pumps use less energy than other systems like gas furnaces and central air. You can type the estimated cost of a heat pump into one or more of the white boxes below to estimate your savings. For more information, visit our partners at Rewiring America"
            />
          </article>
        );
      case 'waterHeater':
        return (
          <article>
            <FormattedMessage
              id="waterHeater.categoryDescription"
              defaultMessage="You may qualify for savings on the cost of a heat pump water heater (HPWH). HPWHs are energy-efficient water heaters. They can help the average homeowner save hundreds of dollars in energy costs each year. You can type the estimated cost of a HPWH into one or more of the white boxes below to estimate your savings. For more information, visit our partners at Rewiring America"
            />
          </article>
        );
      case 'stove':
        return (
          <article>
            <FormattedMessage
              id="stove.categoryDescription"
              defaultMessage="You may qualify for savings on the cost of an electric / induction stove. These stoves are more energy-efficient than gas or traditional electric stoves. You can type the estimated cost of an electric /induction stove into one or more of the white boxes below to estimate your savings. For more information, visit our partners at Rewiring America"
            />
          </article>
        );
    }
  };

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
        {renderCategoryDescription(rebateCategory.type)}
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
