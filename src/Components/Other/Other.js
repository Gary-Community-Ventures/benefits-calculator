import { TextField } from '@mui/material';

const Other = ({ formData, setFormData }) => {
  return (
    <div className='other-container'>
      <TextField 
        type='number'
        id='number-of-children'
        name='numberOfChildren'
        value={formData.numberOfChildren}
        label='Number of children'
        onChange={(event) => {setFormData({ ...formData, numberOfChildren: event.target.value })}}
        variant='outlined'
        size='small'
        required />
      <TextField 
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