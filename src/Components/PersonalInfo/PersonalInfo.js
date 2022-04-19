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
      <input 
        type='text' 
        placeholder='First name...'
        name='firstName'
        onChange={handleChange} />
      <input
        type='text' 
        placeholder='Last Name...'
        name='lastName'
        onChange={handleChange} />
      <input 
        type='text' 
        placeholder='Username...'
        name='userName'
        onChange={handleChange} />
    </div>
  );
}

export default PersonalInfo;