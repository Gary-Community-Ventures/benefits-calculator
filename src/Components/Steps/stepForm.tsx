import { useContext, useEffect } from 'react';
import { FieldValues, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import { Context } from '../Wrapper/Wrapper';
import { QuestionName } from '../../Types/Questions';
import { useGoToNextStep } from '../QuestionComponents/questionHooks';

/**
 * This hook is used to create a form for screener steps.
 * By default, it will navigate to the next step when the form is submitted successfully.
 * The onSubmitSuccessfulOverride callback should be used when custom logic is needed.
 *
 * If you must navigate within the submit handler, use the setStepLoading function
 * to set the loading state to false before navigating. Otherwise, the isSubmitSuccessful
 * state will not be updated correctly and the loading state will not be set to false.
 */
export default function useStepForm<T extends FieldValues>({
  questionName,
  onSubmitSuccessfulOverride,
  ...useFormProps
}: UseFormProps<T> & {
  questionName: QuestionName;
  onSubmitSuccessfulOverride?: () => void;
}) {
  const { setStepLoading } = useContext(Context);
  const nextPage = useGoToNextStep(questionName);

  const form = useForm<T>({
    ...useFormProps,
  });

  const { isSubmitting, isSubmitSuccessful } = form.formState;

  useEffect(() => {
    setStepLoading(isSubmitting);
  }, [isSubmitting]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      if (onSubmitSuccessfulOverride) {
        onSubmitSuccessfulOverride();
      } else {
        nextPage();
      }
    }
  }, [isSubmitSuccessful, nextPage, onSubmitSuccessfulOverride]);

  return form as UseFormReturn<T>;
}
