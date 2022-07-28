import {FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { styled } from '@mui/material/styles';
import './Radiofield.css';

const StyledFormControlLabel = styled(FormControlLabel)({
  marginLeft: -5
});

const HHDataRadiofield = ({ componentDetails, state, setState, index }) => {
  const { ariaLabel, inputName, value } = componentDetails;

  const handleRadioButtonChange = (event, index) => {
    const { name, value } = event.target;
    let boolValue = (value === 'true');

    const updatedHouseholdData = state.householdData.map((personData, i) => {
      if (i === index) {
        return {
          ...personData,
          [name]: boolValue
        };
      } else {
        return personData;
      }
    });

    setState({...state, householdData: updatedHouseholdData});
  }

  return (
    <div className='radiogroup-container'>
      <RadioGroup
        aria-labelledby={ariaLabel}
        name={inputName}
        value={value}
        onChange={(event) => { handleRadioButtonChange(event, index) } }>
          <StyledFormControlLabel value='true' control={<Radio />} label='Yes' />
          <StyledFormControlLabel value='false' control={<Radio />} label='No' />
      </RadioGroup>
    </div>
  );
}

export default HHDataRadiofield;