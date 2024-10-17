import { FormattedMessage } from "react-intl";
import QuestionHeader from "../../QuestionComponents/QuestionHeader";
import HHMSummaryCards from "./HHMSummaryCards";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../Wrapper/Wrapper";
import { useContext, useState } from "react";
import { HouseholdData } from "../../../Types/FormData";
import { Box } from "@mui/material";
import AgeInput from "../../HouseholdDataBlock/AgeInput";
import QuestionQuestion from "../../QuestionComponents/QuestionQuestion";
import { getStepNumber } from "../../../Assets/stepDirectory";
import '../../HouseholdDataBlock/HouseholdDataBlock.css';
import * as z from "zod";

const HouseholdMemberForm = () => {
  const {formData, setFormData, locale} = useContext(Context);
  const { uuid, page } = useParams();
  const navigate = useNavigate();
  const pageNumber = Number(page);
  const currentStepId = getStepNumber('householdData', formData.immutableReferrer);
  const backNavigationFunction = (uuid:string, currentStepId:number, pageNumber:number) => {
    const setPage = (uuid:string, currentStepId:number, pageNumber:number) => {
      navigate(`/${uuid}/step-${currentStepId}/${pageNumber}`);
    };

    if (pageNumber <= 1) {
      navigate(`/${uuid}/step-${currentStepId - 1}`);
    } else {
      setPage(uuid, currentStepId, pageNumber - 1);
    }
  };


//TODO: 
  const date = new Date();
  const CURRENT_YEAR = date.getFullYear();
  // the getMonth method returns January as 0
  const CURRENT_MONTH = date.getMonth() + 1;
  const MAX_AGE = 130;
  // birthYear > CURRENT_YEAR || birthYear < CURRENT_YEAR - MAX_AGE;

  const formSchema = z.object({birthYear, birthMonth})

  //page => pageNumber

  const initialMemberData = formData.householdData[pageNumber - 1] ?? {
    birthYear: undefined,
    birthMonth: undefined,
    // relationshipToHH: pageNumber === 1 ? 'headOfHousehold' : '',
    // conditions: {
    //   student: false,
    //   pregnant: false,
    //   blindOrVisuallyImpaired: false,
    //   disabled: false,
    //   longTermDisability: false,
    // },
    // hasIncome: false,
    // incomeStreams: [],
    // healthInsurance: {
    //   none: false,
    //   employer: false,
    //   private: false,
    //   medicaid: false,
    //   medicare: false,
    //   chp: false,
    //   emergency_medicaid: false,
    //   family_planning: false,
    //   va: false,
    // },
  };

  const [memberData, setMemberData] = useState<HouseholdData>(initialMemberData);

  const createAgeQuestion = (personIndex:number) => {
    const birthMonth = memberData.birthMonth ?? null;
    const birthYear = memberData.birthYear ?? null;
    const setBirthMonth = (month:number|null) => {
      setMemberData({ ...memberData, birthMonth: month ?? undefined });
    };
    const setBirthYear = (year:number|null) => {
      setMemberData({ ...memberData, birthYear: year ?? undefined });
    };

    if (personIndex === 1) {
      return (
        <Box sx={{ marginBottom: '1.5rem' }}>
          <QuestionQuestion>
            <FormattedMessage
              id="householdDataBlock.createAgeQuestion-how-headOfHH"
              defaultMessage="Please enter your month and year of birth"
            />
          </QuestionQuestion>
          <AgeInput
            birthMonth={birthMonth}
            birthYear={birthYear}
            setBirthMonth={setBirthMonth}
            setBirthYear={setBirthYear}
          />
        </Box>
      );
    } else {
      return (
        <Box sx={{ marginBottom: '1.5rem' }}>
          <QuestionQuestion>
            <FormattedMessage
              id="householdDataBlock.createAgeQuestion-how"
              defaultMessage="Please enter their month and year of birth"
            />
          </QuestionQuestion>
          <AgeInput
            birthMonth={birthMonth}
            birthYear={birthYear}
            setBirthMonth={setBirthMonth}
            setBirthYear={setBirthYear}
          />
        </Box>
      );
    }
  };

  return (
    <main className="benefits-form">
      <QuestionHeader>
        {pageNumber === 1 ? (
          <FormattedMessage id="householdDataBlock.questionHeader" defaultMessage="Tell us about yourself." />
        ) : (
          <FormattedMessage
            id="questions.householdData"
            defaultMessage="Tell us about the next person in your household."
          />
        )}
      </QuestionHeader>
      <HHMSummaryCards activeMemberData={memberData} page={pageNumber} formData={formData} />
      <form onSubmit={handleSubmit()}>
        {createAgeQuestion(pageNumber)}
      </form>
    </main>
  );
}

export default HouseholdMemberForm;
