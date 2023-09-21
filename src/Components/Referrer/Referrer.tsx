import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import Header from '../Header/Header';
import TwoOneOneFooter from '../TwoOneOneComponents/TwoOneOneFooter/TwoOneOneFooter';
import TwoOneOneHeader from '../TwoOneOneComponents/TwoOneOneHeader/TwoOneOneHeader';

type HeaderProps = {
  handleTextFieldChange: (event: Event) => void;
};

export const BrandedHeader = ({ handleTextFieldChange }: HeaderProps) => {
  const { formData } = useContext(Context);

  if (formData.immutableReferrer === '211co') {
    return <TwoOneOneHeader handleTextfieldChange={handleTextFieldChange} />;
  }
  return <Header handleTextfieldChange={handleTextFieldChange} />;
};

export const BrandedFooter = () => {
  const { formData } = useContext(Context);

  if (formData.immutableReferrer === '211co') {
    return <TwoOneOneFooter />;
  }
  return <></>;
};
