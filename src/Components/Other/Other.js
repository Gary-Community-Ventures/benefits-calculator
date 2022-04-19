import { useState } from 'react';

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
      <input 
        type='text'
        placeholder='Number of children...'
        name='numberOfChildren'
        onChange={handleChange} />
      <input 
        type='text'
        placeholder='Number of adults...'
        name='numberOfAdults'
        onChange={handleChange} />
    </div>
  )
}
export default Other;