import { useState } from 'react';
import { QuestionName } from '../../Types/Questions';

type ReferrerOptions<T> = {
  default: T;
  [key: string]: T | undefined;
};

export type ReferrerData = {
  theme: ReferrerOptions<string>;
  logoSource: ReferrerOptions<string>;
  logoAlt: ReferrerOptions<{ id: string; defaultMessage: string }>;
  logoFooterSource: ReferrerOptions<string>;
  logoFooterAlt: ReferrerOptions<{ id: string; defaultMessage: string }>;
  logoClass: ReferrerOptions<string>;
  shareLink: ReferrerOptions<string>;
  stepDirectory: ReferrerOptions<QuestionName[]>;
  featureFlags: ReferrerOptions<string[]>;
};

export type ReferrerDataValue<T extends keyof ReferrerData> = T extends
  | 'theme'
  | 'logoSource'
  | 'logoFooterSource'
  | 'logoClass'
  | 'shareLink'
  ? string
  : T extends 'logoAlt' | 'logoFooterAlt'
  ? { id: string; defaultMessage: string }
  : T extends 'stepDirectory'
  ? QuestionName[]
  : T extends 'featureFlags'
  ? string[]
  : never;

export default function useReferrer(referrerCode?: string, referrerData?: ReferrerData) {
  const [referrer, setReferrer] = useState<string | undefined>(referrerCode);

  function getReferrer<T extends keyof ReferrerData>(
    key: T,
    defaultValue?: ReferrerDataValue<T>,
  ): ReferrerDataValue<T> {
    if (referrerData === undefined) {
      if (defaultValue) {
        return defaultValue;
      }
      throw new Error('referrerData is not loaded yet. Consider adding a default value.');
    }

    if (referrerData[key] === undefined) {
      throw new Error(`${key} is not in referrerData`);
    }

    return (referrerData[key][referrer ?? 'default'] ?? referrerData[key].default) as ReferrerDataValue<T>;
  }

  return { getReferrer, setReferrer };
}
