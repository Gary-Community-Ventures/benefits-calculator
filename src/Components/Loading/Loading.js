import { FormattedMessage } from 'react-intl';
import { Button, Link, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import loading from '../../Assets/loading-icon.png';
import './Loading.css';

const Loading = () => {
  return (
    <div className='loading-container'>
      <p className='loading-text'>
        <FormattedMessage 
          id='loading.return-loadingText' 
          defaultMessage='Please wait while we gather your results...' />
      </p>
      <Typography variant='body1' sx={{mb: 2}} className='remember-disclaimer-label'>
          <FormattedMessage 
            id='results.displaySubheader-loadingDisclaimerText' 
            defaultMessage="Remember that we can't guarantee eligibility, but based on the information you provided, 
            we believe you are likely eligible for the following programs." />

        </Typography>
      <img 
        className='loading-image'
        src={loading}
        alt='loading-icon'
      />
    </div>
  );
}

export default Loading;