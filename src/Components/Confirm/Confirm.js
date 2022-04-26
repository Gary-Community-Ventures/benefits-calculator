import { List, ListItemText, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import './Confirm.css';

const StyledListItemText = styled(ListItemText)({
  marginBottom: 20
});

const Confirm = ({ formData, page, setPage }) => {
  const { email, password, confirmPassword, firstName, lastName, username, numberOfChildren, numberOfAdults } = formData;
  return (
    <div className='confirm-container'>
      <List>
        <StyledListItemText
          primary='Email'
          secondary={email} />
        <StyledListItemText
          primary='Password'
          secondary={password} />
        <StyledListItemText
          primary='Confirm Password'
          secondary={confirmPassword} />
        <StyledListItemText
          primary='First name'
          secondary={firstName} />
        <StyledListItemText
          primary='Last name'
          secondary={lastName} />
        <StyledListItemText
          primary='Username'
          secondary={username} />
        <StyledListItemText
          primary='Number of Children'
          secondary={numberOfChildren} />
        <StyledListItemText
          primary='Number of Adults'
          secondary={numberOfAdults} />
      </List>
      <div className='footer'>
          <Button
            onClick={() => {setPage(page - 1)}}
            variant='contained'>
            Prev
          </Button>
          <Button
            onClick={() => {setPage(page + 1)}}
            variant='contained'>
            Confirm & Continue
          </Button>
        </div>
    </div>
  );
}

export default Confirm;