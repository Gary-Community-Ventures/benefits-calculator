import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { updateScreen } from '../../Assets/updateScreen';
import { AcuteHHConditions } from '../../Types/FormData';
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
    needs: z.record(z.string(), z.boolean()),
  });

  const immediateNeeds =
    useConfig<Record<string, { text: FormattedMessageType; icon: ReactNode }>>('acute_condition_options');

  const nextStep = useGoToNextStep('acuteHHConditions');
  const backNavigationFunction = useDefaultBackNavigationFunction('acuteHHConditions');

  const { handleSubmit, watch, setValue } = useForm<{ needs: AcuteHHConditions }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      needs: formData.acuteHHConditions,
    },
  });

  const submitHandler = ({ needs }: z.infer<typeof formSchema>) => {
    if (!uuid) {
      throw new Error('uuid is not defined');
    }

    const newFormData = { ...formData, acuteHHConditions: needs };
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
        <MultiSelectTiles
          values={watch('needs')}
          onChange={(values) => {
            setValue('needs', values);
          }}
          options={Object.entries(immediateNeeds).map(([value, content]) => {
            return { value: value, text: content.text, icon: content.icon };
          })}
        />
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
    </div>
  );
}

export default ImmediateNeeds;
