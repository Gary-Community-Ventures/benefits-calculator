import { Navigate, useLocation } from 'react-router-dom';

type Props = {
  whiteLabel: string;
};

function RedirectToWhiteLabel({ whiteLabel }: Props) {
  const location = useLocation();

  const url = `/${whiteLabel}${location.pathname}${location.search}`;

  return <Navigate to={url} replace />;
}

export default RedirectToWhiteLabel;
