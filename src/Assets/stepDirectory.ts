import type { QuestionName } from '../Types/Questions';
import { useContext } from 'react';
import { Context } from '../Components/Wrapper/Wrapper';
import { StepDirectiory } from '../Components/Referrer/referrerHook';

export const STARTING_QUESTION_NUMBER = 3;

export function useStepDirectory() {
  const { getReferrer, formData } = useContext(Context);

  const stepDirectory = getReferrer('stepDirectory', []) as StepDirectiory;

  if (Array.isArray(stepDirectory)) {
    return stepDirectory;
  }

  const pathStepDirectory = stepDirectory[formData.path ?? 'default'];

  if (pathStepDirectory !== undefined) {
    return pathStepDirectory;
  }

  return stepDirectory.default;
}

export function useStepNumber(name: QuestionName, raise: boolean = true) {
  // The second argument is an optional boolean that you can use if you need to access the step number before the config is loaded.
  const stepDirectory = useStepDirectory();

  const stepNumber = stepDirectory.findIndex((question) => question === name);

  if (stepNumber === -1) {
    if (raise) {
      throw new Error(`The "${name}" step does not exist for this referrer`);
    }

    return -1;
  }

  return stepNumber + STARTING_QUESTION_NUMBER;
}

export function useStepName(stepNumber: number): QuestionName | undefined {
  const stepDirectory = useStepDirectory();

  return stepDirectory[stepNumber - STARTING_QUESTION_NUMBER];
}
