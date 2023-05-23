import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledSelectfield = styled(Select)({
  marginBottom: 20,
  minWidth: 200,
});

const DropdownMenu = ({ dropdownComponentProps, options, setHouseholdData, householdData }) => {
  const { labelId, inputLabelText, id, label, disabledSelectMenuItemText } = dropdownComponentProps;

  const handleSelectChange = (event) => {
    setHouseholdData({ ...householdData, relationshipToHH: event.target.value });
  };

  const createMenuItems = (options) => {
    const disabledSelectMenuItem = (
      <MenuItem value='disabled-select' key='disabled-select' disabled>
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
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={labelId}>{inputLabelText}</InputLabel>
      <StyledSelectfield
        labelId={labelId}
        id={id}
        value={householdData.relationshipToHH}
        label={label}
        onChange={(event) => {
          handleSelectChange(event);
        }}
      >
        {createMenuItems(options)}
      </StyledSelectfield>
    </FormControl>
  );
};

export default DropdownMenu;
