import { Expense, FormData, HealthInsurance, SignUpInfo } from "./FormData";

export type VerifiableInput = string | number | Expense[] | SignUpInfo | HealthInsurance;

export type ValidationFunction<T> = (value: T) => boolean;

export type MessageFunction = (value: any, formData?: FormData) => any;

export interface ErrorController {
  hasError: boolean;
  showError: boolean;
  isSubmitted: boolean;
  setIsSubmitted: (isSubmitted: boolean) => void;
  updateError: ValidationFunction<VerifiableInput>;
  message: MessageFunction;
}

