import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import './QuestionOne.css';

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const QuestionOne = ({ formData, handleChange, page, setPage }) => {
  const validateAge = () => {
    return formData.applicantAge > 0 && formData.applicantAge < 130;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateAge()) {
      setPage(page + 1);
    }
  }
  
  return (
    <>
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
      <Button
        onClick={(event) => {handleSubmit(event)}}
        variant='contained'>
        Continue
      </Button>
    </>
  );
}

export default QuestionOne;