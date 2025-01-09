import { Button } from '@mui/material';
import ErrorIcon from '../../../Assets/icons/error-icon.svg';
import { useParams, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './ResultsError.css';

const ResultsError = () => {
  const { uuid, whiteLabel } = useParams();
  const navigate = useNavigate();

  return (
    <main>
      <div className="error-container">
        <img className="error-icon" src={ErrorIcon} />
        <h1 className="error-header">
          <FormattedMessage id="results-error.header" defaultMessage="Oops! Looks like something went wrong." />
        </h1>
        <p className="error-message">
          <FormattedMessage
            id="results-error.message"
            defaultMessage="We're sorry. We are having some trouble completing your request. Please make sure you have completed all of the questions on the screen and try again. If you are still unable to load your benefits results, please contact myfriendben@garycommunity.org."
          />
        </p>
        <Button
          className="error-button"
          onClick={() => {
            navigate(`/${whiteLabel}/${uuid}/confirm-information`);
          }}
          variant="contained"
        >
          <FormattedMessage id="results-error.button" defaultMessage="Back to Screener" />
        </Button>
      </div>
    </main>
  );
};

export default ResultsError;
