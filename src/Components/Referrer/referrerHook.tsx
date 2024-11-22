import { useState } from 'react';
import { QuestionName } from '../../Types/Questions';

type ReferrerOptions<T> = {
  default: T;
  [key: string]: T;
};

export type ReferrerDataValue = any;

export type ReferrerData = {
  theme: ReferrerOptions<string>;
  logoSource: ReferrerOptions<string>;
  logoAlt: ReferrerOptions<{ id: string; defaultMessage: string }>;
  logoFooterSource: ReferrerOptions<string>;
  logoFooterAlt: ReferrerOptions<{ id: string; defaultMessage: string }>;
  logoClass: ReferrerOptions<string>;
  twoOneOneLink: ReferrerOptions<string>;
  shareLink: ReferrerOptions<string>;
  stepDirectory: ReferrerOptions<QuestionName[]>;
};

export default function useReferrer(referrerCode?: string, referrerData?: ReferrerData) {
  const [referrer, setReferrer] = useState<string | undefined>(referrerCode);

  function getReferrer(key: keyof ReferrerData, defaultValue?: ReferrerDataValue): ReferrerDataValue {
    if (referrerData === undefined) {
      if (defaultValue) {
        return defaultValue;
      }
      throw new Error('referrerData is not loaded yet. Consider adding a default value.');
    }
    if (referrerData[key] === undefined) {
      throw new Error(`${key} is not in referrerData`);
    }
    return referrerData && (referrerData[key][referrer ?? 'default'] ?? referrerData[key]['default']);
  }

  return { getReferrer, setReferrer };
}
