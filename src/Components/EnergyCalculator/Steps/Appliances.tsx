import { FormattedMessage } from 'react-intl';
import QuestionHeader from '../../QuestionComponents/QuestionHeader';
import QuestionQuestion from '../../QuestionComponents/QuestionQuestion';
import QuestionDescription from '../../QuestionComponents/QuestionDescription';
import RHFOptionCardGroup from '../../RHFComponents/RHFOptionCardGroup';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ReactComponent as WaterHeater } from '../Icons/WaterHeater.svg';
import { ReactComponent as Heater } from '../Icons/Heat.svg';
import { ReactComponent as Stove } from '../Icons/Stove.svg';
import { ReactComponent as Washer } from '../Icons/Washer.svg';
import PrevAndContinueButtons from '../../PrevAndContinueButtons/PrevAndContinueButtons';
import { useDefaultBackNavigationFunction, useGoToNextStep } from '../../QuestionComponents/questionHooks';
import { useContext } from 'react';
import { Context } from '../../Wrapper/Wrapper';
import useScreenApi from '../../../Assets/updateScreen';

const Utilities = () => {
  const { formData, setFormData } = useContext(Context);
  const { uuid } = useParams();
  const { updateScreen } = useScreenApi();
  const backNavigationFunction = useDefaultBackNavigationFunction('energyCalculatorApplianceStatus');
  const nextStep = useGoToNextStep('energyCalculatorApplianceStatus');
  const applianceStatusOptions = {
    needsWaterHeater: {
      icon: <WaterHeater className="option-card-icon" />,
      text: {
        props: {
          id: 'applianceStatusOptions.needsWaterHeater',
          default_message: 'Water Heater',
        },
      },
    },
    needsHvac: {
      icon: <Heater className="option-card-icon" />,
      text: {
        props: {
          id: 'applianceStatusOptions.needsHvac',
          default_message: 'Heating, ventilation, and/or cooling',
        },
      },
    },
    needsStove: {
      icon: <Stove className="option-card-icon" />,
      text: {
        props: {
          id: 'applianceStatusOptions.needsStove',
          default_message: 'Cooking stove/range',
        },
      },
    },
    needsDryer: {
      icon: <Washer className="option-card-icon" />,
      text: {
        props: {
          id: 'applianceStatusOptions.needsDryer',
          default_message: 'Clothes dryer',
        },
      },
    },
  };

  const formSchema = z.object({
    energyCalculator: z.object({
      needsWaterHeater: z.boolean(),
      needsHvac: z.boolean(),
      needsStove: z.boolean(),
      needsDryer: z.boolean(),
    }),
  });

  const { handleSubmit, watch, setValue } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      energyCalculator: {
        needsWaterHeater: formData.energyCalculator?.needsWaterHeater ?? false,
        needsHvac: formData.energyCalculator?.needsHvac ?? false,
        needsStove: formData.energyCalculator?.needsStove ?? false,
        needsDryer: formData.energyCalculator?.needsDryer ?? false,
      },
    },
  });

  const formSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = (memberData) => {
    if (uuid === undefined) {
      throw new Error('uuid is not defined');
    }

    const updatedEnergyCalculatorData = { ...formData.energyCalculator, ...memberData.energyCalculator };
    const updatedFormData = { ...formData, energyCalculator: updatedEnergyCalculatorData };
    setFormData(updatedFormData);
    updateScreen(updatedFormData);
    nextStep();
  };

  return (
    <>
      <QuestionHeader>
        <FormattedMessage id="questions.energyCalculator-appliances" defaultMessage="Tell us about your appliances" />
      </QuestionHeader>
      <QuestionQuestion>
        <FormattedMessage
          id="questions.energyCalculator-appliances-subquestion"
          defaultMessage="Do you currently have any appliances that are broken or in need of replacement?"
        />
      </QuestionQuestion>
      <QuestionDescription>
        <FormattedMessage id="questions.energyCalculator-appliances-q-desc" defaultMessage="Select all that apply." />
      </QuestionDescription>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <RHFOptionCardGroup
          fields={watch('energyCalculator')}
          setValue={setValue}
          name="energyCalculator"
          options={applianceStatusOptions}
          customColumnNo="two-columns"
        />
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
    </>
  );
};
export default Utilities;
