import { FormattedMessage, useIntl } from "react-intl";
import QuestionHeader from "../QuestionComponents/QuestionHeader";
import HelpButton from "../HelpBubbleIcon/HelpButton";
import QuestionQuestion from "../QuestionComponents/QuestionQuestion";
import QuestionDescription from "../QuestionComponents/QuestionDescription";
import { Box, FormControlLabel, Radio, RadioGroup, Stack } from "@mui/material";
import { Context } from "../Wrapper/Wrapper";
import { useContext } from "react";
import { useForm, Controller, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import PrevAndContinueButtons from "../PrevAndContinueButtons/PrevAndContinueButtons";
import { useNavigate, useParams } from "react-router-dom";
import { updateScreen } from "../../Assets/updateScreen";
import { useGoToNextStep } from "../QuestionComponents/questionHooks";

const Expenses = () => {
  const { formData, setFormData, locale } = useContext(Context);
  const { uuid, id } = useParams();
  const currentStepId = Number(id);
  const navigate = useNavigate();
  const intl = useIntl();
  const translatedAriaLabel = intl.formatMessage({
    id: 'questions.hasExpenses-ariaLabel',
    defaultMessage: 'has expenses',
  });
  const backNavigationFunction = () => navigate(`/${uuid}/step-${currentStepId - 1}/${formData.householdSize}`);
  const nextStep = useGoToNextStep('hasExpenses');


  const expenseSourceSchema = z.object({
      expenseSourceName: z.string(),
      expenseAmount: z.string()
  });
  const expenseSourcesSchema = z.array(expenseSourceSchema)
  const hasExpensesSchema = z.string().transform((value) => value === 'true');
  const formSchema = z.object({
    hasExpenses: hasExpensesSchema,
    expenses: expenseSourcesSchema,
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    getValues
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasExpenses: formData.hasExpenses ?? false,
      expenses: formData.expenses ?? [
        {
          expenseSourceName: '',
          expenseAmount: '',
        },
      ],
    },
  });
  const watchHasExpenses = watch('hasExpenses');
  // @ts-ignore
  const hasTruthyExpenses = watchHasExpenses === 'true' || watchHasExpenses === true;
  const { fields, append, prepend, remove, move, insert } = useFieldArray({
    control,
    name: 'expenses'
  })

  const formSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (expensesObject) => {
    // console.log({expensesObject})
    // console.log(`in form submit handler`)
    if (uuid) {
      const updatedFormData = { ...formData, ...expensesObject };
      setFormData(updatedFormData);
      await updateScreen(uuid, updatedFormData, locale);
      nextStep();
    }
  }

  return (
    <div>
      <QuestionHeader>
        <FormattedMessage id="qcc.about_household" defaultMessage="Tell us about your household" />
      </QuestionHeader>
      <QuestionQuestion>
        <div style={{ verticalAlign: 'middle' }}>
          <FormattedMessage id="questions.hasExpenses" defaultMessage="Does your household have any expenses?" />
          <HelpButton
            helpText="Add up expenses for everyone who lives in your home. This includes costs like child care, child support, rent, medical expenses, heating bills, and more. We will ask only about expenses that may affect benefits. We will not ask about expenses such as food since grocery bills do not affect benefits."
            helpId="questions.hasExpenses-description"
          />
        </div>
      </QuestionQuestion>
      <QuestionDescription>
        <FormattedMessage
          id="questions.hasExpenses-description-additional"
          defaultMessage="Expenses can affect benefits! We can be more accurate if you tell us key expenses like your rent or mortgage, utilities, and child care."
        />
      </QuestionDescription>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Controller
          name="hasExpenses"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <RadioGroup {...field} aria-labelledby={translatedAriaLabel}>
              <FormControlLabel
                value={true}
                control={<Radio />}
                label={<FormattedMessage id="radiofield.label-yes" defaultMessage="Yes" />}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label={<FormattedMessage id="radiofield.label-no" defaultMessage="No" />}
              />
            </RadioGroup>
          )}
        />
        {hasTruthyExpenses && (
          <>
            <Box className="section-container">
              <Stack className="section">
                <div className="expense-padding-top">
                  <QuestionQuestion>
                    <FormattedMessage
                      id="questions.hasExpenses-a"
                      defaultMessage="What type of expense has your household had most recently?"
                    />
                  </QuestionQuestion>
                </div>
              </Stack>
            </Box>

          </>
        )}
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
    </div>
  );
}

export default Expenses;
