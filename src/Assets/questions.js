import { ageHasError, displayAgeHelperText, zipcodeHasError, displayZipcodeHelperText } from './validationFunctions';
// import { Button } from '@mui/material';
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
  }
  //inputOptions
];

export default questions;
