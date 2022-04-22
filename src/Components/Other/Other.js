import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import './Other.css';

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const Other = ({ formData, setFormData }) => {
  return (
    <div className='other-container'>
      <StyledTextField 
        type='number'
        name='numberOfChildren'
        value={formData.numberOfChildren}
        label='Number of children'
        onChange={(event) => {setFormData({ ...formData, numberOfChildren: event.target.value })}}
        variant='outlined'
        size='small'
        required 
        error={formData.numberOfChildren < 0}
        helperText={formData.numberOfChildren < 0 ? 'Please enter a valid number.' : ''}/>
      <StyledTextField 
        type='number'
        name='numberOfAdults'
        value={formData.numberOfAdults}
        label='Number of adults'
        onChange={(event) => {setFormData({ ...formData, numberOfAdults: event.target.value })}}
        variant='outlined'
        size='small'
        required 
        error={formData.numberOfAdults < 0}
        helperText={formData.numberOfAdults < 0 ? 'Please enter a valid number.' : ''}/>
    </div>
  );
}
export default Other;