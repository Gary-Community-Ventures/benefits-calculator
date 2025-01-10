import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Navigate, Routes, Route, useSearchParams } from 'react-router-dom';
import { LicenseInfo } from '@mui/x-license-pro';
import { Context } from './Components/Wrapper/Wrapper';
import FetchScreen from './Components/FetchScreen/FetchScreen';
import QuestionComponentContainer from './Components/QuestionComponentContainer/QuestionComponentContainer';
import Confirmation from './Components/Confirmation/Confirmation';
import Results from './Components/Results/Results';
import Disclaimer from './Components/Steps/Disclaimer/Disclaimer.tsx';
import ProgressBar from './Components/ProgressBar/ProgressBar';
import JeffcoLandingPage from './Components/JeffcoComponents/JeffcoLandingPage/JeffcoLandingPage';
import SelectLanguagePage from './Components/Steps/SelectLanguage.tsx';
import { STARTING_QUESTION_NUMBER, useStepNumber, useStepDirectory } from './Assets/stepDirectory';
import Box from '@mui/material/Box';
import { Expense, HealthInsurance, SignUpInfo } from './Types/FormData.js';
import { BrandedFooter, BrandedHeader } from './Components/Referrer/Referrer.tsx';
import { useErrorController } from './Assets/validationFunctions.tsx';
import dataLayerPush from './Assets/analytics.ts';
import { OTHER_PAGE_TITLES } from './Assets/pageTitleTags.ts';
import { isCustomTypedLocationState } from './Types/FormData.ts';
LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_LICENSE_KEY + '=');
import CcigLandingPage from './Components/CcigComponents/CcigLandingPage';
import languageRouteWrapper from './Components/RouterUtil/LanguageRouter';
import SelectStatePage from './Components/Steps/SelectStatePage';
import RedirectToWhiteLabel from './Components/RouterUtil/RedirectToWhiteLabel';
import CurrentBenefits from './Components/CurrentBenefits/CurrentBenefits';
import HouseholdMemberForm from './Components/Steps/HouseholdMembers/HouseholdMemberForm.tsx';
import './App.css';
import useScreenApi from './Assets/updateScreen';

const App = () => {
  const navigate = useNavigate();
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
    whiteLabel,
  } = useContext(Context);
  const { updateScreen } = useScreenApi();

  const stepDirectory = useStepDirectory();
  const totalSteps = stepDirectory.length + STARTING_QUESTION_NUMBER;
  const [theme, setTheme] = useState(createTheme(styleOverride));
  const themeName = getReferrer('theme', 'default');
  const householdMemberStepNumber = useStepNumber('householdData', false);

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

  const handleTextfieldChange = (event: Event) => {
    const { name, value } = event.target as HTMLInputElement;
    const numberUpToEightDigitsLongRegex = /^\d{0,8}$/; //for zipcode
    const numberUpToTenDigitsLongRegex = /^\d{0,10}$/; //for phone number
    const isFirstLastOrEmail = name === 'firstName' || name === 'lastName' || name === 'email';

    if (isFirstLastOrEmail) {
      const updatedSignUpInfo = { ...formData.signUpInfo, [name]: value };
      setFormData({ ...formData, signUpInfo: updatedSignUpInfo });
      return;
    }

    if (name === 'phone' && numberUpToTenDigitsLongRegex.test(value)) {
      const updatedSignUpInfo = { ...formData.signUpInfo, [name]: value };
      setFormData({ ...formData, signUpInfo: updatedSignUpInfo });
      return;
    }

    if (numberUpToEightDigitsLongRegex.test(value)) {
      if (value === '') {
        setFormData({ ...formData, [name]: value });
        return;
      }
      setFormData({ ...formData, [name]: Number(value) });
    }
  };

  const handleNoAnswerChange = (event: Event) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  // TODO: update updateScreen hook to not take in override uuid
  const handleContinueSubmit = (
    event: Event,
    errorController: ReturnType<typeof useErrorController>, // update this when validationFunctions is converted to typescript
    inputToBeValidated: string | number | Expense[] | SignUpInfo | HealthInsurance,
    stepId: number,
    questionName: string,
    uuid: string,
  ) => {
    event.preventDefault();
    errorController.incrementSubmitted();
    const hasError = errorController.updateError(inputToBeValidated, formData);
    const isZipcodeQuestionAndCountyIsEmpty = questionName === 'zipcode' && formData.county === '';
    const isEmptyAssets = questionName === 'householdAssets' && formData.householdAssets < 0;
    const isComingFromConfirmationPg = isCustomTypedLocationState(location.state)
      ? location.state.routedFromConfirmationPg
      : false;
    const isLastStep = questionName === stepDirectory.at(-1);

    if (!hasError) {
      if (isZipcodeQuestionAndCountyIsEmpty || isEmptyAssets) {
        return;
      } else if (questionName === 'householdSize') {
        const updatedHouseholdData = formData.householdData.slice(0, Number(formData.householdSize));
        const updatedFormData = { ...formData, householdData: updatedHouseholdData };
        updateScreen(updatedFormData, uuid);
        setFormData(updatedFormData);
        isComingFromConfirmationPg
          ? navigate(`/${whiteLabel}/${uuid}/confirm-information`)
          : navigate(`/${whiteLabel}/${uuid}/step-${stepId + 1}/1`);
      } else {
        updateScreen(formData, uuid);
        isComingFromConfirmationPg || isLastStep
          ? navigate(`/${whiteLabel}/${uuid}/confirm-information`)
          : navigate(`/${whiteLabel}/${uuid}/step-${stepId + 1}`);
      }
    }
  };

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
                    path="step-:id"
                    element={
                      <QuestionComponentContainer
                        key={window.location.href}
                        handleTextfieldChange={handleTextfieldChange}
                        handleContinueSubmit={handleContinueSubmit}
                        handleNoAnswerChange={handleNoAnswerChange}
                      />
                    }
                  />
                  <Route path="confirm-information" element={<Confirmation />} />
                  <Route
                    path="results/benefits"
                    element={<Results type="program" handleTextfieldChange={handleTextfieldChange} />}
                  />
                  <Route
                    path="results/near-term-needs"
                    element={<Results type="need" handleTextfieldChange={handleTextfieldChange} />}
                  />
                  <Route
                    path="results/benefits/:programId"
                    element={<Results type="program" handleTextfieldChange={handleTextfieldChange} />}
                  />
                  <Route
                    path="results/benefits/:programId/navigators"
                    element={<Results type="navigator" handleTextfieldChange={handleTextfieldChange} />}
                  />
                  <Route
                    path="results/more-help"
                    element={<Results type="help" handleTextfieldChange={handleTextfieldChange} />}
                  />
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
