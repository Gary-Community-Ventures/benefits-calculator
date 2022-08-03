import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const ResultsPreviousButton = () => {
  let navigate = useNavigate();
  const location  = useLocation();

  const handlePreviousSubmit = () => {
    if (location.pathname === '/ineligible-results') {
      navigate('/results');
      window.scrollTo(0, 0);
    } else if (location.pathname === '/results') {
      navigate('/confirm-information' );
      window.scrollTo(0, 0);
    }
  }
  
  return (
    <Button
      className='prev-button'
      onClick={() => handlePreviousSubmit()}
      variant='contained'>
      Prev
    </Button>
  );
}

export default ResultsPreviousButton;