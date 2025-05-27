import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { useResultsContext } from './Results';

export default function NoProgramEligibleMessage() {
  const { getReferrer } = useContext(Context);
  const { programs, energyCalculatorRebateCategories } = useResultsContext();
  const noResultsMessage = getReferrer('noResultMessage');

  if (programs.length !== 0 || energyCalculatorRebateCategories.length !== 0) {
    return null;
  }
  return <div className="back-to-screen-message">{noResultsMessage}</div>;
}
