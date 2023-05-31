import { Button } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ExpenseQuestion from './ExpenseQuesion';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useErrorController, expenseSourcesHaveError } from '../../Assets/validationFunctions';
import PreviousButton from '../PreviousButton/PreviousButton';
import './ExpenseBlock.css';

const ExpenseBlock = ({ handleExpenseSourcesSubmit }) => {
  const { formData } = useContext(Context);
  const { id, uuid } = useParams();
  const stepNumberId = Number(id);
  const expensesErrorController = useErrorController(expenseSourcesHaveError, undefined);

  const [selectedMenuItem, setSelectedMenuItem] = useState(
    formData.expenses.length > 0
      ? formData.expenses
      : [
          {
            expenseSourceName: '',
            expenseAmount: '',
          },
        ],
  );

  const deleteExpenseBlock = (selectedIndex) => {
    const updatedSelectedMenuItems = selectedMenuItem.filter((expenseSourceData, index) => index !== selectedIndex);
    setSelectedMenuItem(updatedSelectedMenuItems);
    expensesErrorController.updateError(updatedSelectedMenuItems);
  };

  const createExpenseBlockQuestions = () => {
    return selectedMenuItem.map((expenseSourceData, index) => {
      return (
        <ExpenseQuestion
          expenseData={expenseSourceData}
          allExpensesData={selectedMenuItem}
          setAllExpenses={setSelectedMenuItem}
          deleteExpenseBlock={deleteExpenseBlock}
          index={index}
          submitted={expensesErrorController.isSubmitted}
          key={index}
        />
      );
    });
  };

  const handleAddAdditionalExpenseSource = (event) => {
    event.preventDefault();
    setSelectedMenuItem([
      ...selectedMenuItem,
      {
        expenseSourceName: '',
        expenseAmount: 0,
      },
    ]);
  };

  const handleSaveAndContinue = (event) => {
    event.preventDefault();
    const hasError = expensesErrorController.updateError(selectedMenuItem);
    expensesErrorController.setIsSubmitted(true);
    if (!hasError) {
      handleExpenseSourcesSubmit(selectedMenuItem, stepNumberId, uuid);
    }
  };

  return (
    <>
      {createExpenseBlockQuestions()}
      {expensesErrorController.showError && (
        <ErrorMessage
          error={
            <FormattedMessage
              id="expenseBlock.return-error-message"
              defaultMessage="Please select and enter a response for all three fields"
            />
          }
        />
      )}
      <Button variant="contained" onClick={(event) => handleAddAdditionalExpenseSource(event)}>
        <FormattedMessage id="expenseBlock.return-addExpenseButton" defaultMessage="Add another expense" />
      </Button>
      <div className="prev-save-continue-buttons">
        <PreviousButton />
        <Button
          variant="contained"
          onClick={(event) => {
            handleSaveAndContinue(event);
          }}
        >
          <FormattedMessage id="continueButton" defaultMessage="Continue" />
        </Button>
      </div>
    </>
  );
};

export default ExpenseBlock;
