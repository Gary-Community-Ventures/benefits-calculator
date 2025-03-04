import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ALL_VALID_WHITE_LABELS, WhiteLabel } from '../../Types/WhiteLabel';
import { useQueryString } from '../QuestionComponents/questionHooks';
import { useUpdateWhiteLabelAndNavigate } from './RedirectToWhiteLabel';

// route the path /:whiteLabel to /:whiteLabel/step-1
export default function WhiteLabelRouter() {
  const { whiteLabel } = useParams();
  const query = useQueryString();
  const navigate = useNavigate();
  const updateWhiteLabelAndNavigate = useUpdateWhiteLabelAndNavigate();

  useEffect(() => {
    if (whiteLabel === undefined || !ALL_VALID_WHITE_LABELS.includes(whiteLabel as WhiteLabel)) {
      navigate(`/step-1${query}`, { replace: true });
      return;
    }

    updateWhiteLabelAndNavigate(whiteLabel, `step-1${query}`, true);
  }, []);

  return null;
}
