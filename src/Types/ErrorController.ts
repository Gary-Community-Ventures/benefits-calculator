import { Expense, FormData, HealthInsurance, SignUpInfo } from './FormData';

export type VerifiableInput = string | number | Expense[] | SignUpInfo | HealthInsurance;

export type ValidationFunction<T> = (value: T, formData?: FormData) => boolean;

export type MessageFunction<T> = (value: T, formData?: FormData) => any;

export interface ErrorController {
  hasError: boolean;
  showError: boolean;
  timesSubmitted: number;
  incrementSubmitted: () => void;
  setTimesSubmitted: (timesSubmitted: number) => void;
  updateError: ValidationFunction<VerifiableInput>;
  message: MessageFunction<VerifiableInput>;
}
