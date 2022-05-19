import { ageHasError, displayAgeHelperText, zipcodeHasError, displayZipcodeHelperText, radiofieldHasError } from './validationFunctions';

const questions = [
  {
    id: 0,
    question: 'How old are you?',
    componentDetails: {
      componentType:'Textfield',
      inputType: 'number',
      inputName: 'applicantAge',
      inputLabel: 'Age',
      inputError: ageHasError,
      inputHelperText: displayAgeHelperText
    }
  },
  {
    id: 1,
    question: 'What is your zip code?',
    componentDetails: {
      componentType:'Textfield',
      inputType: 'text',
      inputName: 'zipcode',
      inputLabel: 'Zip Code',
      inputError: zipcodeHasError,
      inputHelperText: displayZipcodeHelperText
    }    
  },
  {
    id: 2,
    question: 'Are you a full-time student?',
    componentDetails: {
      componentType:'Radiofield',
      ariaLabel: 'is a full-time student',
      inputName: 'isAFullTimeStudent',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 3,
    question: 'Are you pregnant?',
    componentDetails: {
      componentType:'Radiofield',
      ariaLabel: 'is pregnant',
      inputName: 'isPregnant',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 4,
    question: 'Have you worked in the past 18 months?',
    componentDetails: {
      componentType:'Radiofield',
      ariaLabel: 'has worked in the past 18 months',
      inputName: 'hasWorkedInPast18Mos',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 5,
    question: 'Are you blind or visually impaired?',
    componentDetails: {
      componentType:'Radiofield',
      ariaLabel: 'is blind or visually impaired',
      inputName: 'isBlindOrVisuallyImpaired',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 6,
    question: 'Do you have any disabilities?',
    componentDetails: {
      componentType:'Radiofield',
      ariaLabel: 'has any disabilities',
      inputName: 'isDisabled',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 7,
    question: 'Have you served in the U.S. Armed Forces, National Guard or Reserves?',
    componentDetails: {
      componentType:'Radiofield',
      ariaLabel: 'is a veteran',
      inputName: 'isAVeteran',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 8,
    question: 'Do you receive Medicaid?',
    componentDetails: {
      componentType:'Radiofield',
      ariaLabel: 'is on Medicaid',
      inputName: 'isOnMedicaid',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 9,
    question: 'Do you receive disability-related Medicaid?',
    componentDetails: {
      componentType:'Radiofield',
      ariaLabel: 'is on disability-related medicaid',
      inputName: 'isOnDisabilityRelatedMedicaid',
      inputError: radiofieldHasError
    }    
  },
  {
    id: 10,
    question: 'Do you receive disability-related Medicaid?',
    componentDetails: {
      componentType:'Radiofield',
      ariaLabel: 'is on disability-related medicaid',
      inputName: 'isOnDisabilityRelatedMedicaid',
      inputError: radiofieldHasError
    }    
  },
  
];

export default questions;