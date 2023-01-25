import { FormattedMessage } from 'react-intl';

const acuteConditionOptions = {
  food:
    <FormattedMessage 
      id='acuteConditionOptions.food' 
      defaultMessage='Access to food' />,
  babySupplies:
    <FormattedMessage 
      id='acuteConditionOptions.babySupplies' 
      defaultMessage='Access to free diapers and other baby supplies' />,
  housing:
    <FormattedMessage 
      id='acuteConditionOptions.housing' 
      defaultMessage='Emergency help paying mortgage, rent, or utilities because of financial hardship' />,
  support:
    <FormattedMessage 
      id='acuteConditionOptions.support' 
      defaultMessage="A challenge that you (or your child) have that you'd be interested in talking with someone outside your household about" />,
  childDevelopment:
    <FormattedMessage 
      id='acuteConditionOptions.childDevelopment' 
      defaultMessage="Concern about your baby's/toddler's development" />,
  loss:
    <FormattedMessage 
      id='acuteConditionOptions.loss' 
      defaultMessage='Funeral, burial, or cremation costs' />
};

export default acuteConditionOptions;