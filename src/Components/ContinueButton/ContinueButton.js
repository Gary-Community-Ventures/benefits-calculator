import { Button } from '@mui/material';

const ContinueButton = ({ handleSubmit, inputError, formData, inputName }) => {
  return (
    <Button
      variant='contained'
      onClick={(event) => {
        handleSubmit(event, inputError, formData[inputName]);
      }}>
      Continue
    </Button>
  );
}

export default ContinueButton;