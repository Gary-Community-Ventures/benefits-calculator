import { EnergyCalculatorRebate, EnergyCalculatorRebateCategory } from './rebateTypes';

type RebatePageProps = {
  rebateCategory: EnergyCalculatorRebateCategory;
};

export default function EnergyCalculatorRebatePage({ rebateCategory }: RebatePageProps) {
  return (
    <div>
      <h1>{rebateCategory.name}</h1>
      <section>
        {rebateCategory.rebates.map((rebate, i) => {
          return <RebateCard rebate={rebate} key={i}/>;
        })}
      </section>
    </div>
  );
}

type RebateCardProps = {
  rebate: EnergyCalculatorRebate;
};

function RebateCard({ rebate }: RebateCardProps) {
  return <div>{rebate.program}</div>;
}
