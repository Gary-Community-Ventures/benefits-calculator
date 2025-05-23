import { FormattedMessage } from 'react-intl';
import { HouseholdData } from '../Types/FormData';
import { FormattedMessageType } from '../Types/Questions';
import { calcAge } from './age';

export type CitizenLabelOptions =
  | 'non_citizen'
  | 'green_card'
  | 'refugee'
  | 'gc_5plus'
  | 'gc_5less'
  | 'otherWithWorkPermission';

export type CalculatedCitizenLabel =
  | 'gc_18plus_no5'
  | 'gc_under18_no5'
  | 'otherHealthCareUnder19'
  | 'otherHealthCarePregnant'
  | 'notPregnantOrUnder19ForOmniSalud'
  | 'notPregnantOrUnder19ForEmergencyMedicaid'
  | 'notPregnantForMassHealthLimited'
  | 'notPregnantOrChildForMassHealthLimited'
  | 'otherHealthCareUnder21';

export type CitizenLabels = 'citizen' | CitizenLabelOptions | CalculatedCitizenLabel;

export const filterNestedMap = new Map<CitizenLabelOptions, CitizenLabelOptions[]>([
  ['non_citizen', []],
  ['green_card', ['gc_5plus', 'gc_5less']],
  ['refugee', []],
  ['otherWithWorkPermission', []],
]);

type CalculatedCitizenshipFilter = {
  func: (member: HouseholdData) => boolean;
  linkedFilters: CitizenLabelOptions[];
};

function notPregnantOrUnder19(member: HouseholdData) {
  return !member.conditions.pregnant && calcAge(member) >= 19;
}

export const calculatedCitizenshipFilters: Record<CalculatedCitizenLabel, CalculatedCitizenshipFilter> = {
  otherHealthCarePregnant: {
    func: (member) => {
      return member.conditions.pregnant ?? false;
    },
    linkedFilters: ['non_citizen', 'green_card', 'refugee', 'gc_5plus', 'gc_5less', 'otherWithWorkPermission'],
  },
  otherHealthCareUnder19: {
    func: (member) => {
      return calcAge(member) < 19;
    },
    linkedFilters: ['non_citizen', 'green_card', 'refugee', 'gc_5plus', 'gc_5less', 'otherWithWorkPermission'],
  },
  notPregnantOrUnder19ForOmniSalud: {
    func: notPregnantOrUnder19,
    linkedFilters: ['non_citizen'],
  },
  notPregnantOrUnder19ForEmergencyMedicaid: {
    func: notPregnantOrUnder19,
    linkedFilters: ['gc_5less', 'non_citizen', 'otherWithWorkPermission'],
  },
  gc_18plus_no5: {
    func: (member) => {
      return calcAge(member) >= 18;
    },
    linkedFilters: ['gc_5less'],
  },
  gc_under18_no5: {
    func: (member) => {
      return calcAge(member) < 18;
    },
    linkedFilters: ['gc_5less'],
  },
  notPregnantForMassHealthLimited: {
    func: (member) => {
      return !(member.conditions.pregnant ?? false);
    },
    linkedFilters: ['non_citizen'],
  },
  notPregnantOrChildForMassHealthLimited: {
    func: (member) => {
      const pregnant = member.conditions.pregnant ?? false;
      const age = calcAge(member);
      const under21 = age < 21;
      return !pregnant && !under21;
    },
    linkedFilters: ['gc_5less', 'otherWithWorkPermission'],
  },
  otherHealthCareUnder21: {
    func: (member) => {
      return calcAge(member) < 21;
    },
    linkedFilters: ['gc_5less', 'otherWithWorkPermission'],
  },
};

const citizenshipFilterFormControlLabels: Record<CitizenLabelOptions, FormattedMessageType> = {
  non_citizen: (
    <FormattedMessage
      id="citizenshipFCtrlLabel-non_citizen"
      defaultMessage="Individuals without lawful U.S. presence or citizenship"
    />
  ),
  green_card: <FormattedMessage id="citizenshipFCtrlLabel-green_card" defaultMessage="Green card holders" />,
  gc_5plus: <FormattedMessage id="citizenshipFCtrlLabel-gc_5plus" defaultMessage="Had green card for 5+ years" />,
  gc_5less: (
    <FormattedMessage id="citizenshipFCtrlLabel-gc_5less" defaultMessage="Had green card for less than 5 years" />
  ),
  refugee: (
    <FormattedMessage
      id="citizenshipFCtrlLabel-refugee"
      defaultMessage="Granted refugee or asylee status (special rules or waiting periods may apply)"
    />
  ),
  otherWithWorkPermission: (
    <FormattedMessage
      id="citizenshipFCtrlLabel-other_work_permission"
      defaultMessage="Other lawfully present noncitizens with permission to live or work in the U.S. (includes DACA recipients, other rules may apply)"
    />
  ),
};

export default citizenshipFilterFormControlLabels;
