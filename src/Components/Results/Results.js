import { Button, Link, Card, CardContent, CardActions, Typography } from "@mui/material";
import programs from '../../Assets/programOptions';

const Results = () => {
  const displayProgramCards = () => {
    const programCards = Object.keys(programs).map(program => {
      return (
        <Card variant='outlined' key={programs[program].programName}>
          <CardContent>    
            <Typography variant='h6'>
              {programs[program].programSnapshot}
            </Typography>
            <Typography 
              color='text.secondary' 
              gutterBottom >
              {programs[program].programName}
            </Typography>
            <Typography variant='body1'>
              {programs[program].programDescription}
            </Typography>
            <Typography variant='body1'>
              Estimated value up to {programs[program].dollarValue} is dispersed within {programs[program].estimatedDeliveryTime} of agency approval.
            </Typography>
            { programs[program].legalStatusRequired &&
              <Typography variant='body1'>
                *Must be a legal resident or citizen in order to qualify.
              </Typography>
            }
            <Link href={programs[program].learnMoreLink}>
              Learn more
            </Link>
            <CardActions>
              <Button
                variant='contained'
                href={programs[program].applyButtonLink} >
                Apply
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      );
    });

    return programCards;
  }

  return (
    <main className='benefits-form'>
      <div className='results-container'>
        <h2 className='sub-header'># programs for you to look at.</h2>
        <p className='question-label'>Remember that we can’t guarantee eligibility, but can only recommend programs for you to consider.</p>
        {displayProgramCards()}
      </div>
    </main>
  );
}

export default Results;