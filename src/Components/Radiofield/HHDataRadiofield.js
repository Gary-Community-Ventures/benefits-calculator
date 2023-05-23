import { FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormattedMessage, useIntl } from 'react-intl';
import './Radiofield.css';

const StyledFormControlLabel = styled(FormControlLabel)({
  marginLeft: -5,
});

const HHDataRadiofield = ({ componentDetails, householdData, setHouseholdData }) => {
  const { ariaLabel, inputName, value } = componentDetails;
  const intl = useIntl();
  const translatedAriaLabel = intl.formatMessage({ id: ariaLabel });

  const handleRadioButtonChange = (event) => {
    const { name, value } = event.target;
    let boolValue = value === 'true';
    setHouseholdData({ ...householdData, [name]: boolValue });
  };

  return (
    <div className='radiogroup-container'>
      <RadioGroup
        aria-labelledby={translatedAriaLabel}
        name={inputName}
        value={value}
        onChange={(event) => {
          handleRadioButtonChange(event);
        }}
      >
        <StyledFormControlLabel
          value='true'
          control={<Radio />}
          label={<FormattedMessage id='radiofield.label-yes' defaultMessage='Yes' />}
        />
        <StyledFormControlLabel
          value='false'
          control={<Radio />}
          label={<FormattedMessage id='radiofield.label-no' defaultMessage='No' />}
        />
      </RadioGroup>
    </div>
  );
};

export default HHDataRadiofield;
