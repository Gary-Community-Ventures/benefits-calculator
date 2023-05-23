import { FormControlLabel, FormGroup, Checkbox, FormControl } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const CheckboxGroup = ({ options, householdData, setHouseholdData, index }) => {
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setHouseholdData({ ...householdData, [name]: checked });
  };

  const createFormControlLabels = (optionList) => {
    const optionKeys = Object.keys(optionList);

    const formControlLabels = optionKeys.map((optionKey) => {
      let label = optionList[optionKey];
      if (index !== 0 && optionKey === 'disabled') {
        label = (
          <FormattedMessage
            id="checkboxGroup.disabledLabel"
            defaultMessage="Have any disabilities that make them unable to work now or in the future"
          />
        );
      }

      return (
        <FormControlLabel
          sx={{ alignItems: 'flex-start', marginTop: `1rem` }}
          control={
            <Checkbox
              checked={householdData[optionKey]}
              onChange={handleCheckboxChange}
              name={optionKey}
              sx={{ marginTop: -1 }}
            />
          }
          label={label}
          key={optionKey}
        />
      );
    });

    return formControlLabels;
  };

  return (
    <FormControl>
      <FormGroup>{createFormControlLabels(options)}</FormGroup>
    </FormControl>
  );
};

export default CheckboxGroup;
