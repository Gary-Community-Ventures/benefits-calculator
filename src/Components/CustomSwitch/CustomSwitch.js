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
  '.MuiSwitch-thumb': {
    boxShadow: '0px 0px 5px 0px rgb(1 1 1 / 80%), 0px 1px 1px 0px rgb(0 0 0 / 10%), 0px 1px 1px 0px rgb(0 0 0 / 12%)'
  }
}));

const CustomSwitch = ({ handleCustomSwitchToggle }) => {
  return (
    <CustomBlueSwitch onChange={(event) => handleCustomSwitchToggle(event)} />
  );
}

export default CustomSwitch;
