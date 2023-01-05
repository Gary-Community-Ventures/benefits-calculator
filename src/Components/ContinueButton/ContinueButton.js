import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const ContinueButton = ({ handleContinueSubmit, inputError, formData, inputName, questionName }) => {
  let { id } = useParams();
  let stepNumberId = Number(id);

  return (
    <Button
      variant='contained'
      onClick={(event) => {
        handleContinueSubmit(event, inputError, formData[inputName], stepNumberId, questionName, formData.householdSize);
      }}>
      <FormattedMessage 
        id='continueButton'
        defaultMessage='Continue' />
    </Button>
  );
}

export default ContinueButton;