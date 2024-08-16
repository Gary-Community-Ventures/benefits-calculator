import { ReactNode, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { translateNumber, useTranslateNumber } from '../../Assets/languageOptions';
import { PRESCHOOL_MAX_VALUE, PRESCHOOL_PROGRAMS_ABBR } from '../../Assets/resultsConstants';
import { Language } from '../../Types/Language';
import { Program, Validation } from '../../Types/Results';
import { Context } from '../Wrapper/Wrapper';
import { findValidationForProgram, useResultsContext } from './Results';
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

    if (PRESCHOOL_PROGRAMS_ABBR.includes(program.external_name)) {
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

const overrideValue = (func: (program: Program) => ReactNode) => {
  /* eslint-disable react/display-name */
  return (program: Program) => {
    if (program.estimated_value_override.default_message !== '') {
      return <ResultsTranslate translation={program.estimated_value_override} />;
    }

    return func(program);
  };
};

function useOverrideValue(program: Program, value: string, expectedValue?: string) {
  const { isAdminView } = useResultsContext();

  if (program.estimated_value_override.default_message !== '') {
    return <ResultsTranslate translation={program.estimated_value_override} />;
  }

  if (isAdminView && expectedValue !== undefined) {
    return `${expectedValue} => ${value}`;
  }

  return value;
}

export function useFormatMonthlyValue(program: Program) {
  const translateNumber = useTranslateNumber();
  const intl = useIntl();
  const { validations } = useResultsContext();
  const validation = findValidationForProgram(validations, program);

  const perMonth = intl.formatMessage({ id: 'program-card-month-txt', defaultMessage: '/month' });
  const value = translateNumber(formatToUSD(program.estimated_value / 12)) + perMonth;

  if (validation !== undefined) {
    const expextedValue = translateNumber(formatToUSD(Number(validation.value) / 12));
    return useOverrideValue(program, value, expextedValue);
  }

  return useOverrideValue(program, value);
}

export function useFormatYearlyValue(program: Program) {
  const translateNumber = useTranslateNumber();
  const { validations } = useResultsContext();
  const validation = findValidationForProgram(validations, program);

  const value = translateNumber(formatToUSD(program.estimated_value));

  if (validation !== undefined) {
    const expextedValue = translateNumber(formatToUSD(Number(validation.value)));
    return useOverrideValue(program, value, expextedValue);
  }
  return useOverrideValue(program, value);
}
