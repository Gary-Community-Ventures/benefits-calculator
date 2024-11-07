import { FormattedMessage, useIntl } from "react-intl";
import QuestionHeader from "../QuestionComponents/QuestionHeader";
import HelpButton from "../HelpBubbleIcon/HelpButton";
import QuestionQuestion from "../QuestionComponents/QuestionQuestion";
import QuestionDescription from "../QuestionComponents/QuestionDescription";
import { Box, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack } from "@mui/material";
import { Context } from "../Wrapper/Wrapper";
import { useContext, useEffect } from "react";
import { useForm, Controller, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import PrevAndContinueButtons from "../PrevAndContinueButtons/PrevAndContinueButtons";
import { useNavigate, useParams } from "react-router-dom";
import { updateScreen } from "../../Assets/updateScreen";
import { useGoToNextStep } from "../QuestionComponents/questionHooks";
import { DevTool } from '@hookform/devtools';
import { useConfig } from "../Config/configHook";
import { FormattedMessageType } from "../../Types/Questions";

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
  const expenseOptions = useConfig('expense_options');


  const oneOrMoreDigitsButNotAllZero = /^(?!0+$)\d+$/
  const expenseSourceSchema = z.object({
      expenseSourceName: z.string().min(1),
      expenseAmount: z.string().regex(oneOrMoreDigitsButNotAllZero)
  });
  const expenseSourcesSchema = z.array(expenseSourceSchema)
  const hasExpensesSchema = z.string().regex(/^true|false$/);
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
      hasExpenses: formData.hasExpenses ? 'true' : 'false',
      expenses: formData.expenses ?? [],
    },
  });
  const watchHasExpenses = watch('hasExpenses');
  // @ts-ignore
  const hasTruthyExpenses = watchHasExpenses === 'true' || watchHasExpenses === true;
  const { fields, append, prepend, remove, move, insert, replace } = useFieldArray({
    control,
    name: 'expenses'
  });

  useEffect(() => {
    const noExpensesAreListed = Number(getValues('expenses').length) === 0;
    if (hasTruthyExpenses && noExpensesAreListed) {
      append({
        expenseSourceName: '',
        expenseAmount: '',
      });
    }

    if (!hasTruthyExpenses) {
      replace([]);
    }

  }, [getValues('hasExpenses')])

  const formSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (expensesObject) => {
    const hasExpensesBoolean: boolean = expensesObject.hasExpenses === 'true';
    if (uuid) {
      const updatedFormData = { ...formData, ...expensesObject, hasExpenses: hasExpensesBoolean };
      setFormData(updatedFormData);
      await updateScreen(uuid, updatedFormData, locale);
      nextStep();
    }
  }

    const createExpenseMenuItems = (expenseOptions: Record<string, FormattedMessageType>) => {
      const disabledSelectMenuItem = (
        <MenuItem value="select" key="disabled-select-value" disabled>
          <FormattedMessage
            id="expenseBlock.createExpenseMenuItems-disabledSelectMenuItemText"
            defaultMessage="Select"
          />
        </MenuItem>
      );

      const menuItemKeys = Object.keys(expenseOptions);
      const menuItemLabels = Object.values(expenseOptions);

      const menuItems = menuItemKeys.map((menuItemKey, i) => {
        return (
          <MenuItem value={menuItemKey} key={menuItemKey}>
            {menuItemLabels[i]}
          </MenuItem>
        );
      });

      return [disabledSelectMenuItem, menuItems];
    };

  const renderExpenseSourceHelperText = () => {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="errorMessage-expenseType" defaultMessage="Please select an expense type" />
      </ErrorMessageWrapper>
    );
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
            {fields.map((field, index) => {
              return (
                //TODO: expense amount textfield
                <div key={field.id}>
                  {/* {error={errors.expenses !== undefined}} inside of the FormControl */}
                  <FormControl sx={{ m: 1, minWidth: '13.125rem', maxWidth: '100%', backgroundColor: '#fff' }}>
                    <InputLabel id="expense-type-label">
                      <FormattedMessage
                        id="expenseBlock.createExpenseDropdownMenu-expenseTypeInputLabel"
                        defaultMessage="Expense Type"
                      />
                    </InputLabel>
                    <Controller
                      name={`expenses.${index}.expenseSourceName`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <Select
                            {...field}
                            labelId="expense-type-label"
                            id={`expenses.${index}.expenseSourceName`}
                            label={
                              <FormattedMessage
                                id="expenseBlock.createExpenseDropdownMenu-expenseTypeSelectLabel"
                                defaultMessage="Expense Type"
                              />
                            }
                          >
                            {createExpenseMenuItems(expenseOptions)}
                          </Select>
                          {/* <FormHelperText>{errors.expenses !== undefined && renderExpensesHelperText()}</FormHelperText> */}
                        </>
                      )}
                    />
                  </FormControl>
                </div>
              );
            })}
          </>
        )}
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default Expenses;
