import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { emailHasError, displayEmailHelperText } from '../../Assets/validationFunctions';
import { postMessage } from '../../apiCalls';
import Grid from '@mui/material/Grid';

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const EmailResults = ({ formData, results, handleEmailTextfieldChange }) => {
  let navigate = useNavigate();

  const handleEmailSubmit = async () => {
    const message = {
      email: formData.email,
      type: 'emailScreen',
      screen: results.screenerId
    }

    const messageResponse = postMessage(message)
    navigate('/results');
  } 

  return (
    <main className='benefits-form'>
      <Grid container spacing={2} sx={{mt: 2, mr: 2, ml: 2}}>
        <Grid xs={12}>
          <h2 className='sub-header'>Email a copy of my results</h2>
        </Grid>
        <Grid xs={12}>
          <StyledTextField 
            type='email'
            name='email'
            value={formData.email}
            label='Email' 
            onChange={(event) => {handleEmailTextfieldChange(event)}}
            variant='outlined'
            required
            error={emailHasError(formData.email)}
            helperText={displayEmailHelperText(formData.email)} 
          />
        </Grid>
        <Grid xs={12}>
          <div className='question-buttons'>
            <Button
              sx={{mr: 2}}
              variant='contained'
              onClick={() => {
                navigate('/results');
              }}>
              Back
            </Button>
            <Button
              variant='contained'
              onClick={(event) => {
                handleEmailSubmit(event);
              }}>
              Submit
            </Button>
            
          </div>
        </Grid>
      </Grid>
    </main>
  );
}

export default EmailResults;
