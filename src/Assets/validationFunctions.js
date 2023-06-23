import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import countiesByZipcode from './countiesByZipcode';

function useErrorController(hasErrorFunc, messageFunc) {
  const [hasError, setHasError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const showError = hasError && isSubmitted;

  const updateError = (value, formData) => {
    const updatedHasError = hasErrorFunc(value, formData);
    setHasError(updatedHasError);
    return updatedHasError;
  };

  const message = (value, formData) => {
    return messageFunc(value, formData);
  };

  return { hasError, showError, isSubmitted, setIsSubmitted, updateError, message };
}

const ageHasError = (applicantAge) => {
  // handleTextfieldChange prevents setting anything to formData that does not pass a number regex test
  // so applicantAge will always be initiated as a string and converted to a number once it passes the regex test
  const numberApplicantAge = Number(applicantAge);
  //the numbers that we type in have to be 0-8 digits long but we want them to be within this min/max range
  const minimumAge = 13;
  const maximumAge = 130;
  return numberApplicantAge < minimumAge || numberApplicantAge > maximumAge;
};

const displayAgeHelperText = (applicantAge) => {
  const numberApplicantAge = Number(applicantAge);
  const minimumAge = 13;
  const maximumAge = 130;
  if (numberApplicantAge < minimumAge || numberApplicantAge > maximumAge) {
    return <FormattedMessage id="validation-helperText.age" defaultMessage="Please enter a valid age (13-130)" />;
  }
};

const zipcodeHasError = (zipcode) => {
  //the zipcode input must have digits [0-9] and be exactly 5 digits long
  const numberMustBeFiveDigitsLongRegex = /^\d{5}$/;
  if (numberMustBeFiveDigitsLongRegex.test(zipcode)) {
    //this means that the zipcode input passed the regex test so we can just return false since there is no error
    //this additional test checks the zipcode input against all CO zipcodes
    return !Object.keys(countiesByZipcode).includes(zipcode.toString());
  } else {
    return true;
  }
};

const displayZipcodeHelperText = (zipcode) => {
  if (zipcodeHasError(zipcode)) {
    return <FormattedMessage id="validation-helperText.zipcode" defaultMessage="Please enter a valid CO zip code" />;
  }
};

const radiofieldHasError = (radiofield) => {
  return typeof radiofield !== 'boolean';
};

const hoursWorkedValueHasError = (valueInput) => {
  const numberUpToEightDigitsLongRegex = /^\d{0,3}$/;
  return Number(valueInput) <= 0 && (numberUpToEightDigitsLongRegex.test(valueInput) || valueInput === '');
};

const incomeStreamValueHasError = (valueInput) => {
  const incomeAmountRegex = /^\d{0,7}(?:\d\.\d{0,2})?$/;

  return Number(valueInput) <= 0 && (incomeAmountRegex.test(valueInput) || valueInput === '');
};

const displayIncomeStreamValueHelperText = (valueInput) => {
  if (incomeStreamValueHasError(valueInput)) {
    return (
      <FormattedMessage id="validation-helperText.incomeValue" defaultMessage="Please enter a number greater than 0" />
    );
  }
};

const incomeStreamsAreValid = (incomeStreams) => {
  const allIncomeStreamsAreValid = incomeStreams.every((incomeSourceData) => {
    const { incomeStreamName, incomeAmount, incomeFrequency, hoursPerWeek } = incomeSourceData;

    return (
      incomeStreamName.length > 0 &&
      incomeAmount !== '' &&
      Number(incomeAmount) > 0 &&
      (incomeFrequency !== 'hourly' || (hoursPerWeek !== '' && Number(hoursPerWeek) > 0)) &&
      incomeFrequency.length > 0
    );
  });

  //incomeStreams must have a non-zero length since this function is only called if
  //the user indicated that they had income. This stmt was also added to fix the vacuously
  //true stmt that allIncomeStreamsAreValid for an empty array
  return incomeStreams.length > 0 && allIncomeStreamsAreValid;
};

const expenseSourceValueHasError = (valueInput) => {
  return valueInput <= 0 || valueInput === '';
};

const displayExpenseSourceValueHelperText = (valueInput) => {
  if (expenseSourceValueHasError(valueInput)) {
    return (
      <FormattedMessage id="validation-helperText.expenseValue" defaultMessage="Please enter a number greater than 0" />
    );
  }
};

const expenseSourcesHaveError = (expenses) => {
  const expensesHasError = expenses.some((expenseSourceData) => {
    const { expenseSourceName, expenseAmount } = expenseSourceData;
    return expenseSourceName === '' || expenseAmount === '' || expenseAmount <= 0;
  });

  return expensesHasError;
};

const displayExpensesHelperText = (expenses) => {
  if (expenseSourcesHaveError(expenses)) {
    return (
      <FormattedMessage
        id="expenseBlock.return-error-message"
        defaultMessage="Please select and enter a response for all expense fields"
      />
    );
  }
};

const householdSizeHasError = (sizeOfHousehold) => {
  const numValueInput = Number(sizeOfHousehold);
  return numValueInput <= 0 || numValueInput > 8;
};

const displayHouseholdSizeHelperText = (sizeOfHousehold) => {
  const numValueInput = Number(sizeOfHousehold);
  return (
    (numValueInput <= 0 || numValueInput > 8) && (
      <FormattedMessage id="validation-helperText.householdSize" defaultMessage="Number of People (max. 8)" />
    )
  );
};

const householdAssetsHasError = (householdAssets) => {
  return householdAssets < 0 || householdAssets === '';
};

const displayHouseholdAssetsHelperText = (householdAssets) => {
  if (householdAssetsHasError(householdAssets)) {
    return <FormattedMessage id="validation-helperText.assets" defaultMessage="Please enter 0 or a positive number." />;
  }
};

const householdMemberAgeHasError = (applicantAge) => {
  if (applicantAge === '') {
    return true;
  }
  const numberApplicantAge = Number(applicantAge);
  return numberApplicantAge < 0;
};

const displayHouseholdMemberAgeHelperText = (applicantAge) => {
  if (householdMemberAgeHasError(applicantAge)) {
    return (
      <FormattedMessage id="validation-helperText.hHMemberAge" defaultMessage="Please enter 0 or a positive number" />
    );
  }
};

const personDataIsValid = (householdDataState) => {
  const { age, relationshipToHH, hasIncome, incomeStreams } = householdDataState;

  const ageIsValid = Number(age) >= 0 && age !== '';
  const relationshipToHHIsValid = relationshipToHH !== '';
  const incomeIsValid = (hasIncome && incomeStreamsAreValid(incomeStreams)) || !hasIncome;

  return ageIsValid && relationshipToHHIsValid && incomeIsValid;
};

const getPersonDataErrorMsg = (householdDataState) => {
  const { age, relationshipToHH, hasIncome, incomeStreams } = householdDataState;

  if (Number(age) < 0 || age === '') {
    return (
      <FormattedMessage
        id="validation-helperText.hhMemberAgeB"
        defaultMessage="Please enter 0 or a positive number for the household member's age"
      />
    );
  } else if (relationshipToHH === '') {
    return (
      <FormattedMessage id="validation-helperText.hhMemberRelation" defaultMessage="Please select a relation option" />
    );
  } else if (hasIncome && incomeStreamsAreValid(incomeStreams) === false) {
    return (
      <FormattedMessage
        id="validation-helperText.hhMemberIncome"
        defaultMessage="Please select and enter a response for all income fields"
      />
    );
  } else {
    return '';
  }
};

const emailHasError = (email) => {
  return !/^.+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email);
};

