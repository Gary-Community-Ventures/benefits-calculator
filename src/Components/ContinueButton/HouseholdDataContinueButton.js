import { Button } from '@mui/material';

const HouseholdDataContinueButton = ({ page, setPage, householdSizeNumber, handleHouseholdDataSubmit, householdData }) => {

  const handleContinue = (event) => {
    event.preventDefault();
    
    if ((Number(page) + 1) === (Number(householdSizeNumber) - 1)) {
      //then we're at the end and we want to send all of this data back to app via a function
      //we should first validate that all of the information has been filled out for each family member
      //then we should call handleHouseholdDataSubmit, else display error msg to user
      handleHouseholdDataSubmit(householdData);
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