import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';

const StyledSelectfield = styled(Select)({
  marginBottom: 20,
  minWidth: 200,
});

const BasicSelect = ({ componentProperties, options, formDataProperty, errorController }) => {
  const { formData, setFormData } = useContext(Context);
  const { labelId, inputLabelText, id, value, label, disabledSelectMenuItemText } = componentProperties;

  const handleBasicSelect = (event, formProperty) => {
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

  const sortNumbersDescendingThenStringsLastWithoutSorting = (a, z) => {
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
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={labelId}>{inputLabelText}</InputLabel>
      <StyledSelectfield
        labelId={labelId}
        id={id}
        value={formData[value]}
        label={label}
        onChange={(event) => {
          handleBasicSelect(event, formDataProperty);
        }}
      >
        {createMenuItems()}
      </StyledSelectfield>
    </FormControl>
  );
};

export default BasicSelect;
