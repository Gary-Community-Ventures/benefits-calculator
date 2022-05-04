import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import './StepTwo.css';

const StepTwo = ({formData, handleCheckboxChange, page, setPage }) => {
  return (
    <div className='step-two-container'>
      <p className='step-progress-title'>Step {page + 1} of 7</p>
      <h2 className='sub-header'>A little more about you.</h2>
      <p className='question-label-1'>Do any of these apply to you?</p>
      <p className='follow-up-p-tag'>It’s OK to pick more than one. You can also leave this blank if none of these apply to you.</p>
      <FormGroup className='form-group-1'>
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
          control={<Checkbox checked={formData.isNoneOfTheseApply} onChange={handleCheckboxChange} />} 
          label='None of these apply'
          value='isNoneOfTheseApply' />
      </FormGroup>
      <p className='question-label-2'>Do you receive any of these benefits?</p>
      <FormGroup className='form-group-2'>
        <FormControlLabel 
          control={<Checkbox checked={formData.isOnMedicaid} onChange={handleCheckboxChange} />} 
          label='Medicaid'
          value='isOnMedicaid' />
        <FormControlLabel 
          control={<Checkbox checked={formData.isOnDisabilityRelatedMedicaid} onChange={handleCheckboxChange} />} 
          label='Disability-related Medicaid'
          value='isOnDisabilityRelatedMedicaid' />
        <FormControlLabel 
          control={<Checkbox checked={formData.isNotReceivingAnyMedicaidBenefits} onChange={handleCheckboxChange} />} 
          label='None of these apply'
          value='isNotReceivingAnyMedicaidBenefits' />
      </FormGroup>
    </div>
  );
}

export default StepTwo;