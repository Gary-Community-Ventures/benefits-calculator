import { useContext, useEffect } from 'react';
import { FieldValues, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import { Context } from '../Wrapper/Wrapper';

// This hook is used to create a form for screener steps.
// It wraps the useForm hook from react-hook-form and adds some additional functionality
// to manage the loading state and submission success callback.
export default function useStepForm<T extends FieldValues>({
  onSubmitSuccessful: onSubmitSuccessful,
  ...useFormProps
}: UseFormProps<T> & {
  onSubmitSuccessful?: () => void;
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
