export type Language = 'en-us' | 'es' | 'vi' | 'fr' | 'am' | 'so' | 'ru' | 'ne' | 'my' | 'zh';
const languageOptions: Record<Language, string> = {
  'en-us': 'ENGLISH',
  es: 'ESPAÑOL',
  vi: 'TIẾNG VIỆT',
  fr: 'FRANÇAIS',
  am: 'አማርኛ',
  so: 'SOOMAALI',
  ru: 'РУССКИЙ',
  ne: 'नेपाली',
  my: 'မြန်မာဘာသာစကား',
  zh: '汉语',
};

export default languageOptions;
