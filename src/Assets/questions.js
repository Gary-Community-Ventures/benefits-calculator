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
  housingHasError
} from './validationFunctions';

const questions = [
  {
    id: 2,
    question: 'How old are you?',
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'applicantAge',
      inputLabel: 'Age',
      inputError: ageHasError,
      inputHelperText: displayAgeHelperText
    }
  },
  {
    id: 3,
    question: 'What is your zip code?',
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'zipcode',
      inputLabel: 'Zip Code',
      inputError: zipcodeHasError,
      inputHelperText: displayZipcodeHelperText
    }    
  },
  {
    id: 4,
    question: 'Are you a student?',
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'is a student',
      inputName: 'student',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question: 'Are you a full-time student?',
      componentDetails: {
        componentType: 'Radiofield',
        ariaLabel: 'is a full-time student',
        inputName: 'studentFulltime',
        inputError: radiofieldHasError
      }
    }]
  },
  {
    id: 5,
    question: 'Are you pregnant?',
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'is pregnant',
      inputName: 'pregnant',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 6,
    question: 'Are you currently unemployed?',
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'is currently unemployed',
      inputName: 'unemployed',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question: 'Did you work in the past 18 months?',
      componentDetails: {
        componentType: 'Radiofield',
        ariaLabel: 'has worked in the past 18 months',
        inputName: 'unemployedWorkedInLast18Mos',
        inputError: radiofieldHasError
      }
    }]    
  },
  {
    id: 7,
    question: 'Are you blind or visually impaired?',
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'is blind or visually impaired',
      inputName: 'blindOrVisuallyImpaired',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 8,
    question: 'Do you have any disabilities?',
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'has any disabilities',
      inputName: 'disabled',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 9,
    question: 'Have you served in the U.S. Armed Forces, National Guard or Reserves?',
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'is a veteran',
      inputName: 'veteran',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 10,
    question: 'Do you receive Medicaid?',
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'is on Medicaid',
      inputName: 'medicaid',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 11,
    question: 'Do you receive disability-related Medicaid?',
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'is on disability-related medicaid',
      inputName: 'disabilityRelatedMedicaid',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 12,
    question: 'Do you have an income?',
    questionDescription: 'This includes money from jobs, alimony, investments, or gifts.',
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'has an income',
      inputName: 'hasIncome',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question: 'What type of income have you had most recently?',
      componentDetails: {
        componentType: 'IncomeBlock',
        ariaLabel: 'most recent type of income'
      }
    }]    
  },
  {
    id: 13,
    question: 'Do you have any expenses?',
    questionDescription: 'This includes costs like child care, child support, rent, medical ' + 
      'expenses, heating bills and more.',
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'has expenses',
      inputName: 'hasExpenses',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question: 'What type of expense have you had most recently?',
      componentDetails: {
        componentType: 'ExpenseBlock',
        ariaLabel: 'most recent type of expense'
      }
    }]    
  },
  {
    id: 14,
    question: 'Including you, how many people are in your household?',
    questionDescription: 'This is usually family members who you both live ' + 
      'and share important resources with like food and bills.',
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'number',
      inputName: 'householdSize',
      inputLabel: 'Household Size',
      inputError: householdSizeHasError,
      inputHelperText: displayHouseholdSizeHelperText
    }
  },
  {
    id: 15,
    question: 'How much does your whole household have right now in:',
    questionDescription: 'Cash on hand? Checking or saving accounts? Stocks, bonds or mutual funds?',
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'number',
      inputName: 'householdAssets',
      inputLabel: 'Household Assets',
      inputError: householdAssetsHasError,
      inputHelperText: displayHouseholdAssetsHelperText
    }
  },
  {
    id: 16,
    question: 'Which of these best applies to your housing situation?',
    questionDescription: "It's OK to pick more than one.",
    componentDetails: {
      componentType: 'HousingBlock',
      inputError: housingHasError,
      inputName: 'housing'
    }
  }
];

export default questions;