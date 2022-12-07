import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { personDataIsValid } from '../../Assets/validationFunctions';

const HouseholdDataContinueButton = ({ page, setPage, remainingHHMNumber, handleHouseholdDataSubmit, setState, state }) => {

  const handleContinue = (event) => {
    event.preventDefault();
    setState({ ...state, error: '' }); //resets the error property

    if (personDataIsValid(state, setState, page) && ((Number(page) + 1) === (Number(remainingHHMNumber))) ) {
      //if this person's inputs are valid and we're at the last hh member then send the hhdata back up to App
      handleHouseholdDataSubmit(state.householdData);
    } else if ((personDataIsValid(state, setState, page))) { //we are not at the last page
      //validate the householdMember's data if it's valid then 
      setPage(Number(page) + 1);
      window.scrollTo(0, 0);
    }
  }

  return (
    <Button
      variant='contained'
      onClick={(event) => { handleContinue(event) }}>
      <FormattedMessage 
        id='continueButton'
        defaultMessage='Continue' />
    </Button>
  );
}

export default HouseholdDataContinueButton;