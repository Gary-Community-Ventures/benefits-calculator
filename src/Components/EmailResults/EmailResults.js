import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { emailHasError, displayEmailHelperText } from '../../Assets/validationFunctions';
import { postUser, updateScreen } from '../../apiCalls';
import Grid from '@mui/material/Grid';

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const EmailResults = ({ formData, results, handleEmailTextfieldChange }) => {
  let navigate = useNavigate();

  const handleEmailSubmit = async () => {
    const user = {
      email_or_cell: formData.email,
      email: formData.email,
      tcpa_consent: false
    }
    const userResponse = await postUser(user);

    const screenUpdates = {
      user: userResponse.id,
      last_email_request_date: new Date().toJSON()
    }
    const screenResponse = updateScreen(results.screenerId, screenUpdates);
    navigate('/results');
  } 

  return (
    <main className='benefits-form'>
      <Grid container spacing={2}>
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
