import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { useLocation, Navigate, Routes, Route, useSearchParams } from 'react-router-dom';
import { LicenseInfo } from '@mui/x-license-pro';
import { Context } from './Components/Wrapper/Wrapper';
import FetchScreen from './Components/FetchScreen/FetchScreen';
import QuestionComponentContainer from './Components/QuestionComponentContainer/QuestionComponentContainer';
import Confirmation from './Components/Confirmation/Confirmation';
import Results from './Components/Results/Results';
import Disclaimer from './Components/Steps/Disclaimer/Disclaimer';
import ProgressBar from './Components/ProgressBar/ProgressBar';
import JeffcoLandingPage from './Components/JeffcoComponents/JeffcoLandingPage/JeffcoLandingPage';
import SelectLanguagePage from './Components/Steps/SelectLanguage';
import { STARTING_QUESTION_NUMBER, useStepNumber, useStepDirectory } from './Assets/stepDirectory';
import Box from '@mui/material/Box';
import { BrandedFooter, BrandedHeader } from './Components/Referrer/Referrer';
import dataLayerPush from './Assets/analytics';
import { OTHER_PAGE_TITLES } from './Assets/pageTitleTags';
LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_LICENSE_KEY + '=');
import CcigLandingPage from './Components/CcigComponents/CcigLandingPage';
import languageRouteWrapper from './Components/RouterUtil/LanguageRouter';
import SelectStatePage from './Components/Steps/SelectStatePage';
import RedirectToWhiteLabel from './Components/RouterUtil/RedirectToWhiteLabel';
import CurrentBenefits from './Components/CurrentBenefits/CurrentBenefits';
import EcHouseholdMemberForm from './Components/EnergyCalculator/ECHouseholdMemberForm';
import HouseholdMemberForm from './Components/Steps/HouseholdMembers/HouseholdMemberForm';
import './App.css';

