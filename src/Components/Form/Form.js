import { useState } from 'react';
import Other from '../Other/Other';
import PersonalInfo from '../PersonalInfo/PersonalInfo';
import SignUpInfo from '../SignUpInfo/SignUpInfo';
import { Button } from '@mui/material';
import './Form.css';

const Form = () => {
  const [page, setPage] = useState(0);
  const pages = ['Sign Up', 'Personal Info', 'Other'];
  
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
                setFormData={setFormData} 
                handleChange={handleChange} />
      case 1: 
        return <PersonalInfo 
                formData={formData} 
                setFormData={setFormData}
                handleChange={handleChange} />
      case 2:
        return <Other 
                formData={formData} 
                setFormData={setFormData}
                handleChange={handleChange} />
    }
  }

  return (
    <div className='benefits-form'>
      <div className='progress-bar'></div>
      <div className='form-container'>
        <div className='body'>
          {displayPage(page)}
        </div>
        <div className='footer'></div>
          <Button
            disabled={page === 0}
            onClick={() => {
              setPage((currentPage) => currentPage - 1);
            }}
            variant='contained'
          >
            Prev
          </Button>
          <Button 
            onClick={() => {
              if (page === pages.length - 1) {
                alert('Form has been submitted');
                console.log({ formData });
              } else {
                setPage((currentPage) => currentPage + 1);
              }
            }}
            variant='contained'
          >
           {page === pages.length - 1 ? 'Submit' : 'Next'}
          </Button>
      </div>
    </div>
  );
}

export default Form;