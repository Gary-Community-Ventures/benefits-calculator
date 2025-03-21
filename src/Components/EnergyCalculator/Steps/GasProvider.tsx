import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormHelperText, InputLabel, Select } from '@mui/material';
import { useContext, useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import useScreenApi from '../../../Assets/updateScreen';
import { EnergyCalculatorFormData, FormData } from '../../../Types/FormData';
import { FormattedMessageType } from '../../../Types/Questions';
import ErrorMessageWrapper from '../../ErrorMessage/ErrorMessageWrapper';
import PrevAndContinueButtons from '../../PrevAndContinueButtons/PrevAndContinueButtons';
import QuestionDescription from '../../QuestionComponents/QuestionDescription';
import QuestionHeader from '../../QuestionComponents/QuestionHeader';
import { useDefaultBackNavigationFunction, useGoToNextStep } from '../../QuestionComponents/questionHooks';
import QuestionQuestion from '../../QuestionComponents/QuestionQuestion';
import { createMenuItems } from '../../Steps/SelectHelperFunctions/SelectHelperFunctions';
import { Context } from '../../Wrapper/Wrapper';
import { GAS_PROVIDERS } from '../gasProviders';
import { useEnergyFormData } from '../hooks';

export default function GasProvider() {
  const { formData } = useContext(Context);
  const energyDataAvailable = useEnergyFormData(formData);
  const { uuid } = useParams();
  const backNavigationFunction = useDefaultBackNavigationFunction('energyCalculatorGasProvider');
  const nextStep = useGoToNextStep('energyCalculatorGasProvider');
  const { formatMessage } = useIntl();
  const { updateScreen } = useScreenApi();

  const formSchema = z.object({
    gasProvider: z.string().min(1, {
      message: formatMessage({
        id: 'energyCalculator.gasProvider.errorMessage',
        defaultMessage: 'Please select an gas provider',
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
      gasProvider: formData.energyCalculator?.gasProvider ?? '',
    },
  });

  const formSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = ({ gasProvider }) => {
    if (!uuid) {
      throw new Error('no uuid');
    }
    if (!energyDataAvailable) {
      throw new Error('energy data is not set up');
    }

    const updatedEnergyData: EnergyCalculatorFormData = {
      ...formData.energyCalculator,
      gasProvider: gasProvider,
    };

    const updatedFormData: FormData = { ...formData, energyCalculator: updatedEnergyData };
    updateScreen(updatedFormData);
    nextStep();
  };

  const providerOptions = useMemo(() => {
    const options: { [key: string]: string | FormattedMessageType } = {};

    const providerOptions = GAS_PROVIDERS[formData.county];

    if (providerOptions === undefined) {
      throw new Error('an invalid county was provided');
    }

    for (const [code, name] of Object.entries(providerOptions)) {
      options[code] = name;
    }

    options.propane = (
      <FormattedMessage
        id="energyCalculator.gasProvider.propane"
        defaultMessage="Propane tank / firewood / heating pellets"
      />
    );
    options.other = <FormattedMessage id="energyCalculator.gasProvider.other" defaultMessage="Other" />;
    options.none = <FormattedMessage id="energyCalculator.gasProvider.none" defaultMessage="None / Don't Pay" />;

    return options;
  }, [formData.county]);

  return (
    <div>
      <QuestionHeader>
        <FormattedMessage id="energyCalculator.gasProvider.header" defaultMessage="Tell us about your utilities" />
      </QuestionHeader>
      <QuestionQuestion>
        <FormattedMessage id="energyCalculator.gasProvider.question" defaultMessage="How do you heat your home?" />
      </QuestionQuestion>
      <QuestionDescription>
        <FormattedMessage
          id="energyCalculator.gasProvider.description"
          defaultMessage="If you heat your home with a gas provider, please select the company."
        />
      </QuestionDescription>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <FormControl sx={{ mt: 1, mb: 2, minWidth: 210, maxWidth: '100%' }} error={errors.gasProvider !== undefined}>
          <InputLabel>
            <FormattedMessage id="energyCalculator.gasProvider.label" defaultMessage="Gas Utility" />
          </InputLabel>
          <Controller
            name="gasProvider"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  label={<FormattedMessage id="energyCalculator.gasProvider.label" defaultMessage="Gas Utility" />}
                >
                  {createMenuItems(
                    providerOptions,
                    <FormattedMessage
                      id="energyCalculator.gasProvider.placeholder"
                      defaultMessage="Select a provider"
                    />,
                  )}
                </Select>
                {errors.gasProvider !== undefined && (
                  <FormHelperText>
                    <ErrorMessageWrapper fontSize="1rem">{errors.gasProvider.message}</ErrorMessageWrapper>
                  </FormHelperText>
                )}
              </>
            )}
          />
        </FormControl>
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
    </div>
  );
}
