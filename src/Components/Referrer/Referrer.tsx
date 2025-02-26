import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import Header from '../Header/Header';
import TwoOneOneFooter from '../TwoOneOneComponents/TwoOneOneFooter/TwoOneOneFooter';
import TwoOneOneHeader from '../TwoOneOneComponents/TwoOneOneHeader/TwoOneOneHeader';
import Footer from '../Footer/Footer';
import BackToScreen from '../BackToScreen/BackToScreen';
import { useResultsContext } from '../Results/Results';
import NoProgramEligibleMessage from '../Results/NoProgramEligibleMessage';
import NcLink211Message from '../Results/NcLink211Message';
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
  const { getReferrer } = useContext(Context);
  const featureFlags = getReferrer('featureFlags');
  console.log('ResultsMessageForNeeds - featureFlags:', featureFlags);
  const { whiteLabel } = useParams(); 
  // if (getReferrer('featureFlags').includes('nc_show_211_link')) 
  if (whiteLabel === 'nc')
  {    
    return  <NcLink211Message />
  }
  // const featureFlagsArray = Array.isArray(featureFlags)
  //   ? featureFlags
  //   : [featureFlags._label];

  // if (featureFlagsArray.includes('nc_show_211_link')) {
  //   return <NcLink211Message />;
  // }
  
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
};
