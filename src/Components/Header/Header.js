import { AppBar, Typography, Box, MenuItem, FormControl, Select, Grid } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Wrapper/Wrapper';
import LanguageIcon from '@mui/icons-material/Language';
import logo from '../../Assets/logo.png';
import './Header.css';

const Header = () => {
  const context = useContext(Context);
  const navigate = useNavigate();

  return (
    <AppBar position='sticky'>
      <Box sx={{ flexGrow: 1, mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
              <Typography 
                variant='h4' 
                align='center' 
                onClick={() => navigate('/step-1')}> 
                <img src={logo} alt='logo' className='logo'/>
              </Typography>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid item={true} container spacing={2}>
                <Grid item={true} xs={10}>
                  <FormControl fullWidth>
                    <Select
                      labelId='select-language-label'
                      id='select-language'
                      value={context.locale}
                      label='Language'
                      onChange={context.selectLanguage}
                      aria-label='select a language'
                      IconComponent = {LanguageIcon}
                      className='language-switcher'
                      variant='standard'
                      disableUnderline={true}
                    >
                      <MenuItem value='en-US'>English</MenuItem>
                      <MenuItem value='es'>Español</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </AppBar>
  );
}

export default Header;