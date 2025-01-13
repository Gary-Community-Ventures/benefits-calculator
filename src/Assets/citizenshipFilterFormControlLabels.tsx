import { FormattedMessage } from 'react-intl';
import { HouseholdData } from '../Types/FormData';
import { FormattedMessageType } from '../Types/Questions';
import { calcAge } from './age';

export type CitizenLabels =
  | 'citizen'
  | 'non_citizen'
  | 'green_card'
  | 'refugee'
  | 'gc_5plus'
  | 'gc_18plus_no5'
  | 'gc_under18_no5'
  | 'otherWithWorkPermission'
  | 'otherHealthCareUnder19'
  | 'otherHealthCarePregnant'
  | 'notPregnantOrUnder19ForOmniSalud'
  | 'notPregnantOrUnder19ForEmergencyMedicaid';

export type CitizenLabelOptions =
  | 'non_citizen'
  | 'green_card'
  | 'refugee'
  | 'gc_5plus'
  | 'gc_18plus_no5'
  | 'gc_under18_no5'
  | 'otherWithWorkPermission';

export type CalculatedCitizenLabel =
  | 'otherHealthCareUnder19'
  | 'otherHealthCarePregnant'
  | 'notPregnantOrUnder19ForOmniSalud'
  | 'notPregnantOrUnder19ForEmergencyMedicaid';

export const filterNestedMap = new Map<CitizenLabelOptions, CitizenLabelOptions[]>([
  ['non_citizen', []],
  ['green_card', ['gc_5plus', 'gc_18plus_no5', 'gc_under18_no5']],
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
      return member.conditions.pregnant;
    },
    linkedFilters: [
      'non_citizen',
      'green_card',
      'refugee',
      'gc_5plus',
      'gc_18plus_no5',
      'gc_under18_no5',
      'otherWithWorkPermission',
    ],
  },
  otherHealthCareUnder19: {
    func: (member) => {
      return calcAge(member) < 19;
    },
    linkedFilters: [
      'non_citizen',
      'green_card',
      'refugee',
      'gc_5plus',
      'gc_18plus_no5',
      'gc_under18_no5',
      'otherWithWorkPermission',
    ],
  },
  notPregnantOrUnder19ForOmniSalud: {
    func: notPregnantOrUnder19,
    linkedFilters: ['non_citizen', 'refugee'],
  },
  notPregnantOrUnder19ForEmergencyMedicaid: {
    func: notPregnantOrUnder19,
    linkedFilters: ['gc_18plus_no5', 'non_citizen', 'otherWithWorkPermission'],
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
  gc_5plus: <FormattedMessage id="citizenshipFCtrlLabel-gc_5plus" defaultMessage="ONLY after 5+ years in the U.S." />,
  gc_18plus_no5: (
    <FormattedMessage
      id="citizenshipFCtrlLabel-gc_18plus_no5"
      defaultMessage="18 or older without a 5-year waiting period"
    />
  ),
  gc_under18_no5: (
    <FormattedMessage
      id="citizenshipFCtrlLabel-gc_under18_no5"
      defaultMessage="younger than 18 without a 5-year waiting period"
    />
  ),
  refugee: (
    <FormattedMessage
      id="citizenshipFCtrlLabel-refugee"
      defaultMessage="Admitted refugees or asylees (special rules or waiting periods may apply)"
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
