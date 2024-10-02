import { PropsWithChildren } from 'react';

export default function QuestionDescription({ children }: PropsWithChildren) {
  return <p className="question-description">{children}</p>;
}
