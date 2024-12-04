import { PropsWithChildren, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Context } from '../Wrapper/Wrapper';

type Props = PropsWithChildren<{
  whiteLabel?: string;
}>;

const REFERRER_REDIRECT: { [key: string]: string | undefined } = {
  bia: 'co',
};

export default function RedirectToWhiteLabel({ whiteLabel, children }: Props) {
  const { formData } = useContext(Context);
  const location = useLocation();

  let redirectWhiteLabel: string;

  const referrerWhiteLabel = REFERRER_REDIRECT[formData.immutableReferrer ?? ''];
  if (whiteLabel !== undefined) {
    redirectWhiteLabel = '/' + whiteLabel;
  } else if (formData.immutableReferrer === undefined) {
    // wait for the referral source to be set before
    // trying to set the white label based on referrer
    return null;
  } else if (referrerWhiteLabel !== undefined) {
    // redirect legacy referrers to the correct white label
    redirectWhiteLabel = '/' + referrerWhiteLabel;
  } else {
    // if the referrer is not a legacy referrer then render the default component
    return <>{children}</>;
  }

  const url = `${redirectWhiteLabel}${location.pathname}${location.search}`;

  return <Navigate to={url} replace />;
}
