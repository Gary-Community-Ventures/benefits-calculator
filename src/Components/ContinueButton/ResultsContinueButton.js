import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ResultsContinueButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant='contained'
      onClick={() => navigate('/ineligible-results') }>
      Continue
    </Button>
  );
}

export default ResultsContinueButton;