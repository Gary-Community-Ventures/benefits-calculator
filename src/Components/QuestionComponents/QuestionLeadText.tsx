import { PropsWithChildren } from 'react';

export default function QuestionLeadText({ children }: PropsWithChildren) {
  return <strong className="question-secondary-header">{children}</strong>;
}
