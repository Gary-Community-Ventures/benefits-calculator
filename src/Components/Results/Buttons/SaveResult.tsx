import { Button } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import '../ProgramPage/ProgramPage.css';

const SaveResult = () => {
  return (
    <Button
      className="button save-button"
      style={{
        backgroundColor: 'var(--main-header-color)',
        color: 'white',
        fontWeight: 700,
        fontSize: 'x-small',
        width: 'fit-content',
        padding: '1px 1rem',
        margin: '1rem 0',
        borderRadius: '1rem',
      }}
      onClick={() => {}}
      endIcon={<SaveOutlinedIcon sx={{ ml: '-4px' }} />}
    >
      <FormattedMessage id="saveThisResult" defaultMessage="Save this result" />
    </Button>
  );
};

export default SaveResult;
