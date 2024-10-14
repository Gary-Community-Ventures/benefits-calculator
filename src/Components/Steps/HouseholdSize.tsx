import { TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Context } from "../Wrapper/Wrapper";
import { useContext } from "react";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessageWrapper from "../ErrorMessage/ErrorMessageWrapper";
import { FormattedMessage, useIntl } from "react-intl";
import { getQuestion, getStepNumber } from "../../Assets/stepDirectory";
import QuestionHeader from "../QuestionComponents/QuestionHeader";
import QuestionQuestion from "../QuestionComponents/QuestionQuestion";
import PrevAndContinueButtons from "../PrevAndContinueButtons/PrevAndContinueButtons";
import { useNavigate, useParams } from "react-router-dom";
import { updateScreen } from "../../Assets/updateScreen";
import { useGoToNextStep } from "../QuestionComponents/questionHooks";

const HouseholdSize = () => {
  const { formData, setFormData, locale } = useContext(Context);
  const { uuid } = useParams();
  const navigate = useNavigate();
  const currentStepId = getStepNumber('householdSize', formData.immutableReferrer);
  const matchingQuestion = getQuestion(currentStepId, formData.immutableReferrer);
  const backNavigationFunction = () => navigate(`/${uuid}/step-${currentStepId - 1}`);
  const nextStep = useGoToNextStep('householdSize');
  const intl = useIntl();
  const requiredErrorProps = {
    id: "hhSize.requiredError",
    defaultMsg: "Household size is required"
  }
  const invalidTypeErrorProps = {
    id: "hhSize.invalidTypeError",
    defaultMsg: "Household size must be a number"
  }

  const formSchema = z.object({ householdSize: z.coerce.number({required_error: intl.formatMessage(requiredErrorProps), invalid_type_error: intl.formatMessage(invalidTypeErrorProps)}).positive().lte(8)})
  const { control, formState: { errors }, handleSubmit, } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      householdSize: formData.householdSize ?? 0,
    }
  });

  const formSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (householdSizeData) => {
    if (uuid) {
      const updatedFormData = { ...formData, ...householdSizeData };
      setFormData(updatedFormData);
      await updateScreen(uuid, updatedFormData, locale);
      nextStep();
    }
  }

  const displayHouseholdSizeHelperText = (hasHouseholdSizeErrors: boolean, errorMessage:string | undefined) => {
    if (!hasHouseholdSizeErrors) return '';
    return (
      <ErrorMessageWrapper fontSize="1rem">
        {errorMessage}
      </ErrorMessageWrapper>
    );
  };

  return (
    <div>
      <QuestionHeader>{matchingQuestion.header}</QuestionHeader>
      <QuestionQuestion>{matchingQuestion.question}</QuestionQuestion>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Controller
          name="householdSize"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label={<FormattedMessage id="questions.householdSize-inputLabel" defaultMessage="Household Size" />}
              variant="outlined"
              error={errors.householdSize !== undefined}
              helperText={displayHouseholdSizeHelperText(errors.householdSize !== undefined, errors.householdSize?.message)}
            />
          )}
        />
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
    </div>
  );
}

export default HouseholdSize;