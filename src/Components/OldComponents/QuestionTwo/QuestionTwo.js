import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import './QuestionTwo.css';

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const QuestionTwo = ({formData, handleChange, page, setPage }) => {
  const validateZipCode = () => {
    return formData.zipcode.length === 5;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateZipCode()) {
      setPage(page + 1);
    }
  }

  return (
    <>
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
      <div className='question-buttons'>
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
      </div>
    </>
  );
}

export default QuestionTwo;