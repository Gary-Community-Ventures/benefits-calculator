import { Button } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';

const BackToResults = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();
  return (
    <Button
      style={{
        backgroundColor: 'var(--main-header-color)',
        color: 'white',
        fontWeight: 700,
        fontSize: 'small',
        margin: '1rem 0',
        width: '10rem',
        borderRadius: '1rem',
      }}
      onClick={() => navigate(`/${uuid}/results/benefits`)}
      startIcon={<NavigateBeforeIcon sx={{ mr: '-8px' }} />}
    >
      <FormattedMessage id="backToResultsButton" defaultMessage="Back to results" />
    </Button>
  );
};

export default BackToResults;
