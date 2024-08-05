import { States } from './state';
import MFBLogoCO from '../Assets/Logos/mfb_colorado_logo.png';
import MFBLogoNC from '../Assets/Logos/mfb_nc_logo.png';
import MFBDefaultLogo from '../Assets/Logos/mfb_default_logo_header.png';
import { coLogoAlt, coLogoSource, coShareLink, coTwoOneOneLink, ncLogoAlt, ncLogoSource } from '../Components/Referrer/referrerDataInfo';

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
      return [coLogoSource, coLogoAlt, coTwoOneOneLink, coShareLink];
    case States.NC:
      return [ncLogoSource, ncLogoAlt];
  }
};
