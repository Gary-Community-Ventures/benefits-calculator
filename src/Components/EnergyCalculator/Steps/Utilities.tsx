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

const Utilities = () => {
  const { uuid } = useParams();
  const utilityStatusOptions = {
    electricityIsDisconnected: {
      icon: <Plug className="option-card-icon" />,
      text: {
        props: {
          id: 'utilityStatusOptions.electricityIsDisconnected',
          default_message: 'Your electricity and/or gas has been disconnected.',
        },
      },
    },
    hasPastDueEnergyBills: {
      icon: <LowFuel className="option-card-icon" />,
      text: {
        props: {
          id: 'utilityStatusOptions.hasPastDueEnergyBills',
          default_message: 'You have a past-due electric or heating bill or you are low on fuel.',
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

  const { control, handleSubmit, watch, setValue } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      electricityIsDisconnected: false,
      hasPastDueEnergyBills: false,
    },
  });

  const formSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = (memberData) => {
    if (uuid === undefined) {
      throw new Error('uuid is not defined');
    }

    // const updatedEnergyCalculatorData = []
    console.log({ memberData });
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
      {/* <form onSubmit={handleSubmit(formSubmitHandler)}>
        <RHFOptionCardGroup
          fields={watch()}
          setValue={setValue}
          name="energyCalculator"
          options={utilityStatusOptions}
        />
      </form> */}
    </>
  );
};
export default Utilities;
