import { Button, Card, CardContent, CardActions, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import questions from '../../Assets/questions';

const StyledTypography = styled(Typography)`
  color: #c6252b;
  height: 24px;
`;

const Disclaimer = ({ formData, handleCheckboxChange }) => {
  const [buttonWasClicked, setButtonWasClicked] = useState(false);
  
  let navigate = useNavigate();

  const handleContinueButtonClick = (event) => {
    event.preventDefault();
    setButtonWasClicked(true);
    if (formData.agreeToTermsOfService === true) {
      navigate('/step-2');
    }
  }

  return (
    <div className='benefits-form'>
      <p className='step-progress-title'>Step 1 of { questions.length + 1 }</p>
      <h2 className='sub-header'>What you should know before we begin:</h2>
      <Card variant='outlined'>
        <CardContent>
          <Typography variant='h6'>
            Gary Community Ventures Disclaimer for Public Benefit Program Screening
          </Typography>
          <Typography variant='body1'>
            This benefit calculator is a tool that recommends public benefits programs for you to consider
            based upon information you provide about your household and Gary Philanthropy’s (“Gary”) best 
            understanding of publicly available information regarding benefits programs. Gary cannot guarantee 
            eligibility or acceptance into any program. To enroll in a benefit, you will need to apply through 
            the appropriate government agency. The administering government agency will determine final eligibility 
            upon your submission of an application for each program.

            The information you share through the public benefits screening will be kept confidential but may be shared
            with a government agency and/or the third-party organization assisting you with the benefits calculator process
            for the sole purpose of assisting with benefits applications or offering you additional free services through Gary. 
            Under no circumstances will your information be sold.

            By filling out this benefits calculator, you agree to future contact from Gary or our affiliates regarding your
            use of the benefits calculator or to offer additional programs that may be of interest to you and your family. 
            Standard message and data costs may apply to these communications, and you may opt out of receiving these communications
            at any time through the opt-out link in the communication.
          </Typography>
        </CardContent>  
      </Card>
      <Typography 
        color='text.secondary' 
        gutterBottom >
        Check the box below and then click the button to get started.
      </Typography>
      { buttonWasClicked && formData.agreeToTermsOfService === false && <StyledTypography> Please check the box below to continue. </StyledTypography> || <StyledTypography></StyledTypography> }
      <FormControlLabel 
        control={<Checkbox checked={formData.agreeToTermsOfService} onChange={handleCheckboxChange} />}  
        label='I have read, understand, and agree to the terms of the Gary Disclaimer and consent to contact above.'
        value='agreeToTermsOfService' />
      <CardActions>
        <Button
          variant='contained'
          onClick={(event) => handleContinueButtonClick(event)} >
          Continue
        </Button>
      </CardActions>
    </div>
  );
}

export default Disclaimer;