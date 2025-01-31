import { FormattedMessage } from 'react-intl';
import ErrorMessageWrapper from '../../ErrorMessage/ErrorMessageWrapper';

export const renderBirthMonthHelperText = () => {
  return (
    <ErrorMessageWrapper fontSize="1rem">
      <FormattedMessage id="ageInput.month.error" defaultMessage="Please enter a birth month." />
    </ErrorMessageWrapper>
  );
};

export const renderBirthYearHelperText = () => {
  return (
    <ErrorMessageWrapper fontSize="1rem">
      <FormattedMessage id="ageInput.year.error" defaultMessage="Please enter a birth year." />
    </ErrorMessageWrapper>
  );
};

export const renderRelationshipToHHHelperText = () => {
  return (
    <ErrorMessageWrapper fontSize="1rem">
      <FormattedMessage id="errorMessage-HHMemberRelationship" defaultMessage="Please select a relationship" />
    </ErrorMessageWrapper>
  );
};

export const renderIncomeFrequencyHelperText = () => {
  return (
    <ErrorMessageWrapper fontSize="1rem">
      <FormattedMessage id="errorMessage-incomeFrequency" defaultMessage="Please select a frequency" />
    </ErrorMessageWrapper>
  );
};

export const renderHoursWorkedHelperText = () => {
  return (
    <ErrorMessageWrapper fontSize="1rem">
      <FormattedMessage id="errorMessage-greaterThanZero" defaultMessage="Please enter a number greater than 0" />
    </ErrorMessageWrapper>
  );
};

export const renderIncomeAmountHelperText = () => {
  return (
    <ErrorMessageWrapper fontSize="1rem">
      <FormattedMessage id="errorMessage-greaterThanZero" defaultMessage="Please enter a number greater than 0" />
    </ErrorMessageWrapper>
  );
};
