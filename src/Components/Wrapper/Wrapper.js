import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import Spanish from '../../Assets/Languages/Spanish.json';
import English from '../../Assets/Languages/English.json';
import { Language } from '@mui/icons-material';

export const Context = React.createContext();

const Wrapper = (props) => {
  let defaultLanguage = localStorage.getItem('language') ?? 'en-US';
  let defaultMessages = defaultLanguage === 'en-US' ? English: Spanish;
  const pathname = window.location.pathname;
  
  if (pathname.includes('/es/')) {
    defaultLanguage = 'es';
    defaultMessages = Spanish;
  }
  
  const [locale, setLocale] = useState(defaultLanguage);
  const [messages, setMessages] = useState(defaultMessages);

  useEffect(() => {
    localStorage.setItem('language', locale)
    locale === 'en-US' ? setMessages(English) : setMessages(Spanish);
  }, [locale])

  const selectLanguage = (event) => {
    const newLocale = event.target.value;
    setLocale(newLocale);

    newLocale === 'en-US' ? setMessages(English) : setMessages(Spanish);
  }

  return (
    <Context.Provider value={{ locale, setLocale, selectLanguage }} >
      <IntlProvider locale={ locale } messages={ messages } defaultLocale={ locale }>
        { props.children }
      </IntlProvider>
    </Context.Provider>
  );
}

export default Wrapper;