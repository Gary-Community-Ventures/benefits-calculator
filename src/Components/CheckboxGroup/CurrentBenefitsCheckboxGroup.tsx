import { FormControlLabel, FormGroup, Checkbox, FormControl, Typography } from '@mui/material';
import { ChangeEvent, useContext } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import { BenefitsList } from '../../Types/Questions.ts';
import { Benefits } from '../../Types/FormData.ts';

type CurrentBenefitsCheckboxGroupProps = {
  options: BenefitsList;
};

const CurrentBenefitsCheckboxGroup = ({ options }: CurrentBenefitsCheckboxGroupProps) => {
  const { formData: state, setFormData: setState } = useContext(Context);
  const stateVariable = 'benefits';

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name= event.target.name as keyof Benefits;
    const currentStateVariableObj = { ...state[stateVariable] };
    currentStateVariableObj[name] = !currentStateVariableObj[name];
    setState({ ...state, [stateVariable]: currentStateVariableObj });
  };

  const createFormControlLabels = (options: BenefitsList, ) => {
    const optionKeys = Object.keys(options) as Array<keyof Benefits>;

    const formControlLabels = optionKeys.map((optionKey) => {
      const option = options[optionKey];

      const createFormLabel = () => {
        return (
          <Typography>
            <strong>{option.name}</strong>
            <span>{option.description}</span>
          </Typography>
        );
      };

      return (
        <FormControlLabel
          sx={{ alignItems: 'center', marginTop: `1rem` }}
          control={
            <Checkbox checked={state[stateVariable][optionKey]} onChange={handleCheckboxChange} name={optionKey} />
          }
          label={createFormLabel()}
          key={optionKey}
        />
      );
    });

    return formControlLabels;
  };

  return (
    <FormControl sx={{ marginBottom: 2 }}>
      <FormGroup>{createFormControlLabels(options)}</FormGroup>
    </FormControl>
  );
};

export default CurrentBenefitsCheckboxGroup;
