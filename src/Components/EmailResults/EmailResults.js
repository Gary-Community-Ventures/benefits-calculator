import { TextField, Button, Typography, FormGroup, FormControlLabel, Checkbox, FormLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState, Fragment, useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { FormattedMessage } from 'react-intl';
import { emailHasError, displayEmailHelperText, emailResultsHasError, 
  displayEmailResultsHasErrorHelperText, firstOrLastNameHaveError, displayFirstOrLastNameErrorHelperText } 
  from '../../Assets/validationFunctions';
import { postMessage, postUser, updateScreen } from '../../apiCalls';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const EmailResults = ({ results }) => {
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    sendResults: false,
    sendUpdates: false,
    sendOffers: false,
    commConsent: false
  });
  const [hasError, setHasError] = useState(false);
  const [open, setOpen] = useState(false);
  const emailInput = useRef(null);
  const phoneInput = useRef(null);
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const sendResults = useRef(false);
  const sendUpdates = useRef(false);
  const sendOffers = useRef(false);
  const commConsent = useRef(false);
  const locale = useContext(Context).locale;
  let privacyLink = "https://20208592.hs-sites.com/en/data-privacy-policy?__hstc=144746475.066f707c0b490f88f5429b1856cf0908.1663037963489.1663086538117.1663095192641.3&__hssc=144746475.1.1663095192641&__hsfp=2418539872";
  if (locale == "es") {
    privacyLink = "https://20208592.hs-sites.com/es/data-privacy-policy";
  }

  const handleEmailSubmit = async () => {
    let phoneNumber = '';
    if (phoneInput.current.value) {
      phoneNumber = phoneInput.current.value.replace(/\D/g,'');
      if(phoneNumber.length == 10) {
        phoneNumber = '+1'+phoneNumber;
      }
    }

    const user = {
      email_or_cell: emailInput.current.value ? emailInput.current.value : phoneNumber,
      cell: phoneNumber ? phoneNumber : '',
      email: emailInput.current.value ? emailInput.current.value : '',
      first_name: firstNameInput.current.value,
      last_name: lastNameInput.current.value,
      tcpa_consent: commConsent.current.checked,
      send_offers: sendOffers.current.checked,
      send_updates: sendUpdates.current.checked
    }
    const userResponse = await postUser(user);

    const screenUpdates = {
      user: userResponse.id,
    }
    const screenResponse = await updateScreen(results.screenerId, screenUpdates);

    setOpen(true);
    if (sendResults.current.checked) {
      const message = {
        email: formData.email,
        type: 'emailScreen',
        screen: results.screenerId,
        uid: userResponse.id
      }
      const messageResponse = await postMessage(message)
      const emailRequestUpdate = {
        last_email_request_date: new Date().toJSON()
      }
      const screenEmailResponse = await updateScreen(results.screenerId, emailRequestUpdate);
    }

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

  const displaySubheader = () => {
    return (
      <Grid xs={12}>
        <h2 className='sub-header'>
          <FormattedMessage 
            id='emailResults.return-signupHeader' 
            defaultMessage='Signup for benefits, updates, and offers' />
        </h2>
      </Grid>
    );
  }
  return (
    <main className='benefits-form'>
      <Grid container spacing={2} sx={{mt: 2, mr: 2, ml: 2}}>
        { displaySubheader() }
        <Grid xs={12}>
          <StyledTextField
              sx={{mr: 1}} 
              type='text'
              name='first_name'
              label={
                <FormattedMessage 
                  id='emailResults.return-firstNameTextfieldLabel' 
                  defaultMessage='First Name' />
              }
              inputRef={firstNameInput}
              onChange={(event) => {handleEmailTextfieldChange(event)}}
              variant='outlined'
              required
            />
          <StyledTextField 
              type='text'
              name='last_name'
              label={
                <FormattedMessage 
                  id='emailResults.return-lastNameTextfieldLabel' 
                  defaultMessage='Last Name' />
              }
              inputRef={lastNameInput}
              variant='outlined'
              required
            />
        </Grid>
        <Grid xs={12}>
          <StyledTextField 
            type='email'
            name='email'
            label={
              <FormattedMessage 
                id='emailResults.return-emailTextfieldLabel' 
                defaultMessage='Email' />
            }
            inputRef={emailInput}
            onChange={(event) => {handleEmailTextfieldChange(event)}}
            variant='outlined'
            required
            error={emailHasError(formData.email)}
            helperText={displayEmailHelperText(formData.email)} 
          />
        </Grid>
        <Grid xs={12}>
          <StyledTextField 
              type='tel'
              name='phone'
              label={
                <FormattedMessage 
                  id='emailResults.return-phoneTextfieldLabel' 
                  defaultMessage='Cell Phone' />
              }
              inputRef={phoneInput}
              variant='outlined'
            />          
        </Grid>
        <Grid xs={12}>
          <FormLabel>
            <FormattedMessage
              id='emailResults.return-contactAbout'
              defaultMessage='What would you like us to contact you about?' />
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              sx={{mt: 1}}
              control={
                <Checkbox inputRef={sendResults} name="sendResults" />
              }
              label={<FormattedMessage 
                id='emailResults.return-sendcopy' 
                defaultMessage='Please send me a copy of my results.' />}
            />
            <FormControlLabel
              sx={{mt: 1}}
              control={
                <Checkbox inputRef={sendUpdates} name="sendUpdates" />
              }
              label={<FormattedMessage 
                id='emailResults.return-sendupdates' 
                defaultMessage='Please notify me when new benefits become available to me that I am likely eligible for based on the information I have provided.' />}
            />
            <FormControlLabel
              sx={{mt: 1}}
              control={
                <Checkbox inputRef={sendOffers} name="sendOffers" />
              }
              label={<FormattedMessage 
                id='emailResults.return-sendoffers' 
                defaultMessage='Please notify me when there are paid opportunities to provide feedback on this screener.' />}
            />
          </FormGroup>

          <Typography variant='body1' sx={{mb: 1, mt: 4}} style={{ fontWeight: 600 }}>
              <FormattedMessage
                id='emailResults.return-consentText'
                defaultMessage="By filling out this form, you agree to future contact from Gary or our affiliates regarding your use of the benefits calculator or to offer additional programs that may be of interest to you and your family. Standard message and data costs may apply to these communications. You may opt out of receiving these communications at any time through the opt-out link in the communication." />
            </Typography>

          <FormControlLabel
            sx={{mb: 1}}
            control={
              <Checkbox inputRef={commConsent} name="commConsent" required />
            }
            label={
              <div>
                <FormattedMessage 
                  id='emailResults.return-consentCheck1' 
                  defaultMessage="I have read, understand, and agree to the terms of My Friend Ben's " />
                <FormattedMessage
                  id='emailResults.return-consentCheck'
                  defaultMessage="{linkVal}"
                  values={{ 
                    linkVal: <a 
                    href={privacyLink}
                    target="_blank"
                    rel='noopener noreferrer'>
                      <FormattedMessage
                        id='emailResults.return-consentCheckLink'
                        defaultMessage='data privacy policy' />
                      </a>
                  }} />
                <FormattedMessage 
                  id='emailResults.return-consentCheck4' 
                  defaultMessage=" and consent to contact." />
              </div>
            }
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
              <FormattedMessage 
                id='emailResults.return-backButton' 
                defaultMessage='Back' />
            </Button>
            <Button
              variant='contained'
              onClick={(event) => {
                handleEmailSubmit(event);
              }}>
              <FormattedMessage 
                id='emailResults.return-signupButton' 
                defaultMessage='Signup' />
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message={
                <FormattedMessage 
                  id='emailResults.return-signupCompleted' 
                  defaultMessage='Your preferences have been updated. Click the back button to return to your results.' />
              }
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
