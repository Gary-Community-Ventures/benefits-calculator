import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import Header from '../Header/Header';
import TwoOneOneFooter from '../TwoOneOneComponents/TwoOneOneFooter/TwoOneOneFooter';
import TwoOneOneHeader from '../TwoOneOneComponents/TwoOneOneHeader/TwoOneOneHeader';
import { FormattedMessage } from 'react-intl';

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

type ResultsHeaderProps = {
  programCount: number;
  programsValue: number;
  taxCreditsValue: number;
};

export const BrandedResultsHeader = ({ programsValue, taxCreditsValue, programCount }: ResultsHeaderProps) => {
  const { formData } = useContext(Context);

  if (formData.immutableReferrer === 'lgs') {
    return (
      <h1 className="bottom-border program-value-header">
        {programCount}
        <FormattedMessage
          id="results.return-programsUpToLabel"
          defaultMessage=" programs with an estimated value of "
        />
        ${Math.round(programsValue / 12).toLocaleString()}
        <FormattedMessage
          id="results.return-perMonthLabel_lsg"
          defaultMessage=" monthly in cash or reduced expenses for you to consider"
        />
      </h1>
    );
  }

  return (
    <h1 className="bottom-border program-value-header">
      {programCount}
      <FormattedMessage id="results.return-programsUpToLabel" defaultMessage=" programs with an estimated value of " />$
      {Math.round(programsValue / 12).toLocaleString()}
      <FormattedMessage id="results.return-perMonthLabel" defaultMessage=" monthly in cash or reduced expenses, and " />
      ${Math.round(taxCreditsValue).toLocaleString()}
      <FormattedMessage id="results.return-taxCredits" defaultMessage=" in tax credits for you to consider " />
    </h1>
  );
};
