import { useState } from 'react';
import { TextField } from '@mui/material';

const SignUpInfo = () => {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    confirmPassword: ''

  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  }
  
  return (
    <div className='sign-up-container'>
      <TextField 
        type='email'
        id='email'
        name='email'
        label='Email'
        onChange={handleChange}
        variant='outlined'
        size='small'
        required />
      <TextField 
        type='password'
        id='password'
        name='password'
        label='Password'
        onChange={handleChange}
        variant='outlined'
        size='small'
        required />
      <TextField 
        type='password'
        id='confirmed-password'
        name='confirmPassword'
        label='Confirm Password'
        onChange={handleChange}
        variant='outlined'
        size='small'
        required />
    </div>
  );
}
export default SignUpInfo;