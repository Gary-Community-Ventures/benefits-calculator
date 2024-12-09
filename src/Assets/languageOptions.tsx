import { Language } from '@mui/icons-material';
import { englishToNepaliNumber } from 'nepali-number';
import { ReactNode, useContext, useMemo } from 'react';
import { Context } from '../Components/Wrapper/Wrapper';

export type Language = 'en-us' | 'es' | 'vi' | 'fr' | 'am' | 'so' | 'ru' | 'ne' | 'my' | 'zh' | 'ar';
export const LANGUAGE_OPTIONS: Record<Language, string> = {
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

// Reorder a list of elements based on the selected locale. A key might need to be added to the FormattedMessage.
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
  }, [locale, order]);
}

export function translateNumber(number: number | string, locale: Language) {
  if (locale === 'ne') {
    return englishToNepaliNumber(number);
  }

  return String(number);
}

// translate numbers. Currently only used for Nepali numbers. Will work with dollar values as well.
export function useTranslateNumber() {
  const { locale } = useContext(Context);

  return (number: number | string) => {
    return translateNumber(number, locale);
  };
}

export default LANGUAGE_OPTIONS;
