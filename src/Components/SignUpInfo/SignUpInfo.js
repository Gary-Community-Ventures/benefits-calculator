import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import './SignUpInfo.css';

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const SignUpInfo = ({ formData, handleChange, page, setPage }) => {
  const validateEmail = () => {
    return /^.+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(formData.email);
  }
  
  const validatePassword = () => {
    return formData.password.length > 0;
  }
  
  const validateConfirmPassword = () => {
    return formData.confirmPassword.length > 0 && formData.confirmPassword === formData.password;
  }
  
  const inputsAreValid = () => {
    return validateEmail() && validatePassword() && validateConfirmPassword();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputsAreValid()) {
      setPage(page + 1);
    }
  }

  return (
    <div className='sign-up-container'>
      <StyledTextField 
        type='email'
        name='email'
        value={formData.email}
        label='Email'
        onChange={(event) => {handleChange(event)}}
        variant='outlined'
        size='small'
        required 
        error={!/^.+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(formData.email)}
        helperText={!/^.+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(formData.email) ? 'Invalid email.' : ''} />
      <StyledTextField 
        type='password'
        name='password'
        value={formData.password}
        label='Password'
        onChange={(event) => {handleChange(event)}}
        variant='outlined'
        size='small'
        required 
        error={formData.password === ''}
        helperText={formData.password === '' ? 'Please enter a password.' : ''} />
      <StyledTextField 
        type='password'
        name='confirmPassword'
        value={formData.confirmPassword}
        label='Confirm Password'
        onChange={(event) => {handleChange(event)}}
        variant='outlined'
        size='small'
        required 
        error={formData.confirmPassword === '' || formData.confirmPassword !== formData.password} 
        helperText={formData.confirmPassword === '' || formData.confirmPassword !== formData.password ? 'Please enter a matching password.' : ''} />
        <Button
          onClick={(event) => {handleSubmit(event)}}
          variant='contained'>
          Next
        </Button>
    </div>
  );
}
export default SignUpInfo;