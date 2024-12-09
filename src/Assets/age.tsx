import { useTranslateNumber } from './languageOptions';

export function getCurrentMonthYear() {
  const date = new Date();
  const CURRENT_YEAR = date.getFullYear();
  // January is 0 for getMonth
  const CURRENT_MONTH = date.getMonth() + 1;
  return {
    CURRENT_MONTH,
    CURRENT_YEAR,
  };
}

export function hasBirthMonthYear(birthYear: number, birthMonth: number) {
  const hasBirthYear = birthYear !== undefined && birthYear !== null;
  const hasBirthMonth = birthMonth !== undefined && birthMonth !== null;
  return hasBirthYear && hasBirthMonth;
}

export function calcAge(age: number | undefined, birthYear: number, birthMonth: number) {
  const hasBirthDate = hasBirthMonthYear(birthYear, birthMonth);
  if (!hasBirthDate) {
    return age ?? 0;
  }

  const { CURRENT_MONTH, CURRENT_YEAR } = getCurrentMonthYear();
  if (CURRENT_MONTH >= birthMonth) {
    return CURRENT_YEAR - birthYear;
  }

  return CURRENT_YEAR - birthYear - 1;
}

export function useFormatBirthMonthYear() {
  const translateNumber = useTranslateNumber();
  return (birthMonth: number, birthYear: number) => {
    const hasBirthDate = hasBirthMonthYear(birthYear, birthMonth);
    if (hasBirthDate) {
      const formattedMonth = translateNumber(String(birthMonth).padStart(2, '0'));
      const formattedYear = translateNumber(birthYear);
      return `${formattedMonth}/${formattedYear}`;
    }
  };
}
