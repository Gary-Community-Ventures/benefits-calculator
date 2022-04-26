import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import './Other.css';

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const Other = ({ formData, handleChange, page, setPage }) => {
  const validateNumChildrenAdults = () => {
    return formData.numberOfChildren >= 0 && formData.numberOfAdults >= 1;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateNumChildrenAdults()) {
      setPage(page + 1);
    }
  }

  return (
    <div className='other-container'>
      <StyledTextField 
        type='number'
        name='numberOfChildren'
        value={formData.numberOfChildren}
        label='Number of children'
        onChange={(event) => {handleChange(event)}}
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
        onChange={(event) => {handleChange(event)}}
        variant='outlined'
        size='small'
        required 
        error={formData.numberOfAdults < 0}
        helperText={formData.numberOfAdults < 0 ? 'Please enter a valid number.' : ''}/>
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
export default Other;