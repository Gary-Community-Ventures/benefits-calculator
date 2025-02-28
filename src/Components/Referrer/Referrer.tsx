import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import Header from '../Header/Header';
import TwoOneOneFooterCO from '../TwoOneOneCOComponents/TwoOneOneFooterCO/TwoOneOneFooterCO';
import TwoOneOneHeaderCO from '../TwoOneOneCOComponents/TwoOneOneHeaderCO/TwoOneOneHeaderCO';
import Footer from '../Footer/Footer';
import BackToScreen from '../BackToScreen/BackToScreen';
import { useResultsContext } from '../Results/Results';
import NoProgramEligibleMessage from '../Results/NoProgramEligibleMessage';
import CcigResultsMessage from '../CcigComponents/CcigResultsMessage';
import TwoOneOneHeaderNC from '../TwoOneOneNCComponents/TwoOneOneHeaderNC/TwoOneOneHeaderNC';
import TwoOneOneFooterNC from '../TwoOneOneNCComponents/TwoOneOneFooterNC/TwoOneOneFooterNC';

export const BrandedHeader = () => {
  const { formData } = useContext(Context);

  if (formData.immutableReferrer === '211co') {
    return <TwoOneOneHeaderCO />;
  }
  if (formData.immutableReferrer === '211nc') {
    return <TwoOneOneHeaderNC />;
  }
  return <Header />;
};

export const BrandedFooter = () => {
  const { formData } = useContext(Context);

  if (formData.immutableReferrer === '211co') {
    return <TwoOneOneFooterCO />;
  }
  if (formData.immutableReferrer === '211nc') {
    return <TwoOneOneFooterNC />;
  }
  return <Footer />;
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
