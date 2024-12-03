import { useTranslateNumber } from "./languageOptions";

export function getCurrentMonthYear()
{
  const date = new Date();
  const CURRENT_YEAR = date.getFullYear();
  // January is 0 for getMonth
  const CURRENT_MONTH = date.getMonth() + 1;
  return {
    CURRENT_MONTH,
    CURRENT_YEAR
  }
}

export function calcAge(age: number, birthYear: number, birthMonth: number) {
  const {
    CURRENT_MONTH,
    CURRENT_YEAR
  } = getCurrentMonthYear();

  const hasBirthDate = (birthYear !== undefined) && (birthMonth !== undefined);
  if(!hasBirthDate) {
    return age;
  }

  if (CURRENT_MONTH >= birthMonth) {
    return CURRENT_YEAR - birthYear;
  }

  return CURRENT_YEAR - birthYear - 1;
}

export function useFormatBirthMonthYear() {
  const translateNumber = useTranslateNumber()
  return (birthMonth: number | null, birthYear: number | null) => {
    if(birthMonth !== undefined && birthYear !== undefined) {
      const formattedMonth = translateNumber(String(birthMonth).padStart(2, '0'));
      const formattedYear = translateNumber(birthYear as number);
      return `${formattedMonth}/${formattedYear}`;
    }
    return "N/A"
  }
}
