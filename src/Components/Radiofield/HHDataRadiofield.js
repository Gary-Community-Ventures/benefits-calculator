import {FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormattedMessage, useIntl } from 'react-intl';
import './Radiofield.css';

const StyledFormControlLabel = styled(FormControlLabel)({
  marginLeft: -5
});

const HHDataRadiofield = ({ componentDetails, state, setState, index }) => {
  const { ariaLabel, inputName, value } = componentDetails;
  const intl = useIntl();
  const translatedAriaLabel = intl.formatMessage({ id: ariaLabel });

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
        aria-labelledby={translatedAriaLabel}
        name={inputName}
        value={value}
        onChange={(event) => { handleRadioButtonChange(event, index) } }>
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

export default HHDataRadiofield;