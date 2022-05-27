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
    incomeAmount: 0 
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
  
  const handleSelectChange = (event) => {
    setSelectedMenuItem({ 
      incomeStreamName: event.target.value, 
      incomeStreamLabel: incomeOptions[event.target.value],
      incomeAmount: 0,
      incomeFrequency: '' 
    });
  }

  const handleTextfieldChange = (event) => {
    const { name, value } = event.target; 
    setSelectedMenuItem({ ...selectedMenuItem, incomeAmount: Math.round(Number(value)) }); 
  }
  }

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel if='income-type-label'>Income Type</InputLabel>
        <StyledSelectfield
          labelId='income-type-label'
          id='income-type'
          value={selectedMenuItem.incomeStreamName}
          name={selectedMenuItem.incomeStreamLabel}
          label='Income Type'
          onChange={(event) => { handleSelectChange(event) }}>
          {createMenuItems()}
        </StyledSelectfield>
        <FormHelperText></FormHelperText>
      </FormControl>
      <>
        <p className='question-label'>How much do you receive for: {selectedMenuItem.incomeStreamLabel}?</p>
        <StyledTextField 
          type='number'
          name={selectedMenuItem.incomeStreamName}
          value={selectedMenuItem.incomeAmount}
          label={selectedMenuItem.incomeStreamLabel}
          onChange={(event) => {handleTextfieldChange(event)}}
            variant='outlined'
            required
          error={incomeStreamValueHasError(selectedMenuItem.incomeAmount)} 
          helperText={displayIncomeStreamValueHelperText(selectedMenuItem.incomeAmount)} 
        />
      </>
    </>
  );
}
export default Selectfield;