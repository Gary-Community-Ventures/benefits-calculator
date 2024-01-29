import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import countiesByZipcode from './countiesByZipcode';
import type { ErrorController, ValidationFunction, MessageFunction } from '../Types/ErrorController';
import type { Expense, HealthInsurance, HouseholdData, IncomeStream, SignUpInfo, Benefits } from '../Types/FormData';
import ErrorMessageWrapper from '../Components/ErrorMessage/ErrorMessageWrapper';

function useErrorController(hasErrorFunc: ValidationFunction<any>, messageFunc: MessageFunction<any>): ErrorController {
  const [hasError, setHasError] = useState(false);
  const [submittedCount, setSubmittedCount] = useState(0);

  const showError = hasError && submittedCount > 0;

  const incrementSubmitted = () => {
    setSubmittedCount(submittedCount + 1);
  };

  const updateError: ValidationFunction<any> = (value, formData) => {
    const updatedHasError = hasErrorFunc(value, formData);
    setHasError(updatedHasError);
    return updatedHasError;
  };

  const message: MessageFunction<any> = (value, formData) => {
    return messageFunc(value, formData);
  };

  return { hasError, showError, submittedCount, incrementSubmitted, setSubmittedCount, updateError, message };
}

const ageHasError: ValidationFunction<string | number> = (applicantAge) => {
  // handleTextfieldChange prevents setting anything to formData that does not pass a number regex test
  // so applicantAge will always be initiated as a string and converted to a number once it passes the regex test
  const numberApplicantAge = Number(applicantAge);
  //the numbers that we type in have to be 0-8 digits long but we want them to be within this min/max range
  const minimumAge = 13;
  const maximumAge = 130;
  return numberApplicantAge < minimumAge || numberApplicantAge > maximumAge;
};

const displayAgeHelperText: MessageFunction<string> = (applicantAge) => {
  const numberApplicantAge = Number(applicantAge);
  const minimumAge = 13;
  const maximumAge = 130;
  if (numberApplicantAge < minimumAge || numberApplicantAge > maximumAge) {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="errorMessage-age" defaultMessage="Please enter your age" />
      </ErrorMessageWrapper>
    );
  }
};

const zipcodeHasError: ValidationFunction<string | number> = (zipcode) => {
  //the zipcode input must have digits [0-9] and be exactly 5 digits long
  const numberMustBeFiveDigitsLongRegex = /^\d{5}$/;
  if (numberMustBeFiveDigitsLongRegex.test(zipcode.toString())) {
    //this means that the zipcode input passed the regex test so we can just return false since there is no error
    //this additional test checks the zipcode input against all CO zipcodes
    return !Object.keys(countiesByZipcode).includes(zipcode.toString());
  } else {
    return true;
  }
};

const displayZipcodeHelperText: MessageFunction<string | number> = (zipcode) => {
  if (zipcodeHasError(zipcode)) {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="validation-helperText.zipcode" defaultMessage="Please enter a valid CO zip code" />
      </ErrorMessageWrapper>
    );
  }
};

const radiofieldHasError: ValidationFunction<any> = (radiofield) => {
  return typeof radiofield !== 'boolean';
};

const hoursWorkedValueHasError: ValidationFunction<string> = (valueInput) => {
  const numberUpToEightDigitsLongRegex = /^\d{0,3}$/;
  return Number(valueInput) <= 0 && (numberUpToEightDigitsLongRegex.test(valueInput) || valueInput === '');
};

const hoursWorkedHelperText: MessageFunction<string> = (valueInput) => {
  if (hoursWorkedValueHasError(valueInput)) {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="errorMessage-greaterThanZero" defaultMessage="Please enter a number greater than 0" />
      </ErrorMessageWrapper>
    );
  }
};

const incomeStreamValueHasError: ValidationFunction<string> = (valueInput) => {
  const incomeAmountRegex = /^\d{0,7}(?:\d\.\d{0,2})?$/;

  return Number(valueInput) <= 0 && (incomeAmountRegex.test(valueInput) || valueInput === '');
};

const displayIncomeStreamValueHelperText: MessageFunction<string> = (valueInput) => {
  if (incomeStreamValueHasError(valueInput)) {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="errorMessage-greaterThanZero" defaultMessage="Please enter a number greater than 0" />
      </ErrorMessageWrapper>
    );
  }
};

const incomeStreamsAreValid: ValidationFunction<IncomeStream[]> = (incomeStreams) => {
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

const expenseSourceValueHasError: ValidationFunction<string | number> = (valueInput) => {
  return valueInput === '' || Number(valueInput) <= 0;
};

const displayExpenseSourceValueHelperText: MessageFunction<string | number> = (valueInput) => {
  if (expenseSourceValueHasError(valueInput)) {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="errorMessage-greaterThanZero" defaultMessage="Please enter a number greater than 0" />
      </ErrorMessageWrapper>
    );
  }
};

