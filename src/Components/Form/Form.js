import { useState } from 'react';
import StepOne from '../StepOne/StepOne';
import StepTwo from '../StepTwo/StepTwo';
import './Form.css';

const Form = () => {
  const [page, setPage] = useState(0);

  const [formData, setFormData] = useState({
    applicantAge: 0,
    zipcode: '',
    isStudent: false,
    isPregnant: false,
    isUnemployed: false,
    isBlindOrVisuallyImpaired: false,
    isDisabled: false,
    isAVeteran: false,
    isNone: false
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setFormData({...formData, [value]: !formData[value]})
  }
  
  const displayPage = (pageIndex) => {
    switch(pageIndex) {
      case 0:
        return <StepOne 
                formData={formData} 
                handleChange={handleChange} 
                page={page}
                setPage={setPage} />
      case 1:
        return <StepTwo
                formData={formData}
                handleCheckboxChange={handleCheckboxChange} 
                page={page}
                setPage={setPage} />
    }
  }

  return (
    <main className='benefits-form'>
      {displayPage(page)}
    </main>
  );
}

export default Form;