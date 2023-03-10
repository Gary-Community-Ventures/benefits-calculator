import { FormattedMessage } from 'react-intl';

const frequencyOptions = {
  weekly: 
    <FormattedMessage 
      id='frequencyOptions.weekly' 
      defaultMessage='Every week' />,
  biweekly: 
    <FormattedMessage 
      id='frequencyOptions.biweekly' 
      defaultMessage='Every 2 weeks' />,
  monthly: 
    <FormattedMessage 
      id='frequencyOptions.monthly' 
      defaultMessage='Every month' />,
  hourly:
    <FormattedMessage
      id='frequencyOptions.hourly' 
      defaultMessage='Hourly' />,
};

export default frequencyOptions;