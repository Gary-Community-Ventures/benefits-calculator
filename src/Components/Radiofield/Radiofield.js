import {FormControlLabel, RadioGroup, Radio } from '@mui/material';
import './Radiofield.css';

const Radiofield = ({ componentDetails, formData, handleRadioButtonChange }) => {
  const { ariaLabel, inputName } = componentDetails;
  return (
    <RadioGroup
      aria-labelledby={ariaLabel}
      name={inputName}
      value={formData[inputName]}
      onChange={handleRadioButtonChange} >
        <FormControlLabel className='radiofield-radio-label' value='true' control={<Radio />} label='Yes' />
        <FormControlLabel className='radiofield-radio-label' value='false' control={<Radio />} label='No' />
    </RadioGroup>
  );
}

export default Radiofield;