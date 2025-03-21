import { TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Context } from '../Wrapper/Wrapper';
import { useContext } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormattedMessage, useIntl } from 'react-intl';
import QuestionHeader from '../QuestionComponents/QuestionHeader';
import QuestionQuestion from '../QuestionComponents/QuestionQuestion';
import PrevAndContinueButtons from '../PrevAndContinueButtons/PrevAndContinueButtons';
import { useParams } from 'react-router-dom';
import { useDefaultBackNavigationFunction, useGoToNextStep } from '../QuestionComponents/questionHooks';
import HelpButton from '../HelpBubbleIcon/HelpButton';
import { handleNumbersOnly, NUM_PAD_PROPS } from '../../Assets/numInputHelpers';
import useScreenApi from '../../Assets/updateScreen';
import { OverrideableTranslation } from '../../Assets/languageOptions';
import { useIsEnergyCalculator } from '../EnergyCalculator/hooks';

const HouseholdSize = () => {
  const { formData } = useContext(Context);
  const { uuid } = useParams();
  const backNavigationFunction = useDefaultBackNavigationFunction('householdSize');
  const nextStep = useGoToNextStep('householdSize', '1');
  const intl = useIntl();
  const { updateScreen } = useScreenApi();
  const isEnergyCalculator = useIsEnergyCalculator();

  const formSchema = z.object({
    householdSize: z.coerce
      .number({
        errorMap: () => {
          return {
            message: intl.formatMessage({
              id: 'errorMessage-numberOfHHMembers',
              defaultMessage: 'Please enter the number of people in your household (max. 8)',
            }),
          };
        },
      })
      .int()
      .positive()
      .lte(8),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      householdSize: formData.householdSize ?? 0,
    },
  });

  const formSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = ({ householdSize }) => {
    if (uuid) {
      const updatedFormData = {
        ...formData,
        householdSize,
        householdData: formData.householdData.slice(0, householdSize),
      };
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
            id="questions.householdSize"
            defaultMessage="Including you, how many people are in your household?"
          />
          {!isEnergyCalculator && (
            <HelpButton>
              <OverrideableTranslation
                id="questions.householdSize-helpText"
                defaultMessage="This is usually family members whom you live with and share important resources with like food and bills. If other adults 18 or older in your household file their own tax return, ask them to complete this tool to determine if they qualify for benefits. But even if you and your spouse file taxes separately, include your spouse in the household."
              />
            </HelpButton>
          )}
          {isEnergyCalculator && (
            <OverrideableTranslation
              id="questions.householdSize-helpText"
              defaultMessage="This is usually family members whom you live with and share important resources with like food and bills. If other adults 18 or older in your household file their own tax return, ask them to complete this tool to determine if they qualify for benefits. But even if you and your spouse file taxes separately, include your spouse in the household."
            />
          )}
        </>
      </QuestionQuestion>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Controller
          name="householdSize"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label={<FormattedMessage id="questions.householdSize-inputLabel" defaultMessage="Household Size" />}
              variant="outlined"
              inputProps={NUM_PAD_PROPS}
              onChange={handleNumbersOnly(field.onChange)}
              error={errors.householdSize !== undefined}
              helperText={errors.householdSize !== undefined && errors.householdSize?.message}
            />
          )}
        />
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
    </div>
  );
};

export default HouseholdSize;
