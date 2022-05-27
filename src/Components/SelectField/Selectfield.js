import { FormControl, Select, MenuItem, InputLabel, FormHelperText, TextField } from "@mui/material";
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import incomeOptions from '../../Assets/incomeOptions';

const StyledSelectfield = styled(Select)({
  marginBottom: 20,
  minWidth: 200
});

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const Selectfield = ({ formData, handleIncomeStreamAmountChange }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState({ 
    stateValue: '', 
    labelValue: '', 
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
    setSelectedMenuItem({ ...selectedMenuItem, stateValue: event.target.value, labelValue: incomeOptions[event.target.value] });
  }
  }

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel if='income-type-label'>Income Type</InputLabel>
        <StyledSelectfield
          labelId='income-type-label'
          id='income-type'
          value={selectedMenuItem.stateValue}
          name={selectedMenuItem.labelValue}
          label='Income Type'
          onChange={(event) => { handleSelectChange(event) }}>
          {createMenuItems()}
        </StyledSelectfield>
        <FormHelperText></FormHelperText>
      </FormControl>
      <>
        <p className='question-label'>How much do you receive for: {selectedMenuItem.labelValue}?</p>
        {/* <StyledTextField 
            // type='number'
            // name={inputName}
            // value={formData[inputName]}
            // label={inputLabel}
            onChange={(event) => {handleChange(event)}}
            variant='outlined'
            required
            // error={inputError(formData[inputName])}
            // helperText={inputHelperText(formData[inputName])} 
            /> */}
      </>
    </>
  );
}
export default Selectfield;