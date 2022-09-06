import { FormattedMessage } from 'react-intl';

const expenseOptions = {
  childCare: 
    <FormattedMessage 
      id='expenseOptions.childCare' 
      defaultMessage='Child Care' />,
  childSupport: 
    <FormattedMessage 
      id='expenseOptions.childSupport' 
      defaultMessage='Child Support (Paid)' />,
  dependentCare: 
    <FormattedMessage 
      id='expenseOptions.dependentCare' 
      defaultMessage='Dependent Care' />,
  rent: 
    <FormattedMessage 
      id='expenseOptions.rent' 
      defaultMessage='Rent' />,
  medical: 
    <FormattedMessage 
      id='expenseOptions.medical' 
      defaultMessage='Medical Expense' />,
  heating: 
    <FormattedMessage 
      id='expenseOptions.heating' 
      defaultMessage='Heating' />,
  cooling: 
    <FormattedMessage 
      id='expenseOptions.cooling' 
      defaultMessage='Cooling' />,
  mortgage: 
    <FormattedMessage 
      id='expenseOptions.mortgage' 
      defaultMessage='Mortgage' />,
  utilities: 
    <FormattedMessage 
      id='expenseOptions.utilities' 
      defaultMessage='Utilities' />,
  telephone: 
    <FormattedMessage 
      id='expenseOptions.telephone' 
      defaultMessage='Telephone' />,
  insurancePremiums: 
    <FormattedMessage 
      id='expenseOptions.insurancePremiums' 
      defaultMessage='Third Party Insurance Premiums' />
};

export default expenseOptions;