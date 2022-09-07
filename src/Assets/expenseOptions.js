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
  mortgage: 
    <FormattedMessage 
      id='expenseOptions.mortgage' 
      defaultMessage='Mortgage' />,
  heating: 
    <FormattedMessage 
      id='expenseOptions.heating' 
      defaultMessage='Heating' />,
  cooling: 
    <FormattedMessage 
      id='expenseOptions.cooling' 
      defaultMessage='Cooling' />,
  otherUtilities: 
    <FormattedMessage 
      id='expenseOptions.otherUtilities' 
      defaultMessage='Other Utilities' />,
  telephone: 
    <FormattedMessage 
      id='expenseOptions.telephone' 
      defaultMessage='Telephone' />,
  internet: 
    <FormattedMessage 
      id='expenseOptions.internet' 
      defaultMessage='Internet' />,
  auto: 
    <FormattedMessage 
      id='expenseOptions.auto' 
      defaultMessage='Auto Insurance Premium &/or Payment' />,
  medical: 
    <FormattedMessage 
      id='expenseOptions.medical' 
      defaultMessage='Medical Insurance Premium &/or Bills' />,
  studentLoans: 
    <FormattedMessage 
      id='expenseOptions.studentLoans' 
      defaultMessage='Student Loans' />,
  creditCard: 
    <FormattedMessage 
      id='expenseOptions.creditCard' 
      defaultMessage='Credit Card Debt' />,
  personalLoan: 
    <FormattedMessage 
      id='expenseOptions.personalLoan' 
      defaultMessage='Personal Loan' />
};

export default expenseOptions;