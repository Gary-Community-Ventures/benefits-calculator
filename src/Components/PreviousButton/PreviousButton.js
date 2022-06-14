import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const PreviousButton = () => {
  let { id } = useParams();
  let numberId = Number(id);
  let navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        if (numberId === 2) { //if it's the first question, navigate to the homepage
          navigate('/')
        } else {
          navigate(`/question-${numberId - 1}`);
        }
      }}
      variant='contained'>
      Prev
    </Button>
  );
}

export default PreviousButton;