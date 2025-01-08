import { FormData } from './FormData';
import { ITheme } from '../Assets/styleController';
import { ReferrerData, ReferrerDataValue } from '../Components/Referrer/referrerHook';
import { Language } from '../Assets/languageOptions';
import { Config } from './Config';

export interface WrapperContext {
  locale: Language;
  selectLanguage: (event: Event) => void;
  formData: FormData;
  config: Config | undefined;
  configLoading: boolean;
  setFormData: (formData: FormData) => void;
  theme: ITheme;
  setTheme: React.Dispatch<React.SetStateAction<'default' | 'twoOneOne'>>;
  styleOverride: any;
  pageIsLoading: boolean;
  setScreenLoading: (loading: boolean) => void;
  getReferrer: (id: keyof ReferrerData, defaultValue?: ReferrerDataValue) => any;
  staffToken: string | undefined;
  setStaffToken: (token: string | undefined) => void;
  whiteLabel: string;
  setWhiteLabel: (whiteLabel: string) => void;
}
