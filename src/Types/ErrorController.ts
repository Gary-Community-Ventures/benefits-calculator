import { Expense, FormData, HealthInsurance, SignUpInfo } from './FormData';

export type VerifiableInput = Partial<
  | string
  | number
  | boolean
  | null
  | Expense[]
  | (SignUpInfo & { serverError: boolean })
  | HealthInsurance
  | { index: number; healthInsurance: HealthInsurance }
>;

export type ValidationFunction<T> = (value: T, formData?: FormData) => boolean;

export type MessageFunction<T> = (value: T, formData?: FormData) => any;

export interface ErrorController {
  hasError: boolean;
  showError: boolean;
  submittedCount: number;
  incrementSubmitted: () => void;
  setSubmittedCount: (submittedCount: number) => void;
  updateError: ValidationFunction<VerifiableInput>;
  message: MessageFunction<VerifiableInput>;
}
