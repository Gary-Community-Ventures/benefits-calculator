import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import './PersonalInfo.css';

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const PersonalInfo = ({ formData, handleChange, page, setPage }) => {
  const validateFirstLastUserNames = () => {
    return formData.firstName.length > 0 && formData.lastName.length > 0 && formData.username.length > 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateFirstLastUserNames()) {
      setPage(page + 1);
    }
  }
  return (
    <div className='personal-info-container'>
      <StyledTextField 
        type='text'
        name='firstName'
        value={formData.firstName}
        label='First name'
        onChange={(event) => {handleChange(event)}}
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
        onChange={(event) => {handleChange(event)}}
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
        onChange={(event) => {handleChange(event)}}
        variant='outlined'
        size='small'
        required 
        error={formData.username === ''}
        helperText={formData.username === '' ? 'Please enter a username.' : ''}/>
        <div className='footer'>
          <Button
            onClick={() => {setPage(page - 1)}}
            variant='contained'>
            Prev
          </Button>
          <Button
            onClick={(event) => {handleSubmit(event)}}
            variant='contained'>
            Next
          </Button>
        </div>
    </div>
  );
}

export default PersonalInfo;