import { MenuItem } from "@mui/material";
import { FormattedMessageType } from "../../../Types/Questions";

export const createMenuItems = (options: Record<string, FormattedMessageType>, disabledSelectFM:FormattedMessageType) => {
  const disabledSelectMenuItem = (
    <MenuItem value="select" key="disabled-select-value" disabled>
      {disabledSelectFM}
    </MenuItem>
  );

  const menuItems = Object.keys(options).map((menuItemKey, i) => {
    return (
      <MenuItem value={menuItemKey} key={menuItemKey}>
        {options[menuItemKey]}
      </MenuItem>
    );
  });

  return [disabledSelectMenuItem, menuItems];
}