import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { emailHasError, displayEmailHelperText } from '../../Assets/validationFunctions';
import { postEmailRequest } from '../../apiCalls';

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const EmailResults = ({ formData, results, handleEmailTextfieldChange }) => {
  let navigate = useNavigate();

  const handleEmailSubmit = () => {
    postEmailRequest(results.screenerId, formData.email);
  } 

  return (
    <main className='benefits-form'>
       <h2 className='sub-header'>Email a copy of my results</h2>
       <StyledTextField 
        type='email'
        name='email'
        value={formData.email}
        label='Email' 
        onChange={() => {handleEmailTextfieldChange(event)}}
        variant='outlined'
        required
        error={emailHasError(formData.email)}
        helperText={displayEmailHelperText(formData.email)} 
      />
      <div className='question-buttons'>
        <Button
          variant='contained'
          onClick={() => {
            navigate('/results');
          }}>
          Prev
        </Button>
        <Button
          variant='contained'
          onClick={(event) => {
            handleEmailSubmit(event);
          }}>
          Submit
        </Button>
        
      </div>
    </main>
  );
}

export default EmailResults;