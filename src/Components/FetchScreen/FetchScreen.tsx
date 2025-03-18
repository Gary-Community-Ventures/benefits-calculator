import { useEffect, useContext, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../Wrapper/Wrapper';
import LoadingPage from '../LoadingPage/LoadingPage';
import type { ApiFormData, ApiFormDataReadOnly } from '../../Types/ApiFormData';
import useScreenApi from '../../Assets/updateScreen';
import { isValidUuid } from '../RouterUtil/ValidateUuid';

const FetchScreen = () => {
  const { setScreenLoading, setWhiteLabel } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const { uuid: rawUuid, whiteLabel: rawWhiteLabel } = useParams();
  const { fetchScreen } = useScreenApi();

  const { uuid, whiteLabel } = useMemo(() => {
    if (rawUuid === undefined) {
      return { uuid: undefined, whiteLabel: rawWhiteLabel };
    }

    if (rawWhiteLabel !== undefined && isValidUuid(rawWhiteLabel ?? '')) {
      return { uuid: rawWhiteLabel, whiteLabel: undefined };
    } else if (!isValidUuid(rawUuid)) {
      return { uuid: undefined, whiteLabel: rawWhiteLabel };
    }

    return { uuid: rawUuid, whiteLabel: rawWhiteLabel };
  }, [rawUuid, rawWhiteLabel]);

  const initializeScreen = async () => {
    try {
      const response = await fetchScreen();
      if(response) {
        handleScreenResponse(response);
      }
    } catch (err) {
      console.error(err);
      navigate('/step-1');
      return;
    }
    setScreenLoading(false);
  };

  const handleScreenResponse = (response: ApiFormDataReadOnly & ApiFormData) => {

    setWhiteLabel(response.white_label);

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
      }
      setScreenLoading(false);
      return;
    } else {
      initializeScreen();
    }
  }, [uuid, whiteLabel]);

  return <LoadingPage />;
};

export default FetchScreen;
