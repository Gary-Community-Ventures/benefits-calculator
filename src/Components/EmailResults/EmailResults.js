import { TextField, Button, Typography, FormGroup, FormControlLabel, Checkbox, FormLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState, Fragment, useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { FormattedMessage } from 'react-intl';
import { nameHasError, displayFirstNameHelperText, displayLastNameHelperText,
  emailHasError, displayEmailHelperText, phoneHasError, displayPhoneHasErrorHelperText,
  signUpFormHasError, displaySignUpFormHelperText } 
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
    commConsent: false,
    error: null
  });

  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  const locale = useContext(Context).locale.toLowerCase();
  let privacyLink = "https://20208592.hs-sites.com/en/data-privacy-policy?__hstc=144746475.066f707c0b490f88f5429b1856cf0908.1663037963489.1663086538117.1663095192641.3&__hssc=144746475.1.1663095192641&__hsfp=2418539872";
  if (locale == "es") {
    privacyLink = "https://20208592.hs-sites.com/es/data-privacy-policy";
  }

  const handleTextfieldChange = (event) => {
    const { name, value } = event.target;
    const numberUpToTenDigitsLongRegex = /^\d{0,10}$/;

    if (name === 'phone' && numberUpToTenDigitsLongRegex.test(value)) {
      setSignUpInfo({ ...signUpInfo, [name]: value });
    } else if (name !== 'phone') {
      setSignUpInfo({ ...signUpInfo, [name]: value });
    }
  }

  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    setSignUpInfo({ ...signUpInfo, [name]: !signUpInfo[name] });
  }

  const handleSubmit = async () => {
    if (signUpFormHasError(signUpInfo) === false) {
      const { email, phone, firstName, lastName, 
        sendResults, sendUpdates, sendOffers, commConsent } = signUpInfo; 
        
      let phoneNumber = '';
      if (phone) {
        phoneNumber = phone.replace(/\D/g,'');
      
        if (phoneNumber.length == 10) {
          phoneNumber = '+1' + phoneNumber;
        }
      }

      const user = {
        email_or_cell: email ? email : phoneNumber,
        cell: phoneNumber ? phoneNumber : '',
        email: email ? email : '',
        first_name: firstName,
        last_name: lastName,
        tcpa_consent: commConsent,
        language_code: locale,
        send_offers: sendOffers,
        send_updates: sendUpdates
      }
      try {
        const userResponse = await postUser(user);
        const screenUpdates = {
          user: userResponse.id,
        }
        await updateScreen(results.screenerId, screenUpdates);
    
        setOpen(true);

        if (sendResults) {
          const message = {
            email: email,
            type: 'emailScreen',
            screen: results.screenerId,
            uid: userResponse.id
          }
          await postMessage(message);

          const emailRequestUpdate = {
            last_email_request_date: new Date().toJSON()
          }
          await updateScreen(results.screenerId, emailRequestUpdate);
        }

      } catch (error) {
        setSignUpInfo({ ...signUpInfo, error: error.message });
      }
    }
  } 

  const handleClose = () => {
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
      <Grid xs={12} item>
        <h2 className='sub-header'>
          <FormattedMessage 
            id='emailResults.return-signupHeader' 
            defaultMessage='Signup for benefits, updates, and offers' />
        </h2>
      </Grid>
    );
  }

  const renderErrorMessage = (error) => {
    return (
      <ErrorMessage error={error} />
    );
  }

  const displayErrorMessage = () => { 
    return (
      (signUpFormHasError(signUpInfo) && renderErrorMessage(displaySignUpFormHelperText(signUpInfo))) || 
      (signUpInfo.error && renderErrorMessage(signUpInfo.error))
    );
  }

  return (
    <main className='benefits-form'>
      <Grid container item spacing={2}>
        { displaySubheader() }
        <Grid xs={12} item>
          <StyledTextField
            sx={{mr: 1}} 
            type='text'
            label={
              <FormattedMessage 
                id='emailResults.return-firstNameTextfieldLabel' 
                defaultMessage='First Name' />
            }
            name='firstName'
            value={signUpInfo.firstName}
            onChange={(event) => {handleTextfieldChange(event)}}
            error={nameHasError(signUpInfo.firstName)}
            helperText={displayFirstNameHelperText(signUpInfo.firstName)}
            variant='outlined'
            required
          />
          <StyledTextField 
            type='text'
            label={
              <FormattedMessage 
                id='emailResults.return-lastNameTextfieldLabel' 
                defaultMessage='Last Name' />
            }
            name='lastName'
            value={signUpInfo.lastName}
            onChange={(event) => {handleTextfieldChange(event)}}
            error={nameHasError(signUpInfo.lastName)}
            helperText={displayLastNameHelperText(signUpInfo.lastName)}
            variant='outlined'
            required
          />
        </Grid>
        <Grid xs={12} item>
          <StyledTextField 
            type='email'
            label={
              <FormattedMessage 
                id='emailResults.return-emailTextfieldLabel' 
                defaultMessage='Email' />
            }
            name='email'
            value={signUpInfo.email}
            onChange={(event) => {handleTextfieldChange(event)}}
            error={emailHasError(signUpInfo.email)}
            helperText={displayEmailHelperText(signUpInfo.email)} 
            variant='outlined'
          />
        </Grid>
        <Grid xs={12} item>
          <StyledTextField 
            type='tel'
            label={
              <FormattedMessage 
                id='emailResults.return-phoneTextfieldLabel' 
                defaultMessage='Cell Phone' />
            }
            name='phone'
            value={signUpInfo.phone}
            onChange={(event) => {handleTextfieldChange(event)}}
            error={phoneHasError(signUpInfo.phone)}
            helperText={displayPhoneHasErrorHelperText(signUpInfo.phone)} 
            variant='outlined'          />          
        </Grid>
        <Grid xs={12} item>
          <FormLabel>
            <FormattedMessage
              id='emailResults.return-contactAbout'
              defaultMessage='What would you like us to contact you about?' />
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              sx={{mt: 1}}
              control={
                <Checkbox 
                  checked={signUpInfo.sendResults}
                  onChange={handleCheckboxChange}
                  name="sendResults" />
              }
              label={
                <FormattedMessage 
                  id='emailResults.return-sendcopy' 
                  defaultMessage='Please send me a copy of my results.' />}
            />
            <FormControlLabel
              sx={{mt: 1}}
              control={
                <Checkbox 
                  checked={signUpInfo.sendUpdates}
                  onChange={handleCheckboxChange}
                  name="sendUpdates" />
              }
              label={
                <FormattedMessage 
                  id='emailResults.return-sendupdates' 
                  defaultMessage='Please notify me when new benefits become available to me that I am likely eligible for based on the information I have provided.' />}
            />
            <FormControlLabel
              sx={{mt: 1}}
              control={
                <Checkbox 
                  checked={signUpInfo.sendOffers}
                  onChange={handleCheckboxChange}
                  name="sendOffers" />
              }
              label={
                <FormattedMessage 
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
              <Checkbox 
                checked={signUpInfo.commConsent} 
                onChange={handleCheckboxChange}
                name="commConsent" 
                required />
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
        { signUpFormHasError(signUpInfo) && displayErrorMessage(displaySignUpFormHelperText(signUpInfo)) }
        <Grid xs={12} item>
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
                handleSubmit(event);
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
