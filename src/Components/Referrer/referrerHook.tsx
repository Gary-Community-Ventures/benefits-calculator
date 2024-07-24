import { useState } from 'react';
import MFBLogo from '../../Assets/logo.png';
import BIAMFBLogo from '../../Assets/biamfbcombinedlogo.png';
import JHSAMFBLogo from '../../Assets/JeffcoAssets/jeffcobrand.png';
import VELogo from '../../Assets/VillageExchange/villageExchangeLogo.png';
import CCHMFBLogo from '../../Assets/ColoradoCoalitionHomeless/cchcobrand.png';
import LGSLogo from '../../Assets/LetsGetSet/lgsLogo.png';
import GACLogo from '../../Assets/GetAheadColorado/gaclogo.png';
import FIRCLogo from '../../Assets/FircCobrand/FIRCLogo.png';
import COMFBLogo from '../../Assets/colorado-mfb-logo.png';
import DHSMFBLogo from '../../Assets/DenverHumanServices/denverHSLogo.png';
import { FormattedMessage } from 'react-intl';

type ReferrerOptions<T> = {
  default: T;
  [key: string]: T;
};

export type ReferrerData = {
  theme: ReferrerOptions<string>;
  logoSource: ReferrerOptions<string>;
  logoAlt: ReferrerOptions<{ id: string; defaultMessage: string }>;
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
    gac: GACLogo,
    fircsummitresourcecenter: FIRCLogo,
    coBenefits: COMFBLogo,
    dhs: DHSMFBLogo,
  },
  logoAlt: {
    // FormattedMessage does not work.
    default: { id: 'referrerHook.logoAlts.default', defaultMessage: 'MyFriendBen home page button' },
    bia: { id: 'referrerHook.logoAlts.bia', defaultMessage: 'Benefits in Action and MyFriendBen home page button' },
    jeffcoHS: {
      id: 'referrerHook.logoAlts.jeffcoHS',
      defaultMessage: 'Jeffco Human Services and MyFriendBen home page button',
    },
    jeffcoHSCM: {
      id: 'referrerHook.logoAlts.jeffcoHSCM',
      defaultMessage: 'Jeffco Human Services and MyFriendBen home page button',
    },
    cch: {
      id: 'referrerHook.logoAlts.cch',
      defaultMessage: 'Colorado Coalition for the Homeless and MyFriendBen home page button',
    },
    lgs: { id: 'referrerHook.logoAlts.lgs', defaultMessage: "Let's Get Set home page button" },
    gac: { id: 'referrerHook.logoAlts.gac', defaultMessage: 'Get Ahead Colorado home page button' },
    fircsummitresourcecenter: {
      id: 'referrerHook.logoAlts.fircsummitresourcecenter',
      defaultMessage: 'Firc Summit Resource Center',
    },
    coBenefits: { id: 'referrerHook.logoAlts.coBenefits', defaultMessage: 'MyFriendBen home page button' },
    dhs: { id: 'referrerHook.logoAlts.dhs', defaultMessage: 'Denver Human Services and MyFriendBen home page button' },
  },
  logoClass: {
    default: 'logo',
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
