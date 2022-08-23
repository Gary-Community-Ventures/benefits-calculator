import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Spanish from '../../Assets/Languages/Spanish.json';
import English from '../../Assets/Languages/English.json';

export const Context = React.createContext();

const Wrapper = (props) => {
  const local = navigator.language;
  let language;
  
  local.includes("en-US") ? language = English : language = Spanish;
  const [locale, setLocale] = useState(local);
  const [messages, setMessages] = useState(local);

  const selectLanguage = (event) => {
    const newLocale = event.target.value;
    setLocale(newLocale);

    newLocale === 'en-US' ? setMessages(English) : setMessages(Spanish);
  }

  return (
    <Context.Provider value={{ locale, selectLanguage }} >
      <IntlProvider locale={ locale } messages={ messages } defaultLocale="en-US">
        { props.children }
      </IntlProvider>
    </Context.Provider>
  );
}

export default Wrapper;