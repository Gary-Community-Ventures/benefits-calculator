import { FormControl, Select, MenuItem, InputLabel, FormHelperText, SelectChangeEvent } from '@mui/material';
import { useContext, useEffect } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import type { ErrorController, MessageFunction, ValidationFunction } from '../../Types/ErrorController.js';
import type { FormData } from '../../Types/FormData.js';
import { useErrorController } from '../../Assets/validationFunctions.tsx';

interface ComponentProperties {
  labelId: string;
  inputLabelText: any;
  id: string;
  value: string;
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
  formDataProperty: string;
  errorController: ErrorController;
  submitted: number;
}

const BasicSelect = ({ componentDetails, options, formDataProperty, submitted }: BasicSelectProps) => {
  const { formData, setFormData }: { formData: FormData; setFormData: any } = useContext(Context);
  const { componentProperties, inputError, inputHelperText } = componentDetails;
  const { labelId, inputLabelText, id, value, label, disabledSelectMenuItemText } = componentProperties;

  const errorController = useErrorController(inputError, inputHelperText);

  useEffect(() => {
    // @ts-ignore
    errorController.updateError(formData[value]);
  }, []);

  useEffect(() => {
    errorController.setSubmittedCount(submitted);
  }, [submitted]);

  const handleBasicSelect = (event: SelectChangeEvent<any>, formProperty: string) => {
    setFormData({ ...formData, [formProperty]: event.target.value });
    errorController.updateError(event.target.value, formData);
  };

  const createMenuItems = () => {
    const disabledSelectMenuItem = (
      <MenuItem value="disabled-select" key="disabled-select" disabled>
        {disabledSelectMenuItemText}
      </MenuItem>
    );
    const menuItemKeys = Object.keys(options);
    const menuItemLabels = Object.values(options);
    menuItemKeys.sort((a, z) => sortNumbersDescendingThenStringsLastWithoutSorting(a, z));
    menuItemLabels.sort((a, z) => sortNumbersDescendingThenStringsLastWithoutSorting(a, z));

    const dropdownMenuItems = menuItemKeys.map((option, i) => {
      return (
        <MenuItem value={option} key={option}>
          {menuItemLabels[i]}
        </MenuItem>
      );
    });

    return [disabledSelectMenuItem, dropdownMenuItems];
  };

  const sortNumbersDescendingThenStringsLastWithoutSorting = (a: number | string, z: number | string) => {
    //instructions on how to compare elements when they're being sorted
    if (isNaN(Number(a)) || isNaN(Number(z))) {
      return 0; // if either key is string, keep original order
    } else if (Number(a) < Number(z)) {
      return 1; // sort a after z
    } else if (Number(a) > Number(z)) {
      return -1; // sort z after a
    } else {
      return 0; // a === z, so keep original order
    }
  };

  return (
    <FormControl sx={{ mt: 1, mb: 2, minWidth: 210 }} error={errorController.showError}>
      <InputLabel id={labelId}>{inputLabelText}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        // @ts-ignore
        value={formData[value]}
        label={label}
        onChange={(event) => {
          handleBasicSelect(event, formDataProperty);
        }}
      >
        {createMenuItems()}
      </Select>
      {errorController.showError && (
        // @ts-ignore
        <FormHelperText>{errorController.message(formData[formDataProperty], formData)}</FormHelperText>
      )}
    </FormControl>
  );
};

export default BasicSelect;
