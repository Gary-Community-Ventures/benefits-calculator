import { FormControl, Select, MenuItem, InputLabel, TextField, Button } from "@mui/material";
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { expenseSourceValueHasError, displayExpenseSourceValueHelperText } from '../../Assets/validationFunctions';
const StyledSelectfield = styled(Select)({
  marginBottom: 20,
  minWidth: 200
});

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const StyledDeleteButton = styled(Button)({
  minWidth: 32
});

const ExpenseBlock = ({ page, setPage, handleExpenseSourcesSubmit, formData }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(formData.expenses.length > 0 ? formData.expenses :
  [
    {
      expenseSourceName: '', 
      expenseSourceLabel: '', 
      expenseAmount: 0,
      expenseFrequency: ''
    }
  ]);

  const createExpenseBlockQuestions = () => {
    return selectedMenuItem.map((expenseSourceData, index) => {
      const { expenseSourceName, expenseSourceLabel, expenseAmount, expenseFrequency } = expenseSourceData;
      const expenseSourceQuestion = <p className='question-label'>If you have another expense, select it below.</p>;

      return (
        <div key={index}>
          {index > 0 &&
            <div className='delete-button-container'>
              <StyledDeleteButton variant='contained' onClick={() => deleteExpenseBlock(index)}>x</StyledDeleteButton>
            </div>
          }
          {index > 0 && expenseSourceQuestion}
          {createExpenseDropdownMenu(expenseSourceName, expenseSourceLabel, index)}
          {createExpenseAmountTextfield(expenseSourceName, expenseAmount, index)}
          {createExpenseFrequencyDropdownMenu(expenseFrequency, index)}
        </div>
      );
    })
  }


  const createExpenseDropdownMenu = (expenseSourceName, expenseSourceLabel, index) => {
    return (
      <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel if='expense-type-label'>Expense Type</InputLabel>
      <StyledSelectfield
        labelId='expense-type-label'
        id={expenseSourceName}
        value={expenseSourceName}
        name={expenseSourceLabel}
        label='Expense Type'
        onChange={(event) => { handleSelectChange(event, index) }}>
        {createExpenseMenuItems()}
      </StyledSelectfield>
    </FormControl>
    );
  }
  const deleteExpenseBlock = (selectedIndex) => {
    const updatedSelectedMenuItems = selectedMenuItem.filter((expenseSourceData, index) => index !== selectedIndex );
    setSelectedMenuItem(updatedSelectedMenuItems);  
  }

  const handleSelectChange = (event, index) => {
    const updatedSelectedMenuItems = selectedMenuItem.map((expenseSourceData, i) => {
      if (i === index) {
        return { 
          expenseSourceName: event.target.value, 
          expenseSourceLabel: expenseOptions[event.target.value],
          expenseAmount: 0, 
          expenseFrequency: ''
        }
      } else {
        return expenseSourceData;
      }
    });

    setSelectedMenuItem(updatedSelectedMenuItems);
  }
  return (
    <>
      {createExpenseBlockQuestions()}
    </>
  );

}

export default ExpenseBlock;