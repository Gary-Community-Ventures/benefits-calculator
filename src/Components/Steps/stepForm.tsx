import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect } from 'react';
import { DefaultValues, FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { Context } from '../Wrapper/Wrapper';
import { useParams } from 'react-router-dom';

export default function useStepForm<T extends FieldValues>({
  formSchema,
  defaultValues,
  successCallback,
}: {
  formSchema: any;
  defaultValues: DefaultValues<T>;
  successCallback?: () => void;
}) {
  const { setStepLoading } = useContext(Context);
  const params = useParams();

  const form = useForm<T>({
    resolver: zodResolver<any>(formSchema),
    defaultValues,
  });

  const { isSubmitting, isSubmitSuccessful } = form.formState;

  useEffect(() => {
    console.log('isSubmitting', params?.id, isSubmitting); // TODO: remove
    setStepLoading(isSubmitting);
  }, [isSubmitting]);

  useEffect(() => {
    console.log('isSubmitSuccessful', params?.id, isSubmitSuccessful); // TODO: remove
    if (isSubmitSuccessful && successCallback) {
      successCallback();
    }
  }, [isSubmitSuccessful]);

  return form as UseFormReturn<T>;
}
