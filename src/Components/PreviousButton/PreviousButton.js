import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const PreviousButton = () => {
  const { id, uuid } = useParams();
  let stepNumberId = Number(id);
  if (!stepNumberId) stepNumberId = 1;
  const navigate = useNavigate();

  return (
    <Button
      className='prev-button'
      onClick={() => {
        navigate(`/${uuid}/step-${stepNumberId - 1}`);
      }}
      variant='contained'>
        <FormattedMessage 
          id='previousButton'
          defaultMessage='Prev' />
    </Button>
  );
}

export default PreviousButton;