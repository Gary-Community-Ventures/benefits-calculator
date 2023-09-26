import { Button } from '@mui/material';
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { getStepNumber } from '../../Assets/stepDirectory';

const PreviousButton = ({ navFunction }) => {
  const { formData } = useContext(Context);
  const { id, uuid } = useParams();
  let stepNumberId = Number(id);
  if (!stepNumberId) stepNumberId = 1;
  const navigate = useNavigate();
  const defaultNavigate = () => {
    if (+id === getStepNumber('householdData', formData.immutableReferrer) + 1) {
      navigate(
        `/${uuid}/step-${getStepNumber('householdData', formData.immutableReferrer)}/${formData.householdData.length}`,
      );
      return;
    }
    navigate(`/${uuid}/step-${stepNumberId - 1}`);
  };
  const navigationFunction = navFunction ?? defaultNavigate;

  return (
    <Button className="prev-button" onClick={navigationFunction} variant="contained">
      <FormattedMessage id="previousButton" defaultMessage="Prev" />
    </Button>
  );
};

export default PreviousButton;
