import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import './PersonalInfo.css';

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const PersonalInfo = ({ formData, setFormData }) => {
  return (
    <div className='personal-info-container'>
      <StyledTextField 
        type='text'
        name='firstName'
        value={formData.firstName}
        label='First name'
        onChange={(event) => {setFormData({...formData, firstName: event.target.value })}} 
        variant='outlined'
        size='small'
        required 
        error={formData.firstName === ''}
        helperText={formData.firstName === '' ? 'Please enter your first name.' : ''}/>
      <StyledTextField
        type='text'
        name='lastName'
        value={formData.lastName}
        label='Last Name'
        onChange={(event) => {setFormData({...formData, lastName: event.target.value })}}
        variant='outlined'
        size='small'
        required 
        error={formData.lastName === ''}
        helperText={formData.lastName === '' ? 'Please enter your last name.' : ''}/>
      <StyledTextField 
        type='text'
        name='username'
        value={formData.username}
        label='Username'
        onChange={(event) => {setFormData({ ...formData, username: event.target.value })}}
        variant='outlined'
        size='small'
        required 
        error={formData.username === ''}
        helperText={formData.username === '' ? 'Please enter a username.' : ''}/>
    </div>
  );
}

export default PersonalInfo;