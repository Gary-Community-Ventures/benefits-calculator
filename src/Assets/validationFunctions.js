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

const expenseSourceValueHasError = (valueInput) => {
  const numValueInput = Number(valueInput);
  return numValueInput <= 0;
}

const displayExpenseSourceValueHelperText = (valueInput) => {
  const numValueInput = Number(valueInput);
  return numValueInput <= 0 && 'This entry is required to continue.';
}

const expenseSourcesAreValid = (expenses) => {
  const allExpensesAreValid = expenses.every(expenseSourceData => {
    const { expenseSourceName, expenseAmount, expenseFrequency } = expenseSourceData;
    return expenseSourceName.length > 0 && expenseAmount > 0 && expenseFrequency.length > 0;
  });
  
  return allExpensesAreValid;
}

const householdSizeHasError = (sizeOfHousehold) => {
  const numValueInput = Number(sizeOfHousehold);
  return numValueInput <= 0 || numValueInput > 8;
}

const displayHouseholdSizeHelperText = (sizeOfHousehold) => {
  const numValueInput = Number(sizeOfHousehold);
  return (numValueInput <= 0 || numValueInput > 8) && 'Number of People (max. 8)';
}

const householdAssetsHasError = (householdAssets) => {
  const numValueInput = Number(householdAssets);
  return numValueInput < 0;
}

const displayHouseholdAssetsHelperText = (householdAssets) => {
  const numValueInput = Number(householdAssets);
  return numValueInput < 0 && 'This entry is required to continue.';
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
  expenseSourcesAreValid,
  householdSizeHasError,
  displayHouseholdSizeHelperText,
  householdAssetsHasError,
  displayHouseholdAssetsHelperText
}