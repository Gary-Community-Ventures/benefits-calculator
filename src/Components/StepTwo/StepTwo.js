import './StepTwo.css';

const StepTwo = ({formData, handleChange, page, setPage }) => {

  return (
    <div className='step-two-container'>
      <p className='step-progress-title'>Step {page + 1} of 7</p>
      <h2 className='sub-header'>A little more about you.</h2>
      <p className='question-label'>Do any of these apply to you?</p>
      <p className='follow-up-p-tag'>It’s OK to pick more than one. You can also leave this blank if none of these apply to you.</p>

    </div>
  );
}

export default StepTwo;