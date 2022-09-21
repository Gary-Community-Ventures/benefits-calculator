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
  displayMissingSelectHelperText
} from './validationFunctions';
import benefitOptions from './benefitOptions';
import { FormattedMessage } from 'react-intl';
import taxYearOptions from './taxYearOptions';
import referralOptions from './referralOptions';
import countiesByZipcode from './countiesByZipcode';

const questions = [
  {
    id: 2,
    question: 
      <FormattedMessage
        id='questions.id-2'
        defaultMessage='How old are you?' />,
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'age',
      inputLabel: 
        <FormattedMessage 
          id='questions.id-2-inputLabel' 
          defaultMessage='Age' />,
      inputError: ageHasError,
      inputHelperText: displayAgeHelperText
    }
  },
  {
    id: 3,
    question: 
      <FormattedMessage
        id='questions.id-3'
        defaultMessage='What is your zip code?' />,
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'zipcode',
      inputLabel: 
        <FormattedMessage 
          id='questions.id-3-inputLabel' 
          defaultMessage='Zip Code' />,
      inputError: zipcodeHasError,
      inputHelperText: displayZipcodeHelperText
    },
    followUpQuestions: [{
      question: 
        <FormattedMessage
          id='questions.id-3a'
          defaultMessage='Please select a county:' />,
      componentDetails: {
        componentType: 'BasicSelect',
        inputType: 'text',
        inputName: 'county',
        inputLabel: 
          <FormattedMessage 
            id='questions.id-3a-inputLabel' 
            defaultMessage='County' />,
        inputError: referralSourceHasError,
        inputHelperText: displayMissingSelectHelperText,
        componentProperties: {
          labelId: 'county-select-label',
          inputLabelText: 
            <FormattedMessage
              id='qcc.createCountyDropdownMenu-label'
              defaultMessage='County'
            />,
          id:'referral-source-select',
          value: 'referralSource',
          label: 
            <FormattedMessage
              id='qcc.createCountyDropdownMenu-label'
              defaultMessage='County'
            />,
          disabledSelectMenuItemText: 
            <FormattedMessage
              id='qcc.createCountyDropdownMenu-disabledSelectMenuItemText'
              defaultMessage='Select a county' />
        },
        options: countiesByZipcode
      }
    }    
      }
    }]
  },
  {
    id: 4,
    question:
      <FormattedMessage
        id='questions.id-4'
        defaultMessage='Which benefits are you or your household members currently receiving or have received in the past year?' />,
    componentDetails: {
      componentType: 'BasicCheckboxGroup',
      inputName: 'benefits',
      options: benefitOptions,
      inputError: benefitsHasError
    }
  },
  {
    id: 5,
    question: 
      <FormattedMessage
        id='questions.id-5'
        defaultMessage='Are you a student?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 
        <FormattedMessage 
          id='questions.id-5-ariaLabel' 
          defaultMessage='is a student' />,
      inputName: 'student',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question: 
        <FormattedMessage
          id='questions.id-5a'
          defaultMessage='Are you a full-time student?' />,
      componentDetails: {
        componentType: 'Radiofield',
        ariaLabel: 
          <FormattedMessage 
            id='questions.id-5a-ariaLabel' 
            defaultMessage='is a full-time student' />,
        inputName: 'studentFulltime',
        inputError: radiofieldHasError
      }
    }]
  },
  {
    id: 6,
    question: 
      <FormattedMessage
        id='questions.id-6'
        defaultMessage='Are you pregnant?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 
        <FormattedMessage 
          id='questions.id-6-ariaLabel' 
          defaultMessage='is pregnant' />,
      inputName: 'pregnant',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 7,
    question: 
      <FormattedMessage
        id='questions.id-7'
        defaultMessage='Are you currently unemployed?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 
        <FormattedMessage 
          id='questions.id-7-ariaLabel' 
          defaultMessage='is currently unemployed' />,
      inputName: 'unemployed',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question: 
        <FormattedMessage
          id='questions.id-7a'
          defaultMessage='Did you work in the past 18 months?' />,
      componentDetails: {
        componentType: 'Radiofield',
        ariaLabel: 
          <FormattedMessage 
            id='questions.id-7a-ariaLabel' 
            defaultMessage='has worked in the past 18 months' />,
        inputName: 'unemployedWorkedInLast18Mos',
        inputError: radiofieldHasError
      }
    }]    
  },
  {
    id: 8,
    question: 
      <FormattedMessage
        id='questions.id-8'
        defaultMessage='Are you blind or visually impaired?' />,
    questionDescription: 
      <FormattedMessage 
        id='questions.id-8-description'
        defaultMessage='"Visually impaired" means a total lack of vision in your better eye, vision of or below 20/200 in your better eye even with eyeglasses or other corrections, or tunnel vision that significantly limits your field of vision.' 
        />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 
        <FormattedMessage 
          id='questions.id-8-ariaLabel' 
          defaultMessage='is blind or visually impaired' />,
      inputName: 'blindOrVisuallyImpaired',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 9,
    question:
      <FormattedMessage
        id='questions.id-9'
        defaultMessage='Do you have any disabilities?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel:
        <FormattedMessage
          id='questions.id-9-ariaLabel'
          defaultMessage='has any disabilities' />,
      inputName: 'disabled',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 10,
    question:
      <FormattedMessage
        id='questions.id-10'
        defaultMessage='Have you served in the U.S. Armed Forces, National Guard or Reserves?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel:
        <FormattedMessage
          id='questions.id-10-ariaLabel'
          defaultMessage='is a veteran' />,
      inputName: 'veteran',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 11,
    question:
      <FormattedMessage
        id='questions.id-11'
        defaultMessage='Do you have an income?' />,
    questionDescription: 
      <FormattedMessage
        id='questions.id-11-description'
        defaultMessage='This includes money from jobs, alimony, investments, or gifts. Enter income for yourself only.' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel:
        <FormattedMessage
          id='questions.id-11-ariaLabel'
          defaultMessage='has an income' />,
      inputName: 'hasIncome',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question:
        <FormattedMessage
          id='questions.id-11a'
          defaultMessage='What type of income have you had most recently?' />,
      componentDetails: {
        componentType: 'IncomeBlock',
        ariaLabel:
          <FormattedMessage
            id='questions.id-11a-ariaLabel'
            defaultMessage='most recent type of income' />
      }
    }]    
  },
  {
    id: 12,
    question:
      <FormattedMessage
        id='questions.id-12'
        defaultMessage='Do you have any expenses?' />,
    questionDescription:
      <FormattedMessage
        id='questions.id-12-description'
        defaultMessage='This includes costs like child care, child support, rent, medical expenses, heating bills and more.' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 
        <FormattedMessage
          id='questions.id-12-ariaLabel'
          defaultMessage='has expenses' />,
      inputName: 'hasExpenses',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question:
        <FormattedMessage
          id='questions.id-12a'
          defaultMessage='What type of expense have you had most recently?' />,
      componentDetails: {
        componentType: 'ExpenseBlock',
        ariaLabel: 
          <FormattedMessage
            id='questions.id-12a-ariaLabel'
            defaultMessage='most recent type of expense' />,
      }
    }]
  },
  {
    id: 13,
    question:
      <FormattedMessage
        id='questions.id-13'
        defaultMessage='Including you, how many people are in your household?' />,
    questionDescription: 
      <FormattedMessage
        id='questions.id-13-description'
        defaultMessage='This is usually family members who you both live and share important resources with like food and bills.' />,
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'householdSize',
      inputLabel: 
        <FormattedMessage
          id='questions.id-13-inputLabel'
          defaultMessage='Household Size' />,
      inputError: householdSizeHasError,
      inputHelperText: displayHouseholdSizeHelperText
    }
  },
  {
    id: 14,
    question:
      <FormattedMessage
        id='questions.id-14'
        defaultMessage='Tell us about the next person in your household.' />,
    componentDetails: {
      componentType: 'HouseholdDataBlock',
      ariaLabel: 
        <FormattedMessage
          id='questions.id-14-ariaLabel'
          defaultMessage='screener household data' />,
      inputName: 'householdData'
    }
  },
  {
    id: 15,
    question:
      <FormattedMessage
        id='questions.id-15'
        defaultMessage='How much does your whole household have right now in:' />,
    questionDescription: 
      <FormattedMessage
        id='questions.id-15-description'
        defaultMessage='Cash on hand? Checking or saving accounts? Stocks, bonds or mutual funds?' />,
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'householdAssets',
      inputLabel: 
        <FormattedMessage
          id='questions.id-15-inputLabel'
          defaultMessage='Household Assets' />,
      inputError: householdAssetsHasError,
      inputHelperText: displayHouseholdAssetsHelperText
    }
  },
  {
    id: 16,
    question:
      <FormattedMessage
        id='questions.id-16'
        defaultMessage='What was the last year you filed taxes for?' />,
    componentDetails: {
      componentType: 'BasicSelect',
      inputName: 'lastTaxFilingYear',
      inputError: lastTaxFilingYearHasError
    }
  },
  {
    id: 17,
    question:
      <FormattedMessage
        id='questions.id-17'
        defaultMessage='How did you hear about this screener?' />,
    componentDetails: {
      componentType: 'BasicSelect',
      inputName: 'referralSource',
      inputError: referralSourceHasError
    },
    followUpQuestions: [{
      question: 
        <FormattedMessage
          id='questions.id-17a'
          defaultMessage='If other, please specify:' />,
      componentDetails: {
        componentType: 'Textfield',
        inputType: 'text',
        inputName: 'otherSource',
        inputLabel: 
          <FormattedMessage 
            id='questions.id-17a-inputLabel' 
            defaultMessage='Other referral source' />,
        inputError: referralSourceHasError,
        inputHelperText: displayReferralSourceHelperText
      }
    }]

  }
];

export default questions;