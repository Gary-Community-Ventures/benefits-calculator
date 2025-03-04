import { Navigate, useParams } from 'react-router-dom';
import { ALL_VALID_WHITE_LABELS, WhiteLabel } from '../../Types/WhiteLabel';
import { useQueryString } from '../QuestionComponents/questionHooks';

// route the path /:whiteLabel to /:whiteLabel/step-1
export default function WhiteLabelRouter() {
  const { whiteLabel } = useParams();
  const query = useQueryString();

  if (whiteLabel === undefined || !ALL_VALID_WHITE_LABELS.includes(whiteLabel as WhiteLabel)) {
    return <Navigate to={`/step-1${query}`} replace />;
  }

  return <Navigate to={`step-1${query}`} replace />;
}
