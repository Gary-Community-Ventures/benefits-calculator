import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import './StepOne.css';

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const StepOne = ({ formData, handleChange, page, setPage }) => {
  const validateAgeZipcode = () => {
    return formData.applicantAge > 0 && formData.applicantAge < 130 
      && formData.zipcode.length === 5;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateAgeZipcode()) {
      setPage(page + 1);
    }
  }
  
  return (
    <div className='step-one-container'>
      <p className='step-progress-title'>Step {page + 1} of 7</p>
      <h2 className='sub-header'>Tell us a little more about yourself.</h2>
      <p className='question-label'>How old are you?</p>
      <StyledTextField
        type='number'
        name='applicantAge'
        value={formData.applicantAge}
        label='Age'
        onChange={(event) => {handleChange(event)}}
        variant='outlined'
        required 
        error={formData.applicantAge <= 0 || formData.applicantAge > 130} 
        helperText={(formData.applicantAge <= 0 || formData.applicantAge > 130) ? 'This entry is required to continue.' : '' } />
      <p className='question-label'>What is your zip code?</p>
      <StyledTextField
        type='text'
        name='zipcode'
        value={formData.zipcode}
        label='Zip Code'
        onChange={(event) => {handleChange(event)}}
        variant='outlined'
        required 
        error={formData.zipcode === '' || formData.zipcode.length < 5 } 
        helperText={(formData.zipcode === '' || formData.zipcode.length < 5) ? 'This entry is required to continue.' : '' } />
      <Button
        onClick={(event) => {handleSubmit(event)}}
        variant='contained'>
        Continue
      </Button>
    </div>
  );
}

export default StepOne;