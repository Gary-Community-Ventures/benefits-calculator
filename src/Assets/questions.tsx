import { householdAssetsHasError, displayHouseholdAssetsHelperText } from './validationFunctions';
import { FormattedMessage } from 'react-intl';
import type { QuestionName, Question } from '../Types/Questions';
import HelpButton from '../Components/HelpBubbleIcon/HelpButton';

const questions: Partial<Record<QuestionName, Question>> = {
  householdData: {
    name: 'householdData',
    componentDetails: {
      componentType: 'HouseholdDataBlock',
      ariaLabel: 'questions.householdData-ariaLabel',
      inputName: 'householdData',
    },
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
};

export default questions;
