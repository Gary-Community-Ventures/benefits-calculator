import { States } from './state';
import MFBLogoCO from '../Assets/Logos/mfb_colorado_logo.png';
import MFBLogoNC from '../Assets/Logos/mfb_nc_logo.png';
import MFBDefaultLogo from '../Assets/Logos/mfb_default_logo_header.png';
import { coLogoAlt, coLogoSource, ncLogoAlt, ncLogoSource } from '../Components/Referrer/referrerLogoInfo';

export const getLogo = (state: States): string => {
  switch (state) {
    case States.CO:
      return MFBLogoCO;
    case States.NC:
      return MFBLogoNC;
    default:
      return MFBDefaultLogo;
  }
};

export const getReferrerInfo = (state: States) => {
  switch (state) {
    case States.CO:
      return [coLogoSource, coLogoAlt];
    case States.NC:
      return [ncLogoSource, ncLogoAlt];
  }
};
