import { Button, Card, CardContent, CardActions, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import { FormattedMessage } from 'react-intl';
import PreviousButton from '../PreviousButton/PreviousButton';
import { updateScreen } from '../../Assets/updateScreen';
import './Disclaimer.css';
import ErrorMessageWrapper from '../ErrorMessage/ErrorMessageWrapper.tsx';

const Disclaimer = ({ handleCheckboxChange }) => {
  const { uuid } = useParams();
  const [buttonWasClicked, setButtonWasClicked] = useState(false);
  let navigate = useNavigate();
  const { locale, formData } = useContext(Context);

  const handleContinueButtonClick = (event) => {
    event.preventDefault();
    setButtonWasClicked(true);
    if (formData.agreeToTermsOfService === true) {
      updateScreen(uuid, formData, locale.toLowerCase());
      navigate(`/${uuid}/step-2`);
    }
  };

  useEffect(() => {
    const continueOnEnter = (event) => {
      if (event.key === 'Enter') {
        handleContinueButtonClick(event);
      }
    };
    document.addEventListener('keyup', continueOnEnter);
    return () => {
      document.removeEventListener('keyup', continueOnEnter); // remove event listener on onmount
    };
  });

  return (
    <main className="benefits-form">
      <h1 className="sub-header">
        <FormattedMessage id="disclaimer.header" defaultMessage="What you should know: " />
      </h1>
      <Card variant="outlined">
        <CardContent>
          <h2 className="disclaimer-header">
            <FormattedMessage id="disclaimer.sub-header" defaultMessage="Gary Philanthropy Disclaimer" />
          </h2>
          <Typography variant="body1">
            <FormattedMessage
              id="disclaimer.body"
              defaultMessage="This benefit calculator is a tool that recommends public benefits programs
              for you to consider based upon information you provide about your household and Gary Philanthropy’s
              (“Gary”) best understanding of publicly available information regarding benefits programs.
              Gary cannot guarantee eligibility or acceptance into any program. To enroll in a benefit,
              you will need to apply through the appropriate government agency. The administering government agency
              will determine final eligibility upon your submission of an application for each program.
              The information you share through the public benefits screening will be kept confidential but may be
              shared with a government agency and/or the third-party organization assisting you with the benefits
              calculator process for the sole purpose of assisting with benefits applications or offering you
              additional free services through Gary. Under no circumstances will your information be sold.
              By filling out this benefits calculator, you agree to future contact from Gary or our affiliates
              regarding your use of the benefits calculator or to offer additional programs that may be of interest
              to you and your family. Standard message and data costs may apply to these communications.
              You may opt out of receiving these communications at any time through the opt-out link in the communication."
            />
          </Typography>
        </CardContent>
      </Card>
      <Typography color="text.secondary" className="top-bottom-margin">
        <FormattedMessage
          id="disclaimer.helper-text"
          defaultMessage="Check the box below and then click the Continue button to get started."
        />
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.agreeToTermsOfService}
            onChange={handleCheckboxChange}
            sx={buttonWasClicked && !formData.agreeToTermsOfService ? { color: '#c6252b' } : {}}
          />
        }
        onClick={handleCheckboxChange}
        label={
          <FormattedMessage
            id="disclaimer-label"
            defaultMessage="I have read, understand, and agree to the terms of the Gary Disclaimer and consent to contact above."
          />
        }
        value="agreeToTermsOfService"
      />
      {buttonWasClicked && formData.agreeToTermsOfService === false && (
        <ErrorMessageWrapper fontSize="1.2rem">
          <FormattedMessage id="disclaimer.error" defaultMessage="Please check the box to continue." />
        </ErrorMessageWrapper>
      )}
      <CardActions sx={{ mt: '1rem', ml: '-.5rem' }}>
        <PreviousButton />
        <Button variant="contained" onClick={(event) => handleContinueButtonClick(event)}>
          <FormattedMessage id="continue-button" defaultMessage="Continue" />
        </Button>
      </CardActions>
    </main>
  );
};

export default Disclaimer;
