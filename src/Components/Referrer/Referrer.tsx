import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import Header from '../Header/Header';
import TwoOneOneFooter from '../TwoOneOneComponents/TwoOneOneFooter/TwoOneOneFooter';
import TwoOneOneHeader from '../TwoOneOneComponents/TwoOneOneHeader/TwoOneOneHeader';
import Footer from '../Footer/Footer';
import BackToScreen from '../BackToScreen/BackToScreen';
import { useResultsContext } from '../Results/Results';
import NoProgramEligibleMessage from '../Results/NoProgramEligibleMessage';
import Link211Message from '../Results/Link211Message';
import Link211Message1 from '../Results/Link211Message1';
import CcigResultsMessage from '../CcigComponents/CcigResultsMessage';
import { useParams } from 'react-router-dom';
export const BrandedHeader = () => {
  const { formData } = useContext(Context);

  if (formData.immutableReferrer === '211co') {
    return <TwoOneOneHeader />;
  }
  return <Header />;
};

export const BrandedFooter = () => {
  const { formData } = useContext(Context);

  if (formData.immutableReferrer === '211co') {
    return <TwoOneOneFooter />;
  }
  return <Footer />;
};
export const ResultsMessageForNeeds = () => {
  const { formData } = useContext(Context);
  const { whiteLabel } = useParams();
  
  if (whiteLabel === 'nc')
  {
    return 
    <><Link211Message /><Link211Message1 /></>

  }
  
  return null;
}
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
  // return <Link211Message />
};
