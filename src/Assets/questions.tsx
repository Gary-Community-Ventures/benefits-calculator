import {
  radiofieldHasError,
  householdAssetsHasError,
  benefitsHasError,
  selectHasError,
  displayReferralSourceHelperText,
  signUpOptionsHaveError,
  acuteHHConditionsHasError,
  displayBenefitsHelperText,
  displayHouseholdAssetsHelperText,
  otherReferalSourceHelperText,
} from './validationFunctions.tsx';
import { FormattedMessage } from 'react-intl';
import type { QuestionName, Question } from '../Types/Questions.ts';
import HelpButton from '../Components/HelpBubbleIcon/HelpButton.tsx';

const questions: Record<QuestionName, Question> = {
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
    question: (
      <>
        <div style={{ marginBottom: '-16px' }}>
          <FormattedMessage id="questions.hasExpenses" defaultMessage="Does your household have any expenses?" />
          <HelpButton
            helpText="Add up expenses for everyone who lives in your home. This includes costs like child care, child support, rent, medical expenses, heating bills, and more. We will ask only about expenses that may affect benefits. We will not ask about expenses such as food since grocery bills do not affect benefits."
            helpId="questions.hasExpenses-description"
          />
        </div>
      </>
    ),
    questionDescription: (
      <FormattedMessage
        id="questions.hasExpenses-description-additional"
        defaultMessage="Expenses can affect benefits! We can be more accurate if you tell us key expenses like your rent or mortgage, utilities, and child care."
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
      <>
        <FormattedMessage
          id="questions.householdAssets"
          defaultMessage="How much does your whole household have right now in cash, checking or savings accounts, stocks, bonds, or mutual funds?"
        />
        <HelpButton
          helpText="In some cases, eligibility for benefits may be affected if your household owns other valuable assets such as a car or life insurance policy."
          helpId="questions.householdAssets-description"
        />
      </>
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
      required: true,
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
      <>
        <FormattedMessage
          id="questions.hasBenefits"
          defaultMessage="Does your household currently have any benefits?"
        />
        <HelpButton
          helpText="This information will help make sure we don't give you results for benefits you already have."
          helpId="questions.hasBenefits-description"
        />
      </>
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
      inputError: acuteHHConditionsHasError,
    },
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
