import { JSXElementConstructor, ReactElement } from 'react';
import { MessageFunction, ValidationFunction } from './ErrorController';

export type QuestionName =
  | 'zipcode'
  | 'householdSize'
  | 'householdData'
  | 'hasExpenses'
  | 'householdAssets'
  | 'hasBenefits'
  | 'acuteHHConditions'
  | 'referralSource'
  | 'signUpInfo';

export type FormattedMessageType = ReactElement<any, string | JSXElementConstructor<any>>;