const expenseSourcesHaveError: ValidationFunction<Expense[]> = (expenses) => {
  const expensesHasError = expenses.some((expenseSourceData) => {
    const { expenseSourceName, expenseAmount } = expenseSourceData;
    return expenseSourceName === '' || expenseAmount === '' || Number(expenseAmount) <= 0;
  });

  return expensesHasError;
};

const displayExpensesHelperText: MessageFunction<Expense[]> = (expenses) => {
  if (expenseSourcesHaveError(expenses)) {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage
          id="expenseBlock.return-error-message"
          defaultMessage="Please select and enter a response for all expense fields"
        />
      </ErrorMessageWrapper>
    );
  }
};

const householdSizeHasError: ValidationFunction<string> = (sizeOfHousehold) => {
  const numValueInput = Number(sizeOfHousehold);
  return numValueInput <= 0 || numValueInput > 8;
};

const displayHouseholdSizeHelperText: MessageFunction<string> = (sizeOfHousehold) => {
  const numValueInput = Number(sizeOfHousehold);
  return (
    (numValueInput <= 0 || numValueInput > 8) && (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage
          id="errorMessage-numberOfHHMembers"
          defaultMessage="Please enter the number of people in your household (max. 8)"
        />
      </ErrorMessageWrapper>
    )
  );
};

const householdAssetsHasError: ValidationFunction<string> = (householdAssets) => {
  return Number(householdAssets) < 0;
};

const displayHouseholdAssetsHelperText: MessageFunction<string> = (householdAssets) => {
  if (householdAssetsHasError(householdAssets)) {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="validation-helperText.assets" defaultMessage="Please enter 0 or a positive number." />
      </ErrorMessageWrapper>
    );
  }
};

const householdMemberAgeHasError: ValidationFunction<string> = (applicantAge) => {
  if (applicantAge === '') {
    return true;
  }
  const numberApplicantAge = Number(applicantAge);
  return numberApplicantAge < 0;
};

const displayHouseholdMemberAgeHelperText: MessageFunction<string> = (applicantAge) => {
  if (householdMemberAgeHasError(applicantAge)) {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage
          id="errorMessage-HHMemberAge"
          defaultMessage="Please enter 0 or a positive number for the household member's age"
        />
      </ErrorMessageWrapper>
    );
  }
};

const personDataIsValid: ValidationFunction<HouseholdData> = (householdDataState) => {
  const { age, relationshipToHH, hasIncome, incomeStreams, healthInsurance } = householdDataState;

  const ageIsValid = Number(age) >= 0 && age !== '';
  const relationshipToHHIsValid = relationshipToHH !== '';
  const incomeIsValid = (hasIncome && incomeStreamsAreValid(incomeStreams)) || !hasIncome;
  const healthInsuranceIsValid = healthInsuranceDataIsValid(healthInsurance);

  return ageIsValid && relationshipToHHIsValid && incomeIsValid && healthInsuranceIsValid;
};

const getHealthInsuranceError: MessageFunction<{ index: number; healthInsurance: HealthInsurance }> = ({
  index,
  healthInsurance,
}) => {
  if (healthInsuranceDataIsValid(healthInsurance) === false) {
    if (healthInsurance.none === true) {
      //then they chose none and another option
      return (
        <ErrorMessageWrapper fontSize="1rem">
          {index === 1 ? (
            <FormattedMessage
              id="validation-helperText.hhMemberInsuranceNone-you"
              defaultMessage="Please do not select any other options if you do not have health insurance"
            />
          ) : (
            <FormattedMessage
              id="validation-helperText.hhMemberInsuranceNone-they"
              defaultMessage="Please do not select any other options if they do not have health insurance"
            />
          )}
        </ErrorMessageWrapper>
      );
    } else if (healthInsurance.dont_know === true) {
      //then they chose dont_know and another option
      return (
        <ErrorMessageWrapper fontSize="1rem">
          <FormattedMessage
            id="validation-helperText.hhMemberInsuranceDontKnow"
            defaultMessage="Please do not select any other options if you don't know"
          />
        </ErrorMessageWrapper>
      );
    } else {
      //they haven't selected an option
      return (
        <ErrorMessageWrapper fontSize="1rem">
          <FormattedMessage
            id="validation-helperText.hhMemberInsurance"
            defaultMessage="Please select at least one health insurance option"
          />
        </ErrorMessageWrapper>
      );
    }
  }
};

