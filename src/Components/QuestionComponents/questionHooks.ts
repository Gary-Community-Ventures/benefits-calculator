import { useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getStepDirectory, getStepNumber, STARTING_QUESTION_NUMBER } from '../../Assets/stepDirectory';
import { isCustomTypedLocationState } from '../../Types/FormData';
import { QuestionName } from '../../Types/Questions';
import { Context } from '../Wrapper/Wrapper';

export function useShouldRedirectToConfirmation() {
  const location = useLocation();
  return isCustomTypedLocationState(location.state);
}

// routeEnding will be added to the end of the route when going to the next step
export function useGoToNextStep(questionName: QuestionName, routeEnding: string = '') {
  const { uuid } = useParams();
  const { formData } = useContext(Context);
  const stepNumber = getStepNumber(questionName, formData.immutableReferrer);
  const totalStepCount = getStepDirectory(formData.immutableReferrer).length + STARTING_QUESTION_NUMBER - 1;
  const redirectToConfirmationPage = useShouldRedirectToConfirmation();
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

    if (questionName === 'householdData' && Number(routeEnding) <= formData.householdSize) {
      navigate(`/${uuid}/step-${stepNumber}/${routeEnding}`);
      return;
    } else if (questionName === 'householdData') {
      navigate(`/${uuid}/step-${stepNumber + 1}`);
      return;
    }

    navigate(`/${uuid}/step-${stepNumber + 1}/${routeEnding}`);
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
  const { formData } = useContext(Context);
  const { uuid } = useParams();
  const navigate = useNavigate();
  const currentStepId = getStepNumber(questionName, formData.immutableReferrer);

  return () => navigate(`/${uuid}/step-${currentStepId - 1}`);
}
