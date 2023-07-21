import { alpha, styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const CustomBlueSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: theme.palette.primary.main,
  },
  '.MuiSwitch-thumb': {
    boxShadow: '0px 0px 5px 0px rgb(1 1 1 / 80%), 0px 1px 1px 0px rgb(0 0 0 / 10%), 0px 1px 1px 0px rgb(0 0 0 / 12%)',
  },
}));

const CustomSwitch = ({ handleCustomSwitchToggle, checked }) => {
  return <CustomBlueSwitch onChange={(event) => handleCustomSwitchToggle(event)} checked={checked ?? false} />;
};

export default CustomSwitch;
