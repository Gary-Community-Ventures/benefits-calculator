import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const HouseholdDataPreviousButton = ({ page, setPage }) => {
  const navigate = useNavigate();

  const handlePrevious = (event) => {
    event.preventDefault();
    
    if (Number(page) === 0) { //we're at the first member's data block
      //so we just want to navigate back to step 13
      navigate('/step-14');
    } else { 
      //go back to the previous member's data block
      setPage(Number(page) - 1);
      window.scrollTo(0, 0);
    }
  }

  return (
    <Button
      className='prev-button'
      variant='contained'
      onClick={(event) => { handlePrevious(event) }}>
      <FormattedMessage 
        id='previousButton'
        defaultMessage='Prev' />
    </Button>
  );
}

export default HouseholdDataPreviousButton;