import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { getPersonDataErrorMsg, personDataIsValid } from '../../Assets/validationFunctions';
import { useParams } from 'react-router-dom';

const HouseholdDataContinueButton = ({ page, setPage, remainingHHMNumber, handleHouseholdDataSubmit, setState, state }) => {
  const { id } = useParams();
  const stepNumberId = Number(id);

  const handleContinue = (event) => {
    event.preventDefault();

    if (personDataIsValid(state, page) && ((Number(page) + 1) === (Number(remainingHHMNumber)))) {
      //if this person's inputs are valid and we're at the last hh member then send the hhdata back up to App
      handleHouseholdDataSubmit(state.householdData, stepNumberId);
    } else if (personDataIsValid(state, page)) { //we are not at the last page
      //validate the householdMember's data if it's valid then
      setPage(Number(page) + 1);
      window.scrollTo(0, 0);
    } else if (!personDataIsValid(state, page)) {
      setState({
        ...state,
        error: getPersonDataErrorMsg(state, page),
        wasSubmitted: true
      })
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