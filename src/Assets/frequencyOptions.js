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
      defaultMessage='Every month' />
};

export default frequencyOptions;