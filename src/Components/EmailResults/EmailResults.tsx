import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import CheckIcon from '@mui/icons-material/Check';
import { useState, forwardRef, useContext } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  emailHasError,
  displayEmailHelperText,
  phoneHasError,
  displayPhoneHasErrorHelperText,
} from '../../Assets/validationFunctions.tsx';
import { postMessage } from '../../apiCalls.js';
import Textfield from '../Textfield/Textfield.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import './EmailResults.css';
import type { MessageFunction, ValidationFunction } from '../../Types/ErrorController.ts';

type EmailResultsProps = {
  handleTextfieldChange: (event: Event) => void;
  screenId: string;
  close: () => void;
};

type SendType = 'emailScreen' | 'textScreen';

type TextFieldProps = {
  inputType: string;
  inputName: string;
  inputLabel: string;
  inputError: ValidationFunction<string>;
  inputHelperText: MessageFunction<string>;
};

const EmailResults = forwardRef(function EmailResults(
  { handleTextfieldChange, screenId, close }: EmailResultsProps,
  ref,
) {
  const { formData } = useContext(Context);
  const intl = useIntl();
  const [copied, setCopied] = useState(false);
  const [state, setState] = useState({
    open: false,
    error: false,
    errorMessage: '',
    snackbarMessage: '',
  });
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);

  const createEmailTextfield = (
    type: string,
    errorController: boolean,
    inputLabelId: string,
    hasError: ValidationFunction<string>,
    helperText: MessageFunction<string>,
  ) => {
    const emailProps: TextFieldProps = {
      inputType: 'text',
      inputName: type,
      inputLabel: intl.formatMessage({ id: inputLabelId, defaultMessage: 'Email my results' }),
      inputError: hasError,
      inputHelperText: helperText,
    };

    return createTextfield(emailProps, errorController);
  };

  const createTextfield = (componentProps: TextFieldProps, submitted: boolean) => {
    return (
      <Textfield
        componentDetails={componentProps}
        submitted={submitted}
        data={formData.signUpInfo}
        handleTextfieldChange={handleTextfieldChange}
        index="0"
      />
    );
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleSubmit = async (type: SendType) => {
    const { signUpInfo } = formData;
    const { email, phone } = signUpInfo;

    let sendType: { email?: string; phone?: string; type: string } = { type: 'none' };
    let validInput: boolean = false;
    let snackbarMessage: string = '';
    if (type === 'emailScreen') {
      sendType = { email, type };
      validInput = emailHasError(email) === false && email !== '';
      snackbarMessage = intl.formatMessage({
        id: 'emailResults.return-signupCompleted-email',
        defaultMessage:
          'A copy of your results have been sent. If you do not see the email in your inbox, please check your spam folder.',
      });
    } else if (type === 'textScreen') {
      sendType = { phone, type };
      validInput = phoneHasError(phone) === false && phone !== '';
      snackbarMessage = intl.formatMessage({
        id: 'emailResults.return-signupCompleted',
        defaultMessage: 'A copy of your results have been sent.',
      });
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
        if (error instanceof Error) {
          setState({
            ...state,
            error: true,
            errorMessage: error.message,
          });
        }
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

  const displayErrorMessage = (errorMessage: string) => {
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
      <div className="bottom-margin">
        <button onClick={copyLink} className="copy-button-and-text">
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
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={state.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={state.snackbarMessage}
        action={action}
      />
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
      {displayCopyResults()}
      <div className="flex-direction-column">
        <article className="bottom-margin">
          <FormattedMessage id="emailResults.enter-emailLabel" defaultMessage="Email my results" />
        </article>
        {createEmailTextfield(
          'email',
          emailSubmitted,
          'signUp.createEmailTextfield-label',
          emailHasError,
          displayEmailHelperText,
        )}
        <button
          onClick={(event) => {
            setEmailSubmitted(true);
            handleSubmit('emailScreen');
          }}
          className="send-button"
        >
          <FormattedMessage id="emailResults.sendButton" defaultMessage="Send" />
        </button>
        {state.error && displayErrorMessage(state.errorMessage)}
      </div>

      <div className="flex-direction-column">
        <article className="bottom-margin">
          <FormattedMessage id="emailResults.enter-phoneNumberLabel" defaultMessage="Text my results" />
        </article>
        {createEmailTextfield(
          'phone',
          phoneSubmitted,
          'signUp.createPhoneTextfield-label',
          phoneHasError,
          displayPhoneHasErrorHelperText,
        )}
        <button
          onClick={(event) => {
            setPhoneSubmitted(true);
            handleSubmit('textScreen');
          }}
          className="send-button"
        >
          <FormattedMessage id="emailResults.sendButton" defaultMessage="Send" />
        </button>
        {state.error && displayErrorMessage(state.errorMessage)}
      </div>
    </div>
  );
});
export default EmailResults;
