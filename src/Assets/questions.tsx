import { householdAssetsHasError, displayHouseholdAssetsHelperText } from './validationFunctions.tsx';
import { FormattedMessage } from 'react-intl';
import type { QuestionName, Question } from '../Types/Questions.ts';
import HelpButton from '../Components/HelpBubbleIcon/HelpButton.tsx';

const questions: Record<QuestionName, Question> = {
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
};

export default questions;
