import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { translateNumber } from '../../Assets/languageOptions';
import { PRESCHOOL_MAX_VALUE, PRESCHOOL_PROGRAMS_ABBR } from '../../Assets/resultsConstants';
import { Language } from '../../Types/Language';
import { Program } from '../../Types/Results';
import ResultsTranslate from './Translate/Translate';

export function calculateTotalValue(programs: Program[], category: string) {
  let total = 0;
  let preschoolTotal = 0;
  for (const program of programs) {
    if (program.estimated_value_override.default_message !== '') {
      continue;
    }

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

const overrideValue = (func: (program: Program, locale: Language) => ReactNode) => {
  /* eslint-disable react/display-name */
  return (program: Program, locale: Language) => {
    if (program.estimated_value_override.default_message !== '') {
      return <ResultsTranslate translation={program.estimated_value_override} />;
    }

    return func(program, locale);
  };
};

export const formatMonthlyValue = overrideValue((program: Program, locale: Language) => {
  return (
    <>
      {translateNumber(formatToUSD(program.estimated_value / 12), locale)}
      <FormattedMessage id="program-card-month-txt" defaultMessage="/month" />
    </>
  );
});

export const formatYearlyValue = overrideValue((program: Program, locale: Language) => {
  return <>{translateNumber(formatToUSD(program.estimated_value), locale)}</>;
});
