import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  birthMonthErrorMessage,
  birthMonthHasError,
  birthMonthInvalidWithYearError,
  birthMonthInvalidWithYearErrorMessage,
  birthYearErrorMessage,
  birthYearHasError,
  useErrorController,
} from '../../Assets/validationFunctions';
import AutoComplete from '../AutoComplete/AutoComplete';
import { getCurrentMonthYear } from '../../Assets/age';
import './AgeInput.css';

const MONTHS = {
  1: <FormattedMessage id="ageInput.months.january" defaultMessage="January" />,
  2: <FormattedMessage id="ageInput.months.february" defaultMessage="February" />,
  3: <FormattedMessage id="ageInput.months.march" defaultMessage="March" />,
  4: <FormattedMessage id="ageInput.months.april" defaultMessage="April" />,
  5: <FormattedMessage id="ageInput.months.may" defaultMessage="May" />,
  6: <FormattedMessage id="ageInput.months.june" defaultMessage="June" />,
  7: <FormattedMessage id="ageInput.months.july" defaultMessage="July" />,
  8: <FormattedMessage id="ageInput.months.august" defaultMessage="August" />,
  9: <FormattedMessage id="ageInput.months.september" defaultMessage="September" />,
  10: <FormattedMessage id="ageInput.months.october" defaultMessage="October" />,
  11: <FormattedMessage id="ageInput.months.november" defaultMessage="November" />,
  12: <FormattedMessage id="ageInput.months.december" defaultMessage="December" />,
};

const { CURRENT_YEAR } = getCurrentMonthYear();
const MAX_AGE = 130;
const YEARS = Array.from({ length: MAX_AGE }, (_, i) => {
  const inputYear = CURRENT_YEAR - i;
  return String(inputYear);
});

type Props = {
  birthMonth: number | null;
  birthYear: number | null;
  setBirthMonth: (month: number | null) => void;
  setBirthYear: (year: number | null) => void;
  submitted: number;
};

export default function AgeInput({ birthYear, birthMonth, setBirthMonth, setBirthYear, submitted }: Props) {
  const errorController = useErrorController(birthMonthInvalidWithYearError, birthMonthInvalidWithYearErrorMessage);
  const birthMonthErrorController = useErrorController(birthMonthHasError, birthMonthErrorMessage);
  const birthYearErrorController = useErrorController(birthYearHasError, birthYearErrorMessage);

  useEffect(() => {
    birthMonthErrorController.updateError(birthMonth);
  }, [birthMonth]);

  useEffect(() => {
    birthYearErrorController.updateError(birthYear);
  }, [birthYear]);

  useEffect(() => {
    if (birthMonth === null || birthYear === null) {
      return;
    }

    // @ts-ignore the type is broken on this one.
    errorController.updateError({ birthYear, birthMonth });
  }, [birthYear, birthMonth]);

  useEffect(() => {
    birthMonthErrorController.setSubmittedCount(submitted);
    birthYearErrorController.setSubmittedCount(submitted);
    errorController.setSubmittedCount(submitted);
  }, [submitted]);

  const monthErrorMessage = useMemo(() => {
    if (birthMonthErrorController.showError) {
      return birthMonthErrorController.message(birthMonth);
    }

    if (errorController.showError) {
      return errorController.message(null);
    }

    return null;
  }, [birthMonthErrorController.showError, errorController.showError, birthMonth, birthYear]);

  return (
    <div className="age-input-container">
      <FormControl
        sx={{ mt: 1, mb: 2, minWidth: 210, maxWidth: '100%' }}
        error={birthMonthErrorController.showError || errorController.showError}
      >
        <InputLabel id="birth-month">
          <FormattedMessage id="ageInput.month.label" defaultMessage="Birth Month" />
        </InputLabel>
        <Select
          labelId="birth-month"
          value={birthMonth ?? ''}
          label={<FormattedMessage id="ageInput.month.label" defaultMessage="Birth Month" />}
          onChange={(event) => {
            setBirthMonth(Number(event.target.value));
          }}
        >
          {Object.entries(MONTHS).map(([key, value]) => {
            return (
              <MenuItem value={key} key={key}>
                {value}
              </MenuItem>
            );
          })}
        </Select>
        {monthErrorMessage !== null && <FormHelperText>{monthErrorMessage}</FormHelperText>}
      </FormControl>
      <AutoComplete
        value={birthYear !== null ? String(birthYear) : null}
        setValue={(newValue) => {
          setBirthYear(newValue !== null ? Number(newValue) : null);
        }}
        options={YEARS}
        label={<FormattedMessage id="ageInput.year.label" defaultMessage="Birth Year" />}
        showError={birthYearErrorController.showError}
        errorMessage={birthYearErrorController.message(birthMonth)}
      />
    </div>
  );
}
