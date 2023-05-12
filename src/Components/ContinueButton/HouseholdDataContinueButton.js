import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { getPersonDataErrorMsg, personDataIsValid } from '../../Assets/validationFunctions';
import { useParams } from 'react-router-dom';
import stepDirectory from '../../Assets/stepDirectory';

const HouseholdDataContinueButton = ({ page, setPage, remainingHHMNumber, handleHouseholdDataSubmit, setState, state }) => {
  const { uuid } = useParams();
  const stepNumberId = stepDirectory.householdData;

  const handleContinue = (event) => {
    event.preventDefault();
    const validPersonData = personDataIsValid(state, page);
    const lastHouseholdMember = ((Number(page) + 1) === (Number(remainingHHMNumber)));
    
    if (validPersonData && lastHouseholdMember) {
      //if this person's inputs are valid and we're at the last hh member then send the hhdata back up to App
      handleHouseholdDataSubmit(state.householdData, stepNumberId, uuid);
    } else if (validPersonData) { //we are not at the last page
      //validate the householdMember's data if it's valid then
      setPage(Number(page) + 1);
      window.scrollTo(0, 0);
    } else if (!validPersonData) {
      setState({
        ...state,
        wasSubmitted: true,
        error: getPersonDataErrorMsg(state, page),
        errorIndex: page
      });
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