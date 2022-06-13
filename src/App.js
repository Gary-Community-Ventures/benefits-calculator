import Form from '../src/Components/Form/Form';
import './App.css';
import { Typography, AppBar, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Results from './Components/Results/Results';

const App = () => {
  return (
    <div className='App'>
        <CssBaseline />
        <AppBar position='relative'> 
          <Typography variant='h4' align='center'>Benefits Calculator</Typography>
        </AppBar>
      <Routes>
        <Route path='/' element={<Form />} /> 
        <Route path='/results' element={<Results />} /> 
      </Routes>
    </div>
  );
}

export default App;
