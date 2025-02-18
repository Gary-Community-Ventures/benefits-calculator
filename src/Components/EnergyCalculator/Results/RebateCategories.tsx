import { FormattedMessage } from 'react-intl';
import CategoryHeading from '../../Results/CategoryHeading/CategoryHeading';
import { ResultsCard } from '../../Results/Programs/ProgramCard';
import { useResultsContext, useResultsLink } from '../../Results/Results';
import { EnergyCalculatorRebateCategory } from './rebateTypes';
import { ProgramCategory } from '../../../Types/Results';
import { useContext, useMemo } from 'react';
import { Context } from '../../Wrapper/Wrapper';

type RebateCategoryCardProps = {
  rebateCategory: EnergyCalculatorRebateCategory;
};

function RebateCategoryCard({ rebateCategory }: RebateCategoryCardProps) {
  const link = useResultsLink(`results/energy-rebates/${rebateCategory.type}`);

  return (
    <ResultsCard
      name={rebateCategory.name}
      detail1={{
        title: (
          <FormattedMessage id="energyCalculator.results.rebates.numberOfRebates" defaultMessage="Number of Rebates:" />
        ),
        value: String(rebateCategory.rebates.length),
      }}
      link={link}
    />
  );
}

const NEEDS_REBATE_FIELDS = ['needsHvac', 'needsDryer', 'needsStove', 'needsWaterHeater'] as const;

export function useEnergyCalculatorNeedsRebates() {
  const { formData } = useContext(Context);

  return useMemo(
    () => {
      for (const field of NEEDS_REBATE_FIELDS) {
        if (formData.energyCalculator?.[field] === true) {
          return true;
        }
      }

      return false;
    },
    NEEDS_REBATE_FIELDS.map((field) => formData.energyCalculator?.[field]),
  );
}

const REBATE_CATEGORY_HEADING: ProgramCategory = {
  external_name: 'energy_calculator_rebate_category',
  icon: 'housing',
  name: { label: 'energyCalculator.results.rebates.header', default_message: 'Rebates' },
  description: {
    label: 'energyCalculator.results.rebates.description',
    default_message:
      'Insert some guiding copy here about rebate programs...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  caps: [],
  programs: [],
};

export default function EnergyCalculatorRebateCategoryList() {
  const { energyCalculatorRebateCategories } = useResultsContext();

  if (energyCalculatorRebateCategories.length === 0) {
    return null;
  }

  return (
    <div>
      <CategoryHeading category={REBATE_CATEGORY_HEADING} showAmount={false} />
      {energyCalculatorRebateCategories.map((category) => {
        return <RebateCategoryCard rebateCategory={category} key={category.type} />;
      })}
    </div>
  );
}
