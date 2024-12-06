import { Button } from '@mui/material';
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useStepNumber } from '../../Assets/stepDirectory';

type Props = {
  navFunction: () => void;
};

const PreviousButton = ({ navFunction }: Props) => {
  const { formData } = useContext(Context);
  const { whiteLabel, id, uuid } = useParams();
  let stepNumberId = Number(id);
  if (!stepNumberId) stepNumberId = 1;
  const navigate = useNavigate();

  const householdStep = useStepNumber('householdData', false);

  const defaultNavigate = () => {
    if (id && +id === householdStep + 1) {
      navigate(`/${whiteLabel}/${uuid}/step-${householdStep}/${formData.householdData.length}`);
      return;
    }
    navigate(`/${whiteLabel}/${uuid}/step-${stepNumberId - 1}`);
  };

  const navigationFunction = navFunction ?? defaultNavigate;

  return (
    <Button
      variant="outlined"
      onClick={navigationFunction}
      startIcon={<NavigateBeforeIcon sx={{ mr: '-8px' }} className="rtl-mirror" />}
    >
      <FormattedMessage id="previousButton" defaultMessage="Back" />
    </Button>
  );
};

export default PreviousButton;
