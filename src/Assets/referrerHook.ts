import { useState } from 'react';
import MFBLogo from '../../Assets/logo.png';
import BIAMFBLogo from '../../Assets/biamfbcombinedlogo.png';
import JHSAMFBLogo from '../../Assets/JeffcoAssets/jeffcobrand.png';
import VELogo from '../../Assets/VillageExchange/villageExchangeLogo.png';

type ReferrerOptions<T> = {
  default: T;
  [key: string]: T;
};

type ReferrerData = {
  theme: ReferrerOptions<string>;
  logoSource: ReferrerOptions<string>;
  logoAlt: ReferrerOptions<string>;
  logoClass: ReferrerOptions<string>;
  twoOneOneLink: ReferrerOptions<string>;
  shareLink: ReferrerOptions<string>;
};

const referrerData: ReferrerData = {
  theme: {
    default: 'default',
    '221co': '211co',
  },
  logoSource: {
    default: MFBLogo,
    bia: BIAMFBLogo,
    jeffcoHS: JHSAMFBLogo,
    jeffcoHSCM: JHSAMFBLogo,
    villageExchange: VELogo,
  },
  logoAlt: {
    default: 'my friend ben home page button',
    bia: 'benefits in action and my friend ben home page button',
    jeffcoHS: 'jeffco human services and my friend ben home page button',
    jeffcoHSCM: 'jeffco human services and my friend ben home page button',
  },
  logoClass: {
    default: 'logo',
    jeffcoHS: 'big-logo logo',
    jeffcoHSCM: 'big-logo logo',
    villageExchange: 'big-logo logo',
  },
  twoOneOneLink: {
    default: 'https://www.211colorado.org/?utm_source=myfriendben&utm_medium=inlink&utm_campaign=organic&utm_id=211mfb',
    '211co':
      'https://www.211colorado.org/?utm_source=myfriendben&utm_medium=inlink&utm_campaign=whitelabel&utm_id=211mfb',
  },
  shareLink: {
    default: 'https://www.myfriendben.org/',
    '211co': 'https://screener.myfriendben.org?referrer=211co',
  },
};

export default function useReferrer(referrerCode?: string) {
  const [referrer, setReferrer] = useState<string | undefined>(referrerCode);

  function getReferrer(id: string) {
    if (referrerData === undefined) {
      throw new Error('Invalid id');
    }

    return referrerData[id as keyof ReferrerData][referrer ?? 'default'];
  }

  return [getReferrer, setReferrer];
}
