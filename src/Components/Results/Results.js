import { useEffect, useState } from 'react';
import { Button, Link, Card, CardContent, CardActions, Typography } from "@mui/material";
import {
  postPartialParentScreen,
  postHouseholdMemberData,
  postHouseholdMemberIncomeStream,
  postHouseholdMemberExpense,
  getEligibility
} from "../../apiCalls";

const Results = ({ formData }) => {
  const [results, setResults] = useState([]);
  
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
    setResults(eligibilityResponse);
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

  const displayProgramCards = (results) => {
    const programCards = Object.keys(results).map(result => {
      return (
        <Card variant='outlined' key={results[result].name}>
          <CardContent>    
            <Typography variant='h6'>
              {results[result].description_short}
            </Typography>
            <Typography 
              color='text.secondary' 
              gutterBottom >
              {results[result].name}
            </Typography>
            <Typography variant='body1' gutterBottom>
              {results[result].description}
            </Typography>
            <Typography variant='body1' gutterBottom>
              <b>Estimated value:</b> Up to {'$' + results[result].estimated_value} is dispersed within {results[result].estimated_delivery_time} of agency approval.
            </Typography>
            <Link href={results[result].learn_more_link}>
              Learn more
            </Link>
            <CardActions>
              <Button
                variant='contained'
                href={results[result].apply_button_link} >
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
        <h2 className='sub-header'> {results && results.length} programs for you to look at.</h2>
        <p className='question-label'>Remember that we can’t guarantee eligibility, but can only recommend programs for you to consider.</p>
        {results && displayProgramCards(results)}
      </div>
    </main>
  );
}

export default Results;