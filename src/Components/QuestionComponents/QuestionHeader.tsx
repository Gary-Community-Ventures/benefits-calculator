import { PropsWithChildren } from 'react';

export default function QuestionHeader({ children }: PropsWithChildren) {
  return <h1 className="sub-header">{children}</h1>;
}
