import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const PreviousButton = ({ formData }) => {
  let { id } = useParams();
  let numberId = Number(id);
  let navigate = useNavigate();

  return (
    <Button
      className='prev-button'
      onClick={() => {
        if (numberId === 16 && formData.householdSize === 1) {
          navigate(`/step-${numberId - 2}`);
        } else {
          navigate(`/step-${numberId - 1}`);
        }
      }}
      variant='contained'>
      Prev
    </Button>
  );
}

export default PreviousButton;