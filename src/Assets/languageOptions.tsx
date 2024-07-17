import { Language } from '@mui/icons-material';
import { ReactNode, useContext, useMemo } from 'react';
import { Context } from '../Components/Wrapper/Wrapper';

export type Language = 'en-us' | 'es' | 'vi' | 'fr' | 'am' | 'so' | 'ru' | 'ne' | 'my' | 'zh' | 'ar';
const languageOptions: Record<Language, string> = {
  'en-us': 'English',
  es: 'Español',
  vi: 'Tiếng Việt',
  fr: 'Français',
  am: 'አማርኛ',
  so: 'Soomaali',
  ru: 'Русский',
  ne: 'नेपाली',
  my: 'မြန်မာဘာသာစကား',
  zh: '中文',
  ar: 'عربي',
};

export const rightToLeftLanguages = ['ar'];

// Reorder a list of elements based on the selected locale
export function useReorderLanguage(text: ReactNode[], order: { [key in Language]?: number[] }) {
  const { locale } = useContext(Context);

  return useMemo(() => {
    const localeOrder = order[locale];
    if (localeOrder === undefined) {
      return text;
    }

    const localeText = [];
    for (const index of localeOrder) {
      localeText.push(text[index]);
    }

    return localeText;
  }, [locale]);
}

export default languageOptions;
