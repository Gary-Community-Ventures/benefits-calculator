import { useState } from 'react';
import SignUpInfo from '../SignUpInfo/SignUpInfo';
import PersonalInfo from '../PersonalInfo/PersonalInfo';
import Other from '../Other/Other';
import Confirm from '../Confirm/Confirm';
import Success from '../Success/Success';
import './Form.css';

const Form = () => {
  const [page, setPage] = useState(0);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    username: '',
    numberOfChildren: 0,
    numberOfAdults: 0,
    isSubmitting: false
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value, isSubmitting: true });
  };
  
  const displayPage = (pageIndex) => {
    switch(pageIndex) {
      case 0:
        return <SignUpInfo 
                formData={formData} 
                handleChange={handleChange} 
                page={page}
                setPage={setPage} />
      case 1: 
        return <PersonalInfo 
                formData={formData} 
                handleChange={handleChange} 
                page={page}
                setPage={setPage} />
      case 2:
        return <Other 
                formData={formData} 
                handleChange={handleChange} 
                page={page}
                setPage={setPage} />
      case 3: 
        return <Confirm 
                formData={formData} 
                page={page}
                setPage={setPage} />
      case 4:
        return <Success />
    }
  }

  return (
    <div className='benefits-form'>
      {displayPage(page)}
    </div>
  );
}

export default Form;