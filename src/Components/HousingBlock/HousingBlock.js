import { Checkbox, FormControlLabel, FormGroup, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { housingSourcesAreValid } from "../../Assets/validationFunctions";
import { useState } from 'react';
import PreviousButton from "../PreviousButton/PreviousButton";
import housingOptions from '../../Assets/housingOptions';

const StyledTypography = styled(Typography)`
  color: #c6252b;
  height: 1rem;
`;

const HousingBlock = ({ handleHousingSourcesSubmit, formData }) => {
  const [selectedMenuItems, setSelectedMenuItems] = useState(Object.keys(formData.housing).length > 0 ? formData.housing : {
    renting: false,
    owner: false, 
    stayingWithFriend: false,
    hotel: false,
    shelter: false,
    preferNotToSay: false
  });
  
  const createFormControlLabels = () => {
    const mappedSelectedMenuItems = Object.keys(housingOptions).map((housingOptionKey, index) => {
      return (
        <FormControlLabel 
          key={housingOptionKey}
          control={<Checkbox checked={selectedMenuItems[housingOptionKey]} onChange={handleCheckboxChange} />}  
          label={housingOptions[housingOptionKey]}
          value={housingOptionKey} 
        />
      );
    });
    
    return mappedSelectedMenuItems;
  }

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setSelectedMenuItems({ ...selectedMenuItems, [value]: !selectedMenuItems[value] });
  }

  const handleCheckboxSaveAndContinue = (event) => {
    event.preventDefault();
    if (housingSourcesAreValid(selectedMenuItems)) {
      handleHousingSourcesSubmit(selectedMenuItems);
    }
  }

  const housingBlockIsMissingCheckbox = () => {
    return Object.keys(selectedMenuItems).every(key => selectedMenuItems[key] === false);
  }

  return (
    <>
      <FormGroup className='form-group'>
        {createFormControlLabels()}
      </FormGroup>
      { housingBlockIsMissingCheckbox() && 
        <StyledTypography gutterBottom>*Please select a housing option</StyledTypography> || <StyledTypography></StyledTypography>}
      <div className='expense-block-question-buttons'>
        <PreviousButton />
        <Button
          variant='contained'
          onClick={(event) => { handleCheckboxSaveAndContinue(event) }}
        >
          Save and Continue
        </Button>
      </div>
    </>
  );
}

export default HousingBlock;