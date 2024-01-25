import { FormData } from './FormData';
import { ITheme } from '../Assets/styleController';
import { ReferrerData } from '../Components/Referrer/referrerHook';
import { Language } from '../Assets/languageOptions';
import { ApiConfig } from './ApiFormData';

export interface WrapperContext {
  locale: Language;
  selectLanguage: (event: Event) => void;
  formData: FormData;
  config: ApiConfig | undefined;
  setFormData: (formData: FormData) => void;
  theme: ITheme;
  setTheme: React.Dispatch<React.SetStateAction<'default' | 'twoOneOne'>>;
  styleOverride: any;
  pageIsLoading: boolean;
  screenDoneLoading: () => void;
  getReferrer: (id: keyof ReferrerData) => string;
}
