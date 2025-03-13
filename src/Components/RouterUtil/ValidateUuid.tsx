import { PropsWithChildren } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQueryString } from '../QuestionComponents/questionHooks';

export function isValidUuid(uuid: string) {
  // https://stackoverflow.com/questions/20041051/how-to-judge-a-string-is-uuid-type
  const uuidRegx = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  return uuidRegx.test(uuid);
}

export default function ValidateUuid({ children }: PropsWithChildren) {
  const { uuid } = useParams();
  const queryParams = useQueryString();
  const link = `/step-1${queryParams}`;

  if (uuid === undefined) {
    return <Navigate to={link} replace />;
  }

  if (!isValidUuid(uuid)) {
    return <Navigate to={link} replace />;
  }

  return <>{children}</>;
}
