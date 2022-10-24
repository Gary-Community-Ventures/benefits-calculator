import { Button } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { emailHasError, displayEmailHelperText } from "../../Assets/validationFunctions";
import { postMessage, updateScreen } from '../../apiCalls';
import Textfield from "../Textfield/Textfield";
import PreviousButton from "../PreviousButton/PreviousButton";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const EmailResults2 = ({ formData, handleTextfieldChange, results }) => {
  const [state, setState] = useState({
    open: false,
    error: false,
    errorMessage: ''
  });

  const createEmailTextfield = () => {
    const emailProps = {
      inputType: 'text',
      inputName: 'email',
      inputLabel: 
        <FormattedMessage 
          id='signUp.createEmailTextfield-label' 
          defaultMessage='Email' />,
      inputError: emailHasError,
      inputHelperText: displayEmailHelperText
    };

    return createTextfield(emailProps);  
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

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleSubmit = async () => {
    const { signUpInfo } = formData;
    const { email } = signUpInfo;
    
    if (emailHasError(email) === false) {
      setState({ 
        ...state, 
        error: false, 
        errorMessage: '' 
      });

      try {
        const message = {
          email: email,
          type: 'emailScreen',
          screen: results.screenerId,
          uid: results.user
        }
        await postMessage(message);
        //^^ if the user's email already exists in our system this function will throw an error =>
        //we won't be able to get the uid from results because of the error exception
        
        const emailRequestUpdate = {
          last_email_request_date: new Date().toJSON()
        }
        await updateScreen(results.screenerId, emailRequestUpdate);
        
        setState({ 
          ...state, 
          open: true 
        });

      } catch (error) {
        setState({
          ...state, 
          error: true, 
          errorMessage: error.message 
        });
      }
    }
  }

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const displayErrorMessage = (errorMessage) => {
    return (
      <ErrorMessage error={errorMessage} />
    );
  }

  return (
    <main className='benefits-form'>
      <h2 className='sub-header'>
        <FormattedMessage 
          id='emailResults.displaySubheader-text' 
          defaultMessage='Send me a copy of my results' />
      </h2>
      <article className='question-container question-label'>
        <FormattedMessage 
          id='emailResults.enter-emailLabel'
          defaultMessage='Please enter or confirm your email address:' />
      </article>
      { createEmailTextfield() }
      <div className='question-buttons'>
        <PreviousButton formData={formData}/>
        <Button
          variant='contained'
          onClick={(event) => {
            handleSubmit(event);
          }}>
          <FormattedMessage 
            id='emailResults.return-sendButton' 
            defaultMessage='Send' />
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={
            <FormattedMessage 
              id='emailResults.return-signupCompleted' 
              defaultMessage='A copy of your results have been sent. Click the prev button to return to your results.' />
          }
          action={action}
          severity="success"
          sx={{mb: 4, mr: 2}}
        />            
      </div>
    </main>
  );
}
export default EmailResults2;