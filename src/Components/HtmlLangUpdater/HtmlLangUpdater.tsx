import { useContext, useEffect } from 'react';
import { Context } from '../Wrapper/Wrapper';

/**
 * This component updates the lang attribute on the 'index.html'
 * based on the langauge coming from 'locale' context.
 */
export const HtmlLangUpdater = () => {
  const { locale } = useContext(Context);

  useEffect(() => {
    const htmlLang = locale.slice(0, 2);
    document.documentElement.setAttribute('lang', htmlLang);

  }, [locale]);

  return null;
};
