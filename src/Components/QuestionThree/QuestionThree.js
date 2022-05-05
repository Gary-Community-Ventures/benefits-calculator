import { Checkbox, FormControlLabel, FormGroup, Button, FormLabel, RadioGroup, Radio } from '@mui/material';
import './QuestionThree.css';


const QuestionThree = ({formData, handleCheckboxChange, page, setPage, handleRadioButtonChange }) => {
  const validateIsNoneOfTheseApply = () => {
    if (formData.isNoneOfTheseApply) {
      return formData.isStudent === false && formData.isPregnant === false 
        && formData.isUnemployed === false && formData.isBlindOrVisuallyImpaired === false 
        && formData.isDisabled === false && formData.isAVeteran === false;
    } else if (formData.isNoneOfTheseApply === false) {
      return formData.isStudent === true || formData.isPregnant === true 
      || formData.isUnemployed === true || formData.isBlindOrVisuallyImpaired === true 
      || formData.isDisabled === true || formData.isAVeteran === true;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateIsNoneOfTheseApply()) {
      setPage(page + 1);
    }
  }
  
  return (
    <>
      <p className='question-label'>Do any of these apply to you?</p>
      <p className='follow-up-p-tag'>It’s OK to pick more than one. You can also leave this blank if none of these apply to you.</p>
      <FormGroup className='form-group'>
        <FormControlLabel 
          control={<Checkbox checked={formData.isStudent} onChange={handleCheckboxChange} />}  
          label='Student' 
          value='isStudent' />
        {formData.isStudent ? 
          <>
            <FormLabel id='is-a-full-time-student-group'> Are you a full time student? </FormLabel>
            <RadioGroup
              aria-labelledby='is-a-full-time-student-group'
              name='isAFullTimeStudent'
              value={formData.isAFullTimeStudent}
              onChange={handleRadioButtonChange} >
                <FormControlLabel value='true' control={<Radio />} label='Yes' />
                <FormControlLabel value='false' control={<Radio />} label='No' />
              </RadioGroup>
          </> 
          : ''}
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
      <div className='question-buttons'>
        <Button
          onClick={() => {setPage(page - 1)}}
          variant='contained'>
          Prev
        </Button>
        <Button
          onClick={(event) => {handleSubmit(event)}}
          variant='contained'>
          Continue
        </Button>
      </div>
    </>
  );
}

export default QuestionThree;