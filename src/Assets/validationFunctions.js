import { FormattedMessage } from "react-intl";
import coZipcodes from "./coZipcodes";

const ageHasError = (applicantAge) => {
  // handleTextfieldChange prevents setting anything to formData that does not pass a number regex test
  // so applicantAge will always be initiated as a string and converted to a number once it passes the regex test
  const numberApplicantAge = Number(applicantAge);
  //the numbers that we type in have to be 0-8 digits long but we want them to be within this min/max range
  const minimumAge = 13; 
  const maximumAge = 130;
  return numberApplicantAge < minimumAge || numberApplicantAge > maximumAge;
}

const displayAgeHelperText = (applicantAge) => {
  const numberApplicantAge = Number(applicantAge);
  const minimumAge = 13;
  const maximumAge = 130;
  if (numberApplicantAge < minimumAge || numberApplicantAge > maximumAge) {
    return (
      <FormattedMessage 
        id='validation-helperText.age' 
        defaultMessage='Please enter a valid age (13-130)' />
    );
  };
}

const zipcodeHasError = (zipcode) => {
  //the zipcode input must have digits [0-9] and be exactly 5 digits long
  const numberMustBeFiveDigitsLongRegex = /^\d{5}$/;
  if (numberMustBeFiveDigitsLongRegex.test(zipcode)) {
    //this means that the zipcode input passed the regex test so we can just return false since there is no error
    //this additional test checks the zipcode input against all CO zipcodes
    return !coZipcodes.includes(zipcode);
  } else {
    return true;
  }
} 

const displayZipcodeHelperText = (zipcode) => {
  if (zipcodeHasError(zipcode)) {
    return (
      <FormattedMessage 
        id='validation-helperText.zipcode' 
        defaultMessage='Please enter a valid CO zipcode' />
    );
  }
} 

const radiofieldHasError = (radiofield) => {
  return typeof radiofield !== 'boolean';
}

const incomeStreamValueHasError = (valueInput) => {
  return valueInput <= 0;
}

const displayIncomeStreamValueHelperText = (valueInput) => {
  if (incomeStreamValueHasError(valueInput)) {
    return (
      <FormattedMessage 
        id='validation-helperText.incomeValue' 
        defaultMessage='Please enter a number greater than 0' />
    );
  }
}

const incomeStreamsAreValid = (incomeStreams) => {
  const allIncomeStreamsAreValid = incomeStreams.every(incomeSourceData => {
    const { incomeStreamName, incomeAmount, incomeFrequency } = incomeSourceData;
    return incomeStreamName.length > 0 && incomeAmount > 0 && incomeFrequency.length > 0;
  });
  
  return allIncomeStreamsAreValid;
}

const expenseSourceValueHasError = (valueInput) => {
  return valueInput <= 0;
}

const displayExpenseSourceValueHelperText = (valueInput) => {
  if (expenseSourceValueHasError(valueInput)) {
    return (
      <FormattedMessage 
        id='validation-helperText.expenseValue' 
        defaultMessage='Please enter a number greater than 0' />
    );
  }
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
  return (
    (numValueInput <= 0 || numValueInput > 8) && 
      <FormattedMessage 
        id='validation-helperText.householdSize' 
        defaultMessage='Number of People (max. 8)' />
  );
}

const householdAssetsHasError = (householdAssets) => {
  return householdAssets < 0;
}

const displayHouseholdAssetsHelperText = (householdAssets) => {
  if (householdAssetsHasError(householdAssets)) {
    return (
      <FormattedMessage
        id='validation-helperText.assets'
        defaultMessage='Please enter 0 or a positive number.' />
      );
  }
}

const housingSourcesAreValid = (selectedHousing) => {
  const housingKeys = Object.keys(selectedHousing);
  const preferNotToSay = selectedHousing.preferNotToSay === true;
  const atLeastOneOptionWasSelected = housingKeys.some(housingKey => selectedHousing[housingKey] === true);
  if (preferNotToSay) {
    const numberOfTrues = Object.values(selectedHousing)
      .filter(value => value === true)
      .length;
    return numberOfTrues === 1;
  } else if (atLeastOneOptionWasSelected) {
    // preferNotToSay = false && at least one other option was selected
    return true;
  }
}

const householdMemberAgeHasError = (applicantAge) => {
  const numberApplicantAge = Number(applicantAge);
  return numberApplicantAge < 0;
}

const displayHouseholdMemberAgeHelperText = (applicantAge) => {
  const numberApplicantAge = Number(applicantAge);
  
  if (numberApplicantAge < 0) {
    return (
      <FormattedMessage 
        id='validation-helperText.hHMemberAge' 
        defaultMessage='Please enter 0 or a positive number' />
    );
  };
}

