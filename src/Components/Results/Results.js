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
  const [results, setResults] = useState();
  
  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const screensBody = getScreensBody(formData);
    const screensResponse = await postPartialParentScreen(screensBody);
    
    const householdMembersBodies = getHouseholdMembersBodies(formData, screensResponse.id);
    householdMembersBodies.forEach(async (householdMembersBody) => {
      const householdMembersResponse = await postHouseholdMemberData(householdMembersBody);

      const incomeStreamsBodies = getIncomeStreamsBodies(householdMembersBody, householdMembersResponse.id);
      incomeStreamsBodies.forEach(async (incomeStreamsBody) => {
        await postHouseholdMemberIncomeStream(incomeStreamsBody);
      });
      
      const expensesBodies = getExpensesBodies(householdMembersBody, householdMembersResponse.id);
      expensesBodies.forEach(async (expensesBody) => {
        await postHouseholdMemberExpense(expensesBody);
      });
    });

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
    const { agreeToTermsOfService, zipcode, householdSize, householdAssets, housing } = formData;
    const housingOptionKeys = Object.keys(housing);
    const finalHousingOption = housingOptionKeys.find(housingSituation => housing[housingSituation] === true);
    const headOfHHScreen = {
      agree_to_tos: agreeToTermsOfService ,
      zipcode: zipcode,
      household_size: householdSize,
      household_assets: householdAssets,
      housing_situation: finalHousingOption
    };

    return postPartialParentScreen(headOfHHScreen)
      .then(response => {
        const screenerDataId = response.id;
        return postAllHouseholdDataInformation(screenerDataId);
      })
  }

  const postAllHouseholdDataInformation = (screenerDataId) => {
    const headOfHouseholdData = getHeadOfHHData(screenerDataId);
    const remainingHouseholdMemberData = getRemainingHouseholdMemberData(screenerDataId);
    const allHouseholdData = [headOfHouseholdData, ...remainingHouseholdMemberData];
    const allPromises = [];
    let allResponses = [];
    
    allHouseholdData.forEach(personData => {
      const responsePromise = postHouseholdMemberData(personData);
      allPromises.push(responsePromise);
    });

    return Promise.all(allPromises)
      .then(data => {
        allResponses = data;
        console.log({allResponses})
        return allResponses;
      });
  }

  const getHeadOfHHData = (screenerDataId) => {
    const { applicantAge, student, studentFulltime, pregnant, unemployed,
      unemployedWorkedInLast18Mos, blindOrVisuallyImpaired, disabled, veteran, medicaid, 
      disabilityRelatedMedicaid, hasIncome, hasExpenses, incomeStreams, expenses } = formData;
    
    const headOfhouseholdInformation = {
      screen: screenerDataId,
      relationship: 'headOfHousehold',
      age: Number(applicantAge),
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
      has_expenses: hasExpenses
    };
    
    return headOfhouseholdInformation;
  }

  const getRemainingHouseholdMemberData = (screenerDataId) => {
    const householdMemberData = formData.householdData.map(personData => {
      const { age, student, studentFulltime, pregnant, unemployed,
        unemployedWorkedInLast18Mos, blindOrVisuallyImpaired, disabled, veteran, medicaid, 
        disabilityRelatedMedicaid, hasIncome, hasExpenses, relationshipToHH } = personData;

      const memberData = {
        screen: screenerDataId,
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
        has_expenses: hasExpenses
      };

      return memberData;
    });
    
    return householdMemberData;
  }

  const displayProgramCards = () => {
    postScreenerToApi();
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