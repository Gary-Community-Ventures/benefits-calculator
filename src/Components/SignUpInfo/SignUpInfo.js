import { useState } from 'react';

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
      <input 
        type='text' 
        placeholder='Email...'
        name='email'
        onChange={handleChange} />
      <input 
        type='text' 
        placeholder='Password...'
        name='password'
        onChange={handleChange} />
      <input 
        type='text' 
        placeholder='Confirm Password...'
        name='confirmPassword'
        onChange={handleChange} />
    </div>
  );
}
export default SignUpInfo;