const App = () => {
  const location = useLocation();
  const urlSearchParams = location.search;
  const [searchParams] = useSearchParams();
  const {
    formData,
    setFormData,
    styleOverride,
    setTheme: changeTheme,
    pageIsLoading,
    getReferrer,
  } = useContext(Context);
  const stepDirectory = useStepDirectory();
  const totalSteps = stepDirectory.length + STARTING_QUESTION_NUMBER;
  const [theme, setTheme] = useState(createTheme(styleOverride));
  const themeName = getReferrer('theme', 'default');
  const householdMemberStepNumber = useStepNumber('householdData', false);
  const ecHouseholdMemberStepNumber = useStepNumber('ecHouseholdData', false);

  useEffect(() => {
    changeTheme(themeName as 'default' | 'twoOneOne');
  }, [themeName]);

  useEffect(() => {
    setTheme(createTheme(styleOverride));
  }, [styleOverride]);

  useEffect(() => {
    dataLayerPush({
      event: 'Page Change',
      url: window.location.pathname + window.location.search,
    });
  }, [location.pathname]);

  useEffect(() => {
    document.title = OTHER_PAGE_TITLES.default;
  }, []);

  useEffect(() => {
    const referrerParam = searchParams.get('referrer');
    const utmParam = searchParams.get('utm_source');
    const testParam = searchParams.get('test') ? true : false;
    const externalIdParam = searchParams.get('externalid');

    // referrer priority = stored referrer -> referrer param -> utm_source param -> ''
    const referrer = formData.immutableReferrer ?? referrerParam ?? utmParam ?? '';
    const referrerSource = formData.referralSource || referrer;
    const isTest = formData.isTest || testParam;
    const externalId = formData.externalID ?? externalIdParam ?? undefined;

    setFormData({
      ...formData,
      isTest: isTest,
      externalID: externalId,
      referralSource: referrerSource,
      immutableReferrer: referrer,
      urlSearchParams: urlSearchParams,
    });
  }, [formData.immutableReferrer]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (pageIsLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {languageRouteWrapper(
            <>
              <Route path="jeffcohs" element={<RedirectToWhiteLabel whiteLabel="co" />} />
              <Route path="jeffcohscm" element={<RedirectToWhiteLabel whiteLabel="co" />} />
              <Route path="ccig" element={<RedirectToWhiteLabel whiteLabel="co" />} />
              <Route
                path="step-1"
                element={
                  <RedirectToWhiteLabel>
                    <FetchScreen />
                  </RedirectToWhiteLabel>
                }
              />
              <Route path=":whiteLabel/:uuid">
                <Route path="" element={<FetchScreen />} />
                <Route path="*" element={<FetchScreen />} />
              </Route>
              <Route path=":uuid">
                <Route path="" element={<FetchScreen />} />
                <Route path="*" element={<FetchScreen />} />
              </Route>
              <Route path="" element={<FetchScreen />} />
              <Route path="*" element={<FetchScreen />} />
            </>,
          )}
        </Routes>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <BrandedHeader />
        <Box className="main-max-width">
          <Routes>
            <Route path="step-1" element={<ProgressBar step={1} />} />
            <Route path=":whiteLabel/step-1" element={<ProgressBar step={1} />} />
            <Route path="select-state" element={<ProgressBar step={1} />} />
            <Route path=":whiteLabel/select-state" element={<ProgressBar step={1} />} />
            <Route path=":whiteLabel/step-2" element={<ProgressBar step={2} />} />
            <Route path=":whiteLabel/:uuid/step-:id" element={<ProgressBar />} />
            <Route path=":whiteLabel/:uuid/step-:id/:page" element={<ProgressBar />} />
            <Route path=":whiteLabel/:uuid/confirm-information" element={<ProgressBar step={totalSteps} />} />
            <Route path="*" element={<></>} />
          </Routes>
          <Routes>
            {languageRouteWrapper(
              <>
                <Route path="" element={<Navigate to={`/step-1${urlSearchParams}`} replace />} />
                <Route path="co/jeffcohs" element={<JeffcoLandingPage referrer="jeffcoHS" />} />
                <Route path="co/jeffcohscm" element={<JeffcoLandingPage referrer="jeffcoHSCM" />} />
                <Route path="co/ccig" element={<CcigLandingPage />} />
                <Route path="step-1" element={<SelectLanguagePage />} />
                <Route path="select-state" element={<SelectStatePage />} />
                <Route path=":whiteLabel/current-benefits" element={<CurrentBenefits />} />
                <Route path=":whiteLabel/select-state" element={<SelectStatePage />} />
                <Route path=":whiteLabel/step-1" element={<SelectLanguagePage />} />
                <Route path=":whiteLabel/step-2" element={<Disclaimer />} />
                <Route path=":whiteLabel/:uuid">
                  <Route path="" element={<Navigate to="/step-1" replace />} />
                  <Route path="step-1" element={<SelectLanguagePage />} />
                  <Route path="step-2" element={<Disclaimer />} />
                  <Route
                    path={`step-${householdMemberStepNumber}/:page`}
                    element={<HouseholdMemberForm key={window.location.href} />}
                  />
                  <Route
                    path={`step-${ecHouseholdMemberStepNumber}/:page`}
                    element={<EcHouseholdMemberForm key={window.location.href} />}
                  />
                  <Route path="step-:id" element={<QuestionComponentContainer key={window.location.href} />} />
                  <Route path="confirm-information" element={<Confirmation />} />
                  <Route path="results/benefits" element={<Results type="program" />} />
                  <Route path="results/near-term-needs" element={<Results type="need" />} />
                  <Route path="results/benefits/:programId" element={<Results type="program" />} />
                  <Route path="results/benefits/:programId/navigators" element={<Results type="navigator" />} />
                  <Route path="results/more-help" element={<Results type="help" />} />
                  <Route path="results" element={<Navigate to="benefits" replace />} />
                  <Route path="*" element={<Navigate to="/step-1" replace />} />
                </Route>
                <Route path="*" element={<Navigate to={`/step-1${urlSearchParams}`} replace />} />
              </>,
            )}
          </Routes>
        </Box>
      </div>
      <BrandedFooter />
    </ThemeProvider>
  );
};

export default App;
