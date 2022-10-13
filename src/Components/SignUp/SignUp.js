import { Typography, FormGroup, FormControlLabel, Checkbox, FormLabel } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import Grid from '@mui/material/Grid';
import Textfield from '../Textfield/Textfield';
import { nameHasError, displayFirstNameHelperText, displayLastNameHelperText,
  emailHasError, displayEmailHelperText, phoneHasError, displayPhoneHasErrorHelperText,
  signUpFormHasError, displaySignUpFormHelperText } 
  from '../../Assets/validationFunctions';


const SignUp = ({ formData, handleTextfieldChange }) => {

  const createFirstNameTextfield = () => {
    const firstNameProps = {
      inputType: 'text',
      inputName: 'firstName',
      inputLabel: 
        <FormattedMessage 
          id='emailResults.return-firstNameTextfieldLabel' 
          defaultMessage='First Name' />,
      inputError: nameHasError,
      inputHelperText: displayFirstNameHelperText
    };
  
    return createTextfield(firstNameProps);
  }

  const createLastNameTextfield = () => {
    const lastNameProps = {
      inputType: 'text',
      inputName: 'lastName',
      inputLabel: 
        <FormattedMessage 
          id='emailResults.return-lastNameTextfieldLabel' 
          defaultMessage='Last Name' />,
      inputError: nameHasError,
      inputHelperText: displayLastNameHelperText
    };
  
    return createTextfield(lastNameProps);
  }

  const createEmailTextfield = () => {
    const emailProps = {
      inputType: 'text',
      inputName: 'email',
      inputLabel: 
        <FormattedMessage 
          id='emailResults.return-emailTextfieldLabel' 
          defaultMessage='Email' />,
      inputError: emailHasError,
      inputHelperText: displayEmailHelperText
    };

    return createTextfield(emailProps);  
  }

  const createPhoneTextfield = () => {
    const phoneProps = {
      inputType: 'tel',
      inputName: 'phone',
      inputLabel: 
        <FormattedMessage 
          id='emailResults.return-phoneTextfieldLabel' 
          defaultMessage='Cell Phone' />,
      inputError: phoneHasError,
      inputHelperText: displayPhoneHasErrorHelperText
    };

    return createTextfield(phoneProps);  
  }
  
  const createTextfield = (componentProps) => {
    return (
      <Textfield 
        componentDetails={componentProps}
        formData={formData.signUpInfo}
        handleTextfieldChange={handleTextfieldChange}
        index='0' />
    );
  }

  const displayDisclosureSection = () => {
    return (
      <>
        <Typography variant='body1' sx={{ mt: '1rem' }} style={{ fontWeight: 600 }}>
          <FormattedMessage
            id='emailResults.return-consentText'
            defaultMessage="By filling out this form, you agree to future contact from Gary or our affiliates regarding your use of the benefits calculator or to offer additional programs that may be of interest to you and your family. Standard message and data costs may apply to these communications. You may opt out of receiving these communications at any time through the opt-out link in the communication." />
        </Typography>
        <FormControlLabel
          sx={{mb: 1}}
          control={
            <Checkbox 
              checked={formData.signUpInfo.commConsent} 
              onChange={handleCheckboxChange}
              name='commConsent' 
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
      </>
    );
  }
  
  return (
    <div className='bottom-border'>
      <Grid xs={12} item marginTop={'1.5rem'}>
        { createFirstNameTextfield() }
        { createLastNameTextfield() }
      </Grid>
      <Grid xs={12} item>
        { createEmailTextfield() }
      </Grid>
      <Grid xs={12} item>
        { createPhoneTextfield() }
      </Grid>
      <Grid xs={12} item marginBottom={'1rem'}>
        { displayDisclosureSection() }
      </Grid>
    </div>
  );
}

export default SignUp;