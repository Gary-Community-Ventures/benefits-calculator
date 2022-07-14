import { FormControl, Select, MenuItem, InputLabel, TextField, Typography, Button } from "@mui/material";
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { expenseSourceValueHasError, displayExpenseSourceValueHelperText, expenseSourcesAreValid } from '../../Assets/validationFunctions';
import expenseOptions from '../../Assets/expenseOptions';
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

const StyledTypography = styled(Typography)`
  color: #c6252b;
  height: 24px;
`;

const PersonExpenseBlock = ({ personData, householdData, setHouseholdData, personDataIndex }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(personData.expenses.length > 0 ? personData.expenses :
  [
    {
      expenseSourceName: '', 
      expenseSourceLabel: '', 
      expenseAmount: '',
      expenseFrequency: ''
    }
  ]);

  useEffect(() => {
    let updatedSelectedMenuItem = [ ...selectedMenuItem ];
    if (expenseSourcesAreValid(updatedSelectedMenuItem)) {
      const updatedHouseholdData = householdData.map((personData, i) => {
        if (i === personDataIndex) {
          return {
            ...personData,
            expenses: updatedSelectedMenuItem
          };
        } else {
          return personData;
        }
      });

      setHouseholdData(updatedHouseholdData);
    }
  }, [selectedMenuItem]);

  const createExpenseBlockQuestions = () => {
    return selectedMenuItem.map((expenseSourceData, index) => {
      const { expenseSourceName, expenseSourceLabel, expenseAmount, expenseFrequency } = expenseSourceData;
      const expenseSourceQuestion = <p className='question-label'>If they have another expense, select it below.</p>;

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
      <div>
        <p className='question-label'>How much is this type of expense: {selectedMenuItem[index].expenseSourceLabel}?</p>
        <div className='expense-block-textfield'>
          <StyledTextField
            type='text'
            name={expenseSourceName}
            value={expenseAmount}
            label='Amount'
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
      <div>
        <p className='question-label'>How often do they have this type of expense: {selectedMenuItem[index].expenseSourceLabel}?</p>
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
    const frequencyMenuItemKeys = Object.keys(expenseFrequencyOptions);
    const frequencyMenuItemLabels = Object.values(expenseFrequencyOptions);
  
    const frequencyMenuItems = frequencyMenuItemKeys.map((freqMenuItemKey, i) => {
      return (
        <MenuItem value={freqMenuItemKey} key={frequencyMenuItemLabels[i]}>{frequencyMenuItemLabels[i]}</MenuItem>
      );
    });

    return [disabledSelectMenuItem, frequencyMenuItems];
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

  const deleteExpenseBlock = (selectedIndex) => {//done but need to test
    const updatedSelectedMenuItems = selectedMenuItem.filter((expenseSourceData, index) => index !== selectedIndex );
    setSelectedMenuItem(updatedSelectedMenuItems);  

    const updatedHouseholdData = householdData.map((personData, i) => {
      if (i === personDataIndex) {
        return {
          ...personData,
          expenses: updatedSelectedMenuItems
        };
      } else {
        return personData;
      }
    });

    setHouseholdData(updatedHouseholdData);
  }

  const handleAddAdditionalExpenseSource = (event) => {
    event.preventDefault();
    setSelectedMenuItem([
      ...selectedMenuItem,
      {
        expenseSourceName: '', 
        expenseSourceLabel: '', 
        expenseAmount: 0,
        expenseFrequency: ''
      }
    ]);
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

  const expenseBlockIsMissingAnInput = () => {
    return selectedMenuItem[0].expenseSourceName === '' || 
      selectedMenuItem[0].expenseAmount === 0 || 
      selectedMenuItem[0].expenseFrequency === '';
  }
  
  return (
    <>
      <p className='question-label radio-question'>What type of expense have they had most recently?</p>
      <p className='question-description'>Answer the best you can. You will be able to include additional types of expenses. 
        The more you include, the more accurate your results will be.
      </p>
      {createExpenseBlockQuestions()}
      { expenseBlockIsMissingAnInput() && 
        <StyledTypography gutterBottom>*Please select and enter a response for all three fields</StyledTypography> }
      <Button
        variant='contained'
        onClick={(event) => handleAddAdditionalExpenseSource(event)} >
        Add another expense
      </Button>
    </>
  );

}

export default PersonExpenseBlock;