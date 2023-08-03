import { FormControl, MenuItem, InputLabel, Select, SelectChangeEvent, FormHelperText } from '@mui/material';
import { useEffect } from 'react';
import type { ValidationFunction, MessageFunction } from '../../Types/ErrorController';
import type { HouseholdData } from '../../Types/FormData';
// @ts-ignore
import { useErrorController } from '../../Assets/validationFunctions.tsx';

interface ComponentProperties {
  labelId: string;
  inputLabelText: any;
  id: string;
  label: any;
  disabledSelectMenuItemText: any;
}

interface ComponentDetails {
  componentProperties: ComponentProperties;
  inputError: ValidationFunction<any>;
  inputHelperText: MessageFunction<any>;
}

interface BasicSelectProps {
  componentDetails: ComponentDetails;
  options: { [key: string]: string };
  householdData: HouseholdData;
  setHouseholdData: any;
  submitted: boolean;
}

const DropdownMenu = ({ componentDetails, options, setHouseholdData, householdData, submitted }: BasicSelectProps) => {
  const { componentProperties, inputError, inputHelperText } = componentDetails;
  const { labelId, inputLabelText, id, label, disabledSelectMenuItemText } = componentProperties;

  const errorController = useErrorController(inputError, inputHelperText);

  useEffect(() => {
    errorController.updateError(householdData.relationshipToHH);
  }, []);

  useEffect(() => {
    errorController.setIsSubmitted(submitted);
  }, [submitted]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setHouseholdData({ ...householdData, relationshipToHH: event.target.value });
    errorController.updateError(event.target.value);
  };

  const createMenuItems = (options: { [key: string]: string }) => {
    const disabledSelectMenuItem = (
      <MenuItem value="disabled-select" key="disabled-select" disabled>
        {disabledSelectMenuItemText}
      </MenuItem>
    );
    const menuItemKeys = Object.keys(options);
    const menuItemLabels = Object.values(options);

    const dropdownMenuItems = menuItemKeys.map((option, i) => {
      return (
        <MenuItem value={option} key={option}>
          {menuItemLabels[i]}
        </MenuItem>
      );
    });

    return [disabledSelectMenuItem, dropdownMenuItems];
  };

  return (
    <FormControl sx={{ mt: 1, minWidth: 210 }} error={errorController.showError}>
      <InputLabel id={labelId}>{inputLabelText}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={householdData.relationshipToHH}
        label={label}
        onChange={(event: SelectChangeEvent) => {
          handleSelectChange(event);
        }}
      >
        {createMenuItems(options)}
      </Select>
      {errorController.showError && (
        <FormHelperText>{errorController.message(householdData.relationshipToHH)}</FormHelperText>
      )}
    </FormControl>
  );
};

export default DropdownMenu;
