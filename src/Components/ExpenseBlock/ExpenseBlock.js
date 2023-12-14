import { Button } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ExpenseQuestion from './ExpenseQuestion';
import {
  useErrorController,
  expenseSourcesHaveError,
  displayExpensesHelperText,
} from '../../Assets/validationFunctions.tsx';
import PreviousButton from '../PreviousButton/PreviousButton';
import './ExpenseBlock.css';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const ExpenseBlock = ({ handleExpenseSourcesSubmit }) => {
  const { formData } = useContext(Context);
  const { id, uuid } = useParams();
  const stepNumberId = Number(id);
  const expensesErrorController = useErrorController(expenseSourcesHaveError, displayExpensesHelperText);

  useEffect(() => {
    const continueOnEnter = (event) => {
      if (event.key === 'Enter') {
        handleSaveAndContinue(event);
      }
    };
    document.addEventListener('keyup', continueOnEnter);
    return () => {
      document.removeEventListener('keyup', continueOnEnter); // remove event listener on onmount
    };
  });

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

  useEffect(() => {
    expensesErrorController.updateError(selectedMenuItem, formData);
  }, [selectedMenuItem]);

  const deleteExpenseBlock = (selectedIndex) => {
    const updatedSelectedMenuItems = selectedMenuItem.filter((expenseSourceData, index) => index !== selectedIndex);
    setSelectedMenuItem(updatedSelectedMenuItems);
    expensesErrorController.updateError(updatedSelectedMenuItems, formData);
  };

  const createExpenseBlockQuestions = () => {
    return selectedMenuItem.map((expenseSourceData, index) => {
      return (
        <Box key={index} className="section-container">
          <Stack sx={{ paddingBottom: '1rem' }} className={index % 2 === 0 ? 'section' : ''}>
            <ExpenseQuestion
              expenseData={expenseSourceData}
              allExpensesData={selectedMenuItem}
              setAllExpenses={setSelectedMenuItem}
              deleteExpenseBlock={deleteExpenseBlock}
              index={index}
              submitted={expensesErrorController.submittedCount}
              key={index}
            />
          </Stack>
        </Box>
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
    expensesErrorController.incrementSubmitted();
    if (!hasError) {
      handleExpenseSourcesSubmit(selectedMenuItem, stepNumberId, uuid);
    }
  };

  return (
    <>
      {createExpenseBlockQuestions()}
      <Button
        variant="outlined"
        onClick={(event) => handleAddAdditionalExpenseSource(event)}
        startIcon={<AddIcon sx={{ fontSize: 'medium !important', mr: '-0.5rem' }} />}
      >
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
