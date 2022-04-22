import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import './SignUpInfo.css';

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const SignUpInfo = ({ formData, setFormData }) => {
  return (
    <div className='sign-up-container'>
      <StyledTextField 
        type='email'
        name='email'
        value={formData.email}
        label='Email'
        onChange={(event) => {setFormData({ ...formData, email: event.target.value})}}
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
        onChange={(event) => {setFormData({ ...formData, password: event.target.value})}}
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
        onChange={(event) => {setFormData({ ...formData, confirmPassword: event.target.value})}}
        variant='outlined'
        size='small'
        required 
        error={formData.confirmPassword === '' || formData.confirmPassword !== formData.password} 
        helperText={formData.confirmPassword === '' || formData.confirmPassword !== formData.password ? 'Please enter a matching password.' : ''} />
    </div>
  );
}
export default SignUpInfo;