import { FormControl, Select, MenuItem, InputLabel, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { expenseSourceValueHasError, displayExpenseSourceValueHelperText, expenseSourcesAreValid } from '../../Assets/validationFunctions';
import expenseOptions from '../../Assets/expenseOptions';
import frequencyOptions from '../../Assets/frequencyOptions';
import PreviousButton from '../PreviousButton/PreviousButton';
import './ExpenseBlock.css';

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

const ExpenseBlock = ({ handleExpenseSourcesSubmit, formData }) => {
  const { id } = useParams();
  const stepNumberId = Number(id);

  const [selectedMenuItem, setSelectedMenuItem] = useState(formData.expenses.length > 0 ? formData.expenses :
  [
    {
      expenseSourceName: '', 
      expenseSourceLabel: '', 
      expenseAmount: '',
      expenseFrequency: 'monthly',
      expenseFrequencyLabel: frequencyOptions.monthly
    }
  ]);

  const createExpenseBlockQuestions = () => {
    return selectedMenuItem.map((expenseSourceData, index) => {
      const { expenseSourceName, expenseAmount } = expenseSourceData;
      
      const expenseSourceQuestion = 
        <p className='question-label'>
          <FormattedMessage 
            id='expenseBlock.createExpenseBlockQuestions-questionLabel' 
            defaultMessage='If you have another expense, select it below.' />
        </p>;

      return (
        <div key={index}>
          {index > 0 &&
            <div className='delete-button-container'>
              <StyledDeleteButton variant='contained' onClick={() => deleteExpenseBlock(index)}>x</StyledDeleteButton>
            </div>
          }
          {index > 0 && expenseSourceQuestion}
          {createExpenseDropdownMenu(expenseSourceName, index)}
          {createExpenseAmountTextfield(expenseSourceName, expenseAmount, index)}
        </div>
      );
    })
  }

  const createExpenseAmountTextfield = (expenseSourceName, expenseAmount, index) => {
    return (
      <div className='bottom-border'>
        <p className='question-label'>
          <FormattedMessage 
            id='expenseBlock.createExpenseAmountTextfield-questionLabel' 
            defaultMessage='How much is this type of expense: ' />
          {selectedMenuItem[index].expenseSourceLabel}?
        </p>
        <div className='expense-block-textfield'>
          <StyledTextField 
            type='text'
            name={expenseSourceName}
            value={expenseAmount}
            label={
              <FormattedMessage 
                id='expenseBlock.createExpenseAmountTextfield-amountLabel' 
                defaultMessage='Amount' />
            }
            onChange={(event) => { handleExpenseTextfieldChange(event, index) }}
            variant='outlined'
            required
            error={expenseSourceValueHasError(selectedMenuItem[index].expenseAmount)} 
            helperText={displayExpenseSourceValueHelperText(selectedMenuItem[index].expenseAmount)} 
          />
        </div>
      </div>
    );
  }

  const createExpenseDropdownMenu = (expenseSourceName, index) => {
    return (
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel if='expense-type-label'>
          <FormattedMessage 
            id='expenseBlock.createExpenseDropdownMenu-expenseTypeInputLabel' 
            defaultMessage='Expense Type' />
        </InputLabel>
        <StyledSelectfield
          labelId='expense-type-label'
          id={expenseSourceName}
          value={expenseSourceName}
          label={
            <FormattedMessage 
              id='expenseBlock.createExpenseDropdownMenu-expenseTypeSelectLabel' 
              defaultMessage='Expense Type' />
          }
          onChange={(event) => { handleSelectChange(event, index) }}>
          {createExpenseMenuItems()}
        </StyledSelectfield>
      </FormControl>
    );
  }

  const createExpenseMenuItems = () => {
    const disabledSelectMenuItem = 
      <MenuItem value='select' key='disabled-select-value' disabled>
        <FormattedMessage 
          id='expenseBlock.createExpenseMenuItems-disabledSelectMenuItemText' 
          defaultMessage='Select' />
      </MenuItem>;

    const menuItemKeys = Object.keys(expenseOptions);
    const menuItemLabels = Object.values(expenseOptions);

    const menuItems = menuItemKeys.map((menuItemKey, i) => {
      return (
        <MenuItem value={menuItemKey} key={menuItemKey}>{menuItemLabels[i]}</MenuItem>
      );
    });

    return [disabledSelectMenuItem, menuItems];
  }

  const deleteExpenseBlock = (selectedIndex) => {
    const updatedSelectedMenuItems = selectedMenuItem.filter((expenseSourceData, index) => index !== selectedIndex );
    setSelectedMenuItem(updatedSelectedMenuItems);  
  }

  const handleAddAdditionalExpenseSource = (event) => {
    event.preventDefault();
    setSelectedMenuItem([
      ...selectedMenuItem,
      {
        expenseSourceName: '', 
        expenseSourceLabel: '', 
        expenseAmount: 0,
        expenseFrequency: '',
        expenseFrequencyLabel: ''
      }
    ]);
  }

  const handleFrequencySelectChange = (event, index) => {
    const { value } = event.target; 
    const updatedSelectedMenuItems = selectedMenuItem.map((expenseSourceData, i) => {
      if (i === index) {
        return { 
          ...expenseSourceData, 
          expenseFrequency: value,
          expenseFrequencyLabel: frequencyOptions[value]
        }
      } else {
        return expenseSourceData;
      }
    });

    setSelectedMenuItem(updatedSelectedMenuItems);
  }

  const handleSaveAndContinue = (event) => {
    event.preventDefault();
    if(expenseSourcesAreValid(selectedMenuItem)) {
      handleExpenseSourcesSubmit(selectedMenuItem, stepNumberId);
    }
  }

  const handleSelectChange = (event, index) => {
    const updatedSelectedMenuItems = selectedMenuItem.map((expenseSourceData, i) => {
      if (i === index) {
        return { 
          expenseSourceName: event.target.value, 
          expenseSourceLabel: expenseOptions[event.target.value],
          expenseAmount: 0, 
          expenseFrequency: '',
          expenseFrequencyLabel: ''
        }
      } else {
        return expenseSourceData;
      }
    });

    setSelectedMenuItem(updatedSelectedMenuItems);
  }

  const handleExpenseTextfieldChange = (event, index) => {
    const { value } = event.target;
    const numberUpToEightDigitsLongRegex = /^\d{0,8}$/;

    if (numberUpToEightDigitsLongRegex.test(value)) { 
      const updatedSelectedMenuItems = selectedMenuItem.map((expenseSourceData, i) => {
        if (i === index) {
          return { ...expenseSourceData, expenseAmount: Math.round(Number(value)) }
        } else {
          return expenseSourceData;
        }
      });
  
      setSelectedMenuItem(updatedSelectedMenuItems);
    }
  }
  
  return (
    <>
      { createExpenseBlockQuestions() }
      { !expenseSourcesAreValid(selectedMenuItem) && 
        <ErrorMessage 
          error={ 
            <FormattedMessage 
              id='expenseBlock.return-error-message' 
              defaultMessage='Please select and enter a response for all three fields' />
          } 
        />
      }
      <Button
        variant='contained'
        onClick={(event) => handleAddAdditionalExpenseSource(event)} >
        <FormattedMessage 
          id='expenseBlock.return-addExpenseButton' 
          defaultMessage='Add another expense' />
      </Button>
      <div className='prev-save-continue-buttons'>
        <PreviousButton />
        <Button
          variant='contained'
          onClick={(event) => { handleSaveAndContinue(event) }} >
          <FormattedMessage 
            id='continueButton'
            defaultMessage='Continue' />
        </Button>
      </div>
    </>
  );

}

export default ExpenseBlock;