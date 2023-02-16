import { Button } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import {
	emailHasError,
	displayEmailHelperText,
	phoneHasError,
	displayPhoneHasErrorHelperText,
} from '../../Assets/validationFunctions';
import { postMessage } from '../../apiCalls';
import Textfield from "../Textfield/Textfield";
import PreviousButton from "../PreviousButton/PreviousButton";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useParams } from "react-router-dom";
import "./EmailResults.css";

const EmailResults2 = ({ formData, handleTextfieldChange }) => {
  const [state, setState] = useState({
    open: false,
    error: false,
    errorMessage: ''
  });
  const { id: screenId } = useParams();


  const createEmailTextfield = (type, errorType, errorMessage, inputLabelId) => {
    const emailProps = {
      inputType: 'text',
      inputName: type,
      inputLabel: 
        <FormattedMessage 
          id={ inputLabelId } 
          defaultMessage='Email' />,
      inputError: errorType,
      inputHelperText: errorMessage
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

  const handleSubmit = async (event, type) => {
    const { signUpInfo } = formData;
    const { email, phone } = signUpInfo;

    let sendType;
    let validInput;
    if (type === 'emailScreen') {
      sendType = { email, type };
      validInput = emailHasError(email) === false && email !== '';
    } else if (type === 'textScreen') {
      sendType = { phone, type };
      validInput = phoneHasError(phone) === false && phone !== '';
    }
    
    if (validInput) {
      setState({ 
        ...state, 
        error: false, 
        errorMessage: '' 
      });

      try {
        console.log(sendType);
        const message = {
          ...sendType,
          screen: screenId,
        }
        await postMessage(message);
        //^^ if the user's email already exists in our system this function will throw an error =>
        //we won't be able to get the uid from results because of the error exception
        
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
		<main className="benefits-form">
			<h2 className="sub-header">
				<FormattedMessage
					id="emailResults.displaySubheader-text"
					defaultMessage="Send me a copy of my results"
				/>
			</h2>
			<article className="question-container question-label">
				<FormattedMessage
					id="emailResults.enter-emailLabel"
					defaultMessage="Please enter or confirm your email address:"
				/>
			</article>
			{createEmailTextfield(
				'email',
				emailHasError,
				displayEmailHelperText,
				'signUp.createEmailTextfield-label'
			)}
			<Button
        sx={{m: '.5rem'}}
				variant="contained"
				onClick={(event) => {
          handleSubmit(event, 'emailScreen');
				}}
			>
				<FormattedMessage
					id="emailResults.return-sendButton"
					defaultMessage="Send"
          />
			</Button>
      {state.error && displayErrorMessage(state.errorMessage)}
			<article className="question-container question-label">
				<FormattedMessage
					id="emailResults.enert-phoneNumberLabel"
					defaultMessage="Please enter or confirm your phone number:"
				/>
			</article>
      {createEmailTextfield(
        'phone',
        phoneHasError,
        displayPhoneHasErrorHelperText,
        'signUp.createPhoneTextfield-label'
      )}
      <Button
        sx={{m: '.5rem'}}
        variant="contained"
        onClick={(event) => {
          handleSubmit(event, 'textScreen');
        }}
        >
        <FormattedMessage
          id="emailResults.return-sendButton"
          defaultMessage="Send"
          />
      </Button>
      {state.error && displayErrorMessage(state.errorMessage)}
			<div className="question-buttons">
				<PreviousButton formData={formData} />
				<Snackbar
					open={state.open}
					autoHideDuration={6000}
					onClose={handleClose}
					message={
						<FormattedMessage
							id="emailResults.return-signupCompleted"
							defaultMessage="A copy of your results have been sent. Click the prev button to return to your results."
						/>
					}
					action={action}
					severity="success"
					sx={{ mb: 4, mr: 2 }}
				/>
			</div>
		</main>
	);
}
export default EmailResults2;