import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import Spanish from '../../Assets/Languages/Spanish.json';
import English from '../../Assets/Languages/English.json';
import Vietnamese from '../../Assets/Languages/Vietnamese.json';

export const Context = React.createContext();

const Wrapper = (props) => {
  let defaultLanguage = localStorage.getItem('language') ?? 'en-US';
  let defaultMessages = defaultLanguage === 'en-US' ? English: Spanish;
  const pathname = window.location.pathname;

  if (pathname.includes('/es')) {
    defaultLanguage = 'es';
    defaultMessages = Spanish;
  } else if (pathname.includes('/vi')) {
    defaultLanguage = 'vi';
    defaultMessages = Vietnamese;
  }

  const [locale, setLocale] = useState(defaultLanguage);
  const [messages, setMessages] = useState(defaultMessages);

  useEffect(() => {
    localStorage.setItem('language', locale)
    switch (locale) {
      case 'en-US':
        setMessages(English);
        break;
      case 'es':
        setMessages(Spanish);
        break;
      case 'vi':
        setMessages(Vietnamese);
        break;
      default:
        setMessages(English);
    }
  }, [locale]);

  const selectLanguage = (event) => {
    const newLocale = event.target.value;
    setLocale(newLocale);

    switch (newLocale) {
      case 'en-US':
        setMessages(English);
        break;
      case 'es':
        setMessages(Spanish);
        break;
      case 'vi':
        setMessages(Vietnamese);
        break;
      default:
        setMessages(English);
    }
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