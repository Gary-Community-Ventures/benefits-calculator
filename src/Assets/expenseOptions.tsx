import { FormattedMessage } from 'react-intl';

const expenseOptions = {
  rent: <FormattedMessage id="expenseOptions.rent" defaultMessage="Rent" />,
  telephone: <FormattedMessage id="expenseOptions.telephone" defaultMessage="Telephone" />,
  internet: <FormattedMessage id="expenseOptions.internet" defaultMessage="Internet" />,
  auto: <FormattedMessage id="expenseOptions.auto" defaultMessage="Auto Insurance Premium &/or Payment" />,
  otherUtilities: <FormattedMessage id="expenseOptions.otherUtilities" defaultMessage="Other Utilities" />,
  heating: <FormattedMessage id="expenseOptions.heating" defaultMessage="Heating" />,
  creditCard: <FormattedMessage id="expenseOptions.creditCard" defaultMessage="Credit Card Debt" />,
  mortgage: <FormattedMessage id="expenseOptions.mortgage" defaultMessage="Mortgage" />,
  medical: <FormattedMessage id="expenseOptions.medical" defaultMessage="Medical Insurance Premium &/or Bills" />,
  personalLoan: <FormattedMessage id="expenseOptions.personalLoan" defaultMessage="Personal Loan" />,
  studentLoans: <FormattedMessage id="expenseOptions.studentLoans" defaultMessage="Student Loans" />,
  cooling: <FormattedMessage id="expenseOptions.cooling" defaultMessage="Cooling" />,
  childCare: <FormattedMessage id="expenseOptions.childCare" defaultMessage="Child Care" />,
  childSupport: <FormattedMessage id="expenseOptions.childSupport" defaultMessage="Child Support (Paid)" />,
  dependentCare: <FormattedMessage id="expenseOptions.dependentCare" defaultMessage="Dependent Care" />,
};

export default expenseOptions;
