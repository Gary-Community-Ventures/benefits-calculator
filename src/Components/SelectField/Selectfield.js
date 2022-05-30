import { FormControl, Select, MenuItem, InputLabel, FormHelperText, TextField } from "@mui/material";
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
  const [selectedMenuItem, setSelectedMenuItem] = useState({ 
    incomeStreamName: '', 
    incomeStreamLabel: '', 
    incomeAmount: 0,
    incomeFrequency: ''
  });

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

  const createIncomeStreamsDropdownMenu = (incomeStreamName, incomeStreamLabel) => {
  return (
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel if='income-type-label'>Income Type</InputLabel>
        <StyledSelectfield
          labelId='income-type-label'
        id={incomeStreamName}
        value={incomeStreamName}
        name={incomeStreamLabel}
          label='Income Type'
          onChange={(event) => { handleSelectChange(event) }}>
          {createMenuItems()}
        </StyledSelectfield>
      </FormControl>
    );
  }
      <>
        <p className='question-label'>How much do you receive for: {selectedMenuItem.incomeStreamLabel}?</p>
        <StyledTextField 
          type='number'
          name={selectedMenuItem.incomeStreamName}
          value={selectedMenuItem.incomeAmount}
          label='Amount'
          onChange={(event) => {handleTextfieldChange(event)}}
            variant='outlined'
            required
          error={incomeStreamValueHasError(selectedMenuItem.incomeAmount)} 
          helperText={displayIncomeStreamValueHelperText(selectedMenuItem.incomeAmount)} 
        />
      </>
      <>
        <p className='question-label'>How often do you receive this income: {selectedMenuItem.incomeStreamLabel}?</p>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel if='income-frequency-label'>Frequency</InputLabel>
        <StyledSelectfield
          labelId='income-frequency-label'
          id='income-frequency'
          value={selectedMenuItem.incomeFrequency}
          name={selectedMenuItem.incomeFrequency}//incomeFrequency
          label='Income Frequency'
          onChange={(event) => { handleFrequencySelectChange(event) }}>
          {createFrequencyMenuItems()}
        </StyledSelectfield>
        </FormControl>
      </>
    </>
  );
}
export default Selectfield;