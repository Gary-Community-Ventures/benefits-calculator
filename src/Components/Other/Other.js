import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import './Other.css';

const Other = ({ formData, setFormData }) => {
  const StyledTextField = styled(TextField)({
    marginBottom: 20
  });

  return (
    <div className='other-container'>
      <StyledTextField 
        type='number'
        id='number-of-children'
        name='numberOfChildren'
        value={formData.numberOfChildren}
        label='Number of children'
        onChange={(event) => {setFormData({ ...formData, numberOfChildren: event.target.value })}}
        variant='outlined'
        size='small'
        required />
      <StyledTextField 
        type='number'
        id='number-of-adults'
        name='numberOfAdults'
        value={formData.numberOfAdults}
        label='Number of adults'
        onChange={(event) => {setFormData({ ...formData, numberOfAdults: event.target.value })}}
        variant='outlined'
        size='small'
        required />
    </div>
  );
}
export default Other;