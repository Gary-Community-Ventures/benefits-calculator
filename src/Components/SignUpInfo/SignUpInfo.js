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
        id='email'
        name='email'
        value={formData.email}
        label='Email'
        onChange={(event) => {setFormData({ ...formData, email: event.target.value })}}
        variant='outlined'
        size='small'
        required />
      <StyledTextField 
        type='password'
        id='password'
        name='password'
        value={formData.password}
        label='Password'
        onChange={(event) => {setFormData({ ...formData, password: event.target.value })}}
        variant='outlined'
        size='small'
        required />
      <StyledTextField 
        type='password'
        id='confirmed-password'
        name='confirmPassword'
        value={formData.confirmPassword}
        label='Confirm Password'
        onChange={(event) => {setFormData({ ...formData, confirmPassword: event.target.value })}}
        variant='outlined'
        size='small'
        required />
    </div>
  );
}
export default SignUpInfo;