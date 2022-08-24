import {FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormattedMessage } from 'react-intl';
import './Radiofield.css';

const StyledFormControlLabel = styled(FormControlLabel)({
  marginLeft: -5
});

const Radiofield = ({ componentDetails, formData, handleRadioButtonChange }) => {
  const { ariaLabel, inputName } = componentDetails;
  return (
    <div className='radiogroup-container'>
      <RadioGroup
        aria-labelledby={ariaLabel}
        name={inputName}
        value={formData[inputName]}
        onChange={handleRadioButtonChange} >
          <StyledFormControlLabel 
            value='true' 
            control={<Radio />} 
            label={
              <FormattedMessage 
                id='radiofield.label-yes' 
                defaultMessage='Yes' />
            }
          />
          <StyledFormControlLabel 
            value='false' 
            control={<Radio />} 
            label={
              <FormattedMessage 
                id='radiofield.label-no' 
                defaultMessage='No' />
            }
          />
      </RadioGroup>
    </div>
  );
}

export default Radiofield;