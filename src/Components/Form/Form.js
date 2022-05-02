import { useState } from 'react';
import StepOne from '../StepOne/StepOne';
import './Form.css';

const Form = () => {
  const [page, setPage] = useState(0);

  const [formData, setFormData] = useState({
    applicantAge: 0,
    zipcode: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value, isSubmitting: true });
  };
  
  const displayPage = (pageIndex) => {
    switch(pageIndex) {
      case 0:
        return <StepOne 
                formData={formData} 
                handleChange={handleChange} 
                page={page}
                setPage={setPage} />
    }
  }

  return (
    <div className='benefits-form'>
      {displayPage(page)}
    </div>
  );
}

export default Form;