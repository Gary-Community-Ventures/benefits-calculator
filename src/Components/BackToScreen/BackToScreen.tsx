import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import { FormattedMessage } from 'react-intl';
import WarningIcon from '@mui/icons-material/Warning';
import './BackToScreen.css';
import { useNavigate, useParams } from 'react-router-dom';

const BackToScreen = () => {
  const { theme } = useContext(Context);
  const { uuid } = useParams();
  const navigate = useNavigate();
  return (
    <div className="back-to-screen-message">
      <WarningIcon color="secondary" />
      <p>
        <FormattedMessage
          id="backToScreen.message"
          defaultMessage="The following estimates are based on information we got from your tax form. You might be eligible for even more. To check for more benefits and to improve accuracy, review your information and answer a few more questions "
        />
        <a
          className="back-to-screen-message-button"
          onClick={(event) => {
            event.preventDefault();
            navigate(`/${uuid}/step-1`);
          }}
        >
          <FormattedMessage id="results.openSendResultsButton" defaultMessage="here" />
        </a>
        .
      </p>
    </div>
  );
};

export default BackToScreen;