const healthInsuranceDataIsValid: ValidationFunction<HealthInsurance> = (hhMemberHealthInsData) => {
  const numOfTrueValues = Object.values(hhMemberHealthInsData).filter(
    (healthInsuranceValue) => healthInsuranceValue === true,
  ).length;

  if (hhMemberHealthInsData.none === true || hhMemberHealthInsData.dont_know === true) {
    //check here to ensure that that is the ONLY option that was selected via numOfTrueValues
    return numOfTrueValues === 1;
  } else {
    const atLeastOneOptionWasSelected = numOfTrueValues > 0;
    return atLeastOneOptionWasSelected;
  }
};

const healthInsuranceDataHasError: ValidationFunction<HealthInsurance> = (hhMemberHealthInsData: HealthInsurance) => {
  return !healthInsuranceDataIsValid(hhMemberHealthInsData);
};

const emailHasError: ValidationFunction<string> = (email) => {
  return !/^.+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email);
};

const displayEmailHelperText: MessageFunction<string> = (email) => {
  if (emailHasError(email)) {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="validation-helperText.email" defaultMessage="Please enter a valid email address" />
      </ErrorMessageWrapper>
    );
  }
};

const selectHasError: ValidationFunction<string> = (referralSource) => {
  return !referralSource;
};

const displayReferralSourceHelperText: MessageFunction<string> = (source) => {
  if (selectHasError(source)) {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="validation-helperText.referralSource" defaultMessage="Please select a referral source." />
      </ErrorMessageWrapper>
    );
  }
};

const displayMissingSelectHelperText: MessageFunction<string> = (source) => {
  if (selectHasError(source)) {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="validation-helperText.selectOption" defaultMessage="Please select an option." />
      </ErrorMessageWrapper>
    );
  }
};

const nameHasError: ValidationFunction<string> = (name) => {
  return name === '';
};

const displayFirstNameHelperText: MessageFunction<string> = (firstName) => {
  if (nameHasError(firstName)) {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="validation-helperText.firstName" defaultMessage="Please enter your first name" />
      </ErrorMessageWrapper>
    );
  }
};

const displayLastNameHelperText: MessageFunction<string> = (lastName) => {
  if (nameHasError(lastName)) {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="validation-helperText.lastName" defaultMessage="Please enter your last name" />
      </ErrorMessageWrapper>
    );
  }
};

const phoneHasError: ValidationFunction<string> = (phoneNumber) => {
  const digitizedPhone = phoneNumber.replace(/\D/g, '');
  return digitizedPhone.length !== 10;
};

const displayPhoneHasErrorHelperText: MessageFunction<string> = (phoneNumber) => {
  if (phoneHasError(phoneNumber)) {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage
          id="validation-helperText.phoneNumber"
          defaultMessage="Please enter a 10 digit phone number"
        />
      </ErrorMessageWrapper>
    );
  }
};

const signUpFormHasError: ValidationFunction<SignUpInfo & { serverError?: boolean }> = (props) => {
  const { email, phone, firstName, lastName, sendUpdates, sendOffers, commConsent, hasUser, serverError } = props;
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
    commConsent === false ||
    serverError === true
  );
};

const displayNoEmailOrPhoneHelperText = (email: string, phone: string) => {
  if (!email && !phone) {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage
          id="validation-helperText.noEmailOrPhoneNumber"
          defaultMessage="Please enter an email or phone number"
        />
      </ErrorMessageWrapper>
    );
  }
};

const signUpServerHasError: ValidationFunction<boolean | undefined> = (serverError) => {
  return serverError === true;
};

const signUpServerErrorHelperText: MessageFunction<SignUpInfo> = (props) => {
  return (
    <ErrorMessageWrapper fontSize="1.5rem">
      <FormattedMessage
        id="validation-helperText.serverError"
        defaultMessage="Please enter a valid email address. This error could also be caused by entering an email address that is already in our system. If the error persists, remember that this question is optional and will not impact your MyFriendBen results. You can skip this question by deselecting the boxes at the top of the page and pressing continue."
      />
    </ErrorMessageWrapper>
  );
};

const signUpOptionsHaveError: ValidationFunction<SignUpInfo> = (signUpInfo) => {
  const { sendOffers, sendUpdates } = signUpInfo;
  const doesNotWantNotifications = sendOffers === false && sendUpdates === false;

  if (doesNotWantNotifications) {
    return false;
  } else {
    return signUpFormHasError(signUpInfo);
  }
};

const healthInsuranceHasError: ValidationFunction<{ [key: string]: boolean }> = (healthInsuranceSelections) => {
  const healthInsuranceKeys = Object.keys(healthInsuranceSelections);
  const noOptionWasSelected = healthInsuranceKeys.every(
    (option) => healthInsuranceSelections[option as keyof HealthInsurance] === false,
  );
  return noOptionWasSelected;
};

