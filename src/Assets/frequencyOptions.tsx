import { FormattedMessage } from 'react-intl';

const frequencyOptions = {
  weekly: <FormattedMessage id="frequencyOptions.weekly" defaultMessage="every week" />,
  biweekly: <FormattedMessage id="frequencyOptions.biweekly" defaultMessage="every 2 weeks" />,
  twiceMonth: <FormattedMessage id="frequencyOptions.twiceMonth" defaultMessage="twice a month" />,
  monthly: <FormattedMessage id="frequencyOptions.monthly" defaultMessage="every month" />,
  hourly: <FormattedMessage id="frequencyOptions.hourly" defaultMessage="hourly" />,
};

export default frequencyOptions;
