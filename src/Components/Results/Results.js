import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Link, Card, CardContent, CardActions, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  postPartialParentScreen,
  postHouseholdMemberData,
  postHouseholdMemberIncomeStream,
  postHouseholdMemberExpense,
  getEligibility
} from "../../apiCalls";
import Loading from '../Loading/Loading';

const Results = ({ results, setResults, formData, programSubset, passedOrFailedTests }) => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchResults();
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
    const { agreeToTermsOfService, zipcode, householdSize, householdAssets, housing } = formData;
    const housingOptionKeys = Object.keys(housing);
    const finalHousingOption = housingOptionKeys.find(housingSituation => housing[housingSituation] === true);
    return {
      agree_to_tos: agreeToTermsOfService ,
      zipcode: zipcode,
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

  const displayProgramCards = (results, passOrFailTests) => {
    if (results.length) {
      const programCards = results.map(result => {
        return (
          <Card variant='outlined' key={result.name} sx={{marginBottom: 2}}> 
            <CardContent>    
              <Typography variant='h6'>
                {result.description_short}
              </Typography>
              <Typography 
                color='text.secondary' 
                gutterBottom >
                {result.name}
              </Typography>
              { passOrFailTests === 'passed_tests' &&
                <Typography variant='body1' gutterBottom>
                  <b>Estimated value:</b> Up to {'$' + result.estimated_value.toLocaleString()} per year. 
                  Including application and approval, the average time to acquire this benefit is {result.estimated_delivery_time}.
                </Typography>
              }
              <Typography variant='body1' gutterBottom>
                {result.description}
              </Typography>
              <Link href={result.learn_more_link}>
                Learn more
              </Link>
              <CardActions>
                <Button
                  variant='contained'
                  href={result.apply_button_link} >
                  Apply
                </Button>
              </CardActions>
            </CardContent>
            { result[passOrFailTests].length > 0 && 
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"> 
                    <Typography variant='body1'>
                      <b>Expand for eligibility details</b>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{paddingTop: 0}}>
                  { displayTestResults(result[passOrFailTests]) }
                </AccordionDetails>
              </Accordion> 
            }
          </Card>
        );
      });
      
      return programCards;
    } else {
      return (
        <Typography variant='body1' sx={{marginBottom: 2, marginTop: 2}}>
          Sorry, we were not able to find any programs for you based on the information that was provided.
        </Typography>
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

  return (
    <main className='benefits-form'>
      <div className='results-container'>
        { results.isLoading ? <Loading /> : 
          <>
            <p className='question-label underline-id'>Screener ID: {results.screenerId}</p>
            { programSubset === 'eligiblePrograms' && 
              <h2 className='sub-header'> 
                {results[programSubset].length} programs, up to ${totalDollarAmount(results[programSubset])} per year for you to look at
              </h2>
            }
            { displaySubheader(programSubset) }
            { displayProgramCards(results[programSubset], passedOrFailedTests) }
            { programSubset === 'eligiblePrograms' && 
              <Link 
                href='/ineligible-results' 
                target='_blank' 
                rel='noreferrer'
                sx={{fontSize: 18}}>
                * For additional information on programs that you were not eligible for click here.
              </Link>
            }
          </>
        }
      </div>
    </main>
  );
}

export default Results;