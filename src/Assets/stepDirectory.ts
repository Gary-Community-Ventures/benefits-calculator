import type { QuestionName } from '../Types/Questions';
import { useContext } from 'react';
import { Context } from '../Components/Wrapper/Wrapper';

export const STARTING_QUESTION_NUMBER = 3;
// TODO: update pageTitleTags.ts

export function useStepDirectory() {
  const { getReferrer } = useContext(Context);

  const stepDirectory = getReferrer('stepDirectory', ['householdData', 'hasExpenses']) as QuestionName[];

  return stepDirectory;
}

export function useStepNumber(name: QuestionName) {
  const stepDirectory = useStepDirectory();

  const stepNumber = stepDirectory.findIndex((question) => question === name);

  if (stepNumber === -1) {
    throw new Error('Step does not exist for this referrer');
  }

  return stepNumber + STARTING_QUESTION_NUMBER;
}

export function useStepName(stepNumber: number) {
  const stepDirectory = useStepDirectory();

  return stepDirectory[stepNumber - STARTING_QUESTION_NUMBER];
}
