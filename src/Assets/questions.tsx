import {
  zipcodeHasError,
  displayZipcodeHelperText,
  radiofieldHasError,
  householdSizeHasError,
  displayHouseholdSizeHelperText,
  householdAssetsHasError,
  displayHouseholdAssetsHelperText,
  benefitsHasError,
  selectHasError,
  displayReferralSourceHelperText,
  signUpOptionsHaveError,
  acuteHHConditionsHasError,
  displayBenefitsHelperText,
  countySelectHelperText,
  otherReferalSourceHelperText,
} from './validationFunctions.tsx';
import referralOptions from './referralOptions.tsx';
import countiesByZipcode from './countiesByZipcode.tsx';
import signUpOptions from './signUpOptions.tsx';
import acuteConditionOptions from './acuteConditionOptions';
import { FormattedMessage } from 'react-intl';
import type { QuestionName, Question } from '../Types/Questions.ts';

const questions: Record<QuestionName, Question> = {
  zipcode: {
    name: 'zipcode',
    header: <FormattedMessage id="qcc.zipcode-header" defaultMessage="Tell us where you live." />,
    subheader: <FormattedMessage id="qcc.tell-us-text" defaultMessage="Let's Get Started!" />,
    question: <FormattedMessage id="questions.zipcode" defaultMessage="What is your zip code?" />,
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'zipcode',
      numericField: true,
      inputLabel: <FormattedMessage id="questions.zipcode-inputLabel" defaultMessage="Zip Code" />,
      inputError: zipcodeHasError,
      inputHelperText: displayZipcodeHelperText,
    },
    followUpQuestions: [
      {
        question: <FormattedMessage id="questions.zipcode-a" defaultMessage="Please select a county:" />,
        name: 'county',
        componentDetails: {
          componentType: 'BasicSelect',
          inputType: 'text',
          inputName: 'county',
          inputLabel: <FormattedMessage id="questions.zipcode-a-inputLabel" defaultMessage="County" />,
          inputError: selectHasError,
          inputHelperText: countySelectHelperText,
          componentProperties: {
            labelId: 'county-select-label',
            inputLabelText: <FormattedMessage id="questions.zipcode-a-inputLabel" defaultMessage="County" />,
            id: 'county-source-select',
            value: 'county',
            label: <FormattedMessage id="questions.zipcode-a-inputLabel" defaultMessage="County" />,
            disabledSelectMenuItemText: (
              <FormattedMessage id="questions.zipcode-a-disabledSelectMenuItemText" defaultMessage="Select a county" />
            ),
          },
          options: countiesByZipcode,
        },
      },
    ],
  },
  householdSize: {
    name: 'householdSize',
    header: <FormattedMessage id="qcc.about_household" defaultMessage="Tell us about your household" />,
    question: (
      <FormattedMessage
        id="questions.householdSize"
        defaultMessage="Including you, how many people are in your household?"
      />
    ),
    questionDescription: (
      <FormattedMessage
        id="questions.householdSize-description"
        defaultMessage="This is usually family members whom you live with and share important resources with like food and bills."
      />
    ),
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'householdSize',
      inputLabel: <FormattedMessage id="questions.householdSize-inputLabel" defaultMessage="Household Size" />,
      inputError: householdSizeHasError,
      inputHelperText: displayHouseholdSizeHelperText,
      numericField: true,
    },
  },
  householdData: {
    name: 'householdData',
    componentDetails: {
      componentType: 'HouseholdDataBlock',
      ariaLabel: 'questions.householdData-ariaLabel',
      inputName: 'householdData',
    },
  },
  hasExpenses: {
    name: 'hasExpenses',
    header: <FormattedMessage id="qcc.about_household" defaultMessage="Tell us about your household" />,
    question: <FormattedMessage id="questions.hasExpenses" defaultMessage="Does your household have any expenses?" />,
    questionDescription: (
      <FormattedMessage
        id="questions.hasExpenses-description"
        defaultMessage="Add up expenses for everyone who lives in your home.
          This includes costs like child care, child support, rent, medical expenses, heating bills, and more.
          We will ask only about expenses that may affect benefits. We will not ask about expenses such as food since grocery bills do not affect benefits."
      />
    ),
    componentDetails: {
      componentType: 'Radiofield',
      ariaLabel: 'questions.hasExpenses-ariaLabel',
      inputName: 'hasExpenses',
      inputError: radiofieldHasError,
    },
    followUpQuestions: [
      {
        question: (
          <FormattedMessage
            id="questions.hasExpenses-a"
            defaultMessage="What type of expense has your household had most recently?"
          />
        ),
        name: 'expenses',
        componentDetails: {
          componentType: 'ExpenseBlock',
          ariaLabel: 'questions.hasExpenses-a-ariaLabel',
          inputName: 'expenses',
        },
      },
    ],
  },
  householdAssets: {
    name: 'householdAssets',
    header: <FormattedMessage id="qcc.about_household" defaultMessage="Tell us about your household" />,
    question: (
      <FormattedMessage
        id="questions.householdAssets"
        defaultMessage="How much does your whole household have right now in:"
      />
    ),
    questionDescription: (
      <FormattedMessage
        id="questions.householdAssets-description"
        defaultMessage="Cash on hand? Checking or saving accounts? Stocks, bonds or mutual funds? In some cases, eligibility for benefits may be affected if your household owns other valuable assets such as a car or life insurance policy."
      />
    ),
    componentDetails: {
      componentType: 'Textfield',
      inputType: 'text',
      inputName: 'householdAssets',
      inputLabel: <FormattedMessage id="questions.householdAssets-inputLabel" defaultMessage="Dollar Amount" />,
      inputError: householdAssetsHasError,
      inputHelperText: displayHouseholdAssetsHelperText,
      dollarField: true,
      numericField: true,
    },
  },
  hasBenefits: {
    name: 'hasBenefits',
    header: (
      <FormattedMessage
        id="qcc.tell-us-final-text"
        defaultMessage="Tell us some final information about your household."
      />
    ),
    question: (
      <FormattedMessage id="questions.hasBenefits" defaultMessage="Does your household currently have any benefits?" />
    ),
    questionDescription: (
      <FormattedMessage
        id="questions.hasBenefits-description"
        defaultMessage="This information will help make sure we don't give you results for benefits you already have."
      />
    ),
    componentDetails: {
      componentType: 'PreferNotToAnswer',
      ariaLabel: 'questions.hasBenefits-ariaLabel',
      inputName: 'hasBenefits',
      inputError: benefitsHasError,
      inputHelperText: displayBenefitsHelperText,
    },
    followUpQuestions: [
      {
        question: (
          <FormattedMessage
            id="questions.hasBenefits-a"
            defaultMessage="Please tell us what benefits your household currently has."
          />
        ),
        name: 'benefits',
        componentDetails: {
          componentType: 'AccordionContainer',
          ariaLabel: 'questions.hasBenefits-a-ariaLabel',
          inputName: 'benefits',
          inputError: benefitsHasError,
          inputHelperText: displayBenefitsHelperText,
        },
      },
    ],
  },
  acuteHHConditions: {
    name: 'acuteHHConditions',
    header: (
      <FormattedMessage
        id="qcc.tell-us-final-text"
        defaultMessage="Tell us some final information about your household."
      />
    ),
    question: (
      <FormattedMessage
        id="questions.acuteHHConditions"
        defaultMessage="Is anyone in your household in immediate need of help with any of the following?"
      />
    ),
    componentDetails: {
      componentType: 'OptionCardGroup',
      inputName: 'acuteHHConditions',
      options: acuteConditionOptions,
      inputError: acuteHHConditionsHasError,
    },
  },
  referralSource: {
    name: 'referralSource',
    header: <FormattedMessage id="questions.referralSource" defaultMessage="Just one more question!" />,
    question: (
      <FormattedMessage id="questions.referralSource-subheader" defaultMessage="How did you hear about MyFriendBen?" />
    ),
    componentDetails: {
      componentType: 'BasicSelect',
      inputType: 'text',
      inputName: 'referralSource',
      inputError: selectHasError,
      inputHelperText: displayReferralSourceHelperText,
      componentProperties: {
        labelId: 'referral-source-select-label',
        inputLabelText: <FormattedMessage id="qcc.createReferralDropdownMenu-label" defaultMessage="Referral Source" />,
        id: 'referral-source-select',
        value: 'referralSource',
        label: <FormattedMessage id="qcc.createReferralDropdownMenu-label" defaultMessage="Referral Source" />,
        disabledSelectMenuItemText: (
          <FormattedMessage
            id="qcc.createReferralDropdownMenu-disabledSelectMenuItemText"
            defaultMessage="Select a source"
          />
        ),
      },
      options: referralOptions,
    },
    followUpQuestions: [
      {
        question: <FormattedMessage id="questions.referralSource-a" defaultMessage="If other, please specify:" />,
        name: 'otherSource',
        componentDetails: {
          componentType: 'Textfield',
          inputType: 'text',
          inputName: 'otherSource',
          inputLabel: (
            <FormattedMessage id="questions.referralSource-a-inputLabel" defaultMessage="Other referral source" />
          ),
          inputError: selectHasError,
          inputHelperText: otherReferalSourceHelperText,
        },
      },
    ],
  },
  signUpInfo: {
    name: 'signUpInfo',
    header: (
      <FormattedMessage
        id="qcc.optional-sign-up-text"
        defaultMessage="Optional: Sign up for benefits updates and/or paid feedback opportunities"
      />
    ),
    question: (
      <FormattedMessage id="questions.signUpInfo" defaultMessage="What would you like us to contact you about?" />
    ),
    componentDetails: {
      componentType: 'BasicCheckboxGroup',
      inputName: 'signUpInfo',
      options: signUpOptions,
      inputError: signUpOptionsHaveError,
    },
    followUpQuestions: [
      {
        name: 'emailOrCell',
        question: (
          <FormattedMessage id="questions.signUpInfo-a" defaultMessage="Please provide your contact info below: " />
        ),
        componentDetails: {
          componentType: 'SignUp',
          inputName: 'signUpInfo',
          ariaLabel: 'questions.signUpInfo-ariaLabel',
        },
      },
    ],
  },
};

export default questions;
