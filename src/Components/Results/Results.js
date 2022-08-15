import { useEffect } from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Link, Card, CardContent, CardActions, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import {
  postPartialParentScreen,
  postHouseholdMemberData,
  postHouseholdMemberIncomeStream,
  postHouseholdMemberExpense,
  getEligibility
} from "../../apiCalls";
import Loading from '../Loading/Loading';
import './Results.css';

const Results = ({ results, setResults, formData, programSubset, passedOrFailedTests }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (results.screenerId === 0) {
      fetchResults();
    }
  }, []);

  const fetchResults = async () => {
    const screensBody = getScreensBody(formData);
    const screensResponse = await postPartialParentScreen(screensBody);
    const householdMembersBodies = getHouseholdMembersBodies(formData, screensResponse.id);
    for (const householdMembersBody of householdMembersBodies) {
      const householdMembersResponse = await postHouseholdMemberData(householdMembersBody);

      const incomeStreamsBodies = getIncomeStreamsBodies(householdMembersBody, householdMembersResponse.id);
      for (const incomeStreamsBody of incomeStreamsBodies) {
        await postHouseholdMemberIncomeStream(incomeStreamsBody);
      }
      
      const expensesBodies = getExpensesBodies(householdMembersBody, householdMembersResponse.id);
      for (const expensesBody of expensesBodies) {
        await postHouseholdMemberExpense(expensesBody);
      }
    }

    const eligibilityResponse = await getEligibility(screensResponse.id);

    const qualifiedPrograms = eligibilityResponse.filter((program) => program.eligible === true)
      .sort((benefitA, benefitB) => benefitB.estimated_value - benefitA.estimated_value);
    const unqualifiedPrograms = eligibilityResponse.filter((program) => program.eligible === false);

    setResults({ 
      eligiblePrograms: qualifiedPrograms, 
      ineligiblePrograms: unqualifiedPrograms, 
      screenerId: screensResponse.id, 
      isLoading: false 
    });
  }

  const getScreensBody = (formData) => {
    const { agreeToTermsOfService, zipcode, householdSize, householdAssets, housing, startTime, isTest } = formData;
    const housingOptionKeys = Object.keys(housing);
    const finalHousingOption = housingOptionKeys.find(housingSituation => housing[housingSituation] === true);
    return {
      is_test: isTest,
      agree_to_tos: agreeToTermsOfService,
      zipcode: zipcode,
      start_date: startTime,
      household_size: householdSize,
      household_assets: householdAssets,
      housing_situation: finalHousingOption
    };
  };

  const getHouseholdMembersBodies = (formData, screensId) => {
    const headOfHousehold = getHouseholdMemberBody(formData, 'headOfHousehold', screensId);
    const otherHouseholdMembers = formData.householdData.map(otherMember => {
      return getHouseholdMemberBody(otherMember, otherMember.relationshipToHH, screensId);
    });
    return [headOfHousehold, ...otherHouseholdMembers];
  };

  const getHouseholdMemberBody = (formData, relationshipToHH, screensId) => {
    const { age, student, studentFulltime, pregnant, unemployed,
      unemployedWorkedInLast18Mos, blindOrVisuallyImpaired, disabled, veteran, medicaid, 
      disabilityRelatedMedicaid, hasIncome, hasExpenses, incomeStreams, expenses } = formData;
    
    return {
      screen: screensId,
      relationship: relationshipToHH,
      age: Number(age),
      student: student,
      student_full_time: studentFulltime,
      pregnant: pregnant,
      unemployed: unemployed,
      worked_in_last_18_mos: unemployedWorkedInLast18Mos,
      visually_impaired: blindOrVisuallyImpaired,
      disabled: disabled,
      veteran: veteran,
      medicaid: medicaid,
      disability_medicaid: disabilityRelatedMedicaid,
      has_income: hasIncome,
      has_expenses: hasExpenses,
      income_streams: incomeStreams,
      expenses: expenses
    };
  };

  const getIncomeStreamsBodies = (householdMemberBody, householdMemberId) => {
    return householdMemberBody.income_streams.map(incomeStream => {
      return {
        type: incomeStream.incomeStreamName,
        amount: incomeStream.incomeAmount,
        frequency: incomeStream.incomeFrequency,
        screen: householdMemberBody.screen,
        household_member: householdMemberId
      };
    });
  }

  const getExpensesBodies = (householdMemberBody, householdMemberId) => {
    return householdMemberBody.expenses.map(expense => {
      return {
        type: expense.expenseSourceName,
        amount: expense.expenseAmount,
        frequency: expense.expenseFrequency,
        screen: householdMemberBody.screen,
        household_member: householdMemberId
      };
    });
  }

  const totalDollarAmount = (results) => {
    const total = results.reduce((total, program) => {
      total += program.estimated_value;
      return total;
    }, 0);
    
    return total.toLocaleString();
  }

  const displayTestResults = (tests) => {
    if (tests.length) {
      return ( 
        <>
          { tests.map(testResult => {
              return <li key={testResult}>{testResult}</li>
            })
          }
        </>
      );
    }
  }

  const displaySubheader = (benefitsSubset) => {
    if (benefitsSubset === 'eligiblePrograms') {
      return (
        <p className='remember-disclaimer-label'>Remember that we can't guarantee eligibility, 
          but based on the information you provided, we believe you are likely eligible for the programs below:
        </p>
      );
    } else if (benefitsSubset === 'ineligiblePrograms') {
      return (
        <p className='remember-disclaimer-label'>Based on the information you provided, we believe 
          you are likely <b>not eligible</b> for the programs below:
        </p>
      );
    }
  }

  const resultsTable = (results) => {
    if (results.length) {
      return (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>Benefit</TableCell>
                <TableCell align="right">Value</TableCell>
                <TableCell align="right">Time to Receipt</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map(row => (
                <ResultsRow key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } else {
      return (
        <Typography variant='body1' sx={{marginBottom: 2, marginTop: 2}}>
          Sorry, we were not able to find any programs for you based on the information that was provided.
        </Typography>
      );
    }
  }
  
  const ResultsRow = (row) => {
    const [open, setOpen] = useState(false);
    let benefit = row.row

    switch(benefit.value_type) {
      case 'non-discretionary':
        benefit.value_type = 'reduced expenses';
        break;
      case 'unrestricted':
        benefit.value_type = 'cash';
        break;
      case 'discretionary':
        benefit.value_type = 'reduced cost services';
        break;
    }

    return (
      <Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell component="th" scope="row">
            <Link onClick={() => setOpen(!open)}>
              {benefit.name}
            </Link>
          </TableCell>
          <TableCell align="right">
            {'$' + benefit.estimated_value.toLocaleString()}
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              {benefit.value_type}
            </Typography>
          </TableCell>
          <TableCell align="right">{benefit.estimated_delivery_time}</TableCell>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ m: 2 }}>
                <Typography variant='body1' gutterBottom>
                  {benefit.description}
                </Typography>
                <Button
                  variant='contained'
                  target="_blank"
                  href={benefit.apply_button_link} >
                  Apply
                </Button>
                
                { (benefit.passed_tests.length > 0 || benefit.failed_tests.length > 0)  && 
                  <Accordion sx={{ m: 2 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"> 
                        <Typography variant='body2'>
                          <Link>Expand for eligibility details</Link>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{paddingTop: 0}}>
                      { displayTestResults(benefit.passed_tests) }
                      { displayTestResults(benefit.failed_tests) }
                    </AccordionDetails>
                  </Accordion> 
                }
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  }

  return (
    <main className='benefits-form'>
      <div className='results-container'>
        <Grid container spacing={2}>
          { results.isLoading ? 
            <Grid container xs={12} justifyContent="center" alignItems="center">
              <Grid item xs={6} sx={{mt: 5}}>
                <Loading />
              </Grid>
            </Grid> : 
            <>
              <Grid xs={12}>
                <p className='question-label underline-id'>Screener ID: {results.screenerId}</p>
              </Grid>
              { programSubset === 'eligiblePrograms' && 
                <>
                <Grid xs={12}>
                  <h2 className='sub-header'> 
                    {results[programSubset].length} programs, up to ${totalDollarAmount(results[programSubset])} per year for you to look at
                  </h2>
                </Grid>
                </>
              }
              <Grid xs={12} sm={8}>
                { displaySubheader(programSubset) }
              </Grid>
              <Grid xs={12} sm={4} container justifyContent="flex-end">
                <Button
                  sx={{mb: 5}}
                  variant='contained'
                  endIcon={<SendIcon />}
                  onClick={() => {
                    navigate('/email-results');
                  }}
                  className='ineligibility-link'>
                    Email Results
                </Button>
              </Grid>
              <Grid xs={12}>
                { resultsTable(results[programSubset])}
              </Grid>
              <Grid xs={12}>
                { programSubset === 'eligiblePrograms' && 
                  <Typography
                    sx={{mt: 2}}
                    onClick={() => {
                      navigate('/ineligible-results');
                      window.scrollTo(0,0);
                    }}
                    className='ineligibility-link'>
                    * For additional information on programs that you were not eligible for click here
                  </Typography> 
                }
                { programSubset === 'ineligiblePrograms' && 
                  <Typography
                    sx={{mt: 2}}
                    onClick={() => {
                      navigate('/results');
                      window.scrollTo(0,0);
                    }}
                    className='ineligibility-link'>
                    Go back to eligible programs
                  </Typography> 
                }
              </Grid>
            </>
          }
        </Grid>
      </div>
    </main>
  );
}

export default Results;
