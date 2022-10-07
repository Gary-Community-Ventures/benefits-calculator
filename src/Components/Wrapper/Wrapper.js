import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Spanish from '../../Assets/Languages/Spanish.json';
import English from '../../Assets/Languages/English.json';

export const Context = React.createContext();

const Wrapper = (props) => {
  let defaultLanguage = 'en-US';
  let defaultMessages = English;
  const pathname = window.location.pathname;
  
  if (pathname.includes('/es/')) {
    defaultLanguage = 'es';
    defaultMessages = Spanish;
  }
  
  const [locale, setLocale] = useState(defaultLanguage);
  const [messages, setMessages] = useState(defaultMessages);

  const selectLanguage = (event) => {
    const newLocale = event.target.value;
    setLocale(newLocale);

    newLocale === 'en-US' ? setMessages(English) : setMessages(Spanish);
  }

  return (
    <Context.Provider value={{ locale, selectLanguage }} >
      <IntlProvider locale={ locale } messages={ messages } defaultLocale={ locale }>
        { props.children }
      </IntlProvider>
    </Context.Provider>
  );
}

export default Wrapper;