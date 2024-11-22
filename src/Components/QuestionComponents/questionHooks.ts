import { useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { STARTING_QUESTION_NUMBER, useStepDirectory, useStepNumber } from '../../Assets/stepDirectory';
import { isCustomTypedLocationState } from '../../Types/FormData';
import { QuestionName } from '../../Types/Questions';
import { Context } from '../Wrapper/Wrapper';

export function useShouldRedirectToConfirmation() {
  const location = useLocation();
  return isCustomTypedLocationState(location.state);
}

// routeEnding will be added to the end of the route when going to the next step
export function useGoToNextStep(questionName: QuestionName, routeEnding: string = '') {
  const { whiteLabel, uuid } = useParams();
  const stepNumber = useStepNumber(questionName);
  const stepDirectory = useStepDirectory();
  const totalStepCount = stepDirectory.length + STARTING_QUESTION_NUMBER - 1;
  const redirectToConfirmationPage = useShouldRedirectToConfirmation();
  const navigate = useNavigate();

  return () => {
    if (redirectToConfirmationPage) {
      navigate(`/${whiteLabel}/${uuid}/confirm-information`);
      return;
    }

    if (stepNumber === totalStepCount) {
      navigate(`/${whiteLabel}/${uuid}/confirm-information`);
      return;
    }

    navigate(`/${whiteLabel}/${uuid}/step-${stepNumber + 1}/${routeEnding}`);
  };
}

export function useQueryString() {
  const { formData } = useContext(Context);
  const query = new URLSearchParams();

  if (formData.externalID !== undefined) {
    query.append('externalid', formData.externalID);
  }

  if (formData.immutableReferrer !== undefined && formData.immutableReferrer !== '') {
    query.append('referrer', formData.immutableReferrer);
  }

  let queryString = query.toString();
  if (queryString !== '') {
    queryString = '?' + queryString;
  }

  return queryString;
}

export function useDefaultBackNavigationFunction(questionName: QuestionName) {
  const { whiteLabel, uuid } = useParams();
  const navigate = useNavigate();
  const currentStepId = useStepNumber(questionName);

  return () => navigate(`/${whiteLabel}/${uuid}/step-${currentStepId - 1}`);
}
