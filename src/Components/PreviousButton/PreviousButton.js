import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const PreviousButton = () => {
  let { id } = useParams();
  let numberId = Number(id);
  let navigate = useNavigate();

  return (
    <Button
      className='prev-button'
      onClick={() => {
        navigate(`/step-${numberId - 1}`);
      }}
      variant='contained'>
      Prev
    </Button>
  );
}

export default PreviousButton;