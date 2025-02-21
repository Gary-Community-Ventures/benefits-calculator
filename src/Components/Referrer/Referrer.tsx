import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import Header from '../Header/Header';
import TwoOneOneFooter from '../TwoOneOneComponents/TwoOneOneFooter/TwoOneOneFooter';
import TwoOneOneHeader from '../TwoOneOneComponents/TwoOneOneHeader/TwoOneOneHeader';
import Footer from '../Footer/Footer';
import BackToScreen from '../BackToScreen/BackToScreen';
import { useResultsContext } from '../Results/Results';
import CcigResultsMessage from '../CcigComponents/CcigResultsMessage';
import NCTwoOneOneHeader from '../TwoOneOneComponents/TwoOneOneHeader/NCTwoOneOneHeader';
import NCTwoOneOneFooter from '../TwoOneOneComponents/TwoOneOneFooter/NCTwoOneOneFooter';

export const BrandedHeader = () => {
  const { formData } = useContext(Context);

  if (formData.immutableReferrer === '211co') {
    return <TwoOneOneHeader />;
  }
  if (formData.immutableReferrer === '211nc') {
    return <NCTwoOneOneHeader />;
  }
  return <Header />;
};

export const BrandedFooter = () => {
  const { formData } = useContext(Context);

  if (formData.immutableReferrer === '211co') {
    return <TwoOneOneFooter />;
  }
  if (formData.immutableReferrer === '211nc') {
    return <NCTwoOneOneFooter />;
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

  return null;
};
