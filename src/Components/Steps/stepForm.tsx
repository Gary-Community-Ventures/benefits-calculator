import { useContext, useEffect } from 'react';
import { FieldValues, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import { Context } from '../Wrapper/Wrapper';

// This hook is used to create a form for screener steps.
// It should be used when you need to show loading state while the form is submitting.
//
// It wraps the useForm hook from react-hook-form and adds some additional functionality
// to manage the loading state and submission success callback.
// The onSubmitSuccessful callback should be used for navigating to the next step,
// rather than putting navigation in the submit handler. Otherwise, the isSubmitSuccessful
// state will not be updated correctly and the loading state will not be set to false.
//
// If you must navigate during the submit handler, use the setStepLoading function
// to set the loading state to false before navigating.
export default function useStepForm<T extends FieldValues>({
  onSubmitSuccessful,
  ...useFormProps
}: UseFormProps<T> & {
  onSubmitSuccessful: () => void; // TODO: could default to calling next step?
}) {
  const { setStepLoading } = useContext(Context);

  const form = useForm<T>({
    ...useFormProps,
  });

  const { isSubmitting, isSubmitSuccessful } = form.formState;

  useEffect(() => {
    setStepLoading(isSubmitting);
  }, [isSubmitting]);

  useEffect(() => {
    if (isSubmitSuccessful && onSubmitSuccessful) {
      onSubmitSuccessful();
    }
  }, [isSubmitSuccessful]);

  return form as UseFormReturn<T>;
}
