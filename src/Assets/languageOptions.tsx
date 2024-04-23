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

export default languageOptions;
