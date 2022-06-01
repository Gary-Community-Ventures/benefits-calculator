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

  const createExpenseAmountTextfield = (expenseSourceName, expenseAmount, index) => {
    return (
      <div className='expense-block-textfield'>
        <p className='question-label'>How much is this type of expense: {selectedMenuItem[index].expenseSourceLabel}?</p>
        <StyledTextField 
          type='number'
          name={expenseSourceName}
          value={expenseAmount}
          label='Amount'
          onChange={(event) => { handleTextfieldChange(event, index) }}
          variant='outlined'
          required
          error={expenseSourceValueHasError(selectedMenuItem[index].expenseAmount)} 
          helperText={displayExpenseSourceValueHelperText(selectedMenuItem[index].expenseAmount)} 
        />
      </div>
    );
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

  const createExpenseFrequencyDropdownMenu = (expenseSourceFrequency, index) => {
    return (
      <div className='bottom-border'>
        <p className='question-label'>How often do you have this type of expense: {selectedMenuItem[index].expenseSourceLabel}?</p>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel if='expense-frequency-label'>Frequency</InputLabel>
        <StyledSelectfield
          labelId='expense-frequency-label'
          id='expense-frequency'
          value={expenseSourceFrequency}
          name={expenseSourceFrequency}
          label='Expense Frequency'
          onChange={(event) => { handleFrequencySelectChange(event, index) }}>
          {createExpenseFrequencyMenuItems()}
        </StyledSelectfield>
        </FormControl>
      </div>
    );
  }

  const createExpenseFrequencyMenuItems = () => {
    const disabledSelectMenuItem = <MenuItem value='select' key='disabled-frequency-select-value' disabled>Select</MenuItem>;
    const expenseFrequencyOptions = {
      weekly:'Every week',
      biweekly: 'Every 2 weeks',
      monthly: 'Every month',
      semimonthly: 'Twice a month',
      yearly: 'Every year'
    };
    const menuItemKeys = Object.keys(expenseFrequencyOptions);
    const menuItemLabels = Object.values(expenseFrequencyOptions);
  
    const menuItems = menuItemKeys.map((menuItemKey, i) => {
      return (
        <MenuItem value={menuItemKey} key={menuItemLabels[i]}>{menuItemLabels[i]}</MenuItem>
      );
    });

    return [disabledSelectMenuItem, menuItems];
  }

  const createExpenseMenuItems = () => {
    const disabledSelectMenuItem = <MenuItem value='select' key='disabled-select-value' disabled>Select</MenuItem>;
    const menuItemKeys = Object.keys(expenseOptions);
    const menuItemLabels = Object.values(expenseOptions);

    const menuItems = menuItemKeys.map((menuItemKey, i) => {
      return (
        <MenuItem value={menuItemKey} key={menuItemLabels[i]}>{menuItemLabels[i]}</MenuItem>
      );
    });

    return [disabledSelectMenuItem, menuItems];
  }

  const deleteExpenseBlock = (selectedIndex) => {
    const updatedSelectedMenuItems = selectedMenuItem.filter((expenseSourceData, index) => index !== selectedIndex );
    setSelectedMenuItem(updatedSelectedMenuItems);  
  }

  const handleFrequencySelectChange = (event, index) => {
    const { value } = event.target; 
    const updatedSelectedMenuItems = selectedMenuItem.map((expenseSourceData, i) => {
      if (i === index) {
        return { ...expenseSourceData, expenseFrequency: value }
      } else {
        return expenseSourceData;
      }
    });

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

  const handleTextfieldChange = (event, index) => {
    const { value } = event.target;
    const updatedSelectedMenuItems = selectedMenuItem.map((expenseSourceData, i) => {
      if (i === index) {
        return { ...expenseSourceData, expenseAmount: Math.round(Number(value)) }
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