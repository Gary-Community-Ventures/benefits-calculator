import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import Spanish from '../../Assets/Languages/Spanish.json';
import English from '../../Assets/Languages/English.json';
import Vietnamese from '../../Assets/Languages/Vietnamese.json';

export const Context = React.createContext();

const Wrapper = (props) => {
  let defaultLanguage = localStorage.getItem('language') ?? 'en-US';
  let defaultMessages = defaultLanguage === 'en-US' ? English : Spanish;
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
    localStorage.setItem('language', locale);
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
  };

  const initialFormData = {
    isTest: undefined,
    externalID: undefined,
    agreeToTermsOfService: false,
    zipcode: '',
    county: '',
    startTime: new Date().toJSON(),
    hasExpenses: false,
    expenses: [],
    householdSize: '',
    householdData: [],
    householdAssets: 0,
    hasBenefits: 'preferNotToAnswer',
    benefits: {
      acp: false,
      andcs: false,
      cccap: false,
      coctc: false,
      coeitc: false,
      coheadstart: false,
      coPropTaxRentHeatCreditRebate: false,
      ctc: false,
      dentallowincseniors: false,
      denverpresc: false,
      ede: false,
      eitc: false,
      erc: false,
      lifeline: false,
      leap: false,
      mydenver: false,
      nslp: false,
      oap: false,
      rtdlive: false,
      snap: false,
      ssi: false,
      tanf: false,
      upk: false,
      wic: false,
    },
    healthInsurance: {
      employer: false,
      private: false,
      medicaid: false,
      medicare: false,
      chp: false,
      none: false,
    },
    referralSource: undefined,
    referrerCode: undefined,
    otherSource: undefined,
    signUpInfo: {
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      hasUser: false,
      sendOffers: false,
      sendUpdates: false,
      commConsent: false,
    },
    urlSearchParams: '',
    isBIAUser: false,
    acuteHHConditions: {
      food: false,
      babySupplies: false,
      housing: false,
      support: false,
      childDevelopment: false,
      familyPlanning: false,
    },
  };

  const [formData, setFormData] = useState(initialFormData);

  return (
    <Context.Provider value={{ locale, setLocale, selectLanguage, formData, setFormData }}>
      <IntlProvider
        locale={locale}
        messages={messages}
        defaultLocale={locale}
        formData={formData}
        setFormData={setFormData}
      >
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default Wrapper;