const displayHealthInsuranceHelperText: MessageFunction<{ [key: string]: boolean }> = (healthInsuranceSelections) => {
  if (healthInsuranceHasError(healthInsuranceSelections)) {
    return (
      <ErrorMessageWrapper fontSize="1.5rem">
        <FormattedMessage
          id="validation-helperText.healthInsurance"
          defaultMessage='If none of these apply, please select "One or more household member(s) do not have health insurance"'
        />
      </ErrorMessageWrapper>
    );
  }
};

const acuteHHConditionsHasError = () => {
  return false;
};

const benefitsHasError: ValidationFunction<string> = (hasBenefits, formData) => {
  if (hasBenefits !== 'true') {
    return false;
  }
  if (formData === undefined) {
    throw new Error('FormData not provided');
  }
  const { benefits } = formData;
  const selectedAtLeastOneBenefit = Object.keys(benefits).some(
    (benefit) => formData.benefits[benefit as keyof Benefits] === true,
  );

  //return the opposite since we're indicating whether or not there's an error
  return !selectedAtLeastOneBenefit;
};

const displayBenefitsHelperText: MessageFunction<string> = (hasBenefits, formData) => {
  if (benefitsHasError(hasBenefits, formData)) {
    return (
      <ErrorMessageWrapper fontSize="1.5rem">
        <FormattedMessage
          id="validation-helperText.benefits"
          defaultMessage='If your household does not receive any of these benefits, please select the "No" option above.'
        />
      </ErrorMessageWrapper>
    );
  }
};

const countySelectHelperText: MessageFunction<string> = () => {
  return (
    <ErrorMessageWrapper fontSize="1rem">
      <FormattedMessage id="errorMessage-county" defaultMessage="Please Select a county" />
    </ErrorMessageWrapper>
  );
};

const expenseTypeHelperText: MessageFunction<string> = () => {
  return (
    <ErrorMessageWrapper fontSize="1rem">
      <FormattedMessage id="errorMessage-expenseType" defaultMessage="Please select an expense type" />
    </ErrorMessageWrapper>
  );
};

const relationTypeHelperText: MessageFunction<string> = () => {
  return (
    <ErrorMessageWrapper fontSize="1rem">
      <FormattedMessage id="errorMessage-HHMemberRelationship" defaultMessage="Please select a relationship" />
    </ErrorMessageWrapper>
  );
};

const incomeStreamHelperText: MessageFunction<string> = () => {
  return (
    <ErrorMessageWrapper fontSize="1rem">
      <FormattedMessage id="errorMessage-incomeType" defaultMessage="Please select an income type" />
    </ErrorMessageWrapper>
  );
};

const incomeFrequencyHelperText: MessageFunction<string> = () => {
  return (
    <ErrorMessageWrapper fontSize="1rem">
      <FormattedMessage id="errorMessage-incomeFrequency" defaultMessage="Please select a frequency" />
    </ErrorMessageWrapper>
  );
};

const otherReferalSourceHelperText: MessageFunction<string> = () => {
  return (
    <ErrorMessageWrapper fontSize="1rem">
      <FormattedMessage id="errorMessage-otherReferralSource" defaultMessage="Please type in your referral source" />
    </ErrorMessageWrapper>
  );
};

const termsOfServiceHasError: ValidationFunction<boolean> = (isChecked) => {
  return !isChecked;
};

const displayAgreeToTermsErrorMessage: MessageFunction<null> = () => {
  return (
    <ErrorMessageWrapper fontSize="1rem">
      <FormattedMessage id="disclaimer.error" defaultMessage="Please check the box to continue." />
    </ErrorMessageWrapper>
  );
};

export {
  useErrorController,
  ageHasError,
  displayAgeHelperText,
  zipcodeHasError,
  displayZipcodeHelperText,
  radiofieldHasError,
  hoursWorkedValueHasError,
  hoursWorkedHelperText,
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
  selectHasError,
  displayReferralSourceHelperText,
  displayMissingSelectHelperText,
  nameHasError,
  displayFirstNameHelperText,
  displayLastNameHelperText,
  phoneHasError,
  displayPhoneHasErrorHelperText,
  signUpFormHasError,
  signUpServerHasError,
  signUpServerErrorHelperText,
  signUpOptionsHaveError,
  healthInsuranceHasError,
  displayHealthInsuranceHelperText,
  acuteHHConditionsHasError,
  benefitsHasError,
  displayBenefitsHelperText,
  countySelectHelperText,
  expenseTypeHelperText,
  relationTypeHelperText,
  incomeStreamHelperText,
  incomeFrequencyHelperText,
  otherReferalSourceHelperText,
  termsOfServiceHasError,
  displayAgreeToTermsErrorMessage,
  healthInsuranceDataHasError,
  getHealthInsuranceError,
};
