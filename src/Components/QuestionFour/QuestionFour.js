import { Checkbox, FormControlLabel, FormGroup, Button } from '@mui/material';
import './QuestionFour.css';

const QuestionFour = ({formData, handleCheckboxChange, page, setPage }) => {
  const validateIsNotReceivingAnyMedicaidBenefits = () => {
    if (formData.isNotReceivingAnyMedicaidBenefits) {
      return formData.isOnMedicaid === false && formData.isOnDisabilityRelatedMedicaid === false;
    } else if (formData.isNotReceivingAnyMedicaidBenefits === false) {
      return formData.isOnMedicaid === true || formData.isOnDisabilityRelatedMedicaid === true;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateIsNotReceivingAnyMedicaidBenefits()) {
      setPage(page + 1);
    }
  }
  return (
    <>
      <p className='question-label'>Do you receive any of these benefits?</p>
      <FormGroup className='form-group'>
        <FormControlLabel 
          control={<Checkbox checked={formData.isOnMedicaid} onChange={handleCheckboxChange} />} 
          label='Medicaid'
          value='isOnMedicaid' />
        <FormControlLabel 
          control={<Checkbox checked={formData.isOnDisabilityRelatedMedicaid} onChange={handleCheckboxChange} />} 
          label='Disability-related Medicaid'
          value='isOnDisabilityRelatedMedicaid' />
        <FormControlLabel 
          control={<Checkbox checked={formData.isNotReceivingAnyMedicaidBenefits} onChange={handleCheckboxChange} />} 
          label='None of these apply'
          value='isNotReceivingAnyMedicaidBenefits' />
      </FormGroup>
      <Button
        onClick={() => {setPage(page - 1)}}
        variant='contained'>
        Prev
      </Button>
      <Button
        onClick={(event) => {handleSubmit(event)}}
        variant='contained'>
        Continue
      </Button>
    </>
   );
}

export default QuestionFour;