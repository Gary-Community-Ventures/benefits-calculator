import { FormattedMessage } from 'react-intl';
import QuestionHeader from '../../QuestionComponents/QuestionHeader';
import HHMSummaryCards from './HHMSummaryCards';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../Wrapper/Wrapper';
import { useContext, useState } from 'react';
import { HouseholdData } from '../../../Types/FormData';
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
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

const HouseholdMemberForm = () => {
  const { formData, setFormData, locale } = useContext(Context);
  const { uuid, page } = useParams();
  const navigate = useNavigate();
  const pageNumber = Number(page);
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
  //page => pageNumber

  const formSchema = z.object({
    /*
    z.string().min(1) validates that an option was selected.
    The default value of birthMonth is '' when no option is selected.
    The possible values that can be selected are '1', '2', ..., '12',
    so if one of those options are selected,
    then birthMonth would have a minimum string length of 1 which passes validation.
    */
    birthMonth: z.string().min(1),
    birthYear: z.string().min(1),
      // .number()
      // .lte(CURRENT_YEAR)
      // .gte(CURRENT_YEAR - MAX_AGE),
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
      birthMonth: formData.householdData[pageNumber]?.birthMonth ? String(formData.householdData[pageNumber]?.birthMonth) : '',
      birthYear: formData.householdData[pageNumber]?.birthYear ? String(formData.householdData[pageNumber]?.birthYear) : '',
      // relationshipToHH: pageNumber === 1 ? 'headOfHousehold' : '',
      // conditions: {
      //   student: false,
      //   pregnant: false,
      //   blindOrVisuallyImpaired: false,
      //   disabled: false,
      //   longTermDisability: false,
      // },
      // hasIncome: false,
      // incomeStreams: [],
      // healthInsurance: {
      //   none: false,
      //   employer: false,
      //   private: false,
      //   medicaid: false,
      //   medicare: false,
      //   chp: false,
      //   emergency_medicaid: false,
      //   family_planning: false,
      //   va: false,
    },
  });

  const formSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (memberData) => {
    if (uuid) {
      const updatedFormData = { ...formData };
      setFormData(updatedFormData);
      await updateScreen(uuid, updatedFormData, locale);
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
            fields={healthInsuranceFields}
            control={control}
            setValue={setValue}
            name="healthInsurance"
            options={pageNumber === 1 ? healthInsuranceOptions.you : healthInsuranceOptions.them}
          />
          {errors.healthInsurance !== undefined && <FormHelperText>{renderHealthInsuranceHelperText()}</FormHelperText>}
        </Stack>
      </Box>
    );
  };


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

        {pageNumber === 1 && displayHealthInsuranceBlock(pageNumber, healthInsuranceOptions)}

        <PrevAndContinueButtons backNavigationFunction={() => backNavigationFunction(uuid, currentStepId, pageNumber)}/>
      </form>
    </main>
  );
};

export default HouseholdMemberForm;
