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
  
  const createTextfield = (componentProps) => {
    return (
      <Textfield 
        componentDetails={componentProps}
        formData={formData.signUpInfo}
        handleTextfieldChange={handleTextfieldChange}
        index='0' />
    );
  }
  
  return (
    <>
      <Grid xs={12} item marginTop={'1.5rem'}>
        { createFirstNameTextfield() }
        { createLastNameTextfield() }
      </Grid>
    </>
  );
}

export default SignUp;