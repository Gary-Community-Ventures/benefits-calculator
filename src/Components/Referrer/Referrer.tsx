import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import Header from '../Header/Header';
import TwoOneOneFooter from '../TwoOneOneComponents/TwoOneOneFooter/TwoOneOneFooter';
import TwoOneOneHeader from '../TwoOneOneComponents/TwoOneOneHeader/TwoOneOneHeader';
import Footer from '../Footer/Footer';
import BackToScreen from '../BackToScreen/BackToScreen';
import { useResultsContext } from '../Results/Results';
import NoProgramEligibleMessage from '../Results/NoProgramEligibleMessage';

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

export const ResultsMessage = () => {
  const { formData, getReferrer } = useContext(Context);
  const { missingPrograms } = useResultsContext();

  const { id, defaultMessage } = getReferrer('noResultMessage');

  if (formData.immutableReferrer === 'lgs' && missingPrograms) {
    return <BackToScreen />;
  }

  return <NoProgramEligibleMessage id={id} defaultMessage={defaultMessage} />;
};
