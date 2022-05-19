import {FormControlLabel, RadioGroup, Radio } from '@mui/material';

const Radiofield = ({ componentDetails, formData, handleRadioButtonChange }) => {
  const { ariaLabel, inputName } = componentDetails;
  return (
    <RadioGroup
      aria-labelledby={ariaLabel}
      name={inputName}
      value={formData[inputName]}
      onChange={handleRadioButtonChange} >
        <FormControlLabel value='true' control={<Radio />} label='Yes' />
        <FormControlLabel value='false' control={<Radio />} label='No' />
    </RadioGroup>
  );
}

export default Radiofield;