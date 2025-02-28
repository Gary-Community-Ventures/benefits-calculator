import { FormattedMessage } from 'react-intl';
import QuestionHeader from '../../QuestionComponents/QuestionHeader';
import QuestionQuestion from '../../QuestionComponents/QuestionQuestion';
import QuestionDescription from '../../QuestionComponents/QuestionDescription';
import RHFOptionCardGroup from '../../RHFComponents/RHFOptionCardGroup';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ReactComponent as Plug } from '../Icons/Plug.svg';
import { ReactComponent as LowFuel } from '../Icons/LowFuel.svg';
import PrevAndContinueButtons from '../../PrevAndContinueButtons/PrevAndContinueButtons';
import { useDefaultBackNavigationFunction, useGoToNextStep } from '../../QuestionComponents/questionHooks';
import { useContext } from 'react';
import { Context } from '../../Wrapper/Wrapper';
import useScreenApi from '../../../Assets/updateScreen';
import { useEnergyFormData } from '../hooks';

const Utilities = () => {
  const { formData, setFormData } = useContext(Context);
  const { uuid } = useParams();
  const { updateScreen } = useScreenApi();
  const energyDataAvailable = useEnergyFormData(formData);
  const backNavigationFunction = useDefaultBackNavigationFunction('energyCalculatorUtilityStatus');
  const nextStep = useGoToNextStep('energyCalculatorUtilityStatus');
  const utilityStatusOptions = {
    electricityIsDisconnected: {
      icon: <Plug className="option-card-icon" />,
      text: {
        props: {
          id: 'utilityStatusOptions.electricityIsDisconnected',
          defaultMessage: 'Your electricity and/or gas has been disconnected.',
        },
      },
    },
    hasPastDueEnergyBills: {
      icon: <LowFuel className="option-card-icon" />,
      text: {
        props: {
          id: 'utilityStatusOptions.hasPastDueEnergyBills',
          defaultMessage: 'You have a past-due electric or heating bill or you are low on fuel.',
        },
      },
    },
  };

  const formSchema = z.object({
    energyCalculator: z.object({
      electricityIsDisconnected: z.boolean(),
      hasPastDueEnergyBills: z.boolean(),
    }),
  });

  const { handleSubmit, watch, setValue } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      energyCalculator: {
        electricityIsDisconnected: formData.energyCalculator?.electricityIsDisconnected ?? false,
        hasPastDueEnergyBills: formData.energyCalculator?.hasPastDueEnergyBills ?? false,
      },
    },
  });

  const formSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = (rhfData) => {
    if (uuid === undefined) {
      throw new Error('uuid is not defined');
    }

    if (!energyDataAvailable) {
      throw new Error('energy data is not set up');
    }

    const updatedEnergyCalculatorData = { ...formData.energyCalculator, ...rhfData.energyCalculator };
    const updatedFormData = { ...formData, energyCalculator: updatedEnergyCalculatorData };
    updateScreen(updatedFormData);
    nextStep();
  };

  return (
    <>
      <QuestionHeader>
        <FormattedMessage id="questions.energyCalculator-utilities" defaultMessage="Tell us about your utilities" />
      </QuestionHeader>
      <QuestionQuestion>
        <FormattedMessage
          id="questions.energyCalculator-utilities-subquestion"
          defaultMessage="Do any of the following apply to your household?"
        />
      </QuestionQuestion>
      <QuestionDescription>
        <FormattedMessage id="questions.energyCalculator-utilities-q-desc" defaultMessage="Select all that apply." />
      </QuestionDescription>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <RHFOptionCardGroup
          fields={watch('energyCalculator')}
          setValue={setValue}
          name="energyCalculator"
          options={utilityStatusOptions}
        />
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
    </>
  );
};
export default Utilities;
