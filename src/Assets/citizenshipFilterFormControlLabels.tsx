import { FormattedMessage } from 'react-intl';
import { FormattedMessageType } from '../Types/Questions';

export type CitizenLabels =
  | 'citizen'
  | 'non_citizen'
  | 'green_card'
  | 'refugee'
  | 'gc_5plus'
  | 'gc_18plus_no5'
  | 'gc_under18_no5'
  | 'other'
  | 'otherWithWorkPermission'
  | 'otherHealthCareUnder19'
  | 'otherHealthCarePregnant';

export type CitizenLabelOptions =
  | 'non_citizen'
  | 'green_card'
  | 'refugee'
  | 'gc_5plus'
  | 'gc_18plus_no5'
  | 'gc_under18_no5'
  | 'other'
  | 'otherWithWorkPermission'
  | 'otherHealthCareUnder19'
  | 'otherHealthCarePregnant';

export const filterNestedMap = new Map<CitizenLabels, CitizenLabelOptions[]>([
  ['non_citizen', []],
  ['green_card', ['gc_5plus', 'gc_18plus_no5', 'gc_under18_no5']],
  ['refugee', []],
  ['other', ['otherWithWorkPermission', 'otherHealthCareUnder19', 'otherHealthCarePregnant']],
]);

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
  other: <FormattedMessage id="citizenshipFCtrlLabel-other" defaultMessage="Other lawfully present noncitizens (includes DACA recipients)" />,
  otherWithWorkPermission: (
    <FormattedMessage
      id="citizenshipFCtrlLabel-other_work_permission"
      defaultMessage="with permission to live or work in the U.S. (other rules may apply)"
    />
  ),
  otherHealthCareUnder19: (
    <FormattedMessage
      id="citizenshipFCtrlLabel-other_health_care_under19"
      defaultMessage="for health care benefits - younger than 19"
    />
  ),
  otherHealthCarePregnant: (
    <FormattedMessage
      id="citizenshipFCtrlLabel-other_health_care_pregnant"
      defaultMessage="for health care benefits - pregnant"
    />
  ),
};

export default citizenshipFilterFormControlLabels;
