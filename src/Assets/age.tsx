import { HouseholdData } from '../Types/FormData';
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

type MemberBirthDate = Pick<HouseholdData, "birthMonth" | "birthYear">

export function hasBirthMonthYear(birthDate: MemberBirthDate | Required<MemberBirthDate>): birthDate is Required<MemberBirthDate> {
  const {birthMonth, birthYear} = birthDate;
  const hasBirthYear = birthYear !== undefined && birthYear !== null;
  const hasBirthMonth = birthMonth !== undefined && birthMonth !== null;
  return hasBirthYear && hasBirthMonth;
}

export function calcAge(member: HouseholdData) {
  const hasBirthDate = hasBirthMonthYear(member);

  if (!hasBirthDate) {
    return member.age ?? 0;
  }

  const {birthMonth, birthYear} = member;

  const { CURRENT_MONTH, CURRENT_YEAR } = getCurrentMonthYear();
  if (CURRENT_MONTH >= birthMonth) {
    return CURRENT_YEAR - birthYear;
  }

  return CURRENT_YEAR - birthYear - 1;
}

export function useFormatBirthMonthYear() {
  const translateNumber = useTranslateNumber();
  return (birthDate: MemberBirthDate) => {
    const hasBirthDate = hasBirthMonthYear(birthDate);
    if (hasBirthDate) {
      const {birthMonth, birthYear} = birthDate;
      const formattedMonth = translateNumber(String(birthMonth).padStart(2, '0'));
      const formattedYear = translateNumber(birthYear!);
      return `${formattedMonth}/${formattedYear}`;
    }
  };
}
