import {
  ageHasError,
  displayAgeHelperText,
  zipcodeHasError,
  displayZipcodeHelperText,
  radiofieldHasError,
  householdSizeHasError,
  displayHouseholdSizeHelperText,
  householdAssetsHasError,
  displayHouseholdAssetsHelperText,
  lastTaxFilingYearHasError,
  displayMissingTaxFilingYear,
  benefitsHasError,
  referralSourceHasError,
  displayReferralSourceHelperText,
  displayMissingSelectHelperText,
  signUpOptionsHaveError,
  healthInsuranceHasError,
  acuteHHConditionsHasError,
  displayHealthInsuranceHelperText
} from './validationFunctions';
import benefitOptions from './benefitOptions';
import taxYearOptions from './taxYearOptions';
import referralOptions from './referralOptions';
import countiesByZipcode from './countiesByZipcode';
import signUpOptions from './signUpOptions';
import healthInsuranceOptions from './healthInsuranceOptions';
import acuteConditionOptions from './acuteConditionOptions';
import { FormattedMessage } from 'react-intl';

const questions = [
  {
    id: 2,
    name: 'age',
    question:
      <FormattedMessage
        id='questions.age'
        defaultMessage='How old are you?' />,
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'age',
      inputLabel:
        <FormattedMessage
          id='questions.age-inputLabel'
          defaultMessage='Age' />,
      inputError: ageHasError,
      inputHelperText: displayAgeHelperText
    },
    headerType: 'aboutYourself'
  },
  {
    id: 3,
    name: 'zipcode',
    question:
      <FormattedMessage
        id='questions.zipcode'
        defaultMessage='What is your zip code?' />,
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'zipcode',
      inputLabel:
        <FormattedMessage
          id='questions.zipcode-inputLabel'
          defaultMessage='Zip Code' />,
      inputError: zipcodeHasError,
      inputHelperText: displayZipcodeHelperText
    },
    followUpQuestions: [{
      question:
        <FormattedMessage
          id='questions.zipcode-a'
          defaultMessage='Please select a county:' />,
      name: 'county',
      componentDetails: {
        componentType: 'BasicSelect',
        inputType: 'text',
        inputName: 'county',
        inputLabel:
          <FormattedMessage
            id='questions.zipcode-a-inputLabel'
            defaultMessage='County' />,
        inputError: referralSourceHasError,
        inputHelperText: displayMissingSelectHelperText,
        componentProperties: {
          labelId: 'county-select-label',
          inputLabelText:
            <FormattedMessage
              id='questions.zipcode-a-inputLabel'
              defaultMessage='County'
            />,
          id:'county-source-select',
          value: 'county',
          label:
            <FormattedMessage
              id='questions.zipcode-a-inputLabel'
              defaultMessage='County'
            />,
          disabledSelectMenuItemText:
            <FormattedMessage
              id='questions.zipcode-a-disabledSelectMenuItemText'
              defaultMessage='Select a county' />
        },
        options: countiesByZipcode
      }
    }],
    headerType: 'aboutYourself'
  },
  {
    id: 4,
    name: 'healthInsurance',
    question:
      <FormattedMessage
        id='questions.healthInsurance'
        defaultMessage='Which type(s) of health insurance do members of your household have? Check all that apply.' />,
    componentDetails: {
      componentType: 'BasicCheckboxGroup',
      inputName: 'healthInsurance',
      options: healthInsuranceOptions,
      inputError: healthInsuranceHasError,
      inputHelperText: displayHealthInsuranceHelperText
    },
    headerType: 'aboutYourself'
  },
  {
    id: 5,
    name: 'student',
    question:
      <FormattedMessage
        id='questions.student'
        defaultMessage='Are you a student?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'questions.student-ariaLabel',
      inputName: 'student',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question:
        <FormattedMessage
          id='questions.student-a'
          defaultMessage='Are you a full-time student?' />,
      name: 'studentFulltime',
      componentDetails: {
        componentType: 'Radiofield',
        ariaLabel: 'questions.student-a-ariaLabel',
        inputName: 'studentFulltime',
        inputError: radiofieldHasError
      }
    }],
    headerType: 'aboutYourself'
  },
  {
    id: 6,
    name: 'pregnant',
    question:
      <FormattedMessage
        id='questions.pregnant'
        defaultMessage='Are you pregnant?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'questions.pregnant-ariaLabel',
      inputName: 'pregnant',
      inputError: radiofieldHasError
    },
    headerType: 'aboutYourself'
  },
  {
    id: 7,
    name: 'unemployed',
    question:
      <FormattedMessage
        id='questions.unemployed'
        defaultMessage='Are you currently unemployed?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'questions.unemployed-ariaLabel',
      inputName: 'unemployed',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question:
        <FormattedMessage
          id='questions.unemployed-a'
          defaultMessage='Did you work in the past 18 months?' />,
      name: 'unemployedWorkedInLast18Mos',
      componentDetails: {
        componentType: 'Radiofield',
        ariaLabel: 'questions.unemployed-a-ariaLabel',
        inputName: 'unemployedWorkedInLast18Mos',
        inputError: radiofieldHasError
      }
    }],
    headerType: 'aboutYourself'
  },
  {
    id: 8,
    name: 'blindOrVisuallyImpaired',
    question:
      <FormattedMessage
        id='questions.blindOrVisuallyImpaired'
        defaultMessage='Are you blind or visually impaired?' />,
    questionDescription:
      <FormattedMessage
        id='questions.blindOrVisuallyImpaired-description'
        defaultMessage='"Visually impaired" means you cannot correct your vision to a "normal" level.'
        />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'questions.blindOrVisuallyImpaired-ariaLabel',
      inputName: 'blindOrVisuallyImpaired',
      inputError: radiofieldHasError
    },
    headerType: 'aboutYourself'
  },
  {
    id: 9,
    name: 'disabled',
    question:
      <FormattedMessage
        id='questions.disabled'
        defaultMessage='Do you have any disabilities that make you unable to work now or in the future?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'questions.disabled-ariaLabel',
      inputName: 'disabled',
      inputError: radiofieldHasError
    },
    headerType: 'aboutYourself'
  },
  {
    id: 10,
    name: 'veteran',
    question:
      <FormattedMessage
        id='questions.veteran'
        defaultMessage='Do you serve or have you served in the U.S. Armed Forces, National Guard or Reserves?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'questions.veteran-ariaLabel',
      inputName: 'veteran',
      inputError: radiofieldHasError
    },
    headerType: 'aboutYourself'
  },
  {
    id: 11,
    name: 'hasIncome',
    question:
      <FormattedMessage
        id='questions.hasIncome'
        defaultMessage='Do you have an income?' />,
    questionDescription:
      <FormattedMessage
        id='questions.hasIncome-description'
        defaultMessage='Income is the money you earn or receive before deducting taxes.
          This includes money from jobs, alimony, investments, or gifts. Enter income for yourself only.
          You will have a chance to enter income for other household members later.' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'questions.hasIncome-ariaLabel',
      inputName: 'hasIncome',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question:
        <FormattedMessage
          id='questions.hasIncome-a'
          defaultMessage='What type of income have you had most recently?' />,
      name: 'incomeStreams',
      componentDetails: {
        componentType: 'IncomeBlock',
        ariaLabel: 'questions.hasIncome-a-ariaLabel',
        inputName: 'incomeStreams'
      }
    }],
    headerType: 'aboutYourself'
  },
  {
    id: 12,
    name: 'hasExpenses',
    question:
      <FormattedMessage
        id='questions.hasExpenses'
        defaultMessage='Does your household have any expenses?' />,
    questionDescription:
      <FormattedMessage
        id='questions.hasExpenses-description'
        defaultMessage='Add up expenses for everyone who lives in your home.
          This includes costs like child care, child support, rent, medical expenses, heating bills, and more.
          We will ask only about expenses that may affect benefits. We will not ask about expenses such as food since grocery bills do not affect benefits.' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'questions.hasExpenses-ariaLabel',
      inputName: 'hasExpenses',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question:
        <FormattedMessage
          id='questions.hasExpenses-a'
          defaultMessage='What type of expense has your household had most recently?' />,
      name: 'expenses',
      componentDetails: {
        componentType: 'ExpenseBlock',
        ariaLabel: 'questions.hasExpenses-a-ariaLabel',
        inputName: 'expenses'
      }
    }],
    headerType: 'aboutHousehold'
  },
  {
    id: 13,
    name: 'acuteHHConditions',
    question:
      <FormattedMessage
        id='questions.acuteHHConditions'
        defaultMessage='Is anyone in your household in immediate need of help with any of the following?' />,
    componentDetails: {
      componentType: 'BasicCheckboxGroup',
      inputName: 'acuteHHConditions',
      options: acuteConditionOptions,
      inputError: acuteHHConditionsHasError
    },
    headerType: 'aboutHousehold'
  },
  {
    id: 14,
    name: 'hasBenefits',
    question:
      <FormattedMessage
        id='questions.hasBenefits'
        defaultMessage='Does your household currently have any benefits?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'questions.hasBenefits-ariaLabel',
      inputName: 'hasBenefits',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question:
        <FormattedMessage
          id='questions.hasBenefits-a'
          defaultMessage='Please tell us what benefits your household currently has.' />,
      questionDescription:
        <FormattedMessage
          id='questions.hasBenefits-a-description'
          defaultMessage='We will only show you new benefits you may be eligible for on the results page.' />,
      name: 'benefits',
      componentDetails: {
        componentType: 'AccordionContainer',
        ariaLabel: 'questions.hasBenefits-a-ariaLabel',
        inputName: 'benefits'
      }
    }],
    headerType: 'aboutHousehold'
  },
  {
    id: 15,
    name: 'householdSize',
    question:
      <FormattedMessage
        id='questions.householdSize'
        defaultMessage='Including you, how many people are in your household?' />,
    questionDescription:
      <FormattedMessage
        id='questions.householdSize-description'
        defaultMessage='This is usually family members who you both live and share important resources with like food and bills.' />,
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'householdSize',
      inputLabel:
        <FormattedMessage
          id='questions.householdSize-inputLabel'
          defaultMessage='Household Size' />,
      inputError: householdSizeHasError,
      inputHelperText: displayHouseholdSizeHelperText
    },
    headerType: 'aboutHousehold'
  },
  {
    id: 16,
    name: 'householdData',
    question:
      <FormattedMessage
        id='questions.householdData'
        defaultMessage='Tell us about the next person in your household.' />,
    componentDetails: {
      componentType: 'HouseholdDataBlock',
      ariaLabel: 'questions.householdData-ariaLabel',
      inputName: 'householdData'
    },
    headerType: 'householdData'
  },
  {
    id: 17,
    name: 'householdAssets',
    question:
      <FormattedMessage
        id='questions.householdAssets'
        defaultMessage='How much does your whole household have right now in:' />,
    questionDescription:
      <FormattedMessage
        id='questions.householdAssets-description'
        defaultMessage='Cash on hand? Checking or saving accounts? Stocks, bonds or mutual funds? In some cases, eligibility for benefits may be affected if your household owns other valuable assets such as a car or life insurance policy.' />,
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'householdAssets',
      inputLabel:
        <FormattedMessage
          id='questions.householdAssets-inputLabel'
          defaultMessage='Dollar Amount' />,
      inputError: householdAssetsHasError,
      inputHelperText: displayHouseholdAssetsHelperText
    },
    headerType: 'aboutHousehold'
  },
  {
    id: 18,
    name: 'lastTaxFilingYear',
    question:
      <FormattedMessage
        id='questions.lastTaxFilingYear'
        defaultMessage='What was the last year you filed taxes for?' />,
    questionDescription:
      <FormattedMessage
        id='questions.lastTaxFilingYear-description'
        defaultMessage='The most recent year you can file taxes for is 2022.' />,
    componentDetails: {
      componentType: 'BasicSelect',
      inputName: 'lastTaxFilingYear',
      inputError: lastTaxFilingYearHasError,
      componentProperties: {
        labelId: 'tax-year-select-label',
        inputLabelText:
          <FormattedMessage
            id='qcc.createTaxDropdownMenu-label'
            defaultMessage='Tax year'
          />,
        id:'tax-year-select',
        value: 'lastTaxFilingYear',
        label:
          <FormattedMessage
            id='qcc.createTaxDropdownMenu-label'
            defaultMessage='Tax year'
          />,
        disabledSelectMenuItemText:
          <FormattedMessage
            id='qcc.createTaxDropdownMenu-disabledSelectMenuItemText'
            defaultMessage='Select a Tax Year' />
      },
      options: taxYearOptions
    },
    headerType: 'aboutHousehold'
  },
  {
    id: 19,
    name: 'referralSource',
    question:
      <FormattedMessage
        id='questions.referralSource'
        defaultMessage='How did you hear about this screener?' />,
    componentDetails: {
      componentType: 'BasicSelect',
      inputName: 'referralSource',
      inputError: referralSourceHasError,
      componentProperties: {
        labelId: 'referral-source-select-label',
        inputLabelText:
          <FormattedMessage
            id='qcc.createReferralDropdownMenu-label'
            defaultMessage='Referral Source'
          />,
        id:'referral-source-select',
        value: 'referralSource',
        label:
          <FormattedMessage
            id='qcc.createReferralDropdownMenu-label'
            defaultMessage='Referral Source'
          />,
        disabledSelectMenuItemText:
          <FormattedMessage
            id='qcc.createReferralDropdownMenu-disabledSelectMenuItemText'
            defaultMessage='Select a source' />
      },
      options: referralOptions
    },
    followUpQuestions: [{
      question:
        <FormattedMessage
          id='questions.referralSource-a'
          defaultMessage='If other, please specify:' />,
      name: 'otherSource',
      componentDetails: {
        componentType: 'Textfield',
        inputType: 'text',
        inputName: 'otherSource',
        inputLabel:
          <FormattedMessage
            id='questions.referralSource-a-inputLabel'
            defaultMessage='Other referral source' />,
        inputError: referralSourceHasError,
        inputHelperText: displayReferralSourceHelperText
      }
    }],
    headerType: 'aboutHousehold'
  },
  { id: 20,
    name: 'signUpInfo',
    question:
      <FormattedMessage
        id='questions.signUpInfo'
        defaultMessage='What would you like us to contact you about?' />,
    componentDetails: {
      componentType: 'BasicCheckboxGroup',
      inputName: 'signUpInfo',
      options: signUpOptions,
      inputError: signUpOptionsHaveError
    },
    followUpQuestions: [{
      question:
        <FormattedMessage
          id='questions.signUpInfo-a'
          defaultMessage='Please provide your contact info below: ' />,
      componentDetails: {
        componentType: 'SignUp',
        inputName: 'signUpInfo',
        ariaLabel: 'questions.signUpInfo-ariaLabel',
      }
    }],
    headerType: 'signUpInfo'
  }
];

export default questions;
