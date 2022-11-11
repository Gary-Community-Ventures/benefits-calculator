import { Button, Card, CardContent, CardActions, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import questions from '../../Assets/questions';

const StyledTypography = styled(Typography)`
  color: #c6252b;
  height: 24px;
`;

const Disclaimer = ({ formData, handleCheckboxChange, handleStartOverButtonClick }) => {
  const [buttonWasClicked, setButtonWasClicked] = useState(false);
  
  let navigate = useNavigate();

  const handleContinueButtonClick = (event) => {
    event.preventDefault();
    setButtonWasClicked(true);
    if (formData.agreeToTermsOfService === true) {
      navigate('/step-2');
    }
  }

  const formIsPartiallyCompleted = () => {
    return formData.age !== '';
  }

  return (
    <div className='benefits-form'>
      <p className='step-progress-title'>
        <FormattedMessage
          id='disclaimer.step-header'
          defaultMessage='Step 1 of ' />
          { questions.length + 2 }
      </p>
      <h2 className='sub-header'>
        <FormattedMessage
          id='disclaimer.header'
          defaultMessage='What you should know before we begin: ' />
      </h2>
      <Card variant='outlined'>
        <CardContent>
          <Typography variant='h6'>
            <FormattedMessage 
              id='disclaimer.sub-header'
              defaultMessage='Gary Philanthropy Disclaimer' />
          </Typography>
          <Typography variant='body1'>
            <FormattedMessage
              id='disclaimer.body'
              defaultMessage='This benefit calculator is a tool that recommends public benefits programs 
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
              You may opt out of receiving these communications at any time through the opt-out link in the communication.' />
          </Typography>
        </CardContent>  
      </Card>
      <Typography 
        color='text.secondary'>
          <FormattedMessage 
            id='disclaimer.helper-text' 
            defaultMessage='Check the box below and then click the button to get started.'
          />
      </Typography>
      { buttonWasClicked && formData.agreeToTermsOfService === false && 
        <StyledTypography> 
          <FormattedMessage
            id='disclaimer.error'
            defaultMessage='Please check the box below to continue.' />
        </StyledTypography> 
      || 
        <StyledTypography /> 
      }
      <FormControlLabel 
        control={<Checkbox checked={formData.agreeToTermsOfService} onChange={handleCheckboxChange} />}  
        label={<FormattedMessage 
          id='disclaimer-label'
          defaultMessage='I have read, understand, and agree to the terms of the Gary Disclaimer and consent to contact above.' />}
        value='agreeToTermsOfService' 
        sx={{ mt: '-.5rem' }}/>
      <CardActions sx={{ mt: '1rem' }}>
        { formIsPartiallyCompleted() &&
          <Button
            sx={{ mr: '2.25rem', ml: '-.5rem'}}
            variant='contained'
            onClick={(event) => handleStartOverButtonClick(event)} >
              <FormattedMessage
                id='startOver-button'
                defaultMessage='Start Over' />
          </Button>
        }
        <Button
          variant='contained'
          onClick={(event) => handleContinueButtonClick(event)} >
            <FormattedMessage
              id='continue-button'
              defaultMessage='Continue' />
        </Button>
      </CardActions>
    </div>
  );
}

export default Disclaimer;