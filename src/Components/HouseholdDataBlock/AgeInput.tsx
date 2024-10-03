import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import AutoComplete from '../AutoComplete/AutoComplete';

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

const MAX_AGE = 130;
const YEARS = Array.from({ length: MAX_AGE }, (_, i) => {
  const date = new Date();
  const currentYear = date.getFullYear();

  const inputYear = currentYear - i;
  return String(inputYear);
});

export default function AgeInput() {
  const [birthMonth, setBirthMonth] = useState<number | null>(null);
  const [birthYear, setBirthYear] = useState<number | null>(null);

  return (
    <div>
      <FormControl sx={{ mt: 1, mb: 2, minWidth: 210, maxWidth: '100%' }}>
        <InputLabel id="birth-month">
          <FormattedMessage id="ageInput.month.label" defaultMessage="Birth Month" />
        </InputLabel>
        <Select
          labelId="birth-month"
          // @ts-ignore
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
      </FormControl>
      <AutoComplete
        value={birthYear !== null ? String(birthYear) : null}
        setValue={(newValue) => {
          setBirthYear(newValue !== null ? Number(newValue) : null);
        }}
        options={YEARS}
        label={<FormattedMessage id="ageInput.year.label" defaultMessage="Birth Year" />}
      />
    </div>
  );
}
