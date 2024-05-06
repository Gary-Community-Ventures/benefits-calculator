import { PRESCHOOL_MAX_VALUE, PRESCHOOL_PROGRAMS_ABBR } from '../../Assets/resultsConstants';
import { Program } from '../../Types/Results';
import ResultsTranslate from './Translate/Translate';

export function calculateTotalValue(programs: Program[], category: string) {
  let total = 0;
  let preschoolTotal = 0;
  for (const program of programs) {
    if (program.category.default_message !== category) {
      continue;
    }

    if (PRESCHOOL_PROGRAMS_ABBR.includes(program.name_abbreviated)) {
      preschoolTotal += program.estimated_value;
    } else {
      total += program.estimated_value;
    }
  }

  if (preschoolTotal > PRESCHOOL_MAX_VALUE) {
    preschoolTotal = PRESCHOOL_MAX_VALUE;
  }

  return total + preschoolTotal;
}

export const formatToUSD = (num: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
};

export const programValue = (program: Program, monthly: boolean = false) => {
  if (program.estimated_value_override.default_message !== '') {
    return <ResultsTranslate translation={program.estimated_value_override} />;
  }

  let value = program.estimated_value;

  if (monthly) {
    value = value / 12;
  }

  return formatToUSD(value);
};
