import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect } from 'react';
import { DefaultValues, FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { Context } from '../Wrapper/Wrapper';

export default function useStepForm<T extends FieldValues>({
  formSchema,
  defaultValues,
}: {
  formSchema: any;
  defaultValues: DefaultValues<T>;
}) {
  const { setStepLoading } = useContext(Context);

  const form = useForm<T>({
    resolver: zodResolver<any>(formSchema),
    defaultValues,
  });

  const isSubmitting = form.formState.isSubmitting;

  // TODO: when a form submission is complete, stepLoading is never set to false again
  // This is because in the form submit handlers we go to the next page
  // It appears to work because the next form is rendered and sets it to false
  // But this can cause unexpected bugs on the last page
  useEffect(() => {
    setStepLoading(isSubmitting);
  }, [isSubmitting]);

  return form as UseFormReturn<T>;
}
