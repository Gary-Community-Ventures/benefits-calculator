import { Button } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const PreviousButton = ({ formData, questionName }) => {
  let { id } = useParams();
  let stepNumberId = Number(id);
  let navigate = useNavigate();
  let location = useLocation();

  return (
    <Button
      className='prev-button'
      onClick={() => {
        if (questionName && questionName === 'householdAssets' && formData.householdSize === 1) {
          navigate(`/step-${stepNumberId - 2}`);
        } else if (location.pathname.includes('/email-results')) {
          navigate(`/results/${id}`);
        } else if (location.pathname === '/step-1') {
          navigate(`/step-0`);
        } else {
          navigate(`/step-${stepNumberId - 1}`);
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