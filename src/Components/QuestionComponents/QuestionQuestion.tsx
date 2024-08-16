import { PropsWithChildren } from 'react';

export default function QuestionQuestion({ children }: PropsWithChildren) {
  return <h2 className="question-label">{children}</h2>;
}
