import { FormData } from './FormData';
import { ITheme } from '../Assets/styleController';
import { ReferrerData } from '../Components/Referrer/referrerHook';
import { Language } from '../Assets/languageOptions';
import { Config } from './Config';

export interface WrapperContext {
  locale: Language;
  selectLanguage: (event: Event) => void;
  formData: FormData;
  config: Config | undefined;
  setFormData: (formData: FormData) => void;
  theme: ITheme;
  setTheme: React.Dispatch<React.SetStateAction<'default' | 'twoOneOne'>>;
  styleOverride: any;
  pageIsLoading: boolean;
  screenDoneLoading: () => void;
  getReferrer: (id: keyof ReferrerData) => string;
}
