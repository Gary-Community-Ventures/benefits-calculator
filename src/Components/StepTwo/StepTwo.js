import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import './StepTwo.css';

const StepTwo = ({formData, handleCheckboxChange, page, setPage }) => {
  return (
    <div className='step-two-container'>
      <p className='step-progress-title'>Step {page + 1} of 7</p>
      <h2 className='sub-header'>A little more about you.</h2>
      <p className='question-label'>Do any of these apply to you?</p>
      <p className='follow-up-p-tag'>It’s OK to pick more than one. You can also leave this blank if none of these apply to you.</p>
      <FormGroup>
        <FormControlLabel 
          control={<Checkbox checked={formData.isStudent} onChange={handleCheckboxChange} />}  
          label='Student' 
          value='isStudent' />
        <FormControlLabel 
          control={<Checkbox checked={formData.isPregnant} onChange={handleCheckboxChange} />} 
          label='Pregnant' 
          value='isPregnant' />
        <FormControlLabel 
          control={<Checkbox checked={formData.isUnemployed} onChange={handleCheckboxChange} />} 
          label='Unemployed' 
          value='isUnemployed' />
        <FormControlLabel 
          control={<Checkbox checked={formData.isBlindOrVisuallyImpaired} onChange={handleCheckboxChange} />} 
          label='Blind or visually impaired' 
          value='isBlindOrVisuallyImpaired' />
        <FormControlLabel 
          control={<Checkbox checked={formData.isDisabled} onChange={handleCheckboxChange} />} 
          label='Have any disabilities' 
          value='isDisabled' />
        <FormControlLabel 
          control={<Checkbox checked={formData.isAVeteran} onChange={handleCheckboxChange} />} 
          label='Served in the U.S. Armed Forces, National Guard or Reserves'
          value='isAVeteran' />
        <FormControlLabel 
          control={<Checkbox checked={formData.isNone} onChange={handleCheckboxChange} />} 
          label='None of these apply'
          value='isNone' />
      </FormGroup>
    </div>
  );
}

export default StepTwo;