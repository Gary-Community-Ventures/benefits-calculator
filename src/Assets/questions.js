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
  displayMissingTaxFilingYear
} from './validationFunctions';
import { FormattedMessage } from 'react-intl';

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
    }    
  },
  {
    id: 4,
    question: 
      <FormattedMessage
        id='questions.id-4'
        defaultMessage='Are you a student?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 
        <FormattedMessage 
          id='questions.id-4-ariaLabel' 
          defaultMessage='is a student' />,
      inputName: 'student',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question: 
        <FormattedMessage
          id='questions.id-4a'
          defaultMessage='Are you a full-time student?' />,
      componentDetails: {
        componentType: 'Radiofield',
        ariaLabel: 
          <FormattedMessage 
            id='questions.id-4a-ariaLabel' 
            defaultMessage='is a full-time student' />,
        inputName: 'studentFulltime',
        inputError: radiofieldHasError
      }
    }]
  },
  {
    id: 5,
    question: 
      <FormattedMessage
        id='questions.id-5'
        defaultMessage='Are you pregnant?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 
        <FormattedMessage 
          id='questions.id-5-ariaLabel' 
          defaultMessage='is pregnant' />,
      inputName: 'pregnant',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 6,
    question: 
      <FormattedMessage
        id='questions.id-6'
        defaultMessage='Are you currently unemployed?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 
        <FormattedMessage 
          id='questions.id-6-ariaLabel' 
          defaultMessage='is currently unemployed' />,
      inputName: 'unemployed',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question: 
        <FormattedMessage
          id='questions.id-6a'
          defaultMessage='Did you work in the past 18 months?' />,
      componentDetails: {
        componentType: 'Radiofield',
        ariaLabel: 
          <FormattedMessage 
            id='questions.id-6a-ariaLabel' 
            defaultMessage='has worked in the past 18 months' />,
        inputName: 'unemployedWorkedInLast18Mos',
        inputError: radiofieldHasError
      }
    }]    
  },
  {
    id: 7,
    question: 
      <FormattedMessage
        id='questions.id-7'
        defaultMessage='Are you blind or visually impaired?' />,
    questionDescription: 
      <FormattedMessage 
        id='questions.id-7-description'
        defaultMessage='"Visually impaired" means a total lack of vision in your better eye, vision of or below 20/200 in your better eye even with eyeglasses or other corrections, or tunnel vision that significantly limits your field of vision.' 
        />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 
        <FormattedMessage 
          id='questions.id-7-ariaLabel' 
          defaultMessage='is blind or visually impaired' />,
      inputName: 'blindOrVisuallyImpaired',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 8,
    question:
      <FormattedMessage
        id='questions.id-8'
        defaultMessage='Do you have any disabilities?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel:
        <FormattedMessage
          id='questions.id-8-ariaLabel'
          defaultMessage='has any disabilities' />,
      inputName: 'disabled',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 9,
    question:
      <FormattedMessage
        id='questions.id-9'
        defaultMessage='Have you served in the U.S. Armed Forces, National Guard or Reserves?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel:
        <FormattedMessage
          id='questions.id-9-ariaLabel'
          defaultMessage='is a veteran' />,
      inputName: 'veteran',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 10,
    question:
      <FormattedMessage
        id='questions.id-10'
        defaultMessage='Do you receive Medicaid?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel:
        <FormattedMessage
          id='questions.id-10-ariaLabel'
          defaultMessage='is on Medicaid' />,
      inputName: 'medicaid',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 11,
    question:
      <FormattedMessage
        id='questions.id-11'
        defaultMessage='Do you receive disability-related Medicaid?' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel:
        <FormattedMessage
          id='questions.id-11-ariaLabel'
          defaultMessage='is on disability-related medicaid' />,
      inputName: 'disabilityRelatedMedicaid',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 12,
    question:
      <FormattedMessage
        id='questions.id-12'
        defaultMessage='Do you have an income?' />,
    questionDescription: 
      <FormattedMessage
        id='questions.id-12-description'
        defaultMessage='This includes money from jobs, alimony, investments, or gifts.' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel:
        <FormattedMessage
          id='questions.id-12-ariaLabel'
          defaultMessage='has an income' />,
      inputName: 'hasIncome',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question:
        <FormattedMessage
          id='questions.id-12a'
          defaultMessage='What type of income have you had most recently?' />,
      componentDetails: {
        componentType: 'IncomeBlock',
        ariaLabel:
          <FormattedMessage
            id='questions.id-12a-ariaLabel'
            defaultMessage='most recent type of income' />
      }
    }]    
  },
  {
    id: 13,
    question:
      <FormattedMessage
        id='questions.id-13'
        defaultMessage='Do you have any expenses?' />,
    questionDescription:
      <FormattedMessage
        id='questions.id-13-description'
        defaultMessage='This includes costs like child care, child support, rent, medical expenses, heating bills and more.' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 
        <FormattedMessage
          id='questions.id-13-ariaLabel'
          defaultMessage='has expenses' />,
      inputName: 'hasExpenses',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question:
        <FormattedMessage
          id='questions.id-13a'
          defaultMessage='What type of expense have you had most recently?' />,
      componentDetails: {
        componentType: 'ExpenseBlock',
        ariaLabel: 
          <FormattedMessage
            id='questions.id-13a-ariaLabel'
            defaultMessage='most recent type of expense' />,
      }
    }]
  },
  {
    id: 14,
    question:
      <FormattedMessage
        id='questions.id-14'
        defaultMessage='Including you, how many people are in your household?' />,
    questionDescription: 
      <FormattedMessage
        id='questions.id-14-description'
        defaultMessage='This is usually family members who you both live and share important resources with like food and bills.' />,
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'householdSize',
      inputLabel: 
        <FormattedMessage
          id='questions.id-14-inputLabel'
          defaultMessage='Household Size' />,
      inputError: householdSizeHasError,
      inputHelperText: displayHouseholdSizeHelperText
    }
  },
  {
    id: 15,
    question:
      <FormattedMessage
        id='questions.id-15'
        defaultMessage='Tell us about the next person in your household.' />,
    componentDetails: {
      componentType: 'HouseholdDataBlock',
      ariaLabel: 
        <FormattedMessage
          id='questions.id-15-ariaLabel'
          defaultMessage='screener household data' />,
      inputName: 'householdData'
    }
  },
  {
    id: 16,
    question:
      <FormattedMessage
        id='questions.id-16'
        defaultMessage='How much does your whole household have right now in:' />,
    questionDescription: 
      <FormattedMessage
        id='questions.id-16-description'
        defaultMessage='Cash on hand? Checking or saving accounts? Stocks, bonds or mutual funds?' />,
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'householdAssets',
      inputLabel: 
        <FormattedMessage
          id='questions.id-16-inputLabel'
          defaultMessage='Household Assets' />,
      inputError: householdAssetsHasError,
      inputHelperText: displayHouseholdAssetsHelperText
    }
  },
  {
    id: 17,
    question:
      <FormattedMessage
        id='questions.id-17'
        defaultMessage='What was the last year you filed taxes for?' />,
    componentDetails: {
      componentType: 'BasicSelect',
      inputName: 'lastTaxFilingYear',
      inputError: lastTaxFilingYearHasError,
    }
  }
];

export default questions;