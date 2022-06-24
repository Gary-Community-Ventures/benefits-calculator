import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledSelectfield = styled(Select)({
  marginBottom: 20,
  minWidth: 200
});

const DropdownMenu = ({ dropdownComponentProps, options, householdData, setHouseholdData, index }) => {
  const { labelId, inputLabelText, id, label, disabledSelectMenuItemText } = dropdownComponentProps;

  const handleSelectChange = (event) => {
    const updatedHouseholdData = householdData.map((personData, i) => {
      if (i === index) {
        return {
          ...personData,
          relationshipToHH: event.target.value
        };
      } else {
        return personData;
      }
    });

    setHouseholdData(updatedHouseholdData);
  }

  const createMenuItems = (options) => {
    const disabledSelectMenuItem = <MenuItem value='disabled-select' key='disabled-select' disabled>{disabledSelectMenuItemText}</MenuItem>
    const menuItemKeys = Object.keys(options);
    const menuItemLabels = Object.values(options);
    
    const dropdownMenuItems = menuItemKeys.map((option, i) => {
      return (
        <MenuItem value={option} key={option}>{menuItemLabels[i]}</MenuItem>
      );
    });
    
    return [disabledSelectMenuItem, dropdownMenuItems];
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={labelId}>{inputLabelText}</InputLabel>
      <StyledSelectfield
        labelId={labelId}
        id={id}
        value={householdData[index].relationshipToHH}
        label={label}
        onChange={(event) => { handleSelectChange(event) }}>
        {createMenuItems(options)}
      </StyledSelectfield>
    </FormControl>
  );
}

export default DropdownMenu;