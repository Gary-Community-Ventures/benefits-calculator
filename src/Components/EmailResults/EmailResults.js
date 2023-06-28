import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import CheckIcon from '@mui/icons-material/Check';
import { useState, forwardRef, useContext } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import { FormattedMessage } from 'react-intl';
import {
  emailHasError,
  displayEmailHelperText,
  phoneHasError,
  displayPhoneHasErrorHelperText,
  useErrorController,
} from '../../Assets/validationFunctions';
import { postMessage } from '../../apiCalls';
import Textfield from '../Textfield/Textfield';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './EmailResults.css';

const EmailResults = forwardRef(function EmailResults({ handleTextfieldChange, screenId, close }, ref) {
  const { formData } = useContext(Context);
  const [copied, setCopied] = useState(false);
  const [state, setState] = useState({
    open: false,
    error: false,
    errorMessage: '',
    snackbarMessage: '',
  });
  const emailErrorController = useErrorController(emailHasError, displayEmailHelperText);
  const phoneErrorController = useErrorController(phoneHasError, displayPhoneHasErrorHelperText);
  // const { id: screenId } = useParams();

  const createEmailTextfield = (type, errorController, inputLabelId) => {
    const emailProps = {
      inputType: 'text',
      inputName: type,
      inputLabel: <FormattedMessage id={inputLabelId} defaultMessage="Email" />,
    };

    return createTextfield(emailProps, errorController);
  };

  const createTextfield = (componentProps, errorController) => {
    return (
      <Textfield
        componentDetails={componentProps}
        errorController={errorController}
        data={formData.signUpInfo}
        handleTextfieldChange={handleTextfieldChange}
        index="0"
      />
    );
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleSubmit = async (event, type) => {
    const { signUpInfo } = formData;
    const { email, phone } = signUpInfo;

    let sendType;
    let validInput;
    let snackbarMessage;
    if (type === 'emailScreen') {
      sendType = { email, type };
      validInput = emailHasError(email) === false && email !== '';
      snackbarMessage = (
        <FormattedMessage
          id="emailResults.return-signupCompleted-email"
          defaultMessage="A copy of your results have been sent. If you do not see the email in your inbox, please check your spam folder."
        />
      );
    } else if (type === 'textScreen') {
      sendType = { phone, type };
      validInput = phoneHasError(phone) === false && phone !== '';
      snackbarMessage = (
        <FormattedMessage
          id="emailResults.return-signupCompleted"
          defaultMessage="A copy of your results have been sent."
        />
      );
    }

    if (validInput) {
      setState({
        ...state,
        error: false,
        errorMessage: '',
      });

      try {
        const message = {
          ...sendType,
          screen: screenId,
        };
        await postMessage(message);
        //^^ if the user's email already exists in our system this function will throw an error =>
        //we won't be able to get the uid from results because of the error exception

        setState({
          ...state,
          open: true,
          error: false,
          snackbarMessage: snackbarMessage,
        });
      } catch (error) {
        setState({
          ...state,
          error: true,
          errorMessage: error.message,
        });
      }
    }
  };

  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const displayErrorMessage = (errorMessage) => {
    return <ErrorMessage error={errorMessage} />;
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const displayCopyResults = () => {
    return (
      <div className="copy-results-container">
        <button onClick={copyLink} className="button-and-text">
          {copied ? (
            <CheckIcon sx={{ fontSize: '1.75rem', mr: '.5rem' }} />
          ) : (
            <LinkIcon sx={{ fontSize: '1.75rem', mr: '.5rem' }} />
          )}
          <article className="copy-results-text">
            <FormattedMessage id="emailResults.copy-results-text" defaultMessage="Copy my results link" />
          </article>
        </button>
      </div>
    );
  };

  return (
    <div className="email-results-container">
      <div className="question-buttons">
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={state.open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={state.snackbarMessage}
          action={action}
          severity="success"
          sx={{ mb: -2, flexWrap: 'nowrap' }}
        />
      </div>
      <IconButton
        aria-label="close"
        onClick={close}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <h2 className="sub-header">
        <FormattedMessage id="emailResults.displaySubheader-text" defaultMessage="Save my results" />
      </h2>
      {displayCopyResults()}
      <article className="question-container question-label">
        <FormattedMessage id="emailResults.enter-emailLabel" defaultMessage="Email my results link" />
      </article>
      {createEmailTextfield('email', emailErrorController, 'signUp.createEmailTextfield-label')}
      <Button
        sx={{ m: '.5rem' }}
        variant="contained"
        onClick={(event) => {
          emailErrorController.setIsSubmitted(true);
          handleSubmit(event, 'emailScreen');
        }}
        id="send-button"
      >
        <FormattedMessage id="emailResults.sendButton" defaultMessage="Send" />
      </Button>
      {state.error && displayErrorMessage(state.errorMessage)}
      <article className="question-container question-label">
        <FormattedMessage id="emailResults.enter-phoneNumberLabel" defaultMessage="Text my results link" />
      </article>
      {createEmailTextfield('phone', phoneErrorController, 'signUp.createPhoneTextfield-label')}
      <Button
        sx={{ m: '.5rem' }}
        variant="contained"
        onClick={(event) => {
          phoneErrorController.setIsSubmitted(true);
          handleSubmit(event, 'textScreen');
        }}
        id="send-button"
      >
        <FormattedMessage id="emailResults.sendButton" defaultMessage="Send" />
      </Button>
      {state.error && displayErrorMessage(state.errorMessage)}
    </div>
  );
});
export default EmailResults;
