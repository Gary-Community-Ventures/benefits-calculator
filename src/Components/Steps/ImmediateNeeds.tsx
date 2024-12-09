import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { updateScreen } from '../../Assets/updateScreen';
import { acuteHHConditionsHasError } from '../../Assets/validationFunctions';
import { AcuteHHConditionName } from '../../Types/FormData';
import { FormattedMessageType } from '../../Types/Questions';
import { useConfig } from '../Config/configHook';
import MultiSelectTiles from '../OptionCardGroup/MultiSelectTiles';
import PrevAndContinueButtons from '../PrevAndContinueButtons/PrevAndContinueButtons';
import QuestionHeader from '../QuestionComponents/QuestionHeader';
import { useDefaultBackNavigationFunction, useGoToNextStep } from '../QuestionComponents/questionHooks';
import QuestionQuestion from '../QuestionComponents/QuestionQuestion';
import { Context } from '../Wrapper/Wrapper';

function ImmediateNeeds() {
  const { formData, setFormData, locale } = useContext(Context);
  const { uuid } = useParams();
  const formSchema = z.object({
    needs: z.array(z.string()),
  });

  const immediateNeeds =
    useConfig<Record<AcuteHHConditionName, { text: FormattedMessageType; icon: ReactNode }>>('acute_condition_options');

  const nextStep = useGoToNextStep('acuteHHConditions');
  const backNavigationFunction = useDefaultBackNavigationFunction('acuteHHConditions');

  const needs: AcuteHHConditionName[] = Object.entries(formData.acuteHHConditions)
    .filter(([_, value]) => {
      return value;
    })
    .map(([name, _]) => name as AcuteHHConditionName);

  const { handleSubmit, watch, setValue } = useForm<{ needs: AcuteHHConditionName[] }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      needs: needs,
    },
  });

  const submitHandler = (data: z.infer<typeof formSchema>) => {
    if (!uuid) {
      throw new Error('uuid is not defined');
    }

    const needs = data.needs as AcuteHHConditionName[];

    const newNeeds = formData.acuteHHConditions;

    for (const untypedNeed in newNeeds) {
      const need = untypedNeed as AcuteHHConditionName;
      newNeeds[need] = needs.includes(need);
    }

    const newFormData = { ...formData, acuteHHConditions: newNeeds };
    setFormData(newFormData);
    updateScreen(uuid, newFormData, locale);
    nextStep();
  };

  return (
    <div>
      <QuestionHeader>
        <FormattedMessage
          id="qcc.tell-us-final-text"
          defaultMessage="Tell us some final information about your household."
        />
      </QuestionHeader>
      <QuestionQuestion>
        <FormattedMessage
          id="acuteHHConditions"
          defaultMessage="Is anyone in your household in immediate need of help with any of the following?"
        />
      </QuestionQuestion>
      <form onSubmit={handleSubmit(submitHandler)}>
        <MultiSelectTiles<AcuteHHConditionName>
          values={watch('needs')}
          onChange={(values) => {
            setValue('needs', values);
          }}
          options={Object.entries(immediateNeeds).map(([value, content]) => {
            return { value: value as AcuteHHConditionName, text: content.text, icon: content.icon };
          })}
        />
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
    </div>
  );
}

export default ImmediateNeeds;
