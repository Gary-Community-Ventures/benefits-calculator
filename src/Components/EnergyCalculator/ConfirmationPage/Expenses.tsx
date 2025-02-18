import { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ConfirmationBlock from '../../Confirmation/ConfirmationBlock';
import { Context } from '../../Wrapper/Wrapper';
import { EnergyCalculatorExpenseType, ENERGY_CALCULATOR_EXPENSE_NAME_MAP } from '../Steps/Expenses';
import { ReactComponent as Expense } from '../../../Assets/icons/expenses.svg';

export default function EnergyCalculatorExpenses() {
  const { formData } = useContext(Context);
  const { formatMessage } = useIntl();

  const editElectricityProviderAriaLabel = {
    id: 'energyCalculator.confirmation.expenses.edit-AL',
    defaultMessage: 'edit expenses',
  };
  const electricityProviderIconAlt = {
    id: 'energyCalculator.confirmation.expenses.icon-AL',
    defaultMessage: 'expenses',
  };

  return (
    <ConfirmationBlock
      icon={<Expense title={formatMessage(electricityProviderIconAlt)} />}
      title={
        <FormattedMessage id="energyCalculator.confirmation.expenses" defaultMessage="Electric Utility Provider" />
      }
      editAriaLabel={editElectricityProviderAriaLabel}
      stepName="energyCalculatorExpenses"
    >
      <ul className="confirmation-acute-need-list">
        {formData.expenses.map((expense, index) => {
          const text = ENERGY_CALCULATOR_EXPENSE_NAME_MAP[expense.expenseSourceName as EnergyCalculatorExpenseType];

          if (text === undefined) {
            return null;
          }

          return <li key={index}>{text}</li>;
        })}
      </ul>
    </ConfirmationBlock>
  );
}
