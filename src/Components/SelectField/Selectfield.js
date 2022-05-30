import { FormControl, Select, MenuItem, InputLabel, TextField, Button } from "@mui/material";
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { incomeStreamValueHasError, displayIncomeStreamValueHelperText } from '../../Assets/validationFunctions';
import incomeOptions from '../../Assets/incomeOptions';

const StyledSelectfield = styled(Select)({
  marginBottom: 20,
  minWidth: 200
});

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const Selectfield = ({ handleIncomeStreamAmountChange }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState([
    {
    incomeStreamName: '', 
    incomeStreamLabel: '', 
    incomeAmount: 0,
    incomeFrequency: ''
    }
  ]);

  const createMenuItems = () => {
    const disabledSelectMenuItem = <MenuItem value='select' key='disabled-select-value' disabled>Select</MenuItem>;
    const menuItemKeys = Object.keys(incomeOptions);
    const menuItemLabels = Object.values(incomeOptions);

    const menuItems = menuItemKeys.map((menuItemKey, i) => {
      return (
        <MenuItem value={menuItemKey} key={menuItemLabels[i]}>{menuItemLabels[i]}</MenuItem>
      );
    });

    return [disabledSelectMenuItem, menuItems];
  }

  const createFrequencyMenuItems = () => {
    const disabledSelectMenuItem = <MenuItem value='select' key='disabled-frequency-select-value' disabled>Select</MenuItem>;
    const incomeFrequencyOptions = {
      weekly:'Every week',
      biweekly: 'Every 2 weeks',
      monthly: 'Every month',
      semimonthly: 'Twice a month',
      yearly: 'Every year'
    };

    const menuItemKeys = Object.keys(incomeFrequencyOptions);
    const menuItemLabels = Object.values(incomeFrequencyOptions);
    const menuItems = menuItemKeys.map((menuItemKey, i) => {
      return (
        <MenuItem value={menuItemKey} key={menuItemLabels[i]}>{menuItemLabels[i]}</MenuItem>
      );
    });

    return [disabledSelectMenuItem, menuItems];

  }
  
  const handleSelectChange = (event) => {
    setSelectedMenuItem({ 
      incomeStreamName: event.target.value, 
      incomeStreamLabel: incomeOptions[event.target.value],
      incomeAmount: 0,
      incomeFrequency: '' 
    });
  }

  const handleTextfieldChange = (event) => {
    const { value } = event.target; 
    setSelectedMenuItem({ ...selectedMenuItem, incomeAmount: Math.round(Number(value)) }); 
  }

  const handleFrequencySelectChange = (event) => {
    const { value } = event.target; 
    setSelectedMenuItem({ ...selectedMenuItem, incomeFrequency: value }); 
  }
  }

  const createIncomeStreamsDropdownMenu = (incomeStreamName, incomeStreamLabel, index) => {
  return (
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel if='income-type-label'>Income Type</InputLabel>
        <StyledSelectfield
          labelId='income-type-label'
        id={incomeStreamName}
        value={incomeStreamName}
        name={incomeStreamLabel}
          label='Income Type'
        onChange={(event) => { handleSelectChange(event, index) }}>
          {createMenuItems()}
        </StyledSelectfield>
      </FormControl>
    );
  }
  
  const createIncomeAmountTextfield = (incomeStreamName, incomeAmount) => {
    return (
      <>
        <p className='question-label'>How much do you receive for: {selectedMenuItem.incomeStreamLabel}?</p>
        <StyledTextField 
          type='number'
          name={incomeStreamName}
          value={incomeAmount}
          label='Amount'
          onChange={(event) => {handleTextfieldChange(event)}}
            variant='outlined'
            required
          error={incomeStreamValueHasError(selectedMenuItem.incomeAmount)} 
          helperText={displayIncomeStreamValueHelperText(selectedMenuItem.incomeAmount)} 
        />
      </>
    );
  }

  const createIncomeStreamFrequencyDropdownMenu = (incomeFrequency) => {
    return (
      <>
        <p className='question-label'>How often do you receive this income: {selectedMenuItem.incomeStreamLabel}?</p>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel if='income-frequency-label'>Frequency</InputLabel>
        <StyledSelectfield
          labelId='income-frequency-label'
          id='income-frequency'
          value={incomeFrequency}
          name={incomeFrequency}
          label='Income Frequency'
          onChange={(event) => { handleFrequencySelectChange(event) }}>
          {createFrequencyMenuItems()}
        </StyledSelectfield>
        </FormControl>
      </>
    );
  }

  const createIncomeBlockQuestions = () => {
    return selectedMenuItem.map((incomeSourceData, index) => {
      const { incomeStreamName, incomeStreamLabel, incomeAmount, incomeFrequency } = incomeSourceData;
      const incomeStreamQuestion = <p className='question-label'>If you receive another type of income, select it below.</p>;
    return (
        <div key={index}>
          {index > 0 && incomeStreamQuestion}
          {createIncomeStreamsDropdownMenu(incomeStreamName, incomeStreamLabel, index)}
          {createIncomeAmountTextfield(incomeStreamName, incomeAmount, index)}
          {createIncomeStreamFrequencyDropdownMenu(incomeFrequency, index)}
        </div>
    );
    });
  }
  }
  return (
    createIncomeBlockQuestion(selectedMenuItem.incomeStreamName, selectedMenuItem.incomeStreamLabel, selectedMenuItem.incomeAmount, selectedMenuItem.incomeFrequency)
  );
}
export default Selectfield;