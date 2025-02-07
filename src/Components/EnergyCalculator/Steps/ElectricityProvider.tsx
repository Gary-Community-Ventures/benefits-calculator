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
import QuestionHeader from '../../QuestionComponents/QuestionHeader';
import { useDefaultBackNavigationFunction, useGoToNextStep } from '../../QuestionComponents/questionHooks';
import QuestionQuestion from '../../QuestionComponents/QuestionQuestion';
import { createMenuItems } from '../../Steps/SelectHelperFunctions/SelectHelperFunctions';
import { Context } from '../../Wrapper/Wrapper';
import ELECTRICITY_PROVIDERS from '../electricityProviders';
import { useEnergyFormData } from '../hooks';

export default function ElectricityProvider() {
  const { formData, setFormData } = useContext(Context);
  const energyDataAvailable = useEnergyFormData(formData);
  const { uuid } = useParams();
  const backNavigationFunction = useDefaultBackNavigationFunction('energyCalculatorElectricityProvider');
  const nextStep = useGoToNextStep('energyCalculatorElectricityProvider');
  const { formatMessage } = useIntl();
  const { updateScreen } = useScreenApi();

  const formSchema = z.object({
    electricityProvider: z
      .string({
        errorMap: () => {
          return {
            message: formatMessage({
              id: 'energyCalculator.electricityProvider.errorMessage',
              defaultMessage: 'Please select an electricity provider',
            }),
          };
        },
      })
      .min(1),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      electricityProvider: formData.energyCalculator?.electricProvider ?? '',
    },
  });

  const formSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = ({ electricityProvider }) => {
    if (!uuid) {
      throw new Error('no uuid');
    }
    if (!energyDataAvailable) {
      throw new Error('energy data is not set up');
    }

    const updatedEnergyData: EnergyCalculatorFormData = {
      ...formData.energyCalculator,
      electricProvider: electricityProvider,
    };

    const updatedFormData: FormData = { ...formData, energyCalculator: updatedEnergyData };
    setFormData(updatedFormData);
    updateScreen(updatedFormData);
    nextStep();
  };

  const providerOptions = useMemo(() => {
    const options: { [key: string]: string | FormattedMessageType } = {};

    const providerOptions = ELECTRICITY_PROVIDERS[formData.zipcode];

    if (providerOptions === undefined) {
      throw new Error('an invalid zip code was provided');
    }

    for (const [code, data] of Object.entries(providerOptions)) {
      options[code] = data.name;
    }

    options['other'] = <FormattedMessage id="energyCalculator.electricityProvider.other" defaultMessage="Other" />;

    return options;
  }, [formData.zipcode]);

  return (
    <div>
      <QuestionHeader>
        <FormattedMessage
          id="energyCalculator.electricityProvider.header"
          defaultMessage="Tell us about your utilities"
        />
      </QuestionHeader>
      <QuestionQuestion>
        <FormattedMessage
          id="energyCalculator.electricityProvider.question"
          defaultMessage="Who is your electric utility provider?"
        />
      </QuestionQuestion>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <FormControl
          sx={{ mt: 1, mb: 2, minWidth: 210, maxWidth: '100%' }}
          error={errors.electricityProvider !== undefined}
        >
          <InputLabel>
            <FormattedMessage id="energyCalculator.electricityProvider.label" defaultMessage="Energy Utility" />
          </InputLabel>
          <Controller
            name="electricityProvider"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  label={
                    <FormattedMessage id="energyCalculator.electricityProvider.label" defaultMessage="Energy Utility" />
                  }
                >
                  {createMenuItems(
                    providerOptions,
                    <FormattedMessage
                      id="energyCalculator.electricityProvider.placeholder"
                      defaultMessage="Select a provider"
                    />,
                  )}
                </Select>
                {errors.electricityProvider !== undefined && (
                  <FormHelperText>
                    <ErrorMessageWrapper fontSize="1rem">{errors.electricityProvider.message}</ErrorMessageWrapper>
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
