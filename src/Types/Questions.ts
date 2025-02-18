import { JSXElementConstructor, ReactElement } from 'react';

export type QuestionName =
  | 'zipcode'
  | 'householdSize'
  | 'householdData'
  | 'hasExpenses'
  | 'householdAssets'
  | 'hasBenefits'
  | 'acuteHHConditions'
  | 'referralSource'
  | 'signUpInfo'
  | 'energyCalculatorHouseholdData'
  | 'energyCalculatorElectricityProvider'
  | 'energyCalculatorGasProvider'
  | 'energyCalculatorExpenses'
  | 'energyCalculatorUtilityStatus'
  | 'energyCalculatorApplianceStatus';

export type FormattedMessageType = ReactElement<any, string | JSXElementConstructor<any>>;
