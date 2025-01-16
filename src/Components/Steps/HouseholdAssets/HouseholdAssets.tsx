import { Controller, Path, SubmitHandler, useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import HelpButton from '../../HelpBubbleIcon/HelpButton';
import QuestionHeader from '../../QuestionComponents/QuestionHeader';
import QuestionQuestion from '../../QuestionComponents/QuestionQuestion';
import PrevAndContinueButtons from '../../PrevAndContinueButtons/PrevAndContinueButtons';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Context } from '../../Wrapper/Wrapper';
import { useDefaultBackNavigationFunction, useGoToNextStep } from '../../QuestionComponents/questionHooks';
import useScreenApi from '../../../Assets/updateScreen';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

const HouseholdAssets = () => {
  const { formData, setFormData } = useContext(Context);
  const { uuid } = useParams();
  const backNavigationFunction = useDefaultBackNavigationFunction('householdAssets');
  const nextStep = useGoToNextStep('householdAssets');
  const intl = useIntl();
  const { updateScreen } = useScreenApi();

  const formSchema = z.object({
    householdAssets: z.coerce
      .number({
        errorMap: () => {
          return {
            message: intl.formatMessage({
              id: 'validation-helperText.assets',
              defaultMessage: 'Please enter 0 or a positive number.',
            }),
          };
        },
      })
      .int()
      .min(0, {
        message: intl.formatMessage({
          id: 'validation-helperText.assets',
          defaultMessage: 'Enter 0 or a positive number.',
        }),
      }),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      householdAssets: formData.householdAssets ?? 0,
    },
  });

  const formSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = ({ householdAssets }) => {
    if (uuid) {
      const updatedFormData = { ...formData, householdAssets: householdAssets };
      setFormData(updatedFormData);
      updateScreen(updatedFormData);
      nextStep();
    }
  };

  return (
    <div>
      <QuestionHeader>
        <FormattedMessage id="qcc.about_household" defaultMessage="Tell us about your household" />
      </QuestionHeader>
      <QuestionQuestion>
        <>
          <FormattedMessage
            id="questions.householdAssets"
            defaultMessage="How much does your whole household have right now in cash, checking or savings accounts, stocks, bonds, or mutual funds?"
          />
          <HelpButton
            helpText="In some cases, eligibility for benefits may be affected if your household owns other valuable assets such as a car or life insurance policy."
            helpId="questions.householdAssets-description"
          />
        </>
      </QuestionQuestion>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Controller
          name="householdAssets"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label={<FormattedMessage id="questions.householdAssets-inputLabel" defaultMessage="Dollar Amount" />}
              variant="outlined"
              error={errors.householdAssets !== undefined}
              helperText={errors.householdAssets !== undefined && errors.householdAssets?.message}
              // TODO: add input props
            />
          )}
        />
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
    </div>
  );
};

export default HouseholdAssets;
