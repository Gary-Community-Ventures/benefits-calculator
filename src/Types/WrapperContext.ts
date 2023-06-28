import { ChangeEvent } from "react";
import { FormData } from "./FormData";

export interface WrapperContext {
  locale: string;
  setLocale: (locale: string) => void;
  selectLanguage: (event: ChangeEvent) => void;
  formData: FormData;
  setFormData: (formData: FormData) => void;
}
