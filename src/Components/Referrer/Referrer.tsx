import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import Header from '../Header/Header';
import TwoOneOneFooterCO from '../TwoOneOneCOComponents/TwoOneOneFooterCO/TwoOneOneFooterCO';
import TwoOneOneHeaderCO from '../TwoOneOneCOComponents/TwoOneOneHeaderCO/TwoOneOneHeaderCO';
import Footer from '../Footer/Footer';
import BackToScreen from '../BackToScreen/BackToScreen';
import { useResultsContext } from '../Results/Results';
import NoProgramEligibleMessage from '../Results/NoProgramEligibleMessage';
import NcLink211Message from '../Results/NcLink211Message';
import CcigResultsMessage from '../CcigComponents/CcigResultsMessage';
import EnergyCalculatorFooter from '../Footer/PoweredByFooter';
import TwoOneOneHeaderNC from '../TwoOneOneNCComponents/TwoOneOneHeaderNC/TwoOneOneHeaderNC';
import TwoOneOneFooterNC from '../TwoOneOneNCComponents/TwoOneOneFooterNC/TwoOneOneFooterNC';

export const BrandedHeader = () => {
  const { formData, getReferrer } = useContext(Context);

  if (getReferrer('featureFlags').includes('211co')) {
    return <TwoOneOneHeaderCO />;
  }

  if (getReferrer('featureFlags').includes('211nc')) {
    return <TwoOneOneHeaderNC />;
  }

  return <Header />;
};

export const BrandedFooter = () => {
  const { formData, getReferrer } = useContext(Context);

  if (getReferrer('featureFlags').includes('211co')) {
    return <TwoOneOneFooterCO />;
  }

  if (getReferrer('featureFlags').includes('211nc')) {
    return <TwoOneOneFooterNC />;
  }

  if (getReferrer('featureFlags').includes('powered_by_mfb_footer')) {
    return <EnergyCalculatorFooter />;
  }

  return <Footer />;
};

export const ResultsMessageForNeeds = () => {
  const { getReferrer } = useContext(Context);
  const featureFlags = getReferrer('featureFlags');

  if (featureFlags.includes('nc_show_211_link')) {
    return <NcLink211Message />;
  }
  return null;
};

export const ResultsMessage = () => {
  const { formData } = useContext(Context);
  const { missingPrograms } = useResultsContext();

  if (formData.immutableReferrer === 'lgs' && missingPrograms) {
    return <BackToScreen />;
  }
  if (formData.immutableReferrer === 'ccig') {
    return <CcigResultsMessage />;
  }

  return <NoProgramEligibleMessage />;
};
