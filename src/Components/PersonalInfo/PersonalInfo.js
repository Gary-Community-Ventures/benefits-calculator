import { TextField } from '@mui/material';
import { useState } from 'react';

const PersonalInfo = () => {
  const [inputValues, setInputValues] = useState({
    firstName: '',
    lastName: '',
    userName: ''
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  }

  return (
    <div className='personal-info-container'>
      <TextField 
        id='first-name'
        name='firstName'
        label='First name'
        onChange={handleChange} 
        variant='outlined'
        size='small'
        required />
      <TextField
        id='last-name'
        name='lastName'
        label='Last Name'
        onChange={handleChange}
        variant='outlined'
        size='small'
        required />
      <TextField 
        id='username'
        name='userName'
        label='Username'
        onChange={handleChange}
        variant='outlined'
        size='small'
        required />
    </div>
  );
}

export default PersonalInfo;