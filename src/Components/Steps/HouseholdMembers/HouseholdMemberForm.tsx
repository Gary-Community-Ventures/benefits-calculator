import { FormattedMessage, useIntl } from 'react-intl';
import QuestionHeader from '../../QuestionComponents/QuestionHeader';
import HHMSummaryCards from './HHMSummaryCards';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../Wrapper/Wrapper';
import { ReactNode, useContext, useEffect, useMemo } from 'react';
import { Conditions, HealthInsurance, HouseholdData } from '../../../Types/FormData';
import { Autocomplete, Box, Button, FormControl, FormControlLabel, FormHelperText, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from '@mui/material';
import QuestionQuestion from '../../QuestionComponents/QuestionQuestion';
import { useStepNumber } from '../../../Assets/stepDirectory';
import '../../HouseholdDataBlock/HouseholdDataBlock.css';
import * as z from 'zod';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { updateScreen } from '../../../Assets/updateScreen';
import { useGoToNextStep } from '../../QuestionComponents/questionHooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { MONTHS } from './MONTHS';
import PrevAndContinueButtons from '../../PrevAndContinueButtons/PrevAndContinueButtons';
import ErrorMessageWrapper from '../../ErrorMessage/ErrorMessageWrapper';
import RHFOptionCardGroup from '../../RHFComponents/RHFOptionCardGroup';
import { useConfig } from '../../Config/configHook';
import QuestionDescription from '../../QuestionComponents/QuestionDescription';
import { FormattedMessageType } from '../../../Types/Questions';
import HelpButton from '../../HelpBubbleIcon/HelpButton';
import AddIcon from '@mui/icons-material/Add';
import { createMenuItems } from '../SelectHelperFunctions/SelectHelperFunctions';
import CloseButton from '../../CloseButton/CloseButton';
import { renderBirthMonthHelperText, renderBirthYearHelperText, renderHealthInsuranceHelperText, renderRelationshipToHHHelperText, renderIncomeFrequencyHelperText, renderHoursWorkedHelperText, renderIncomeAmountHelperText } from './HelperTextFunctions';
import './PersonIncomeBlock.css';

const HouseholdMemberForm = () => {
  const { formData, setFormData, locale } = useContext(Context);
  const { uuid, page } = useParams();
  const navigate = useNavigate();
  const intl = useIntl();
  const pageNumber = Number(page);
  const currentMemberIndex = pageNumber - 1;
  const householdMemberFormData = formData.householdData[currentMemberIndex];
  const healthInsuranceOptions =
    useConfig<Record<keyof HealthInsurance, { text: FormattedMessageType; icon: ReactNode }>>('health_insurance_options');
  const conditionOptions =
    useConfig<Record<keyof Conditions, { text: FormattedMessageType; icon: ReactNode }>>('condition_options');
  const relationshipOptions =
    useConfig<Record<string,FormattedMessageType>>('relationship_options');
  const incomeOptions = useConfig<Record<string,FormattedMessageType>>('income_options');
  const incomeStreamsMenuItems = createMenuItems(
    incomeOptions,
    <FormattedMessage id="personIncomeBlock.createMenuItems-disabledSelectMenuItem" defaultMessage="Select" />,
  );
  const frequencyOptions = useConfig<Record<string,FormattedMessageType>>('frequency_options');
  const frequencyMenuItems = createMenuItems(
      frequencyOptions,
      <FormattedMessage
        id="personIncomeBlock.createFrequencyMenuItems-disabledSelectMenuItem"
        defaultMessage="Select"
      />
    );

  const currentStepId = useStepNumber('householdData', formData.immutableReferrer);
  const backNavigationFunction = (uuid: string, currentStepId: number, pageNumber: number) => {
    if (pageNumber <= 1) {
      navigate(`/${formData.whiteLabel}/${uuid}/step-${currentStepId - 1}`);
    } else {
      navigate(`/${formData.whiteLabel}/${uuid}/step-${currentStepId}/${pageNumber - 1}`);
    }
  };
  const nextStep = useGoToNextStep('householdData', `${pageNumber + 1}`);

  const date = new Date();
  const CURRENT_YEAR = date.getFullYear();
  const MAX_AGE = 130;
  const YEARS = Array.from({ length: MAX_AGE }, (_, i) => {
    const inputYear = CURRENT_YEAR - i;
    return String(inputYear);
  });
  // I added an empty string to the years array to fix the initial invalid Autocomplete value warning
  const YEARSANDINITIALEMPTYSTR = ['', ...YEARS];

  const autoCompleteOptions = useMemo(() => {
    return YEARSANDINITIALEMPTYSTR.map((year) => {
      return { label: String(year) };
    });
  }, [YEARS]);

  // birthYear > CURRENT_YEAR || birthYear < CURRENT_YEAR - MAX_AGE;
  const oneOrMoreDigitsButNotAllZero = /^(?!0+$)\d+$/;
  const incomeSourcesSchema = z.object({
    incomeStreamName:  z.string().min(1),
    incomeFrequency: z.string().min(1),
    hoursPerWeek: z.string().regex(oneOrMoreDigitsButNotAllZero),
    incomeAmount: z.string().regex(oneOrMoreDigitsButNotAllZero),
  });
  const incomeStreamsSchema = z.array(incomeSourcesSchema);
  const hasIncomeSchema = z.string().regex(/^true|false$/);

  const formSchema = z.object({
    /*
    z.string().min(1) validates that an option was selected.
    The default value of birthMonth is '' when no option is selected.
    The possible values that can be selected are '1', '2', ..., '12',
    so if one of those options are selected,
    then birthMonth would have a minimum string length of 1 which passes validation.
    */
    birthMonth: z.string().min(1),
    birthYear: z.string().trim().min(4),
    healthInsurance: z
      .object({
        none: z.boolean(),
        employer: z.boolean(),
        private: z.boolean(),
        medicaid: z.boolean(),
        medicare: z.boolean(),
        chp: z.boolean(),
        emergency_medicaid: z.boolean(),
        family_planning: z.boolean(),
        va: z.boolean(),
      })
      .refine((insuranceOptions) => Object.values(insuranceOptions).some((option) => option === true), {
        message: 'Please select at least one health insurance option.',
        path: ['healthInsurance'],
        //TODO: make sure that this only shows up for the person at this index
      }),
    conditions: z.object({
      student: z.boolean(),
      pregnant: z.boolean(),
      blindOrVisuallyImpaired: z.boolean(),
      disabled: z.boolean(),
      longTermDisability: z.boolean(),
    }),
    relationshipToHH: z.string().refine((value) => [...Object.keys(relationshipOptions)].includes(value) || pageNumber === 1),
    hasIncome: hasIncomeSchema,
    incomeStreams: incomeStreamsSchema,
  });
  type FormSchema = z.infer<typeof formSchema>;

  const determineDefaultRelationshipToHH = (householdMemberFormData: HouseholdData | undefined) => {
    if (householdMemberFormData && householdMemberFormData.relationshipToHH) {
      return householdMemberFormData.relationshipToHH;
    } else if (pageNumber === 1) {
      return 'headOfHousehold'
    } else {
      return ''
    }
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    reset
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthMonth: householdMemberFormData?.birthMonth ? String(householdMemberFormData.birthMonth) : '',
      birthYear: householdMemberFormData?.birthYear ? String(householdMemberFormData.birthYear) : '',
      healthInsurance: householdMemberFormData?.healthInsurance ? householdMemberFormData.healthInsurance : {
        none: false,
        employer: false,
        private: false,
        medicaid: false,
        medicare: false,
        chp: false,
        emergency_medicaid: false,
        family_planning: false,
        va: false,
      },
      conditions: {
        student: false,
        pregnant: false,
        blindOrVisuallyImpaired: false,
        disabled: false,
        longTermDisability: false,
      },
      relationshipToHH: determineDefaultRelationshipToHH(householdMemberFormData),
      hasIncome: 'false',
      incomeStreams: householdMemberFormData?.incomeStreams ?? []
    }
  });
  const watchHasIncome = watch('hasIncome');
  const hasTruthyIncome = watchHasIncome === 'true';
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'incomeStreams',
  });

  useEffect(() => {
    const noIncomeStreamsAreListed = Number(getValues('incomeStreams').length === 0);
    if (hasTruthyIncome && noIncomeStreamsAreListed) {
      append({
        incomeStreamName: '',
        incomeAmount: '',
        incomeFrequency: '',
        hoursPerWeek: '',
      });
    }

    if (!hasTruthyIncome) {
      replace([]);
    }

  }, [watchHasIncome]);

  const formSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = (memberData) => {
    if (!uuid) return;

    const currentMemberDataAtThisIndex = householdMemberFormData;
    if (currentMemberDataAtThisIndex) {
      // if we have data at this index then replace it
      const updatedHouseholdData = [...formData.householdData].map((currentMemberData, index) => {
        if (index === currentMemberIndex) {
          return memberData;
        } else {
          return currentMemberData;
        }
      });

      const updatedFormData = { ...formData, householdData: updatedHouseholdData };
      setFormData(updatedFormData);
      updateScreen(uuid, updatedFormData, locale);
    } else {
      // if there is no data at this index then we need to push it to the array
      const copyOfHouseholdData = [...formData.householdData];
      copyOfHouseholdData.push(memberData);
      const updatedFormData = { ...formData, householdData: copyOfHouseholdData };
      setFormData(updatedFormData);
      updateScreen(uuid, updatedFormData, locale);
    }

    nextStep();
    // if (pageNumber < formData.householdSize) {
    //   // reset the form when moving to the next person
    //   reset();
    // }
  };


  const createAgeQuestion = (personIndex: number) => {
    return (
      <Box sx={{ marginBottom: '1.5rem' }}>
        <QuestionQuestion>
          {personIndex === 1 ? (
            <FormattedMessage
              id="householdDataBlock.createAgeQuestion-how-headOfHH"
              defaultMessage="Please enter your month and year of birth"
            />
          ) : (
            <FormattedMessage
              id="householdDataBlock.createAgeQuestion-how"
              defaultMessage="Please enter their month and year of birth"
            />
          )}
        </QuestionQuestion>
        <div className="age-input-container">
          <FormControl
            sx={{ mt: 1, mb: 2, minWidth: '13.125rem', maxWidth: '100%' }}
            error={errors.birthMonth !== undefined}
          >
            <InputLabel id="birth-month">
              <FormattedMessage id="ageInput.month.label" defaultMessage="Birth Month" />
            </InputLabel>
            <Controller
              name="birthMonth"
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    labelId="birth-month"
                    label={<FormattedMessage id="ageInput.month.label" defaultMessage="Birth Month" />}
                  >
                    {Object.entries(MONTHS).map(([key, value]) => {
                      return (
                        <MenuItem value={String(key)} key={key}>
                          {value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.birthMonth !== undefined && <FormHelperText sx={{ marginLeft: 0 }}>{renderBirthMonthHelperText()}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
          <FormControl
            sx={{ mt: 1, mb: 2, minWidth: '13.125rem', maxWidth: '100%' }}
            error={errors.birthYear !== undefined}
          >
            <Controller
              name="birthYear"
              control={control}
              render={({ field }) => (
                <>
                  <Autocomplete
                    {...field}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                    options={autoCompleteOptions}
                    getOptionLabel={(option) => option.label ?? ''}
                    value={{ label: field.value }}
                    onChange={(_, newValue) => {
                      field.onChange(newValue?.label);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={<FormattedMessage id="ageInput.year.label" defaultMessage="Birth Year" />}
                        error={errors.birthYear !== undefined}
                      />
                    )}
                  />
                  {errors.birthYear !== undefined && <FormHelperText sx={{ marginLeft: 0 }}>{renderBirthYearHelperText()}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </div>
      </Box>
    );
  };

  const displayHealthCareQuestion = (page:number) => {
    if (page === 1) {
      return (
        <QuestionQuestion>
          <FormattedMessage
            id="questions.healthInsurance-you"
            defaultMessage="Which type of health insurance do you have?"
          />
        </QuestionQuestion>
      );
    } else {
      return (
        <QuestionQuestion>
          <FormattedMessage
            id="questions.healthInsurance-they"
            defaultMessage="What type of health insurance do they have?"
          />
        </QuestionQuestion>
      );
    }
  };

  const displayHealthInsuranceBlock = (pageNumber: number, healthInsuranceOptions: any) => {
    return (
      <Box className="section-container">
        <Stack sx={{ padding: '3rem 0' }} className="section">
          {displayHealthCareQuestion(pageNumber)}
          <RHFOptionCardGroup
            fields={watch('healthInsurance')}
            setValue={setValue}
            name="healthInsurance"
            options={pageNumber === 1 ? healthInsuranceOptions.you : healthInsuranceOptions.them}
            triggerValidation={trigger}
          />
          {errors.healthInsurance !== undefined && <FormHelperText sx={{ marginLeft: 0 }}>{renderHealthInsuranceHelperText()}</FormHelperText>}
        </Stack>
      </Box>
    );
  };

  const displayConditionsQuestion = (
    pageNumber: number,
    conditionOptions) => {
    const formattedMsgId =
      pageNumber === 1
        ? 'householdDataBlock.createConditionsQuestion-do-these-apply-to-you'
        : 'householdDataBlock.createConditionsQuestion-do-these-apply';

    const formattedMsgDefaultMsg = pageNumber === 1 ? 'Do any of these apply to you?' : 'Do any of these apply to them?';

    return (
      <Box sx={{ margin: '3rem 0' }}>
        <QuestionQuestion>
          <FormattedMessage id={formattedMsgId} defaultMessage={formattedMsgDefaultMsg} />
        </QuestionQuestion>
        <QuestionDescription>
          <FormattedMessage
            id="householdDataBlock.createConditionsQuestion-pick"
            defaultMessage="Choose all that apply."
          />
        </QuestionDescription>
        <RHFOptionCardGroup
          fields={watch('conditions')}
          setValue={setValue}
          name="conditions"
          options={pageNumber === 1 ? conditionOptions.you : conditionOptions.them}
        />
      </Box>
    );
  };

  const createHOfHRelationQuestion = (relationshipOptions: Record<string, FormattedMessageType>) => {
    return (
      <Box sx={{ marginBottom: '1.5rem' }}>
        <QuestionQuestion>
          <FormattedMessage
            id="householdDataBlock.createHOfHRelationQuestion-relation"
            defaultMessage="What is this person’s relationship to you?"
          />
        </QuestionQuestion>
        <FormControl
          sx={{ mt: 1, mb: 2, minWidth: '13.125rem', maxWidth: '100%' }}
          error={errors.relationshipToHH !== undefined}
        >
          <InputLabel id="relation-to-hh-label">
            <FormattedMessage
              id="householdDataBlock.createDropdownCompProps-inputLabelText"
              defaultMessage="Relation"
            />
          </InputLabel>
          <Controller
            name="relationshipToHH"
            control={control}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  labelId="relationship-To-HH"
                  label={
                    <FormattedMessage
                      id="householdDataBlock.createDropdownCompProps-label"
                      defaultMessage="Relation Type"
                    />
                  }
                >
                  {Object.entries(relationshipOptions).map(([key, value]) => {
                    return (
                      <MenuItem value={key} key={key}>
                        {value}
                      </MenuItem>
                    );
                  })}
                </Select>
                {errors.relationshipToHH !== undefined && (
                  <FormHelperText sx={{ marginLeft: 0 }}>{renderRelationshipToHHHelperText()}</FormHelperText>
                )}
              </>
            )}
          />
        </FormControl>
      </Box>
    );
  };

  const createIncomeRadioQuestion = (index:number) => {
    const translatedAriaLabel = intl.formatMessage({
      id: 'householdDataBlock.createIncomeRadioQuestion-ariaLabel',
      defaultMessage: 'has an income',
    });

    const formattedMsgId =
      index === 1 ? 'questions.hasIncome' : 'householdDataBlock.createIncomeRadioQuestion-questionLabel';

    const formattedMsgDefaultMsg =
      index === 1
        ? 'Do you have an income?'
        : 'Does this individual in your household have significant income you have not already included?';

    return (
      <Box className="section-container" sx={{ paddingTop: '3rem' }}>
        <Box className="section">
          <QuestionQuestion>
            <FormattedMessage id={formattedMsgId} defaultMessage={formattedMsgDefaultMsg} />
            <HelpButton
              helpText="This includes money from jobs, alimony, investments, or gifts. Income is the money earned or received before deducting taxes"
              helpId="householdDataBlock.createIncomeRadioQuestion-questionDescription"
            />
          </QuestionQuestion>
          <Controller
            name="hasIncome"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <RadioGroup {...field} aria-labelledby={translatedAriaLabel} sx={{ marginBottom: '1rem' }}>
                <FormControlLabel
                  value={'true'}
                  control={<Radio />}
                  label={<FormattedMessage id="radiofield.label-yes" defaultMessage="Yes" />}
                />
                <FormControlLabel
                  value={'false'}
                  control={<Radio />}
                  label={<FormattedMessage id="radiofield.label-no" defaultMessage="No" />}
                />
              </RadioGroup>
            )}
          />
        </Box>
      </Box>
    );
  }
  const renderIncomeStreamNameHelperText = () => {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="errorMessage-incomeType" defaultMessage="Please select an income type" />
      </ErrorMessageWrapper>
    );
  };

  const renderIncomeStreamNameSelect = (index: number) => {
    return (
      <FormControl
        sx={{ minWidth: '13.125rem', maxWidth: '100%' }}
        error={errors.incomeStreams?.[index]?.incomeStreamName !== undefined}
      >
        <InputLabel id={`income-type-label-${index}`}>
          <FormattedMessage
            id="personIncomeBlock.createIncomeStreamsDropdownMenu-inputLabel"
            defaultMessage="Income Type"
          />
        </InputLabel>
        <Controller
          name={`incomeStreams.${index}.incomeStreamName`}
          control={control}
          render={({ field }) => (
            <>
              <Select
                {...field}
                labelId={`income-type-label-${index}`}
                id={`incomeStreams.${index}.incomeStreamName`}
                label={
                  <FormattedMessage
                    id="personIncomeBlock.createIncomeStreamsDropdownMenu-inputLabel"
                    defaultMessage="Income Type"
                  />
                }
                sx={{ backgroundColor: '#fff' }}
              >
                {incomeStreamsMenuItems}
              </Select>
              {errors.incomeStreams?.[index]?.incomeStreamName !== undefined && (
                <FormHelperText sx={{ marginLeft: 0 }}>{renderIncomeStreamNameHelperText()}</FormHelperText>
              )}
            </>
          )}
        />
      </FormControl>
    );
  };

  const getIncomeStreamSourceLabel = (incomeOptions: Record<string, FormattedMessageType>, incomeStreamName:string) => {
    if (incomeStreamName) {
      return (
        <>
          {'('}
          {incomeOptions[incomeStreamName]}
          {')'}?
        </>
      );
    }

    return '?';
  };

  const renderIncomeFrequencySelect  = (incomeOptions: Record<string, FormattedMessageType>, selectedIncomeSource: string, index:number, pageNumber: number) => {
    let formattedMsgId = 'personIncomeBlock.createIncomeStreamFrequencyDropdownMenu-youQLabel';
    let formattedMsgDefaultMsg = 'How often are you paid this income ';
    if (pageNumber !== 1) {
      formattedMsgId = 'personIncomeBlock.createIncomeStreamFrequencyDropdownMenu-questionLabel';
      formattedMsgDefaultMsg = 'How often are they paid this income ';
    }

    return (
      <div>
        <div className="income-margin-bottom">
          <QuestionQuestion>
            <FormattedMessage id={formattedMsgId} defaultMessage={formattedMsgDefaultMsg} />
            {getIncomeStreamSourceLabel(incomeOptions, selectedIncomeSource)}
            <HelpButton
              helpText='"Every 2 weeks" means you get paid every other week. "Twice a month" means you get paid two times a month on the same dates each month.'
              helpId="personIncomeBlock.income-freq-help-text"
            />
          </QuestionQuestion>
        </div>
        <>
          <FormControl
            sx={{ minWidth: '13.125rem', maxWidth: '100%' }}
            error={errors.incomeStreams?.[index]?.incomeFrequency !== undefined}
          >
            <InputLabel id={`income-frequency-label-${index}`}>
              <FormattedMessage
                id="personIncomeBlock.createIncomeStreamFrequencyDropdownMenu-freqLabel"
                defaultMessage="Frequency"
              />
            </InputLabel>
            <Controller
              name={`incomeStreams.${index}.incomeFrequency`}
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    labelId={`income-frequency-label-${index}`}
                    id={`incomeStreams.${index}.incomeFrequency`}
                    label={
                      <FormattedMessage
                        id="personIncomeBlock.createIncomeStreamFrequencyDropdownMenu-freqLabel"
                        defaultMessage="Frequency"
                      />
                    }
                    sx={{ backgroundColor: '#fff' }}
                  >
                    {frequencyMenuItems}
                  </Select>
                  {errors.incomeStreams?.[index]?.incomeFrequency !== undefined && (
                    <FormHelperText sx={{ marginLeft: 0 }}>{renderIncomeFrequencyHelperText()}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </>
      </div>
    );
  }

  const renderHoursPerWeekTextfield  = (page:number, index:number, selectedIncomeSource:string) => {
    let formattedMsgId = 'personIncomeBlock.createHoursWorkedTextfield-youQLabel';
    let formattedMsgDefaultMsg = 'How many hours do you work per week ';

    if (page !== 1) {
      formattedMsgId = 'personIncomeBlock.createHoursWorkedTextfield-questionLabel';
      formattedMsgDefaultMsg = 'How many hours do they work per week ';
    }

    return (
      <>
        <div className="income-margin-bottom">
          <QuestionQuestion>
            <FormattedMessage id={formattedMsgId} defaultMessage={formattedMsgDefaultMsg} />
            {getIncomeStreamSourceLabel(incomeOptions, selectedIncomeSource)}
          </QuestionQuestion>
        </div>
        <Controller
          name={`incomeStreams.${index}.hoursPerWeek`}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <TextField
                {...field}
                label={
                  <FormattedMessage id="incomeBlock.createHoursWorkedTextfield-amountLabel" defaultMessage="Hours" />
                }
                variant="outlined"
                sx={{ backgroundColor: '#fff' }}
                error={errors.incomeStreams?.[index]?.hoursPerWeek !== undefined}
              />
              {errors.incomeStreams?.[index]?.hoursPerWeek !== undefined && (
                <FormHelperText sx={{ marginLeft: 0 }}>{renderHoursWorkedHelperText()}</FormHelperText>
              )}
            </>
          )}
        />
      </>
    );
  }

  const renderIncomeAmountTextfield = (page: number, index: number, selectedIncomeFrequency: string, selectedIncomeStreamSource:string) => {
    let questionHeader;

    if (selectedIncomeFrequency === 'hourly') {
      let hourlyFormattedMsgId = 'incomeBlock.createIncomeAmountTextfield-hourly-questionLabel';
      let hourlyFormattedMsgDefaultMsg = 'What is your hourly rate ';

      if (page !== 1) {
        hourlyFormattedMsgId = 'personIncomeBlock.createIncomeAmountTextfield-hourly-questionLabel';
        hourlyFormattedMsgDefaultMsg = 'What is their hourly rate ';
      }

      questionHeader = <FormattedMessage id={hourlyFormattedMsgId} defaultMessage={hourlyFormattedMsgDefaultMsg} />;
    } else {
      let payPeriodFormattedMsgId = 'incomeBlock.createIncomeAmountTextfield-questionLabel';
      let payPeriodFormattedMsgDefaultMsg = 'How much do you receive before taxes each pay period for ';

      if (page !== 1) {
        payPeriodFormattedMsgId = 'personIncomeBlock.createIncomeAmountTextfield-questionLabel';
        payPeriodFormattedMsgDefaultMsg = 'How much do they receive before taxes each pay period for ';
      }

      questionHeader = (
        <FormattedMessage id={payPeriodFormattedMsgId} defaultMessage={payPeriodFormattedMsgDefaultMsg} />
      );
    }

    return (
      <div>
        <div className="income-textfield-margin-bottom">
          <QuestionQuestion>
            {questionHeader}
            {getIncomeStreamSourceLabel(incomeOptions, selectedIncomeStreamSource)}
          </QuestionQuestion>
        </div>
        <Controller
          name={`incomeStreams.${index}.incomeAmount`}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <TextField
                {...field}
                label={
                  <FormattedMessage
                    id="personIncomeBlock.createIncomeAmountTextfield-amountLabel"
                    defaultMessage="Amount"
                  />
                }
                variant="outlined"
                sx={{ backgroundColor: '#fff' }}
                error={errors.incomeStreams?.[index]?.incomeAmount !== undefined}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  sx: { backgroundColor: '#FFFFFF' },
                }}
              />
              {errors.incomeStreams?.[index]?.incomeAmount !== undefined && (
                <FormHelperText sx={{ marginLeft: 0 }}>{renderIncomeAmountHelperText()}</FormHelperText>
              )}
            </>
          )}
        />
      </div>
    );
  };

  const renderAdditionalIncomeBlockQ = (page:number) => {
    let formattedMsgId = 'incomeBlock.createIncomeBlockQuestions-questionLabel';
    let formattedMsgDefaultMsg = 'If you receive another type of income, select it below.';

    if (page !== 1) {
      formattedMsgId = 'personIncomeBlock.createIncomeBlockQuestions-questionLabel';
      formattedMsgDefaultMsg = 'If they receive another type of income, select it below.';
    }

    return (
      <div className="income-margin-bottom">
        <QuestionQuestion>
          <span className="income-stream-q-padding">
            <FormattedMessage id={formattedMsgId} defaultMessage={formattedMsgDefaultMsg} />
          </span>
        </QuestionQuestion>
      </div>
    );
  };

  const renderFirstIncomeBlockQ = (pageNumber: number) => {
    let formattedMsgId = 'questions.hasIncome-a';
    let formattedMsgDefaultMsg = 'What type of income have you had most recently?';

    if (pageNumber !== 1) {
      formattedMsgId = 'personIncomeBlock.return-questionLabel';
      formattedMsgDefaultMsg = 'What type of income have they had most recently?';
    }

    return (
      <div className="section">
        <QuestionQuestion>
          <FormattedMessage
            id={formattedMsgId}
            defaultMessage={formattedMsgDefaultMsg}
          />
          <HelpButton
            helpText="Answer the best you can. You will be able to include additional types of income. The more you include, the more accurate your results will be."
            helpId="personIncomeBlock.return-questionDescription"
          />
        </QuestionQuestion>
      </div>
    );
  }

  return (
    <main className="benefits-form">
      <QuestionHeader>
        {pageNumber === 1 ? (
          <FormattedMessage id="householdDataBlock.questionHeader" defaultMessage="Tell us about yourself." />
        ) : (
          <FormattedMessage
            id="questions.householdData"
            defaultMessage="Tell us about the next person in your household."
          />
        )}
      </QuestionHeader>
      <HHMSummaryCards
        activeMemberData={getValues()}
        page={pageNumber}
        formData={formData}
        uuid={uuid}
        step={currentStepId}
        triggerValidation={trigger}
      />
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        {createAgeQuestion(pageNumber)}
        {pageNumber !== 1 && createHOfHRelationQuestion(relationshipOptions)}
        {displayHealthInsuranceBlock(pageNumber, healthInsuranceOptions)}
        {displayConditionsQuestion(pageNumber, conditionOptions)}
        <div>
          <Stack sx={{ margin: '3rem 0' }}>
            {createIncomeRadioQuestion(pageNumber)}
            {fields.map((field, index) => {
                const selectedIncomeStreamSource = watch('incomeStreams')[index].incomeStreamName;
                const selectedIncomeFrequency = watch('incomeStreams')[index].incomeFrequency;

                return (
                  <div className="section-container income-block-container" key={field.id}>
                    <div className={index % 2 === 0 ? 'section' : ''}>
                      {index !== 0 && (
                        <div className="delete-button-container">
                          <CloseButton handleClose={() => remove(index)} />
                        </div>
                      )}
                      <div>
                        {index === 0 && renderFirstIncomeBlockQ(pageNumber)}
                        {index !== 0 && renderAdditionalIncomeBlockQ(pageNumber)}
                        {renderIncomeStreamNameSelect(index)}
                        {renderIncomeFrequencySelect(incomeOptions, selectedIncomeStreamSource, index, pageNumber)}
                        {selectedIncomeFrequency === 'hourly' &&
                          renderHoursPerWeekTextfield(pageNumber, index, selectedIncomeStreamSource)}
                        {renderIncomeAmountTextfield(
                          pageNumber,
                          index,
                          selectedIncomeFrequency,
                          selectedIncomeStreamSource,
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            }
            {hasTruthyIncome && (
              <div>
                <Button
                  variant="outlined"
                  onClick={() =>
                    append({
                      incomeStreamName: '',
                      incomeAmount: '',
                      incomeFrequency: '',
                      hoursPerWeek: '',
                    })
                  }
                  startIcon={<AddIcon />}
                  type="button"
                >
                  <FormattedMessage id="personIncomeBlock.return-addIncomeButton" defaultMessage="Add another income" />
                </Button>
              </div>
            )}
          </Stack>
        </div>
        <PrevAndContinueButtons
          backNavigationFunction={() => backNavigationFunction(uuid, currentStepId, pageNumber)}
        />
      </form>
    </main>
  );
};

export default HouseholdMemberForm;