import { useState } from 'react';


type ReferrerOptions<T> = {
  default: T;
  [key: string]: T;
};

export type ReferrerData = {
  theme: ReferrerOptions<string>;
  logoSource: ReferrerOptions<string>;
  logoAlt: ReferrerOptions<{ id: string; defaultMessage: string }>;
  logoFooterSource: ReferrerOptions<string>;
  logoFooterAlt: ReferrerOptions<{ id: string; defaultMessage: string }>;
  logoClass: ReferrerOptions<string>;
  twoOneOneLink: ReferrerOptions<string>;
  shareLink: ReferrerOptions<string>;
};


export default function useReferrer(referrerCode?: string, referrerData?: ReferrerData) {
  const [referrer, setReferrer] = useState<string | undefined>(referrerCode);

  function getReferrer(key: keyof ReferrerData) {
    if (referrerData === undefined) {
      throw new Error('referrerData is not loaded yet');
    }
    if (referrerData[key] === undefined) {
      throw new Error(`${key} is not in referrerData`);
    }
    return referrerData && (referrerData[key][referrer ?? 'default'] ?? referrerData[key]['default']);
  }

  return { getReferrer, setReferrer };
}
