import { FormattedMessage, useIntl } from 'react-intl';
import QuestionHeader from '../../QuestionComponents/QuestionHeader';
import HHMSummaryCards from './HHMSummaryCards';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../Wrapper/Wrapper';
import { ReactNode, useContext, useMemo, useState } from 'react';
import { Conditions, HealthInsurance, HouseholdData } from '../../../Types/FormData';
import { Autocomplete, Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import AgeInput from '../../HouseholdDataBlock/AgeInput';
import QuestionQuestion from '../../QuestionComponents/QuestionQuestion';
import { useStepNumber } from '../../../Assets/stepDirectory';
import '../../HouseholdDataBlock/HouseholdDataBlock.css';
import * as z from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { updateScreen } from '../../../Assets/updateScreen';
import { useGoToNextStep } from '../../QuestionComponents/questionHooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { MONTHS } from '../../HouseholdDataBlock/MONTHS';
import PrevAndContinueButtons from '../../PrevAndContinueButtons/PrevAndContinueButtons';
import ErrorMessageWrapper from '../../ErrorMessage/ErrorMessageWrapper';
import RHFOptionCardGroup from '../../RHFComponents/RHFOptionCardGroup';
import { useConfig } from '../../Config/configHook';
import QuestionDescription from '../../QuestionComponents/QuestionDescription';
import { FormattedMessageType } from '../../../Types/Questions';

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
  const currentStepId = useStepNumber('householdData', formData.immutableReferrer);
  // const backNavigationFunction = (uuid: string, currentStepId: number, pageNumber: number) => {
  //   const setPage = (uuid: string, currentStepId: number, pageNumber: number) => {
  //     navigate(`/${uuid}/step-${currentStepId}/${pageNumber}`);
  //   };

  //   if (pageNumber <= 1) {
  //     navigate(`/${uuid}/step-${currentStepId - 1}`);
  //   } else {
  //     setPage(uuid, currentStepId, pageNumber - 1);
  //   }
  // };
  const nextStep = useGoToNextStep('householdData', `${pageNumber + 1}`);
  // console.log(`${pageNumber + 1}`);
  const date = new Date();
  const CURRENT_YEAR = date.getFullYear();
  // the getMonth method returns January as 0
  const CURRENT_MONTH = date.getMonth() + 1;
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
        //make sure that this only shows up for the person at this index
      }),
    conditions: z.object({
      student: z.boolean(),
      pregnant: z.boolean(),
      blindOrVisuallyImpaired: z.boolean(),
      disabled: z.boolean(),
      longTermDisability: z.boolean(),
    }),
    relationshipToHH: z.string().refine((value) => Object.keys(relationshipOptions).includes(value)),
    hasIncome: hasIncomeSchema,
  });
  type FormSchema = z.infer<typeof formSchema>;

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
    setValue,
  } = useForm<z.infer<typeof formSchema>>({
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
      relationshipToHH: householdMemberFormData?.relationshipToHH ? householdMemberFormData.relationshipToHH : pageNumber === 1 ? 'headOfHousehold' : '',
      hasIncome: 'false',

  const formSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (memberData) => {
    if (uuid) {
      const currentMemberDataAtThisIndex = householdMemberFormData;
      nextStep();
    }
  };

  const renderBirthMonthHelperText = () => {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="ageInput.month.error" defaultMessage="Please enter a birth month." />
      </ErrorMessageWrapper>
    );
  }

  const renderBirthYearHelperText = () => {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="ageInput.year.error" defaultMessage="Please enter a birth year." />
      </ErrorMessageWrapper>
    );
  }

  const renderHealthInsuranceHelperText = () => {
    return (
      <ErrorMessageWrapper fontSize="1.5rem">
        <FormattedMessage
          id="validation-helperText.healthInsurance"
          defaultMessage='If none of these apply, please select "One or more household member(s) do not have health insurance"'
        />
      </ErrorMessageWrapper>
    );
  }

  const renderRelationshipToHHHelperText = () => {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="errorMessage-HHMemberRelationship" defaultMessage="Please select a relationship" />
      </ErrorMessageWrapper>
    );
  }

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
          <FormControl sx={{ mt: 1, mb: 2, minWidth: 210, maxWidth: '100%' }} error={errors.birthMonth !== undefined}>
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
                  {errors.birthMonth !== undefined && <FormHelperText>{renderBirthMonthHelperText()}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
          <FormControl sx={{ mt: 1, mb: 2, minWidth: 210, maxWidth: '100%' }} error={errors.birthYear !== undefined}>
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
                      field.onChange(newValue?.label)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={<FormattedMessage id="ageInput.year.label" defaultMessage="Birth Year" />}
                        error={errors.birthYear !== undefined}
                      />
                    )}
                  />
                  {errors.birthYear !== undefined && <FormHelperText>{renderBirthYearHelperText()}</FormHelperText>}
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
          />
          {errors.healthInsurance !== undefined && <FormHelperText>{renderHealthInsuranceHelperText()}</FormHelperText>}
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
          sx={{ mt: 1, mb: 2, minWidth: 210, maxWidth: '100%' }}
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
                {errors.relationshipToHH !== undefined && <FormHelperText>{renderRelationshipToHHHelperText()}</FormHelperText>}
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
      {/* <HHMSummaryCards activeMemberData={getValues()} page={pageNumber} formData={formData} /> */}
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        {createAgeQuestion(pageNumber)}
        {pageNumber !== 1 && createHOfHRelationQuestion(relationshipOptions)}
        {displayHealthInsuranceBlock(pageNumber, healthInsuranceOptions)}
        {displayConditionsQuestion(pageNumber, conditionOptions)}
        <div>
          <Stack sx={{ margin: '3rem 0' }}>{createIncomeRadioQuestion(pageNumber)}</Stack>
        </div>
        <PrevAndContinueButtons
          backNavigationFunction={() => backNavigationFunction(uuid, currentStepId, pageNumber)}
        />
      </form>
    </main>
  );
};

export default HouseholdMemberForm;
