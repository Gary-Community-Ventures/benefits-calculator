import { FormControlLabel, FormGroup, Checkbox, FormControl, Typography } from '@mui/material';
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';

const BasicCheckboxGroup = ({ stateVariable, options }) => {
  const { formData: state, setFormData: setState } = useContext(Context);
  const handleCheckboxChange = (event) => {
    const { name } = event.target;

    const currentStateVariableObj = { ...state[stateVariable] };

    const currentOptions = Object.keys(currentStateVariableObj);

    const updatedStateVariableObj = currentOptions.reduce((acc, key) => {
      if (name === key) {
        acc[key] = !currentStateVariableObj[key];
      } else {
        acc[key] = currentStateVariableObj[key];
      }
      return acc;
    }, {});

    setState({ ...state, [stateVariable]: updatedStateVariableObj });
  };

  const createFormControlLabels = () => {
    const optionKeys = Object.keys(options);

    const formControlLabels = optionKeys.map((optionKey) => {
      const splitLabel = options[optionKey].props.defaultMessage.split(':');
      const programName = splitLabel[0];
      const programDescription = splitLabel[1];
      const createFormLabel = (name, description) => {
        return (
          <Typography>
            <strong>{name}:</strong>
            <span>{description}</span>
          </Typography>
        );
      };

      return (
        <FormControlLabel
          sx={{ alignItems: 'center', marginTop: `1rem` }}
          control={
            <Checkbox checked={state[stateVariable][optionKey]} onChange={handleCheckboxChange} name={optionKey} />
          }
          label={createFormLabel(programName, programDescription)}
          key={optionKey}
        />
      );
    });

    return formControlLabels;
  };

  return (
    <FormControl sx={{ marginBottom: 2 }}>
      <FormGroup>{createFormControlLabels()}</FormGroup>
    </FormControl>
  );
};

export default BasicCheckboxGroup;
