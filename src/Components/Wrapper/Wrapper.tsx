import React, { useEffect, useState, PropsWithChildren } from 'react';
import useStyle from '../../Assets/styleController';
import { IntlProvider } from 'react-intl';
import { WrapperContext } from '../../Types/WrapperContext';
import { FormData } from '../../Types/FormData';
import { getTranslations } from '../../apiCalls';
import useReferrer, { ReferrerData } from '../Referrer/referrerHook';
import { Language } from '../../Types/Language';
import { useGetConfig } from '../Config/configHook';

const initialFormData: FormData = {
  whiteLabel: '',
  isTest: false,
  frozen: false,
  externalID: undefined,
  agreeToTermsOfService: false,
  is13OrOlder: false,
  zipcode: '',
  county: '',
  startTime: new Date().toJSON(),
  hasExpenses: false,
  expenses: [],
  householdSize: 0,
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
    nfp: false,
    fatc: false,
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
  const [staffToken, setStaffToken] = useState<string | undefined>(undefined);

  const [translationsLoading, setTranslationsLoading] = useState<boolean>(true);
  const [screenLoading, setScreenLoading] = useState<boolean>(true);
  const [pageIsLoading, setPageIsLoading] = useState<boolean>(true);

  const screenDoneLoading = () => {
    setScreenLoading(false);
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    setReferrer(formData.immutableReferrer);
  }, [formData.immutableReferrer]);

  // TODO: figure out what to do here
  const { configLoading, configResponse: config } = useGetConfig(screenLoading ? 'co' : formData.whiteLabel);
  const { language_options: languageOptions = {} } = config ?? {};
  const languages = Object.keys(languageOptions) as Language[];
  const { referrer_data: referrerData = {} } = config ?? {};

  const { getReferrer, setReferrer } = useReferrer(formData.immutableReferrer, referrerData as ReferrerData);

  useEffect(() => {
    if (!screenLoading && !translationsLoading && !configLoading) {
      setPageIsLoading(false);
      return;
    }

    setPageIsLoading(true);
  }, [screenLoading, translationsLoading, configLoading]);

  const rightToLeftLanguages = ['ar'];

  let [translations, setTranslations] = useState<{ Language: { [key: string]: string } } | {}>({});

  const [theme, setTheme, styleOverride] = useStyle('default');
  const [locale, setLocale] = useState<Language>('en-us');
  const [messages, setMessages] = useState({});

  useEffect(() => {
    let defaultLanguage = localStorage.getItem('language') as Language;

    const userLanguage = navigator.language.toLowerCase() as Language;

    const verifyLanguage = (language: Language) => {
      return Object.keys(languageOptions).some((lang) => language.slice(0, 2) === lang)
        ? language.slice(0, 2)
        : 'en-us';
    };

    defaultLanguage = defaultLanguage ? defaultLanguage : (verifyLanguage(userLanguage) as Language);

    const pathname = window.location.pathname;

    languages.forEach((lang: Language) => {
      if (pathname.includes(`/${lang}/`)) {
        defaultLanguage = lang;
      }
    });

    setLocale(defaultLanguage);
  }, [languages.length]);

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

  return (
    <Context.Provider
      value={{
        locale,
        selectLanguage,
        config,
        configLoading,
        formData,
        setFormData,
        theme,
        setTheme,
        styleOverride,
        pageIsLoading,
        screenDoneLoading,
        staffToken,
        setStaffToken,
        getReferrer: getReferrer as (id: keyof ReferrerData) => string,
      }}
    >
      <IntlProvider locale={locale} messages={messages} defaultLocale={locale}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default Wrapper;
