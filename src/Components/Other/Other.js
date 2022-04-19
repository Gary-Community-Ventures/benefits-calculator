import { useState } from 'react';
import { TextField } from '@mui/material';


const Other = () => {
  const [inputValues, setInputValues] = useState({
    numberOfChildren: 0,
    numberOfAdults: 0
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({...inputValues, [name]: value });
  }

  return (
    <div className='other-container'>
      <TextField 
        type='number'
        id='number-of-children'
        name='numberOfChildren'
        label='Number of children'
        onChange={handleChange}
        variant='outlined'
        size='small'
        required />
      <TextField 
        type='number'
        id='number-of-adults'
        name='numberOfAdults'
        label='Number of adults'
        onChange={handleChange}
        variant='outlined'
        size='small'
        required />
    </div>
  );
}
export default Other;