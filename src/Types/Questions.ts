import { JSXElementConstructor, ReactElement } from 'react';

export type QuestionName =
  | 'zipcode'
  | 'householdSize'
  | 'householdData'
  | 'ecHouseholdData'
  | 'hasExpenses'
  | 'householdAssets'
  | 'hasBenefits'
  | 'acuteHHConditions'
  | 'referralSource'
  | 'signUpInfo'
  | 'energyCalculatorElectricityProvider'
  | 'energyCalculatorGasProvider'
  | 'energyCalculatorExpenses'
  | 'energyCalculatorUtilityStatus';

export type FormattedMessageType = ReactElement<any, string | JSXElementConstructor<any>>;
