import React, { useEffect, useState, PropsWithChildren } from 'react';
import useStyle from '../../Assets/styleController';
import { IntlProvider } from 'react-intl';
import { WrapperContext } from '../../Types/WrapperContext';
import { Language } from '../../Types/Language';
import { FormData } from '../../Types/FormData';
import { getTranslations } from '../../apiCalls';
import useReferrer from '../Referrer/referrerHook';

const initialFormData: FormData = {
  isTest: undefined,
  externalID: undefined,
  agreeToTermsOfService: false,
  is13OrOlder: false,
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
  immutableReferrer: undefined,
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
  acuteHHConditions: {
    food: false,
    babySupplies: false,
    housing: false,
    support: false,
    childDevelopment: false,
    familyPlanning: false,
    jobResources: false,
    dentalCare: false,
    legalServices: false,
  },
};

export const Context = React.createContext<WrapperContext>({} as WrapperContext);

const Wrapper = (props: PropsWithChildren<{}>) => {
  const [translationsLoading, setTranslationsLoading] = useState<boolean>(true);
  const [screenLoading, setScreenLoading] = useState<boolean>(true);
  const [pageIsLoading, setPageIsLoading] = useState<boolean>(true);

  const screenDoneLoading = () => {
    setScreenLoading(false);
  };

  useEffect(() => {
    if (!screenLoading && !translationsLoading) {
      setPageIsLoading(false);
    }
  }, [screenLoading, translationsLoading]);

  let [translations, setTranslations] = useState<{ [key: string]: Language }>({});

  useEffect(() => {
    getTranslations().then((value) => {
      setTranslations(value);
    });
  }, []);
  let defaultLanguage = localStorage.getItem('language') ?? 'en-us';
  const pathname = window.location.pathname;

  const [theme, setTheme, styleOverride] = useStyle('default');

  if (pathname.includes('/es')) {
    defaultLanguage = 'es';
  } else if (pathname.includes('/vi')) {
    defaultLanguage = 'vi';
  }

  const [locale, setLocale] = useState(defaultLanguage);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    localStorage.setItem('language', locale);
    if (Object.keys(translations).length > 0) {
      setTranslationsLoading(false);
    }
    for (const lang of Object.keys(translations)) {
      if (locale.toLocaleLowerCase() === lang) {
        setMessages(translations[lang]);
        return;
      }
    }
    setMessages(translations['en-us'] ?? {});
  }, [locale, translations]);

  const selectLanguage = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newLocale = target.value;
    setLocale(newLocale);
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { getReferrer, setReferrer } = useReferrer(formData.immutableReferrer);

  useEffect(() => {
    setReferrer(formData.immutableReferrer);
  }, [formData.immutableReferrer]);

  return (
    <Context.Provider
      value={{
        locale,
        setLocale,
        selectLanguage,
        formData,
        setFormData,
        theme,
        setTheme,
        styleOverride,
        pageIsLoading,
        screenDoneLoading,
        getReferrer,
      }}
    >
      <IntlProvider locale={locale} messages={messages} defaultLocale={locale}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default Wrapper;
