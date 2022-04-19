import { TextField } from '@mui/material';

const PersonalInfo = ({ formData, setFormData }) => {
  return (
    <div className='personal-info-container'>
      <TextField 
        type='text'
        id='first-name'
        name='firstName'
        value={formData.firstName}
        label='First name'
        onChange={(event) => {setFormData({...formData, firstName: event.target.value })}} 
        variant='outlined'
        size='small'
        required />
      <TextField
        type='text'
        id='last-name'
        name='lastName'
        value={formData.lastName}
        label='Last Name'
        onChange={(event) => {setFormData({...formData, lastName: event.target.value })}}
        variant='outlined'
        size='small'
        required />
      <TextField 
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