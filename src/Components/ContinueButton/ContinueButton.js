import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const ContinueButton = ({ handleSubmit, inputError, formData, inputName }) => {
  let { id } = useParams();
  let numberId = Number(id);

  return (
    <Button
      variant='contained'
      onClick={(event) => {
        handleSubmit(event, inputError, formData[inputName], numberId);
      }}>
      Continue
    </Button>
  );
}

export default ContinueButton;