const householdMemberDataIsValid = (householdDataState, setHouseholdDataState) => {
  const allValidatedMemberData = householdDataState.householdData.every(personData => {
    const { age, relationshipToHH, student, pregnant, unemployed, blindOrVisuallyImpaired, 
      disabled, veteran, medicaid, disabilityRelatedMedicaid, noneOfTheseApply, hasIncome,
      incomeStreams, hasExpenses, expenses 
    } = personData;

    if (Number(age) <= 0) {
      //what if they have a newborn? What age should be entered for them?
      setHouseholdDataState({
        ...householdDataState, 
        error: 
          <FormattedMessage 
            id='validation-helperText.hhMemberAgeB'
            defaultMessage='Please enter an age greater than 0' /> 
      });
      return false;
    } else if (relationshipToHH === '') {
      setHouseholdDataState({
        ...householdDataState, 
        error: 
          <FormattedMessage 
            id='validation-helperText.hhMemberRelation'
            defaultMessage='Please select a relation option' /> 
      });
      return false;
    } else if ( (noneOfTheseApply && student) || (noneOfTheseApply && pregnant) || 
      (noneOfTheseApply && unemployed) || (noneOfTheseApply && blindOrVisuallyImpaired) ||
      (noneOfTheseApply && disabled) || (noneOfTheseApply && veteran) || (noneOfTheseApply && medicaid) ||
      (noneOfTheseApply && disabilityRelatedMedicaid) ) {
      setHouseholdDataState({
        ...householdDataState, 
        error: 
          <FormattedMessage 
            id='validation-helperText.hhMemberNoneApply'
            defaultMessage='Please deselect all other options if none of these conditions apply' />
      });
      return false;
    } else if (hasIncome && incomeStreamsAreValid(incomeStreams) === false) {
      setHouseholdDataState({
        ...householdDataState,
        error: 
          <FormattedMessage 
            id='validation-helperText.hhMemberIncome'
            defaultMessage='Please select and enter a response for all three income fields' />
      });
      return false;
    } else if (hasExpenses && expenseSourcesAreValid(expenses) === false) {
      setHouseholdDataState({
        ...householdDataState, 
        error: 
          <FormattedMessage 
            id='validation-helperText.hhMemberExpense'
            defaultMessage='Please select and enter a response for all three expense fields' />
      });
      return false;
    } else {
      return true;
    }

  });

  return allValidatedMemberData;
}

const emailHasError = (email) => {
  return !(/^.+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email));
} 

const displayEmailHelperText = (email) => {
  if (emailHasError(email)) {
    return (
      <FormattedMessage
        id='validation-helperText.email'
        defaultMessage='Please enter a valid email address' />
    );
  }
}

const lastTaxFilingYearHasError = (year) => {
  return year === '';
}

const displayMissingTaxFilingYear = (year) => {
  if (lastTaxFilingYearHasError(year)) {
    return (
      <FormattedMessage
        id='validation-helperText.lastTaxFilingYear'
        defaultMessage='Please select a year' />
    );
  }
}

const benefitsHasError = (benefits) => {
  return false;
}

const referralSourceHasError = (referralSource) => {
  return referralSource === '';
}

const displayReferralSourceHelperText = (source) => {
  if (referralSourceHasError(source)) {
    return (
        <FormattedMessage 
          id='validation-helperText.referralSource' 
          defaultMessage='Please type in your source.' />
    );
  }
}

const displayMissingSelectHelperText = (source) => {
  if (referralSourceHasError(source)) {
    return (
        <FormattedMessage 
          id='validation-helperText.selectOption' 
          defaultMessage='Please select an option.' />
    );
  }
}
const firstOrLastNameHaveError = (firstName, lastName) => {
  return firstName === '' || lastName === '';
}

const displayFirstOrLastNameErrorHelperText = (firstName, lastName) => {
  if (firstOrLastNameHaveError(firstName, lastName)) {
    return (
      <FormattedMessage 
        id='validation-helperText.firstOrLastName' 
        defaultMessage='Please enter your first and last name' />
    );
  }
}

const phoneHasError = (phoneNumber) => {
  const digitizedPhone = phoneNumber.replace(/\D/g,'');
  return digitizedPhone.length !== 10;
}

const displayPhoneHasErrorHelperText = (phoneNumber) => {
  if (phoneHasError(phoneNumber)) {
    return (
      <FormattedMessage 
          id='validation-helperText.phoneNumber' 
          defaultMessage='Please enter a 10 digit phone number' />
    );
  }
}
export {
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
  displayHouseholdAssetsHelperText,
  housingSourcesAreValid,
  householdMemberAgeHasError,
  displayHouseholdMemberAgeHelperText,
  householdMemberDataIsValid,
  emailHasError,
  displayEmailHelperText,
  lastTaxFilingYearHasError,
  displayMissingTaxFilingYear,
  benefitsHasError,
  referralSourceHasError,
  displayReferralSourceHelperText,
  displayMissingSelectHelperText
}