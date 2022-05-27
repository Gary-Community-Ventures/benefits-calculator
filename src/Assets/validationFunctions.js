const ageHasError = (applicantAge) => {
  return applicantAge < 18 || applicantAge > 130;
}

const displayAgeHelperText = (applicantAge) => {
  return (applicantAge < 18 || applicantAge > 130) ? 'This entry is required to continue.' : '';
}

const zipcodeHasError = (zipcode) => {
  const numZipcode = Number(zipcode);
  return zipcode.length !== 5 || Number.isInteger(numZipcode) === false;
} 

const displayZipcodeHelperText = (zipcode) => {
  const numZipcode = Number(zipcode);
  return (zipcode.length !== 5 || Number.isInteger(numZipcode) === false) ? 'This entry is required to continue.' : '' ;
} 

const radiofieldHasError = (radiofield) => {
  return typeof radiofield !== 'boolean';
}

const incomeStreamValueHasError = (valueInput) => {
  const numValueInput = Number(valueInput);
  return numValueInput <= 0;
}

const displayIncomeStreamValueHelperText = (valueInput) => {
  const numValueInput = Number(valueInput);
  return numValueInput <= 0 && 'This entry is required to continue.';
}

module.exports = {
  ageHasError,
  displayAgeHelperText,
  zipcodeHasError,
  displayZipcodeHelperText,
  radiofieldHasError,
  incomeStreamValueHasError,
  displayIncomeStreamValueHelperText
}