import { FormattedMessage } from 'react-intl';
import { FormattedMessageType } from '../Types/Questions';

export type CitizenLabels =
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

const citizenshipFilterFormControlLabels: Record<CitizenLabels, FormattedMessageType> = {
  non_citizen: (
    <FormattedMessage
      id="citizenshipFCtrlLabel-non_citizen"
      defaultMessage="Individuals without citizenship or lawful U.S. presence"
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
      defaultMessage="Refugees or asylees (special rules or waiting periods may apply)"
    />
  ),
  other: <FormattedMessage id="citizenshipFCtrlLabel-other" defaultMessage="Other lawfully present noncitizens" />,
  otherWithWorkPermission: (
    <FormattedMessage
      id="citizenshipFCtrlLabel-other_work_permission"
      defaultMessage="Other lawfully present noncitizens"
    />
  ),
  otherHealthCareUnder19: (
    <FormattedMessage
      id="citizenshipFCtrlLabel-other_health_care_under19"
      defaultMessage="Other lawfully present noncitizens"
    />
  ),
  otherHealthCarePregnant: (
    <FormattedMessage
      id="citizenshipFCtrlLabel-other_health_care_pregnant"
      defaultMessage="Other lawfully present noncitizens"
    />
  ),
};

export default citizenshipFilterFormControlLabels;
