import { useState } from 'react';
import MFBLogo from '../../Assets/Logos/mfb_default_logo_header.png'
import BIAMFBLogo from '../../Assets/biamfbcombinedlogo.png';
import JHSAMFBLogo from '../../Assets/JeffcoAssets/jeffcobrand.png';
import VELogo from '../../Assets/VillageExchange/villageExchangeLogo.png';
import CCHMFBLogo from '../../Assets/ColoradoCoalitionHomeless/cchcobrand.png';
import LGSLogo from '../../Assets/LetsGetSet/lgsLogo.png';
import GACLogo from '../../Assets/GetAheadColorado/gaclogo.png';
import FIRCLogo from '../../Assets/FircCobrand/FIRCLogo.png';
import COMFBLogo from '../../Assets/colorado-mfb-logo.png';
import DHSMFBLogo from '../../Assets/DenverHumanServices/denverHSLogo.png';
import { getReferrerInfo } from '../../Shared/helperFunctions';
import { useConfig } from '../Config/configHook';

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


export const coLogoSource = {
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
}

export const coLogoAlt = {    default: 'MyFriendBen home page button',
  bia: 'Benefits in Action and MyFriendBen home page button',
  jeffcoHS: 'Jeffco Human Services and MyFriendBen home page button',
  jeffcoHSCM: 'Jeffco Human Services and MyFriendBen home page button',
  cch: 'Colorado Coalition for the Homeless and MyFriendBen home page button',
  lgs: "Let's Get Set home page button",
  gac: 'Get Ahead Colorado home page button',
  fircsummitresourcecenter: 'Firc Summit Resource Center',
  coBenefits: 'MyFriendBen home page button',
  dhs: 'Denver Human Services and MyFriendBen home page button',
}


const referrerData: ReferrerData = {
  theme: {
    default: 'default',
    '211': 'twoOneOne',
  },
  logoSource: coLogoSource,
  logoAlt: coLogoAlt,
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
    //probably just leave 211, without co ending
    '211': 'https://screener.myfriendben.org?referrer=211co',
  },
};

// export default function useReferrer(referrerCode?: string) {
//   const [referrer, setReferrer] = useState<string | undefined>(referrerCode);
// const getReferrerInfo: Record<string, any> = useConfig('referrerData');
// // const getReferrerInfo = useConfig('referrerData');
//   function getReferrer(key: keyof ReferrerData) {
//  console.log("getReferrerInfo")
//     console.log(getReferrerInfo[key][ 'default'])
//     // return "banana"
//     return getReferrerInfo[key][referrer ?? 'default'] ?? getReferrerInfo[key]['default'];
//   }
//   getReferrer

//   return { getReferrer, setReferrer };
// }



export default function useReferrer(referrerCode?: string) {
  const [referrer, setReferrer] = useState<string | undefined>(referrerCode);


  const referrerData2 = useConfig('referrerData') as ReferrerData;
  // console.log("footerwrap")
  // console.log(referrerData2);

  function getReferrer(key: keyof ReferrerData) {
    console.log(referrerData2[key]);
    if(Object.keys(referrerData2).length === 0) {return} 
    else{
      console.log(referrerData2, key);
      return referrerData2[key][referrer ?? 'default'] ?? referrerData2[key]['default'];
      
  }}

  return { getReferrer, setReferrer };
}