const displayEmailHelperText = (email) => {
  if (emailHasError(email)) {
    return <FormattedMessage id="validation-helperText.email" defaultMessage="Please enter a valid email address" />;
  }
};

const lastTaxFilingYearHasError = (year) => {
  return year === '';
};

const displayMissingTaxFilingYear = (year) => {
  if (lastTaxFilingYearHasError(year)) {
    return <FormattedMessage id="validation-helperText.lastTaxFilingYear" defaultMessage="Please select a year" />;
  }
};

const referralSourceHasError = (referralSource) => {
  return !referralSource;
};

const displayReferralSourceHelperText = (source) => {
  if (referralSourceHasError(source)) {
    return (
      <FormattedMessage id="validation-helperText.referralSource" defaultMessage="Please select a referral source." />
    );
  }
};

const displayMissingSelectHelperText = (source) => {
  if (referralSourceHasError(source)) {
    return <FormattedMessage id="validation-helperText.selectOption" defaultMessage="Please select an option." />;
  }
};

const nameHasError = (name) => {
  return name === '';
};

const displayFirstNameHelperText = (firstName) => {
  if (nameHasError(firstName)) {
    return <FormattedMessage id="validation-helperText.firstName" defaultMessage="Please enter your first name" />;
  }
};

const displayLastNameHelperText = (lastName) => {
  if (nameHasError(lastName)) {
    return <FormattedMessage id="validation-helperText.lastName" defaultMessage="Please enter your last name" />;
  }
};

const phoneHasError = (phoneNumber) => {
  const digitizedPhone = phoneNumber.replace(/\D/g, '');
  return digitizedPhone.length !== 10;
};

const displayPhoneHasErrorHelperText = (phoneNumber) => {
  if (phoneHasError(phoneNumber)) {
    return (
      <FormattedMessage id="validation-helperText.phoneNumber" defaultMessage="Please enter a 10 digit phone number" />
    );
  }
};

