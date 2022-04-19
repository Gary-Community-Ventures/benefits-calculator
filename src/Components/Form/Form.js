import { useState } from 'react';
import Other from '../Other/Other';
import PersonalInfo from '../PersonalInfo/PersonalInfo';
import SignUpInfo from '../SignUpInfo/SignUpInfo';
import { Button } from '@mui/material';
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

  const FormTitles = ['Sign Up', 'Personal Info', 'Other'];

  const pageDisplay = () => {
    if (page === 0) {
      return <SignUpInfo formData={formData} setFormData={setFormData} />
    } else if (page === 1) {
      return <PersonalInfo formData={formData} setFormData={setFormData}/>
    } else {
      return <Other formData={formData} setFormData={setFormData}/>
    }
  }

  return (
    <div className='benefits-form'>
      <div className='progress-bar'></div>
      <div className='form-container'>
        <div className='body'>
          {pageDisplay()}
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
              if (page === FormTitles.length - 1) {
                alert('Form has been submitted');
                console.log({ formData });
              } else {
                setPage((currentPage) => currentPage + 1);
              }
            }}
            variant='contained'
          >
           {page === FormTitles.length - 1 ? 'Submit' : 'Next'}
          </Button>
      </div>
    </div>
  );
}

export default Form;