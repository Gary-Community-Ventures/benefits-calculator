import { Checkbox, FormControlLabel, FormGroup, Button } from '@mui/material';
import { housingSourcesAreValid } from "../../Assets/validationFunctions";
import { useState } from 'react';
import PreviousButton from "../PreviousButton/PreviousButton";
import housingOptions from '../../Assets/housingOptions';

const HousingBlock = ({ page, setPage, handleHousingSourcesSubmit, formData }) => {
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

  return (
    <>
      <FormGroup className='form-group'>
        {createFormControlLabels()}
      </FormGroup>
      <div className='expense-block-question-buttons'>
        <PreviousButton 
          page={page} 
          setPage={setPage} />
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