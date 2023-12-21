import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import loading from '../../../Assets/loading/loading-icon.png';
import './Loading.css';

const Loading = () => {
  return (
    <Grid container xs={12} item={true} justifyContent="center" alignItems="center">
      <Grid xs={6} sx={{ mt: 5 }} item={true} textAlign="center">
        <p className="loading-text">
          <FormattedMessage
            id="loading.return-loadingText"
            defaultMessage="Please wait while we gather your results..."
          />
        </p>
        <Typography variant="body1" sx={{ mb: 2 }} className="remember-disclaimer-label">
          <FormattedMessage
            id="results.displaySubheader-loadingDisclaimerText"
            defaultMessage="Remember that we can't guarantee eligibility, but based on the information you provided,
              we believe you are likely eligible for the following programs."
          />
        </Typography>
        <img className="loading-image" src={loading} alt="loading-icon" />
      </Grid>
    </Grid>
  );
};

export default Loading;
