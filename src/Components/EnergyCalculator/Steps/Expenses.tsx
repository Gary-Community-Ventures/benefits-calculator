import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import useScreenApi from '../../../Assets/updateScreen';
import { Expense, FormData } from '../../../Types/FormData';
import MultiSelectTiles, { MultiSelectTileOption } from '../../OptionCardGroup/MultiSelectTiles';
import PrevAndContinueButtons from '../../PrevAndContinueButtons/PrevAndContinueButtons';
import QuestionHeader from '../../QuestionComponents/QuestionHeader';
import { useDefaultBackNavigationFunction, useGoToNextStep } from '../../QuestionComponents/questionHooks';
import QuestionQuestion from '../../QuestionComponents/QuestionQuestion';
import { ReactComponent as Housing } from '../../../Assets/OptionCardIcons/AcuteConditions/housing.svg';
import { ReactComponent as Stove } from '../Icons/Heat.svg';
import { ReactComponent as AcUnit } from '../Icons/AcUnit.svg';
import { Context } from '../../Wrapper/Wrapper';
import QuestionDescription from '../../QuestionComponents/QuestionDescription';

type ExpenseType = 'cooling' | 'heating' | 'otherUtilities';

const EXPENSE_OPTIONS: MultiSelectTileOption<ExpenseType>[] = [
  {
    value: 'heating',
    text: <FormattedMessage id="energyCalculator.expenses.question" defaultMessage="Heating" />,
    icon: <Stove className="option-card-icon" />,
  },
  {
    value: 'cooling',
    text: <FormattedMessage id="energyCalculator.expenses.question" defaultMessage="Cooling" />,
    icon: <AcUnit className="option-card-icon" />,
  },
  {
    value: 'otherUtilities',
    text: <FormattedMessage id="energyCalculator.expenses.question" defaultMessage="Other Utilities" />,
    icon: <Housing className="option-card-icon" />,
  },
];

const EXPENSE_TYPES: ['heating', 'cooling', 'otherUtilities'] = ['heating', 'cooling', 'otherUtilities'];

export default function EnergyCalculatorExpenses() {
  const { formData, setFormData } = useContext(Context);
  const { uuid } = useParams();
  const backNavigationFunction = useDefaultBackNavigationFunction('energyCalculatorExpenses');
  const nextStep = useGoToNextStep('energyCalculatorExpenses');
  const { updateScreen } = useScreenApi();

  const formSchema = z.object({
    expenses: z
      .record(z.enum(EXPENSE_TYPES), z.boolean())
      .refine((obj): obj is Required<typeof obj> => EXPENSE_TYPES.every((key) => obj[key] !== undefined)),
  });

  const hasExpense = (expenseName: string) => {
    for (const expense of formData.expenses) {
      if (expense.expenseSourceName === expenseName) {
        return true;
      }
    }

    return false;
  };

  const { handleSubmit, watch, setValue } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expenses: {
        heating: hasExpense('heating'),
        cooling: hasExpense('cooling'),
        otherUtilities: hasExpense('otherUtilities'),
      },
    },
  });

  const createExpense = (expenseName: string): Expense => {
    return {
      expenseSourceName: expenseName,
      expenseAmount: '1',
    };
  };

  const formSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = ({ expenses }) => {
    if (!uuid) {
      throw new Error('no uuid');
    }

    if (!expenses.heating && !expenses.cooling && !expenses.otherUtilities) {
      // TODO: Redirect to no utilities page.
      console.error('no expenses [TODO: redirect to no expenses page]');
      return;
    }

    const updatedExpenses: Expense[] = [];

    for (const [expenseName, hasExpense] of Object.entries(expenses)) {
      if (hasExpense) {
        updatedExpenses.push(createExpense(expenseName));
      }
    }

    console.log(updatedExpenses);

    const updatedFormData: FormData = { ...formData, expenses: updatedExpenses };
    setFormData(updatedFormData);
    updateScreen(updatedFormData);
    nextStep();
  };

  return (
    <div>
      <QuestionHeader>
        <FormattedMessage id="qcc.about_household" defaultMessage="Tell us about your household" />
      </QuestionHeader>
      <QuestionQuestion>
        <FormattedMessage
          id="energyCalculator.expenses.question"
          defaultMessage="Does your household have any of the following expenses?"
        />
      </QuestionQuestion>
      <QuestionDescription>
        <FormattedMessage id="energyCalculator.expenses.description" defaultMessage="Select all that apply." />
      </QuestionDescription>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <MultiSelectTiles
          values={watch('expenses')}
          onChange={(values) => {
            setValue('expenses', values);
          }}
          options={EXPENSE_OPTIONS}
        />
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
    </div>
  );
}
