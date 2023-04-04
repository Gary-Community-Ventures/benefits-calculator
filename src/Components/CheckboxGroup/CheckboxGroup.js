import { FormControlLabel, FormGroup, Checkbox, FormControl } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const CheckboxGroup = ({ options, state, setState, index }) => {
  const handleCheckboxChange = (event) => {
    const { name } = event.target;

    const updatedHouseholdData = state.householdData.map((personData, i) => {
      if (i === index) {
        return {
          ...personData,
          [name]: !(state.householdData[index][name])
        };
      } else {
        return personData;
      }
    });

    setState({ ...state, householdData: updatedHouseholdData });
  }

  const createFormControlLabels = (optionList) => {
    const optionKeys = Object.keys(optionList);

    const formControlLabels = optionKeys.map((optionKey) => {
      let label = optionList[optionKey];
      if (index !== 0 && optionKey === 'disabled') {
        label =
          <FormattedMessage
            id='checkboxGroup.disabledLabel'
            defaultMessage='Have any disabilities that make them unable to work now or in the future'
          />;
      }

      return (
        <FormControlLabel
          sx={{ alignItems: 'flex-start', marginTop: `1rem` }}
          control={
            <Checkbox
              checked={state.householdData[index][optionKey]}
              onChange={handleCheckboxChange}
              name={optionKey}
              sx={{ marginTop: -1 }} />
          }
          label={label}
          key={optionKey}
        />
      );
    });

    return formControlLabels;
  }

  return (
    <FormControl>
      <FormGroup>
        {createFormControlLabels(options)}
      </FormGroup>
    </FormControl>
  );
}

export default CheckboxGroup;