import { AppBar, Typography, Box, MenuItem, FormControl, Select, Grid } from '@mui/material';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Wrapper/Wrapper';

const Header = () => {
  const context = useContext(Context);
  const navigate = useNavigate();

  return (
    <AppBar position='relative'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
              <Typography 
                variant='h4' 
                align='center' 
                onClick={() => navigate('/step-1')}> 
                <FormattedMessage
                  id='header.appName'
                  defaultMessage='Benefits Calculator' 
                />
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