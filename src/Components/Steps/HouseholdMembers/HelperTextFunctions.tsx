import { FormattedMessage, IntlShape } from 'react-intl';
import ErrorMessageWrapper from '../../ErrorMessage/ErrorMessageWrapper';

export const renderMissingBirthMonthHelperText = (intlHook: IntlShape) => {
  return intlHook.formatMessage({
    id: 'ageInput.month.error',
    defaultMessage: 'Please enter a birth month."',
  });
};

export const renderFutureBirthMonthHelperText = (intlHook: IntlShape) => {
  return intlHook.formatMessage({
    id: 'hhmform.invalidBirthMonth',
    defaultMessage: 'This birth month is in the future',
  });
};

export const renderBirthYearHelperText = (intlHook: IntlShape) => {
  return intlHook.formatMessage({
    id: 'ageInput.year.error',
    defaultMessage: 'Please enter a birth year.',
  });
};

export const renderHealthInsSelectOneHelperText = (intlHook: IntlShape) => {
  return intlHook.formatMessage({
    id: 'validation-helperText.selectOneHealthIns',
    defaultMessage: 'Please select at least one health insurance option.',
  });
};

export const renderHealthInsNonePlusHelperText = (intlHook: IntlShape) => {
  return intlHook.formatMessage({
    id: 'validation-helperText.nonePlusHealthIns',
    defaultMessage: 'Please do not select any other options if you do not have health insurance.',
  });
};

export const renderRelationshipToHHHelperText = (intlHook: IntlShape) => {
  return intlHook.formatMessage({
    id: 'errorMessage-HHMemberRelationship',
    defaultMessage: 'Please select a relationship.',
  });
};

export const renderIncomeFrequencyHelperText = (intlHook: IntlShape) => {
  return intlHook.formatMessage({
    id: 'errorMessage-incomeFrequency',
    defaultMessage: 'Please select a frequency.',
  });
};

export const renderHoursWorkedHelperText = (intlHook: IntlShape) => {
  return intlHook.formatMessage({
    id: 'errorMessage-greaterThanZero',
    defaultMessage: 'Please enter a number greater than 0.',
  });
};

export const renderIncomeAmountHelperText = (intlHook: IntlShape) => {
  return intlHook.formatMessage({
    id: 'errorMessage-greaterThanZero',
    defaultMessage: 'Please enter a number greater than 0.',
  });
};
