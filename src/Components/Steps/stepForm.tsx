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

  useEffect(() => {
    setStepLoading(isSubmitting);
  }, [isSubmitting]);

  return form as UseFormReturn<T>;
}
