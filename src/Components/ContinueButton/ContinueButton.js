import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const ContinueButton = ({ handleSubmit, inputError, formData, inputName }) => {
  let { id } = useParams();
  let stepNumberId = Number(id);

  return (
    <Button
      variant='contained'
      onClick={(event) => {
        handleSubmit(event, inputError, formData[inputName], stepNumberId, formData.householdSize);
      }}>
      <FormattedMessage 
        id='button.continue'
        defaultMessage='Continue' />
    </Button>
  );
}

export default ContinueButton;