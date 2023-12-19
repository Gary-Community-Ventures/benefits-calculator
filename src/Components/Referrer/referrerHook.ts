import { useState } from 'react';
import MFBLogo from '../../Assets/logo.png';
import BIAMFBLogo from '../../Assets/biamfbcombinedlogo.png';
import JHSAMFBLogo from '../../Assets/JeffcoAssets/jeffcobrand.png';
import VELogo from '../../Assets/VillageExchange/villageExchangeLogo.png';
import CCHMFBLogo from '../../Assets/ColoradoCoalitionHomeless/cchcobrand.png';
import LGSLogo from '../../Assets/LetsGetSet/lgsLogo.png';

type ReferrerOptions<T> = {
  default: T;
  [key: string]: T;
};

export type ReferrerData = {
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
    '211co': 'twoOneOne',
  },
  logoSource: {
    default: MFBLogo,
    bia: BIAMFBLogo,
    jeffcoHS: JHSAMFBLogo,
    jeffcoHSCM: JHSAMFBLogo,
    villageExchange: VELogo,
    cch: CCHMFBLogo,
    lgs: LGSLogo,
  },
  logoAlt: {
    default: 'MyFriendBen home page button',
    bia: 'Benefits in Action and MyFriendBen home page button',
    jeffcoHS: 'Jeffco Human Services and MyFriendBen home page button',
    jeffcoHSCM: 'Jeffco Human Services and MyFriendBen home page button',
    cch: 'Colorado Coalition for the Homeless and MyFriendBen home page button',
    lgs: "Let's Get Set home page button",
  },
  logoClass: {
    default: 'logo',
    jeffcoHS: 'big-logo logo',
    jeffcoHSCM: 'big-logo logo',
    villageExchange: 'big-logo logo',
    cch: 'big-logo logo',
    lgs: 'logo',
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

  function getReferrer(key: keyof ReferrerData) {
    return referrerData[key][referrer ?? 'default'] ?? referrerData[key]['default'];
  }

  return { getReferrer, setReferrer };
}
