import { useContext, useEffect } from 'react';
import { Context } from '../Wrapper/Wrapper';
import LANGUAGE_OPTIONS, { Language } from '../../Assets/languageOptions';

/**
 * This component updates the 'lang' attribute on the HTML
 * element to prevent Google Translate from overriding our
 * translations, but only for languages from LANGUAGE_OPTIONS.
 */
export const HtmlLangUpdater = () => {
  const { locale } = useContext(Context);

  useEffect(() => {
    const htmlLang = locale.slice(0, 2);
    document.documentElement.setAttribute('lang', htmlLang);

    if (htmlLang !== 'en') {
      const supportedLanguageCodes = Object.keys(LANGUAGE_OPTIONS).map(
        (langKey) => (langKey as Language).slice(0, 2)
      );

      if (supportedLanguageCodes.includes(htmlLang)) {
        document.documentElement.setAttribute('translate', 'no');
      } else {
        document.documentElement.removeAttribute('translate');
      }
    } else {
      document.documentElement.removeAttribute('translate');
    }

  }, [locale]);

  return null;
};
