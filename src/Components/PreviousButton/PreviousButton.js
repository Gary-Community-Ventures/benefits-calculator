import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import stepDirectory from '../../Assets/stepDirectory';

const PreviousButton = ({ navFunction, formData }) => {
  const { id, uuid } = useParams();
  let stepNumberId = Number(id);
  if (!stepNumberId) stepNumberId = 1;
  const navigate = useNavigate();
  const defaultNavigate = () => {
    if (+id === stepDirectory.householdData + 1) {
      navigate(`/${uuid}/step-${stepDirectory.householdData}/${formData.householdData.length}`);
      return;
    }
    navigate(`/${uuid}/step-${stepNumberId - 1}`);
  };
  const navigationFunction = navFunction ?? defaultNavigate;

  return (
    <Button className='prev-button' onClick={navigationFunction} variant='contained'>
      <FormattedMessage id='previousButton' defaultMessage='Prev' />
    </Button>
  );
};

export default PreviousButton;
