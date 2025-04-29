import { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { useTranslateNumber } from '../../Assets/languageOptions';
import { Program, ProgramCategory } from '../../Types/Results';
import { findValidationForProgram, useResultsContext } from './Results';
import ResultsTranslate from './Translate/Translate';

export function programValue(program: Program) {
  let total = program.household_value;

  for (const member of program.members) {
    if (member.already_has)
      continue
  
    total += member.value;
  }

  return total;
}

function capValuesInitializer(): { household_value: number; member_values: { [key: string]: number } } {
  return { household_value: 0, member_values: {} };
}

export function calculateTotalValue(category: ProgramCategory) {
  // assume that none of the caps are overlapping
  if (hasOverlappingCaps(category)) {
    throw new Error(`"${category.name.default_message}" has overlapping program caps`);
  }

  let nonCapTotal = 0;
  const capValues = Array.from({ length: category.caps.length }, capValuesInitializer);
  for (const program of category.programs) {
    if (program.estimated_value_override.default_message !== '') {
      continue;
    }

    let isInCap = false;
    for (let i = 0; i < category.caps.length; i++) {
      const cap = category.caps[i];
      if (cap.programs.includes(program.name_abbreviated)) {
        capValues[i].household_value += program.estimated_value;
        for (const member of program.members) {
          if (!(member.frontend_id in capValues[i].member_values)) {
            capValues[i].member_values[member.frontend_id] = 0;
          }
          capValues[i].member_values[member.frontend_id] += member.value;
        }
        isInCap = true;
        break;
      }
    }

    if (!isInCap) {
      nonCapTotal += programValue(program);
    }
  }

  let total = nonCapTotal;
  for (let i = 0; i < category.caps.length; i++) {
    const cap = category.caps[i];
    const value = capValues[i];

    let cappedValue = Math.min(cap.household_cap, value.household_value);

    if (cap.member_caps === null) {
      total += cappedValue;
      continue;
    }
    for (const [id, memberValue] of Object.entries(value.member_values)) {
      cappedValue += Math.min(cap.member_caps[id], memberValue);
    }

    total += cappedValue;
  }

  return total;
}

function hasOverlappingCaps(category: ProgramCategory) {
  const existingProgramCaps: string[] = [];

  for (const cap of category.caps) {
    for (const program in cap.programs) {
      if (existingProgramCaps.includes(program)) {
        return true;
      }
      existingProgramCaps.push(program);
    }
  }

  return false;
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
  const value = translateNumber(formatToUSD(programValue(program) / 12)) + perMonth;

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

  const value = translateNumber(formatToUSD(programValue(program)));

  if (validation !== undefined) {
    const expextedValue = translateNumber(formatToUSD(Number(validation.value)));
    return useOverrideValue(program, value, expextedValue);
  }
  return useOverrideValue(program, value);
}
