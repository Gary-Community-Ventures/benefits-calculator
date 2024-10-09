import { Autocomplete, FormControl, FormHelperText, TextField } from '@mui/material';
import { useMemo } from 'react';
import { FormattedMessageType } from '../../Types/Questions';

type Props = {
  value: string | null;
  setValue: (newValue: string | null) => void;
  options: string[];
  label: FormattedMessageType;
  showError: boolean;
  errorMessage: FormattedMessageType;
};

export default function AutoComplete({ options, label, value, setValue, showError, errorMessage }: Props) {
  const autoCompleteOptions = useMemo(() => {
    return options.map((value) => {
      return { label: value };
    });
  }, [options]);

  const autoCompleteValue = value !== null ? { label: value } : null;

  return (
    <FormControl sx={{ mt: 1, mb: 2, minWidth: 210, maxWidth: '100%' }} error={showError}>
      <Autocomplete
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        isOptionEqualToValue={(option, value) => option.label === value.label}
        options={autoCompleteOptions}
        value={autoCompleteValue}
        onChange={(_, newValue) => {
          setValue(newValue?.label ?? null);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={showError}
            onChange={(event) => {
              if (options.includes(event.target.value)) {
                setValue(event.target.value);
              }
            }}
          />
        )}
      />
      {showError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}
