import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState, SyntheticEvent, Fragment, useRef } from 'react';
import { emailHasError, displayEmailHelperText } from '../../Assets/validationFunctions';
import { postMessage } from '../../apiCalls';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const EmailResults = ({ formData, results, handleEmailTextfieldChange }) => {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const emailInput = useRef(null);

  const handleEmailSubmit = async () => {
    const message = {
      email: formData.email,
      type: 'emailScreen',
      screen: results.screenerId
    }

    const messageResponse = postMessage(message)
    emailInput.current.value = "";
    setOpen(true);
  } 

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );


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
            label='Email'
            inputRef={emailInput}
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
              Send
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Email sent! You can send to another email or click back to return to your results."
              action={action}
              severity="success"
              sx={{mb: 4, mr: 2}}
            />            
            
          </div>
        </Grid>
      </Grid>
    </main>
  );
}

export default EmailResults;
