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
  
];

export default questions;