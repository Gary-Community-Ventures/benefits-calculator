import { useEffect, useContext, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getScreen } from '../../apiCalls';
import { Context } from '../Wrapper/Wrapper';
import LoadingPage from '../LoadingPage/LoadingPage';
import type { ApiFormData, ApiFormDataReadOnly } from '../../Types/ApiFormData';
import { useUpdateFormData } from './manageFormData';

const FetchScreen = () => {
  const { setScreenLoading, setWhiteLabel } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const { uuid: rawUuid, whiteLabel: rawWhiteLabel } = useParams();
  const updateFormData = useUpdateFormData();

  const { uuid, whiteLabel } = useMemo(() => {
    // https://stackoverflow.com/questions/20041051/how-to-judge-a-string-is-uuid-type
    const uuidRegx = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    if (rawUuid === undefined) {
      return { uuid: undefined, whiteLabel: rawWhiteLabel };
    }

    if (rawWhiteLabel !== undefined && rawWhiteLabel.match(uuidRegx)) {
      return { uuid: rawWhiteLabel, whiteLabel: undefined };
    } else if (!rawUuid.match(uuidRegx)) {
      return { uuid: undefined, whiteLabel: rawWhiteLabel };
    }

    return { uuid: rawUuid, whiteLabel: rawWhiteLabel };
  }, [rawUuid, rawWhiteLabel]);

  const fetchScreen = async (uuid: string) => {
    try {
      const response = await getScreen(uuid);
      handleScreenResponse(response);
    } catch (err) {
      console.error(err);
      navigate('/step-1');
      return;
    }
    setScreenLoading(false);
  };

  const handleScreenResponse = (response: ApiFormDataReadOnly & ApiFormData) => {

    setWhiteLabel(response.white_label);

    updateFormData(response);

    if (whiteLabel === undefined) {
      navigate(`/${response.white_label}${location.pathname}`);
    } else if (whiteLabel !== response.white_label) {
      navigate(location.pathname.replace(whiteLabel, response.white_label));
    }
  };

  useEffect(() => {
    if (uuid === undefined) {
      if (whiteLabel !== undefined) {
        setWhiteLabel(whiteLabel);
        setScreenLoading(false);
      }
      return;
    }
    fetchScreen(uuid);
  }, [uuid, whiteLabel]);

  return <LoadingPage />;
};

export default FetchScreen;
