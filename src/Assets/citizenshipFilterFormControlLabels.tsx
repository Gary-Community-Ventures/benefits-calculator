import { FormattedMessage } from 'react-intl';

export type CitizenLabels =
  | 'citizen'
  | 'non_citizen'
  | 'green_card'
  | 'refugee'
  | 'gc_5plus'
  | 'gc_18plus_no5'
  | 'gc_under18_no5'
  | 'gc_under19_pregnant_no5';

const citizenshipFilterFormControlLabels = {
  non_citizen: (
    <FormattedMessage
      id="citizenshipFCtrlLabel-non_citizen"
      defaultMessage="Individuals without citizenship or lawful U.S. presence"
    />
  ),
  green_card: <FormattedMessage id="citizenshipFCtrlLabel-green_card" defaultMessage="Green card holders" />,
  refugee: (
    <FormattedMessage
      id="citizenshipFCtrlLabel-refugee"
      defaultMessage="Refugees or asylees (special rules or waiting periods may apply)"
    />
  ),
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
  gc_under19_pregnant_no5: (
    <FormattedMessage
      id="citizenshipFCtrlLabel-gc_under19_pregnant_no5"
      defaultMessage="for health care benefits - younger than 19 or pregnant without a 5-year waiting period"
    />
  ),
};

export default citizenshipFilterFormControlLabels;
