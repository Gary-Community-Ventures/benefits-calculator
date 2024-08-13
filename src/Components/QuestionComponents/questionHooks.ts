import { useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getStepDirectory, getStepNumber, STARTING_QUESTION_NUMBER } from '../../Assets/stepDirectory';
import { isCustomTypedLocationState } from '../../Types/FormData';
import { QuestionName } from '../../Types/Questions';
import { Context } from '../Wrapper/Wrapper';

// noRedirect will not reroute to the confirmation page
// routeEnding will be added to the end of the route when going to the next step
export function useGoToNextStep(questionName: QuestionName, noRedirect: boolean = false, routeEnding: string = '') {
  const { uuid } = useParams();
  const { formData } = useContext(Context);
  const stepNumber = getStepNumber(questionName, formData.immutableReferrer);
  const totalStepCount = getStepDirectory(formData.immutableReferrer).length + STARTING_QUESTION_NUMBER - 1;
  const location = useLocation();

  const redirectToConfirmationPage = !noRedirect && isCustomTypedLocationState(location.state);

  const navigate = useNavigate();

  return () => {
    if (redirectToConfirmationPage) {
      navigate(`/${uuid}/confirm-information`);
      return;
    }

    if (stepNumber === totalStepCount) {
      navigate(`/${uuid}/confirm-information`);
      return;
    }

    navigate(`/${uuid}/step-${stepNumber + 1}/${routeEnding}`);
  };
}