const signUpFormHasError = (props) => {
  const { email, phone, firstName, lastName, sendUpdates, sendOffers, commConsent, hasUser } = props;
  const atLeastOneCheckboxSelectionWasMade = sendUpdates === true || sendOffers === true;
  if (hasUser === true) {
    return false;
  }

  return (
    (emailHasError(email) && email !== '') ||
    (phoneHasError(phone) && phone !== '') ||
    (!email && !phone) ||
    !firstName ||
    !lastName ||
    atLeastOneCheckboxSelectionWasMade === false ||
    commConsent === false
  );
};

const displayNoEmailOrPhoneHelperText = (email, phone) => {
  if (!email && !phone) {
    return (
      <FormattedMessage
        id="validation-helperText.noEmailOrPhoneNumber"
        defaultMessage="Please enter an email or phone number"
      />
    );
  }
};

const displaySignUpFormHelperText = (props) => {
  const { email, phone, firstName, lastName, sendUpdates, sendOffers, commConsent } = props;
  const atLeastOneCheckboxSelectionWasMade = sendUpdates === true || sendOffers === true;

  if (nameHasError(firstName)) {
    return displayFirstNameHelperText(firstName);
  } else if (nameHasError(lastName)) {
    return displayLastNameHelperText(lastName);
  } else if (emailHasError(email)) {
    return displayEmailHelperText(email);
  } else if (phoneHasError(phone)) {
    return displayPhoneHasErrorHelperText(phone);
  } else if (!email && !phone) {
    return displayNoEmailOrPhoneHelperText(email, phone);
  } else if (atLeastOneCheckboxSelectionWasMade === false) {
    return (
      <FormattedMessage
        id="validation-helperText.notificationSelection"
        defaultMessage="Please select a notification option"
      />
    );
  } else if (commConsent === false) {
    return (
      <FormattedMessage
        id="validation-helperText.consentCheckbox"
        defaultMessage="Please check the box above to sign up for the selected notifications"
      />
    );
  }
};

const signUpOptionsHaveError = (signUpInfo) => {
  const { sendOffers, sendUpdates } = signUpInfo;
  const doesNotWantNotifications = sendOffers === false && sendUpdates === false;

  if (doesNotWantNotifications) {
    return false;
  } else {
    return signUpFormHasError(signUpInfo);
  }
};

const healthInsuranceHasError = (healthInsuranceSelections) => {
  const healthInsuranceKeys = Object.keys(healthInsuranceSelections);
  const noOptionWasSelected = healthInsuranceKeys.every((option) => healthInsuranceSelections[option] === false);
  return noOptionWasSelected;
};

const displayHealthInsuranceHelperText = (healthInsuranceSelections) => {
  if (healthInsuranceHasError(healthInsuranceSelections)) {
    return (
      <FormattedMessage
        id="validation-helperText.healthInsurance"
        defaultMessage='If none of these apply, please select "One or more household member(s) do not have health insurance"'
      />
    );
  }
};

const acuteHHConditionsHasError = (conditions) => {
  return false;
};

const benefitsHasError = (hasBenefits, formData) => {
  if (hasBenefits !== 'true') {
    return false;
  } else if (hasBenefits === 'true') {
    const { benefits } = formData;
    const selectedAtLeastOneBenefit = Object.keys(benefits).some((benefit) => formData.benefits[benefit] === true);

    //return the opposite since we're indicating whether or not there's an error
    return !selectedAtLeastOneBenefit;
  }
};

const displayBenefitsHelperText = (hasBenefits, formData) => {
  if (benefitsHasError(hasBenefits, formData)) {
    return (
      <FormattedMessage
        id="validation-helperText.benefits"
        defaultMessage='If your household does not receive any of these benefits, please select the "No" option above.'
      />
    );
  }
};

export {
  useErrorController,
  ageHasError,
  displayAgeHelperText,
  zipcodeHasError,
  displayZipcodeHelperText,
  radiofieldHasError,
  hoursWorkedValueHasError,
  incomeStreamValueHasError,
  displayIncomeStreamValueHelperText,
  incomeStreamsAreValid,
  expenseSourceValueHasError,
  displayExpenseSourceValueHelperText,
  expenseSourcesHaveError,
  displayExpensesHelperText,
  householdSizeHasError,
  displayHouseholdSizeHelperText,
  householdAssetsHasError,
  displayHouseholdAssetsHelperText,
  householdMemberAgeHasError,
  displayHouseholdMemberAgeHelperText,
  personDataIsValid,
  emailHasError,
  displayEmailHelperText,
  lastTaxFilingYearHasError,
  displayMissingTaxFilingYear,
  referralSourceHasError,
  displayReferralSourceHelperText,
  displayMissingSelectHelperText,
  nameHasError,
  displayFirstNameHelperText,
  displayLastNameHelperText,
  phoneHasError,
  displayPhoneHasErrorHelperText,
  signUpFormHasError,
  displaySignUpFormHelperText,
  signUpOptionsHaveError,
  healthInsuranceHasError,
  displayHealthInsuranceHelperText,
  acuteHHConditionsHasError,
  benefitsHasError,
  displayBenefitsHelperText,
  getPersonDataErrorMsg,
};
