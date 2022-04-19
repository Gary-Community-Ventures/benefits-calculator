import { useState } from 'react';
import Other from '../Other/Other';
import PersonalInfo from '../PersonalInfo/PersonalInfo';
import SignUpInfo from '../SignUpInfo/SignUpInfo';
import { Typography } from '@mui/material';

const Form = () => {
  const [page, setPage] = useState(0);

  const FormTitles = ['Sign Up', 'Personal Info', 'Other'];

  const pageDisplay = () => {
    if (page === 0) {
      return <SignUpInfo />
    } else if (page === 1) {
      return <PersonalInfo />
    } else {
      return <Other />
    }
  }

  return (
    <div className='benefits-form'>
      <div className='progress-bar'></div>
      <div className='form-container'>
        <div className='header'>
          <Typography variant="h5">{FormTitles[page]}</Typography>
        </div>
        <div className='body'>
          {pageDisplay()}
        </div>
        <div className='footer'></div>
          <button
            disabled={page === 0}
            onClick={() => {
              setPage((currentPage) => currentPage - 1);
            }}
          >
            Prev
          </button>
          <button 
            disabled={page === FormTitles.length - 1}
            onClick={() => {
              setPage((currentPage) => currentPage + 1);
            }}
          >
            Next
          </button>
      </div>
    </div>
  );
}

export default Form;