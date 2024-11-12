import { FormattedMessage, useIntl } from 'react-intl';
import QuestionHeader from '../../QuestionComponents/QuestionHeader';
import HelpButton from '../../HelpBubbleIcon/HelpButton';
import QuestionQuestion from '../../QuestionComponents/QuestionQuestion';
import QuestionDescription from '../../QuestionComponents/QuestionDescription';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Context } from '../../Wrapper/Wrapper';
import { useContext, useEffect } from 'react';
import { useForm, Controller, SubmitHandler, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import PrevAndContinueButtons from '../../PrevAndContinueButtons/PrevAndContinueButtons';
import { useNavigate, useParams } from 'react-router-dom';
import { updateScreen } from '../../../Assets/updateScreen';
import { useGoToNextStep } from '../../QuestionComponents/questionHooks';
import { useConfig } from '../../Config/configHook';
import { FormattedMessageType } from '../../../Types/Questions';
import ErrorMessageWrapper from '../../ErrorMessage/ErrorMessageWrapper';
import CloseButton from '../../CloseButton/CloseButton';
import AddIcon from '@mui/icons-material/Add';
import './Expenses.css';

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

  const oneOrMoreDigitsButNotAllZero = /^(?!0+$)\d+$/;
  const expenseSourceSchema = z.object({
    expenseSourceName: z.string().min(1),
    expenseAmount: z.string().regex(oneOrMoreDigitsButNotAllZero),
  });
  const expenseSourcesSchema = z.array(expenseSourceSchema);
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
    getValues,
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
  const { fields, append, remove, insert, replace } = useFieldArray({
    control,
    name: 'expenses',
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
  }, [getValues('hasExpenses')]);

  const formSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (expensesObject) => {
    const hasExpensesBoolean: boolean = expensesObject.hasExpenses === 'true';
    if (uuid) {
      const updatedFormData = { ...formData, ...expensesObject, hasExpenses: hasExpensesBoolean };
      setFormData(updatedFormData);
      await updateScreen(uuid, updatedFormData, locale);
      nextStep();
    }
  };

  const createExpenseMenuItems = (expenseOptions: Record<string, FormattedMessageType>) => {
    const disabledSelectMenuItem = (
      <MenuItem value="select" key="disabled-select-value" disabled>
        <FormattedMessage id="expenseBlock.createExpenseMenuItems-disabledSelectMenuItemText" defaultMessage="Select" />
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

  const getExpenseSourceLabel = (expenseOptions: Record<string, FormattedMessageType>, expenseSourceName: string) => {
    if (expenseSourceName) {
      return (
        <>
          {' ('}
          {expenseOptions[expenseSourceName]}
          {')'}?
        </>
      );
    }

    return '?';
  };

  const renderExpenseSourceHelperText = () => {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="errorMessage-expenseType" defaultMessage="Please select an expense type" />
      </ErrorMessageWrapper>
    );
  };

  const renderExpenseAmountHelperText = () => {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="errorMessage-greaterThanZero" defaultMessage="Please enter a number greater than 0" />
      </ErrorMessageWrapper>
    );
  };

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
        {fields.map((field, index) => {
          const selectedExpenseSource = watch('expenses')[index].expenseSourceName;
          return (
            <Box className="expense-section-container" key={field.id}>
              {index !== 0 && (
                <div className="delete-button-container">
                  <CloseButton handleClose={() => remove(index)} />
                </div>
              )}
              <Stack className={index % 2 === 0 ? 'expense-section' : ''}>
                <QuestionQuestion>
                  {index === 0 ? (
                    <div className='first-expense-q-padding'>
                      <FormattedMessage
                        id="questions.hasExpenses-a"
                        defaultMessage="What type of expense has your household had most recently?"
                      />
                    </div>
                  ) : (
                    <FormattedMessage
                      id="expenseBlock.createExpenseBlockQuestions-questionLabel"
                      defaultMessage="If you have another expense, select it below."
                    />
                  )}
                </QuestionQuestion>
              </Stack>
              <FormControl
                sx={{ m: 1, minWidth: '13.125rem', maxWidth: '100%' }}
                error={!!errors.expenses?.[index]?.expenseSourceName}
              >
                <InputLabel id={`expense-type-label-${index}`}>
                  <FormattedMessage
                    id="expenseBlock.createExpenseDropdownMenu-expenseTypeInputLabel"
                    defaultMessage="Expense Type"
                  />
                </InputLabel>
                <Controller
                  name={`expenses.${index}.expenseSourceName`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <Select
                        {...field}
                        labelId={`expense-type-label-${index}`}
                        id={`expenses.${index}.expenseSourceName`}
                        label={
                          <FormattedMessage
                            id="expenseBlock.createExpenseDropdownMenu-expenseTypeSelectLabel"
                            defaultMessage="Expense Type"
                          />
                        }
                        sx={{ backgroundColor: '#fff' }}
                      >
                        {createExpenseMenuItems(expenseOptions)}
                      </Select>
                      {!!errors.expenses?.[index]?.expenseSourceName && (
                        <FormHelperText sx={{ marginLeft: 0 }}>{renderExpenseSourceHelperText()}</FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>
              <div className="expense-margin-bottom">
                <QuestionQuestion>
                  <FormattedMessage
                    id="expenseBlock.createExpenseAmountTextfield-questionLabel"
                    defaultMessage="How much is this expense every month "
                  />
                  {getExpenseSourceLabel(expenseOptions, selectedExpenseSource)}
                </QuestionQuestion>
                <div className="expense-block-textfield">
                  <Controller
                    name={`expenses.${index}.expenseAmount`}
                    control={control}
                    render={({ field }) => (
                      <>
                        <TextField
                          {...field}
                          label={
                            <FormattedMessage
                              id="expenseBlock.createExpenseAmountTextfield-amountLabel"
                              defaultMessage="Amount"
                            />
                          }
                          variant="outlined"
                          sx={{ backgroundColor: '#fff' }}
                          error={!!errors.expenses?.[index]?.expenseAmount}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            sx: { backgroundColor: '#FFFFFF' },
                          }}
                        />
                        {!!errors.expenses?.[index]?.expenseAmount && (
                          <FormHelperText sx={{ marginLeft: 0 }}>{renderExpenseAmountHelperText()}</FormHelperText>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
            </Box>
          );
        })}
        {hasTruthyExpenses && (
          <Button
            variant="outlined"
            onClick={() =>
              append({
                expenseSourceName: '',
                expenseAmount: '',
              })
            }
            startIcon={<AddIcon />}
            type="button"
          >
            <FormattedMessage id="expenseBlock.return-addExpenseButton" defaultMessage="Add another expense" />
          </Button>
        )}
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
    </div>
  );
};

export default Expenses;
