import { useState } from 'react';
import SignUpInfo from '../SignUpInfo/SignUpInfo';
import PersonalInfo from '../PersonalInfo/PersonalInfo';
import Other from '../Other/Other';
import Confirm from '../Confirm/Confirm';
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
    numberOfAdults: 0
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]:  value });
  };
  
  const handleSubmit = (event) => {
    console.log('in handleSubmit')
    event.preventDefault();
    if (validateInputs()) {
      console.log(formData, `We should submit this to our BE here via a POST request`)
    }
  }

  const validateInputs = () => {
    console.log(`in validateInputs`, validateEmail() && validatePassword() && validateConfirmPassword() && validateFirstLastUserNames() && validateNumChildrenAdults())
    return validateEmail() && validatePassword() && validateConfirmPassword() && validateFirstLastUserNames() && validateNumChildrenAdults();
  }

  const validateEmail = () => {
    return !/^.+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(formData.email);
  }

  const validatePassword = () => {
    return formData.password.length > 0;
  }

  const validateConfirmPassword = () => {
    return formData.confirmPassword.length > 0 && formData.confirmPassword === formData.password;
  }

  const validateFirstLastUserNames = () => {
    return formData.firstName.length > 0 && formData.lastName.length > 0 && formData.username.length > 0;
  }

  const validateNumChildrenAdults = () => {
    return Number(formData.numberOfChildren) >= 0 && Number(formData.numberOfAdults) >= 0;
  }

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
                setPage={setPage}/>
      case 2:
        return <Other 
                formData={formData} 
                handleChange={handleChange} 
                page={page}
                setPage={setPage}/>
      case 3: 
        return <Confirm 
                formData={formData} 
                page={page}
                setPage={setPage} />
    }
  }

  return (
    <div className='benefits-form'>
      <form className='form-container'>
        <div className='body'>
          {displayPage(page)}
        </div>
      </form>
    </div>
  );
}

export default Form;