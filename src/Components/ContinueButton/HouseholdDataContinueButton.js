import { Button } from '@mui/material';
import { householdMemberDataIsValid } from '../../Assets/validationFunctions';

const HouseholdDataContinueButton = ({ page, setPage, householdSizeNumber, handleHouseholdDataSubmit, setState, state }) => {

  const handleContinue = (event) => {
    event.preventDefault();
    
    if ((Number(page) + 1) === (Number(householdSizeNumber) - 1)) {
      //then we're at the end and we want to send all of this data back to app via a function
      //we should first validate that all of the information has been filled out for each family member
      //if that is the case we call handleHouseholdDataSubmit, else display error msg to user
      if (householdMemberDataIsValid(state, setState)) {
        handleHouseholdDataSubmit(state.householdData);
      }
    } else { //there are still more household member block(s) that need to be filled out
      //we just want to validate that all of the information has been filled out
      //and then set the page + 1 for them to fill out the next member's information
      setPage(Number(page) + 1);
    }
  }

  return (
    <Button
      variant='contained'
      onClick={(event) => { handleContinue(event) }}>
      Continue
    </Button>
  );
}

export default HouseholdDataContinueButton;