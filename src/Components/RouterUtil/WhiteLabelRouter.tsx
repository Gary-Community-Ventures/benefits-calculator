import { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ALL_VALID_WHITE_LABELS, WhiteLabel } from '../../Types/WhiteLabel';
import { useQueryString } from '../QuestionComponents/questionHooks';
import { Context } from '../Wrapper/Wrapper';

// route the path /:whiteLabel to /:whiteLabel/step-1
export default function WhiteLabelRouter() {
  const { setWhiteLabel } = useContext(Context);
  const { whiteLabel } = useParams();
  const query = useQueryString();

  if (whiteLabel === undefined || !ALL_VALID_WHITE_LABELS.includes(whiteLabel as WhiteLabel)) {
    return <Navigate to={`/step-1${query}`} replace />;
  }

  setWhiteLabel(whiteLabel);
  return <Navigate to={`step-1${query}`} replace />;
}
