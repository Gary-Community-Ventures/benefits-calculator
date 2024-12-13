import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, FormControl, FormControlLabel, InputLabel, TextField } from '@mui/material';
import { error } from 'console';
import { ReactNode, useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { z } from 'zod';
import ErrorMessageWrapper from '../ErrorMessage/ErrorMessageWrapper';
import { Context } from '../Wrapper/Wrapper';

function SignUp() {
  const { formData } = useContext(Context);

  const { formatMessage } = useIntl();

  const contactInfoSchema = z
    .object({
      firstName: z
        .string({
          errorMap: () => {
            return {
              message: formatMessage({
                id: 'validation-helperText.firstName',
                defaultMessage: 'Please enter your first name',
              }),
            };
          },
        })
        .min(1)
        .trim(),
      lastName: z
        .string({
          errorMap: () => {
            return {
              message: formatMessage({
                id: 'validation-helperText.lastName',
                defaultMessage: 'Please enter your last name',
              }),
            };
          },
        })
        .min(1)
        .trim(),
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
        .trim()
        .or(z.literal('')),
      cell: z
        .string({
          errorMap: () => {
            return {
              message: formatMessage({
                id: 'validation-helperText.phoneNumber',
                defaultMessage: 'Please enter a 10 digit phone number',
              }),
            };
          },
        })
        .trim()
        .transform((value) => {
          let newString = '';

          for (const char of value) {
            if (/\d/.test(char)) {
              newString += char;
            }
          }

          return newString;
        })
        .refine((value) => value.length === 0 || value.length === 10, {
          message: formatMessage({
            id: 'validation-helperText.phoneNumber',
            defaultMessage: 'Please enter a 10 digit phone number',
          }),
        }),
      tcpa: z.boolean().refine((value) => value, {
        message: formatMessage({ id: 'signUp.tcpa.error', defaultMessage: 'Please check the box to continue.' }),
      }),
    })
    .superRefine(({ email, cell }, ctx) => {
      const noEmailAndCell = email.length === 0 && cell.length === 0;
      const message = formatMessage({
        id: 'validation-helperText.noEmailOrPhoneNumber',
        defaultMessage: 'Please enter an email or phone number',
      });

      if (noEmailAndCell) {
        console.log('email or cell');
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message,
          path: ['email'],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message,
          path: ['cell'],
        });
        return false;
      }

      return true;
    });

  const formSchema = z
    .object({
      contactType: z.object({
        sendOffers: z.boolean(),
        sendUpdates: z.boolean(),
      }),
      contactInfo: contactInfoSchema.optional(),
    })
    .refine((data) => {
      const { contactType, contactInfo } = data;
      const showContactInfo = contactType.sendOffers || contactType.sendUpdates;

      if (showContactInfo && contactInfo === undefined) {
        return false;
      }

      return true;
    });

  const {
    control,
    formState: { errors, isSubmitted },
    getValues,
    setValue,
    handleSubmit,
    trigger,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactType: {
        sendOffers: true || formData.signUpInfo.sendOffers, // FIXME:
        sendUpdates: formData.signUpInfo.sendUpdates,
      },
    },
  });

  const sendUpdates = watch('contactType.sendUpdates');
  const sendOffers = watch('contactType.sendOffers');
  const contactInfo = watch('contactInfo');

  useEffect(() => {
    if (contactInfo === undefined && (sendUpdates || sendOffers)) {
      setValue('contactInfo', { firstName: '', lastName: '', email: '', cell: '', tcpa: false });
    }
  }, [sendUpdates, sendOffers, contactInfo === undefined]);

  const submitHandler = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="sign-up-contact-type">
          <div>
            <Controller
              name="contactType.sendUpdates"
              control={control}
              render={({ field }) => (
                <>
                  <FormControlLabel
                    control={<Checkbox {...field} checked={getValues('contactType.sendUpdates')} />}
                    label={<FormattedMessage id="z" defaultMessage="z" />}
                  />
                </>
              )}
            />
          </div>
          <div>
            <Controller
              name="contactType.sendOffers"
              control={control}
              render={({ field }) => (
                <>
                  <FormControlLabel
                    control={<Checkbox {...field} checked={getValues('contactType.sendOffers')} />}
                    label={<FormattedMessage id="z" defaultMessage="z" />}
                  />
                </>
              )}
            />
          </div>
        </div>
        {watch('contactInfo') !== undefined && (sendUpdates || sendOffers) && (
          <div>
            <div className="sign-up-input-row">
              <Controller
                name="contactInfo.firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={<FormattedMessage id="z" defaultMessage="z" />}
                    variant="outlined"
                    error={errors.contactInfo?.firstName !== undefined}
                    helperText={
                      errors.contactInfo?.firstName !== undefined && (
                        <ErrorMessageWrapper fontSize="1rem">
                          {errors.contactInfo.firstName.message}
                        </ErrorMessageWrapper>
                      )
                    }
                  />
                )}
              />
              <Controller
                name="contactInfo.lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={<FormattedMessage id="z" defaultMessage="z" />}
                    variant="outlined"
                    error={errors.contactInfo?.lastName !== undefined}
                    helperText={
                      errors.contactInfo?.lastName !== undefined && (
                        <ErrorMessageWrapper fontSize="1rem">{errors.contactInfo.lastName.message}</ErrorMessageWrapper>
                      )
                    }
                  />
                )}
              />
            </div>
            <div className="sign-up-input-row">
              <Controller
                name="contactInfo.email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(...args) => {
                      field.onChange(...args);
                      if (isSubmitted) {
                        trigger(['contactInfo.cell', 'contactInfo.email']);
                      }
                    }}
                    label={<FormattedMessage id="z" defaultMessage="z" />}
                    variant="outlined"
                    error={errors.contactInfo?.email !== undefined}
                    helperText={
                      errors.contactInfo?.email !== undefined && (
                        <ErrorMessageWrapper fontSize="1rem">{errors.contactInfo.email.message}</ErrorMessageWrapper>
                      )
                    }
                  />
                )}
              />
              <Controller
                name="contactInfo.cell"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(...args) => {
                      field.onChange(...args);
                      if (isSubmitted) {
                        trigger(['contactInfo.cell', 'contactInfo.email']);
                      }
                    }}
                    label={<FormattedMessage id="z" defaultMessage="z" />}
                    variant="outlined"
                    error={errors.contactInfo?.cell !== undefined}
                    helperText={
                      errors.contactInfo?.cell !== undefined && (
                        <ErrorMessageWrapper fontSize="1rem">{errors.contactInfo.cell.message}</ErrorMessageWrapper>
                      )
                    }
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="contactInfo.tcpa"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={getValues('contactInfo.tcpa')}
                          sx={errors.contactInfo?.tcpa !== undefined ? { color: '#c6252b' } : {}}
                        />
                      }
                      label={<FormattedMessage id="z" defaultMessage="z" />}
                    />
                    {errors.contactInfo?.tcpa && (
                      <ErrorMessageWrapper fontSize="1rem">{errors.contactInfo.tcpa.message}</ErrorMessageWrapper>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        )}
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
