import { Button } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const PreviousButton = ({ formData }) => {
  let { id } = useParams();
  let numberId = Number(id);
  let navigate = useNavigate();
  let location = useLocation();

  return (
    <Button
      className='prev-button'
      onClick={() => {
        if (numberId === 16 && formData.householdSize === 1) {
          navigate(`/step-${numberId - 2}`);
        } else if (location.pathname === '/email-results') {
          navigate(`/results`);
        } else if (location.pathname === '/step-1') {
          navigate(`/step-0`);
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