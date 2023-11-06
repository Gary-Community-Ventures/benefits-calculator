import React, { useEffect, useState, PropsWithChildren } from 'react';
import useStyle from '../../Assets/styleController';
import { IntlProvider } from 'react-intl';
import { WrapperContext } from '../../Types/WrapperContext';
import { FormData } from '../../Types/FormData';
import { getTranslations } from '../../apiCalls';
import useReferrer from '../Referrer/referrerHook';
import languageOptions, { Language } from '../../Assets/languageOptions';

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
    pell: false,
    rtdlive: false,
    snap: false,
    ssdi: false,
    ssi: false,
    tanf: false,
    upk: false,
    wic: false,
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

  let [translations, setTranslations] = useState<Record<Language, { [key: string]: string }> | undefined>(undefined);

  useEffect(() => {
    getTranslations().then((value) => {
      setTranslations(value);
    });
  }, []);
  let defaultLanguage = (localStorage.getItem('language') ?? 'en-us') as Language;
  const pathname = window.location.pathname;

  const [theme, setTheme, styleOverride] = useStyle('default');

  const languages = Object.keys(languageOptions) as Language[];
  languages.forEach((lang: Language) => {
    if (pathname.includes(`/${lang}`)) {
      defaultLanguage = lang;
    }
  });

  const [locale, setLocale] = useState<Language>(defaultLanguage);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    if (translations) {
      localStorage.setItem('language', locale);
    }

    if (translations === undefined) {
      setMessages({});
      return;
    } else {
      setTranslationsLoading(false);
    }

    for (const lang of Object.keys(translations) as Language[]) {
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

    if (languages.every((lang) => lang !== newLocale)) {
      setLocale('en-us');
      return;
    }

    setLocale(newLocale as Language);
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
