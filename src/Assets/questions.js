import {
  zipcodeHasError,
  displayZipcodeHelperText,
  radiofieldHasError,
  householdSizeHasError,
  displayHouseholdSizeHelperText,
  householdAssetsHasError,
  displayHouseholdAssetsHelperText,
  benefitsHasError,
  referralSourceHasError,
  displayReferralSourceHelperText,
  displayMissingSelectHelperText,
  signUpOptionsHaveError,
  healthInsuranceHasError,
  acuteHHConditionsHasError,
  displayHealthInsuranceHelperText,
  displayBenefitsHelperText
} from './validationFunctions';
import taxYearOptions from './taxYearOptions';
import referralOptions from './referralOptions';
import countiesByZipcode from './countiesByZipcode';
import signUpOptions from './signUpOptions';
import healthInsuranceOptions from './healthInsuranceOptions';
import acuteConditionOptions from './acuteConditionOptions';
import stepDirectory from './stepDirectory';
import { FormattedMessage } from 'react-intl';

const questions = {
  [stepDirectory.zipcode]: {
    name: 'zipcode',
    question:
      <FormattedMessage
        id='questions.zipcode'
        defaultMessage='What is your zip code?' />,
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'zipcode',
      inputLabel:
        <FormattedMessage
          id='questions.zipcode-inputLabel'
          defaultMessage='Zip Code' />,
      inputError: zipcodeHasError,
      inputHelperText: displayZipcodeHelperText
    },
    followUpQuestions: [{
      question:
        <FormattedMessage
          id='questions.zipcode-a'
          defaultMessage='Please select a county:' />,
      name: 'county',
      componentDetails: {
        componentType: 'BasicSelect',
        inputType: 'text',
        inputName: 'county',
        inputLabel:
          <FormattedMessage
            id='questions.zipcode-a-inputLabel'
            defaultMessage='County' />,
        inputError: referralSourceHasError,
        inputHelperText: displayMissingSelectHelperText,
        componentProperties: {
          labelId: 'county-select-label',
          inputLabelText:
            <FormattedMessage
              id='questions.zipcode-a-inputLabel'
              defaultMessage='County'
            />,
          id:'county-source-select',
          value: 'county',
          label:
            <FormattedMessage
              id='questions.zipcode-a-inputLabel'
              defaultMessage='County'
            />,
          disabledSelectMenuItemText:
            <FormattedMessage
              id='questions.zipcode-a-disabledSelectMenuItemText'
              defaultMessage='Select a county' />
        },
        options: countiesByZipcode
      }
    }],
    headerType: 'aboutHousehold'
  },
  [stepDirectory.healthInsurance]: {
    name: 'healthInsurance',
    question:
      <FormattedMessage
        id='questions.healthInsurance'
        defaultMessage='Which type(s) of health insurance do members of your household have? Check all that apply.' />,
    componentDetails: {
      componentType: 'OptionCardGroup',
      inputName: 'healthInsurance',
      options: healthInsuranceOptions,
      inputError: healthInsuranceHasError,
      inputHelperText: displayHealthInsuranceHelperText
    },
    headerType: 'aboutHousehold'
  },
  [stepDirectory.householdSize]: {
    name: 'householdSize',
    question:
      <FormattedMessage
        id='questions.householdSize'
        defaultMessage='Including you, how many people are in your household?' />,
    questionDescription:
      <FormattedMessage
        id='questions.householdSize-description'
        defaultMessage='This is usually family members who you both live and share important resources with like food and bills.' />,
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'householdSize',
      inputLabel:
        <FormattedMessage
          id='questions.householdSize-inputLabel'
          defaultMessage='Household Size' />,
      inputError: householdSizeHasError,
      inputHelperText: displayHouseholdSizeHelperText
    },
    headerType: 'aboutHousehold'
  },
  [stepDirectory.householdData]: {
    name: 'householdData',
    componentDetails: {
      componentType: 'HouseholdDataBlock',
      ariaLabel: 'questions.householdData-ariaLabel',
      inputName: 'householdData'
    }
  },
  [stepDirectory.hasExpenses]: {
    name: 'hasExpenses',
    question:
      <FormattedMessage
        id='questions.hasExpenses'
        defaultMessage='Does your household have any expenses?' />,
    questionDescription:
      <FormattedMessage
        id='questions.hasExpenses-description'
        defaultMessage='Add up expenses for everyone who lives in your home.
          This includes costs like child care, child support, rent, medical expenses, heating bills, and more.
          We will ask only about expenses that may affect benefits. We will not ask about expenses such as food since grocery bills do not affect benefits.' />,
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'questions.hasExpenses-ariaLabel',
      inputName: 'hasExpenses',
      inputError: radiofieldHasError
    },
    followUpQuestions: [{
      question:
        <FormattedMessage
          id='questions.hasExpenses-a'
          defaultMessage='What type of expense has your household had most recently?' />,
      name: 'expenses',
      componentDetails: {
        componentType: 'ExpenseBlock',
        ariaLabel: 'questions.hasExpenses-a-ariaLabel',
        inputName: 'expenses'
      }
    }],
    headerType: 'aboutHousehold'
  },
  [stepDirectory.householdAssets]: {
    name: 'householdAssets',
    question:
      <FormattedMessage
        id='questions.householdAssets'
        defaultMessage='How much does your whole household have right now in:' />,
    questionDescription:
      <FormattedMessage
        id='questions.householdAssets-description'
        defaultMessage='Cash on hand? Checking or saving accounts? Stocks, bonds or mutual funds? In some cases, eligibility for benefits may be affected if your household owns other valuable assets such as a car or life insurance policy.' />,
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'householdAssets',
      inputLabel:
        <FormattedMessage
          id='questions.householdAssets-inputLabel'
          defaultMessage='Dollar Amount' />,
      inputError: householdAssetsHasError,
      inputHelperText: displayHouseholdAssetsHelperText
    },
    headerType: 'aboutHousehold'
  },
  [stepDirectory.hasBenefits]: {
    name: 'hasBenefits',
    question:
      <FormattedMessage
        id='questions.hasBenefits'
        defaultMessage='Does your household currently have any benefits?' />,
    questionDescription:
      <FormattedMessage
        id='questions.hasBenefits-description'
        defaultMessage="This information will help make sure we don't give you results for benefits you already have." />,
    componentDetails: {
      componentType: 'PreferNotToAnswer',
      ariaLabel: 'questions.hasBenefits-ariaLabel',
      inputName: 'hasBenefits',
      inputError: benefitsHasError,
      inputHelperText: displayBenefitsHelperText
    },
    followUpQuestions: [{
      question:
        <FormattedMessage
          id='questions.hasBenefits-a'
          defaultMessage='Please tell us what benefits your household currently has.' />,
      name: 'benefits',
      componentDetails: {
        componentType: 'AccordionContainer',
        ariaLabel: 'questions.hasBenefits-a-ariaLabel',
        inputName: 'benefits'
      }
    }],
    headerType: 'aboutHousehold'
  },
  [stepDirectory.acuteHHConditions]: {
    name: 'acuteHHConditions',
    question:
      <FormattedMessage
        id='questions.acuteHHConditions'
        defaultMessage='Is anyone in your household in immediate need of help with any of the following?' />,
    componentDetails: {
      componentType: 'OptionCardGroup',
      inputName: 'acuteHHConditions',
      options: acuteConditionOptions,
      inputError: acuteHHConditionsHasError
    },
    headerType: 'aboutHousehold'
  },
  [stepDirectory.referralSource]: {
    name: 'referralSource',
    componentDetails: {
      componentType: 'BasicSelect',
      inputName: 'referralSource',
      inputError: referralSourceHasError,
      componentProperties: {
        labelId: 'referral-source-select-label',
        inputLabelText:
          <FormattedMessage
            id='qcc.createReferralDropdownMenu-label'
            defaultMessage='Referral Source'
          />,
        id:'referral-source-select',
        value: 'referralSource',
        label:
          <FormattedMessage
            id='qcc.createReferralDropdownMenu-label'
            defaultMessage='Referral Source'
          />,
        disabledSelectMenuItemText:
          <FormattedMessage
            id='qcc.createReferralDropdownMenu-disabledSelectMenuItemText'
            defaultMessage='Select a source' />
      },
      options: referralOptions
    },
    followUpQuestions: [{
      question:
        <FormattedMessage
          id='questions.referralSource-a'
          defaultMessage='If other, please specify:' />,
      name: 'otherSource',
      componentDetails: {
        componentType: 'Textfield',
        inputType: 'text',
        inputName: 'otherSource',
        inputLabel:
          <FormattedMessage
            id='questions.referralSource-a-inputLabel'
            defaultMessage='Other referral source' />,
        inputError: referralSourceHasError,
        inputHelperText: displayReferralSourceHelperText
      }
    }],
    headerType: 'aboutHousehold'
  },
  [stepDirectory.signUpInfo]: {
    name: 'signUpInfo',
    question:
      <FormattedMessage
        id='questions.signUpInfo'
        defaultMessage='What would you like us to contact you about?' />,
    componentDetails: {
      componentType: 'BasicCheckboxGroup',
      inputName: 'signUpInfo',
      options: signUpOptions,
      inputError: signUpOptionsHaveError
    },
    followUpQuestions: [{
      question:
        <FormattedMessage
          id='questions.signUpInfo-a'
          defaultMessage='Please provide your contact info below: ' />,
      componentDetails: {
        componentType: 'SignUp',
        inputName: 'signUpInfo',
        ariaLabel: 'questions.signUpInfo-ariaLabel',
      }
    }],
    headerType: 'signUpInfo'
  }
};

export default questions;
