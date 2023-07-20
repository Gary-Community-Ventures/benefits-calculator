import React, { useEffect, useState, PropsWithChildren } from 'react';
import useStyle from '../../Assets/styleController';
import { IntlProvider } from 'react-intl';
import Spanish from '../../Assets/Languages/Spanish.json';
import English from '../../Assets/Languages/English.json';
import Vietnamese from '../../Assets/Languages/Vietnamese.json';
import { WrapperContext } from '../../Types/WrapperContext';
import { Language } from '../../Types/Language';
import { FormData } from '../../Types/FormData';

const initialFormData: FormData = {
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

export const Context = React.createContext<WrapperContext>({} as WrapperContext);

const Wrapper = (props: PropsWithChildren<{}>) => {
  let defaultLanguage = localStorage.getItem('language') ?? 'en-US';
  let defaultMessages: Language = defaultLanguage === 'en-US' ? English : Spanish;
  const pathname = window.location.pathname;

  const [theme, setTheme, styleOverride] = useStyle('twoOneOne');

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

  const selectLanguage = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newLocale = target.value;
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

  const [formData, setFormData] = useState<FormData>(initialFormData);

  return (
    <Context.Provider
      value={{ locale, setLocale, selectLanguage, formData, setFormData, theme, setTheme, styleOverride }}
    >
      <IntlProvider locale={locale} messages={messages} defaultLocale={locale}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default Wrapper;
