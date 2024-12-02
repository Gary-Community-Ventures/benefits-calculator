import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { FormattedMessageType } from '../../Types/Questions';
import { Context } from '../Wrapper/Wrapper';
import { updateScreen } from '../../Assets/updateScreen';
import * as z from 'zod';
import QuestionHeader from '../QuestionComponents/QuestionHeader';
import QuestionQuestion from '../QuestionComponents/QuestionQuestion';
import PrevAndContinueButtons from '../PrevAndContinueButtons/PrevAndContinueButtons';
import { useDefaultBackNavigationFunction, useGoToNextStep } from '../QuestionComponents/questionHooks';
import { useConfig } from '../Config/configHook';
import ErrorMessageWrapper from '../ErrorMessage/ErrorMessageWrapper';

type ReferralOptions = {
  other: string;
  [key: string]: string | FormattedMessageType;
};

export default function ReferralSourceStep() {
  const { formData, setFormData, locale } = useContext(Context);
  const { uuid } = useParams();

  if (uuid === undefined) {
    throw new Error('no uuid');
  }

  const backNavigationFunction = useDefaultBackNavigationFunction('referralSource');
  const nextStep = useGoToNextStep('referralSource');
  const referralOptions = useConfig<ReferralOptions>('referral_options');
  const { formatMessage } = useIntl();

  const formSchema = z
    .object({
      referralSource: z.string().min(
        1,
        formatMessage({
          id: 'validation-helperText.referralSource',
          defaultMessage: 'Please select a referral source.',
        }),
      ),
      otherReferrer: z.string(),
    })
    .refine((val) => val.referralSource !== 'other' || val.otherReferrer.length > 0, {
      message: formatMessage({
        id: 'errorMessage-otherReferralSource',
        defaultMessage: 'Please type in your referral source',
      }),
      path: ['otherReferrer'],
    })
    .transform((val) => {
      if (val.referralSource === 'other') {
        return val;
      }

      return { ...val, otherReferrer: '' };
    });

  type FormSchema = z.infer<typeof formSchema>;

  const isOtherSource =
    formData.referralSource !== undefined &&
    formData.referralSource !== '' &&
    !(formData.referralSource in referralOptions);

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      referralSource: isOtherSource ? 'other' : formData.referralSource ?? '',
      otherReferrer: isOtherSource ? formData.referralSource ?? '' : '',
    },
  });

  const referralSource = watch('referralSource');
  const showOtherSource = referralSource === 'other';

  const formSubmitHandler = async ({ referralSource, otherReferrer }: FormSchema) => {
    const source = otherReferrer !== '' ? otherReferrer : referralSource;
    const updatedFormData = { ...formData, referralSource: source };
    setFormData(updatedFormData);
    updateScreen(uuid, updatedFormData, locale);
    nextStep();
  };

  const createMenuItems = () => {
    const disabledSelectMenuItem = (
      <MenuItem value="disabled-select" key="disabled-select" disabled>
        <FormattedMessage
          id="qcc.createReferralDropdownMenu-disabledSelectMenuItemText"
          defaultMessage="Select a source"
        />
      </MenuItem>
    );

    const dropdownMenuItems = Object.entries(referralOptions).map(([value, message]) => {
      return (
        <MenuItem value={value} key={value}>
          {message}
        </MenuItem>
      );
    });

    return [disabledSelectMenuItem, dropdownMenuItems];
  };

  return (
    <main className="benefits-form">
      <QuestionHeader>
        <FormattedMessage id="questions.referralSource" defaultMessage="Just one more question!" />
      </QuestionHeader>
      <QuestionQuestion>
        <FormattedMessage
          id="questions.referralSource-subheader"
          defaultMessage="How did you hear about MyFriendBen?"
        />
      </QuestionQuestion>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <FormControl sx={{ mt: 1, mb: 2, minWidth: 210, maxWidth: '100%' }} error={errors.referralSource !== undefined}>
          <InputLabel id="county">
            <FormattedMessage id="qcc.createReferralDropdownMenu-label" defaultMessage="Referral Source" />
          </InputLabel>
          <Controller
            name="referralSource"
            control={control}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  labelId="county-select-label"
                  id="county-source-select"
                  label={
                    <FormattedMessage id="qcc.createReferralDropdownMenu-label" defaultMessage="Referral Source" />
                  }
                >
                  {createMenuItems()}
                </Select>
                {errors.referralSource !== undefined && (
                  <FormHelperText>
                    <ErrorMessageWrapper fontSize="1rem">{errors.referralSource.message}</ErrorMessageWrapper>
                  </FormHelperText>
                )}
              </>
            )}
          />
        </FormControl>
        {showOtherSource && (
          <div>
            <QuestionQuestion>
              <FormattedMessage id="questions.referralSource-a" defaultMessage="If other, please specify:" />
            </QuestionQuestion>
            <Controller
              name="otherReferrer"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={
                    <FormattedMessage
                      id="questions.referralSource-a-inputLabel"
                      defaultMessage="Other referral source"
                    />
                  }
                  variant="outlined"
                  error={errors.otherReferrer !== undefined}
                  helperText={
                    errors.otherReferrer !== undefined && (
                      <ErrorMessageWrapper fontSize="1rem">{errors.otherReferrer?.message}</ErrorMessageWrapper>
                    )
                  }
                />
              )}
            />
          </div>
        )}
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
    </main>
  );
}
