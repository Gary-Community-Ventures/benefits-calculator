export type Language = 'en-us' | 'es' | 'vi'; // | 'fr' | 'am';
const languageOptions: Record<Language, string> = {
  'en-us': 'English',
  es: 'Español',
  vi: 'Tiếng Việt',
  // fr: 'Française',
  // am: 'አማርኛ',
};

export default languageOptions;
