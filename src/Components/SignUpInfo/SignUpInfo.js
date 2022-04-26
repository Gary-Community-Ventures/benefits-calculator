import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import './SignUpInfo.css';

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const SignUpInfo = ({ formData, handleChange, page, setPage }) => {
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
          onClick={() => {setPage(page + 1)}}
          variant='contained'>
          Next
        </Button>
    </div>
  );
}
export default SignUpInfo;