import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import './PersonalInfo.css';

const PersonalInfo = ({ formData, setFormData }) => {
  const StyledTextField = styled(TextField)({
    marginBottom: 20
  });

  return (
    <div className='personal-info-container'>
      <StyledTextField 
        type='text'
        id='first-name'
        name='firstName'
        value={formData.firstName}
        label='First name'
        onChange={(event) => {setFormData({...formData, firstName: event.target.value })}} 
        variant='outlined'
        size='small'
        required />
      <StyledTextField
        type='text'
        id='last-name'
        name='lastName'
        value={formData.lastName}
        label='Last Name'
        onChange={(event) => {setFormData({...formData, lastName: event.target.value })}}
        variant='outlined'
        size='small'
        required />
      <StyledTextField 
        type='text'
        id='username'
        name='username'
        value={formData.username}
        label='Username'
        onChange={(event) => {setFormData({ ...formData, username: event.target.value })}}
        variant='outlined'
        size='small'
        required />
    </div>
  );
}

export default PersonalInfo;