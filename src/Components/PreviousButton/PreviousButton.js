import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const PreviousButton = ({ formData }) => {
  let { id } = useParams();
  let numberId = Number(id);
  let navigate = useNavigate();

  return (
    <Button
      className='prev-button'
      onClick={() => {
        if (numberId === 15 && formData.householdSize === 1) {
          navigate(`/step-${numberId - 2}`);
        } else {
          navigate(`/step-${numberId - 1}`);
        }
      }}
      variant='contained'>
        <FormattedMessage 
          id='previousButton'
          defaultMessage='Prev' />
    </Button>
  );
}

export default PreviousButton;