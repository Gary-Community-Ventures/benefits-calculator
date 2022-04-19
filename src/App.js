import Form from '../src/Components/Form/Form';
import './App.css';
import { Typography, AppBar, CssBaseline } from '@mui/material';

const App = () => {
  return (
    <div className='App'>
      <CssBaseline />
      <AppBar position='relative'> 
        <Typography variant='h4' align='center'>Benefits Calculator</Typography>
      </AppBar>
      <main>
        <Form />
      </main>
    </div>
  );
}

export default App;
