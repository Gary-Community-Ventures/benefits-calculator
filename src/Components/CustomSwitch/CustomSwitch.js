import { alpha, styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const CustomBlueSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#0096B0',
    '&:hover': {
      backgroundColor: alpha('#0096B0', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#0096B0',
  },
}));

const CustomSwitch = ({ handleCustomSwitchToggle }) => {
  return (
    <CustomBlueSwitch onChange={(event) => handleCustomSwitchToggle(event)} />
  );
}

export default CustomSwitch;
