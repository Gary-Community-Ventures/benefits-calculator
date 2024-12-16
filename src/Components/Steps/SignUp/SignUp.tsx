import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, FormControl, FormControlLabel, InputLabel, TextField } from '@mui/material';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { z } from 'zod';
import { Language } from '../../../Assets/languageOptions';
import { FormData } from '../../../Types/FormData';
import { FormattedMessageType } from '../../../Types/Questions';
import { useConfig } from '../../Config/configHook';
import ErrorMessageWrapper from '../../ErrorMessage/ErrorMessageWrapper';
import PrevAndContinueButtons from '../../PrevAndContinueButtons/PrevAndContinueButtons';
import QuestionHeader from '../../QuestionComponents/QuestionHeader';
import { useDefaultBackNavigationFunction, useGoToNextStep } from '../../QuestionComponents/questionHooks';
import QuestionQuestion from '../../QuestionComponents/QuestionQuestion';
import { Context } from '../../Wrapper/Wrapper';
import { updateUser } from '../../../Assets/updateScreen';
import './SignUp.css';
import { useParams } from 'react-router-dom';

function SignUp() {
  const { formData, setFormData, locale } = useContext(Context);
  const { uuid } = useParams();
  const [hasServerError, setHasServerError] = useState(false);
  const { formatMessage } = useIntl();
  const backNavigationFunction = useDefaultBackNavigationFunction('signUpInfo');
  const nextStep = useGoToNextStep('signUpInfo');
  const signUpOptions = useConfig<{ [key: string]: FormattedMessageType }>('sign_up_options');
  const privacyLinks = useConfig<Record<Language, string | undefined>>('privacy_policy');
  const consentToContactLinks = useConfig<Record<Language, string | undefined>>('consent_to_contact');

  const privacyLink = useMemo(() => privacyLinks[locale] ?? privacyLinks['en-us'], [locale, privacyLinks]);
  const consentToContactLink = useMemo(
    () => consentToContactLinks[locale] ?? consentToContactLinks['en-us'],
    [locale, consentToContactLinks],
  );

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

  const someContactType = (contactType: { [key: string]: boolean }) => {
    return Object.values(contactType).some((value) => value);
  };

  const formSchema = z
    .object({
      contactType: z.record(z.string(), z.boolean()),
      contactInfo: contactInfoSchema.optional(),
    })
    .refine((data) => {
      const { contactType, contactInfo } = data;
      const showContactInfo = someContactType(contactType);

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
    resetField,
    trigger,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactType: {
        sendOffers: formData.signUpInfo.sendOffers,
        sendUpdates: formData.signUpInfo.sendUpdates,
      },
    },
  });

  const contactType = watch('contactType');

  useEffect(() => {
    if (someContactType(contactType)) {
      setValue('contactInfo', { firstName: '', lastName: '', email: '', cell: '', tcpa: false });
      if (isSubmitted) {
        trigger('contactInfo');
        setHasServerError(false);
      }
    } else {
      resetField('contactInfo');
      setHasServerError(false);
    }
  }, [someContactType(contactType)]);

  const submitHandler = async (data: z.infer<typeof formSchema>) => {
    if (uuid === undefined) {
      throw new Error('uuid is not defined');
    }
    setHasServerError(false);

    const newFormData: FormData = {
      ...formData,
      signUpInfo: {
        ...formData.signUpInfo,
        sendOffers: data.contactType.sendOffers,
        sendUpdates: data.contactType.sendUpdates,
      },
    };

    const signUpInfo = newFormData.signUpInfo;
    const updatedSignUpInfo = data.contactInfo;

    if (updatedSignUpInfo === undefined) {
      nextStep();
      return;
    }

    signUpInfo.firstName = updatedSignUpInfo.firstName;
    signUpInfo.lastName = updatedSignUpInfo.lastName;
    signUpInfo.email = updatedSignUpInfo.email;
    signUpInfo.phone = updatedSignUpInfo.cell;
    signUpInfo.commConsent = updatedSignUpInfo.tcpa;

    console.log(newFormData.signUpInfo);

    try {
      await updateUser(uuid, formData, locale);
      newFormData.signUpInfo.hasUser = true;
      setFormData(newFormData);
    } catch {
      setHasServerError(true);
      setFormData(newFormData);
    }
  };

  return (
    <div>
      <QuestionHeader>
        <FormattedMessage
          id="qcc.optional-sign-up-text"
          defaultMessage="Optional: Sign up for benefits updates and/or paid feedback opportunities"
        />
      </QuestionHeader>
      <QuestionQuestion>
        <FormattedMessage id="questions.signUpInfo" defaultMessage="What would you like us to contact you about?" />
      </QuestionQuestion>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          {Object.entries(signUpOptions).map(([name, value]) => {
            const rhfName: `contactType.${string}` = `contactType.${name}`;
            return (
              <div className="sign-up-checkbox-container" key={name}>
                <Controller
                  name={rhfName}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel control={<Checkbox {...field} checked={getValues(rhfName)} />} label={value} />
                  )}
                />
              </div>
            );
          })}
        </div>
        {watch('contactInfo') !== undefined && !formData.signUpInfo.hasUser && (
          <div className="sign-up-contact-info-container">
            <QuestionQuestion>
              <FormattedMessage id="questions.signUpInfo-a" defaultMessage="Please provide your contact info below:" />
            </QuestionQuestion>
            <div className="sign-up-input-row">
              <Controller
                name="contactInfo.firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={<FormattedMessage id="signUp.createFirstNameTextfield-label" defaultMessage="First Name" />}
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
                    label={<FormattedMessage id="signUp.createLastNameTextfield-label" defaultMessage="Last Name" />}
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
                    label={<FormattedMessage id="signUp.createEmailTextfield-label" defaultMessage="Email" />}
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
                    label={<FormattedMessage id="signUp.createPhoneTextfield-label" defaultMessage="Cell Phone" />}
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
            <p className="sign-up-disclaimer-text">
              <FormattedMessage
                id="signUp.displayDisclosureSection-consentText"
                defaultMessage="By filling out this form, you agree to future contact from Gary Philanthropy or our affiliates regarding your use of MyFriendBen or to offer additional programs that may be of interest to you and your family. Standard message and data costs may apply to these communications. You may opt out of receiving these communications at any time through the opt-out link in the communication. Additionally, a copy of your MyFriendBen results will automatically be sent to the email/phone number you provided."
              />
            </p>
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
                      label={
                        <div className="sign-up-text">
                          <FormattedMessage
                            id="signUp.displayDisclosureSection-consentCheck1"
                            defaultMessage="I have read, understand, and agree to the terms of MyFriendBen's "
                          />
                          <FormattedMessage
                            id="emailResults.return-consentCheck"
                            defaultMessage="{linkVal}"
                            values={{
                              linkVal: (
                                <a className="link-color" href={privacyLink} target="_blank">
                                  <FormattedMessage
                                    id="signUp.displayDisclosureSection-consentCheckLink"
                                    defaultMessage="data privacy policy "
                                  />
                                </a>
                              ),
                            }}
                          />
                          <FormattedMessage id="signUp.and" defaultMessage=" and " />
                          <FormattedMessage
                            id="signUp.consentToContact4"
                            defaultMessage="{linkVal}"
                            values={{
                              linkVal: (
                                <a className="link-color" href={consentToContactLink} target="_blank">
                                  <FormattedMessage id="signUp.consentToContact" defaultMessage=" consent to contact" />
                                </a>
                              ),
                            }}
                          />
                          <FormattedMessage id="signUp.consentToContact5" defaultMessage="." />
                        </div>
                      }
                    />
                    {errors.contactInfo?.tcpa && (
                      <ErrorMessageWrapper fontSize="1rem">{errors.contactInfo.tcpa.message}</ErrorMessageWrapper>
                    )}
                  </>
                )}
              />
            </div>
            <div className="sign-up-server-error-container">
              {hasServerError && (
                <ErrorMessageWrapper fontSize="1.5rem">
                  <FormattedMessage
                    id="validation-helperText.serverError"
                    defaultMessage="Please enter a valid email address and/or phone number. This error could also be caused by entering an email address that is already in our system. If the error persists, remember that this question is optional and will not impact your MyFriendBen results. You can skip this question by deselecting the boxes at the top of the page and pressing continue."
                  />
                </ErrorMessageWrapper>
              )}
            </div>
          </div>
        )}
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
    </div>
  );
}

export default SignUp;
