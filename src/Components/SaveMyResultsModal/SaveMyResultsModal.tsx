import { Snackbar, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';
import IconButton from '@mui/material/IconButton';
import { forwardRef, useContext, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import ErrorMessageWrapper from '../ErrorMessage/ErrorMessageWrapper';
import { Context } from '../Wrapper/Wrapper';
import { useParams } from 'react-router-dom';
import { postMessage } from '../../apiCalls';
import './SaveMyResultsModal.css';

type SaveMyResultsModalProps = {
  close: () => void;
};

const SaveMyResultsModal = forwardRef(function SaveMyResultsModal({ close }: SaveMyResultsModalProps, ref) {
  const { formData } = useContext(Context);
  const { uuid } = useParams();
  const intl = useIntl();
  const { formatMessage } = useIntl();
  const [copied, setCopied] = useState(false);
  const closeAriaLabelProps = {
    id: 'emailResults.close-AL',
    defaultMessage: 'close',
  };
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });

  const formSchema = z.object({
    email: z
      .string({
        errorMap: () => {
          return {
            message: formatMessage({
              id: 'validation-helperText.email',
              defaultMessage: 'Please enter a valid email address',
            }),
          };
        },
      })
      .email()
      .trim(),
    // .or(z.literal('')),
    // phone: z
    //   .string({
    //     errorMap: () => {
    //       return {
    //         message: formatMessage({
    //           id: 'validation-helperText.phoneNumber',
    //           defaultMessage: 'Please enter a 10 digit phone number',
    //         }),
    //       };
    //     },
    //   })
    //   .trim()
    //   .transform((value) => {
    //     let newString = '';

    //     for (const char of value) {
    //       if (/\d/.test(char)) {
    //         newString += char;
    //       }
    //     }

    //     return newString;
    //   })
    //   .refine((value) => value.length === 0 || value.length === 10, {
    //     message: formatMessage({
    //       id: 'validation-helperText.phoneNumber',
    //       defaultMessage: 'Please enter a 10 digit phone number',
    //     }),
    //   }),
  });
  // .refine((data) => data.email !== '' || data.phone !== '', {
  //   // check this validation message
  //   message: formatMessage({
  //     id: 'validation-helperText.noEmailOrPhoneNumber',
  //     defaultMessage: 'Please enter an email or phone number',
  //   }),
  // });

  const {
    control,
    formState: { errors, isSubmitted },
    trigger,
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: formData.signUpInfo.email ?? '',
      // phone: formData.signUpInfo.phone ?? '',
    },
  });

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

  const submitHandler = async (data: z.infer<typeof formSchema>, event: Event) => {
    console.log({ data }); //will have {email: X, phone: Y}
    const buttonId = event.target?.id;
    const { email, phone } = data;
    let snackbarMessage = '';
    let messageBody = {};
    // TODO: maybe move the handler to inside of each button?

    if (buttonId === 'email') {
      snackbarMessage = intl.formatMessage({
        id: 'emailResults.return-signupCompleted-email',
        defaultMessage:
          'A copy of your results have been sent. If you do not see the email in your inbox, please check your spam folder.',
      });

      messageBody = {
        screen: uuid,
        email: email,
        type: 'emailScreen',
      };
    } else if (buttonId === 'phone') {
      snackbarMessage = intl.formatMessage({
        id: 'emailResults.return-signupCompleted',
        defaultMessage: 'A copy of your results have been sent.',
      });

      messageBody = {
        screen: uuid,
        phone: phone,
        type: 'textScreen',
      };
    }

    try {
      const message = messageBody;
      await postMessage(message);
      setSnackbar({ open: true, message: snackbarMessage });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label={intl.formatMessage(closeAriaLabelProps)}
        color="inherit"
        onClick={() => setSnackbar({ ...snackbar, open: false })}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div className="email-results-container">
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        action={action}
      />
      <IconButton
        aria-label={intl.formatMessage(closeAriaLabelProps)}
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
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex-direction-column">
          <article className="bottom-margin">
            <FormattedMessage id="emailResults.enter-emailLabel" defaultMessage="Email my results" />
          </article>
          <Controller
            name="email"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <TextField
                {...field}
                label={<FormattedMessage id="signUp.createEmailTextfield-label" defaultMessage="Email" />}
                variant="outlined"
                error={errors.email !== undefined}
                helperText={
                  errors.email !== undefined && (
                    <ErrorMessageWrapper fontSize="1rem">{errors.email.message}</ErrorMessageWrapper>
                  )
                }
                onChange={(...args) => {
                  field.onChange(...args);
                  if (isSubmitted) {
                    // trigger(['email', 'phone']);
                    trigger(['email']);
                  }
                }}
              />
            )}
          />
          <button className="send-button" type="submit" onClick={handleSubmit(submitHandler)}>
            <FormattedMessage id="emailResults.sendButton" defaultMessage="Send" />
          </button>
        </div>
        {/* <div className="flex-direction-column">
          <article className="bottom-margin">
            <FormattedMessage id="emailResults.enter-phoneNumberLabel" defaultMessage="Text my results" />
          </article>
          <Controller
            name="phone"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <TextField
                {...field}
                label={<FormattedMessage id="signUp.createPhoneTextfield-label" defaultMessage="Cell Phone" />}
                variant="outlined"
                error={errors.phone !== undefined}
                helperText={
                  errors.phone !== undefined && (
                    <ErrorMessageWrapper fontSize="1rem">{errors.phone.message}</ErrorMessageWrapper>
                  )
                }
                onChange={(...args) => {
                  field.onChange(...args);
                  if (isSubmitted) {
                    trigger(['email', 'phone']);
                  }
                }}
              />
            )}
          />
          <button className="send-button" type="submit" onClick={handleSubmit(submitHandler)}>
            <FormattedMessage id="emailResults.sendButton" defaultMessage="Send" />
          </button>
        </div> */}
      </form>
    </div>
  );
});

export default SaveMyResultsModal;
