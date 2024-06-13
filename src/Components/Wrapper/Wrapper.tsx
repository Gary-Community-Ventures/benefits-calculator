import React, { useEffect, useState, PropsWithChildren } from 'react';
import useStyle from '../../Assets/styleController';
import { IntlProvider, useIntl } from 'react-intl';
import { WrapperContext } from '../../Types/WrapperContext';
import { FormData } from '../../Types/FormData';
import { getTranslations } from '../../apiCalls';
import useReferrer from '../Referrer/referrerHook';
import languageOptions, { Language, rightToLeftLanguages } from '../../Assets/languageOptions';
import useGetConfig from '../Config/configHook';

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
    cowap: false,
    ubp: false,
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
  const { configLoading, configResponse: config } = useGetConfig();
  const { language_options: languageOptions = {} } = config ?? {};

  const [translationsLoading, setTranslationsLoading] = useState<boolean>(true);
  const [screenLoading, setScreenLoading] = useState<boolean>(true);
  const [pageIsLoading, setPageIsLoading] = useState<boolean>(true);

  const screenDoneLoading = () => {
    setScreenLoading(false);
  };

  useEffect(() => {
    if (!screenLoading && !translationsLoading && !configLoading) {
      setPageIsLoading(false);
      return;
    }

    setPageIsLoading(true);
  }, [screenLoading, translationsLoading, configLoading]);

  let [translations, setTranslations] = useState<{ Language: { [key: string]: string } } | {}>({});

  let defaultLanguage = localStorage.getItem('language') as Language;

  const userLanguage = navigator.language.toLowerCase() as Language;

  const verifyLanguage = (language: Language) => {
    return Object.keys(languageOptions).some((lang) => language.slice(0, 2) === lang) ? language.slice(0, 2) : 'en-us';
  };

  defaultLanguage = defaultLanguage ? defaultLanguage : (verifyLanguage(userLanguage) as Language);

  const pathname = window.location.pathname;

  const [theme, setTheme, styleOverride] = useStyle('default');

  const languages = Object.keys(languageOptions) as Language[];
  languages.forEach((lang: Language) => {
    if (pathname.includes(`/${lang}/`)) {
      defaultLanguage = lang;
    }
  });

  const [locale, setLocale] = useState<Language>(defaultLanguage);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    if (locale in translations) {
      return;
    }

    setTranslationsLoading(true);
    getTranslations(locale).then((value) => {
      setTranslations({ ...translations, ...value });
    });
  }, [locale]);

  useEffect(() => {
    localStorage.setItem('language', locale);

    if (!(locale in translations)) {
      setMessages({});
      return;
    }
    setTranslationsLoading(false);

    for (const lang of Object.keys(translations) as Language[]) {
      if (locale.toLocaleLowerCase() === lang) {
        // @ts-ignore
        setMessages(translations[lang]);
        return;
      }
    }
    // @ts-ignore
    setMessages(translations['en-us'] ?? {});
  }, [locale, translations]);

  useEffect(() => {
    if (rightToLeftLanguages.includes(locale)) {
      document.documentElement.setAttribute('dir', 'rtl');
      return;
    }

    document.documentElement.removeAttribute('dir');
  }, [locale]);

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
        config,
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
