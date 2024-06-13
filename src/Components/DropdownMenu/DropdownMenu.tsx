import { FormControl, MenuItem, InputLabel, Select, SelectChangeEvent, FormHelperText } from '@mui/material';
import { useEffect } from 'react';
import type { ValidationFunction, MessageFunction } from '../../Types/ErrorController';
import type { HouseholdData } from '../../Types/FormData';
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
  memberData: HouseholdData;
  setMemberData: (member: HouseholdData) => void;
  submitted: number;
}

const DropdownMenu = ({ componentDetails, options, memberData, setMemberData, submitted }: BasicSelectProps) => {
  const { componentProperties, inputError, inputHelperText } = componentDetails;
  const { labelId, inputLabelText, id, label, disabledSelectMenuItemText } = componentProperties;

  const errorController = useErrorController(inputError, inputHelperText);

  useEffect(() => {
    errorController.updateError(memberData.relationshipToHH);
  }, []);

  useEffect(() => {
    errorController.setSubmittedCount(submitted);
  }, [submitted]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setMemberData({ ...memberData, relationshipToHH: event.target.value });
    errorController.updateError(event.target.value);
  };

  const createMenuItems = (options: { [key: string]: string | any }) => {
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
    <FormControl sx={{ mt: 1, minWidth: 210, maxWidth: '100%' }} error={errorController.showError}>
      <InputLabel id={labelId}>{inputLabelText}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={memberData.relationshipToHH}
        label={label}
        onChange={(event: SelectChangeEvent) => {
          handleSelectChange(event);
        }}
        sx={{ maxWidth: '100%' }}
      >
        {createMenuItems(options)}
      </Select>
      {errorController.showError && (
        <FormHelperText>{errorController.message(memberData.relationshipToHH)}</FormHelperText>
      )}
    </FormControl>
  );
};

export default DropdownMenu;
