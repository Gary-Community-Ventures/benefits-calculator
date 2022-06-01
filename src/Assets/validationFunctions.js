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

const incomeStreamsAreValid = (incomeStreams) => {
  const allIncomeStreamsAreValid = incomeStreams.every(incomeSourceData => {
    const { incomeStreamName, incomeAmount, incomeFrequency } = incomeSourceData;
    return incomeStreamName.length > 0 && incomeAmount > 0 && incomeFrequency.length > 0;
  });
  
  return allIncomeStreamsAreValid;
}

const expenseSourceValueHasError = (valueInput) => { //#1
  const numValueInput = Number(valueInput);
  return numValueInput <= 0;
}

const displayExpenseSourceValueHelperText = (valueInput) => { //#2
  const numValueInput = Number(valueInput);
  return numValueInput <= 0 && 'This entry is required to continue.';
}

const expenseSourcesAreValid = (expenses) => { //#3
  const allExpensesAreValid = expenses.every(expenseSourceData => {
    const { expenseSourceName, expenseAmount, expenseFrequency } = expenseSourceData;
    return expenseSourceName.length > 0 && expenseAmount > 0 && expenseFrequency.length > 0;
  });
  
  return allExpensesAreValid;
}

module.exports = {
  ageHasError,
  displayAgeHelperText,
  zipcodeHasError,
  displayZipcodeHelperText,
  radiofieldHasError,
  incomeStreamValueHasError,
  displayIncomeStreamValueHelperText,
  incomeStreamsAreValid,
  expenseSourceValueHasError,
  displayExpenseSourceValueHelperText,
  expenseSourcesAreValid
}