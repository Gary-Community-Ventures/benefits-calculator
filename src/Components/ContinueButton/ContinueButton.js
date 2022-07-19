import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const ContinueButton = ({ handleSubmit, inputError, formData, inputName }) => {
  let { id } = useParams();
  let stepNumberId = Number(id);

  return (
    <Button
      variant='contained'
      onClick={(event) => {
        handleSubmit(event, inputError, formData[inputName], stepNumberId, formData.householdSize);
      }}>
      Continue
    </Button>
  );
}

export default ContinueButton;