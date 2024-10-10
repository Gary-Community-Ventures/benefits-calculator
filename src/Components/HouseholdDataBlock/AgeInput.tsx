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
import './AgeInput.css';

const MONTHS = {
  1: 'January',
  2: 'Febuary',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

const date = new Date();
const CURRENT_YEAR = date.getFullYear();
// January is 0 for getMonth
const CURRENT_MONTH = date.getMonth() + 1;

const MAX_AGE = 130;
const YEARS = Array.from({ length: MAX_AGE }, (_, i) => {
  const inputYear = CURRENT_YEAR - i;
  return String(inputYear);
});

export function calcAge(birthYear: number, birthMonth: number) {
  if (CURRENT_MONTH >= birthMonth) {
    return CURRENT_YEAR - birthYear;
  }

  return CURRENT_YEAR - birthYear - 1;
}

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
