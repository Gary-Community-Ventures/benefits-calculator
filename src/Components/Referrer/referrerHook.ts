import { useState } from 'react';


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


// const referrerData: ReferrerData = {
//   theme: {
//     default: 'default',
//     '211': 'twoOneOne',
//   },
//   logoSource: coLogoSource,
//   logoAlt: coLogoAlt,
//   logoClass: {
//     default: 'logo',
//   },
//   twoOneOneLink: {
//     default: 'https://www.211colorado.org/?utm_source=myfriendben&utm_medium=inlink&utm_campaign=organic&utm_id=211mfb',
//     '211co':
//       'https://www.211colorado.org/?utm_source=myfriendben&utm_medium=inlink&utm_campaign=whitelabel&utm_id=211mfb',
//   },
//   shareLink: {
//     default: 'https://www.myfriendben.org/',
//     //probably just leave 211, without co ending
//     '211': 'https://screener.myfriendben.org?referrer=211co',
//   },
// };

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

export default function useReferrer(referrerCode?: string, referrerData?: ReferrerData | undefined) {
  // console.log(referrerCode)
  const [referrer, setReferrer] = useState<string | undefined>(referrerCode);

  // console.log('hello', referrer);
  

  function getReferrer(key: keyof ReferrerData) {
    console.log('hello from get referrer', referrerData);
    return referrerData && (referrerData[key][referrer ?? 'default'] ?? referrerData[key]['default']);
  }

  return { getReferrer, setReferrer };
}
