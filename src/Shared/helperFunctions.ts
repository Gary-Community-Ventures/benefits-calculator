import { States } from './state';
import MFBLogoCO from '../Assets/mfb_colorado_logo.png';
import MFBLogoNC from '../Assets/mfb_nc_logo.png';
import MFBDefaultLogo from '../Assets/mfb_default_logo_header.png';

export const getLogo = (state: States): string | undefined => {
  switch (state) {
    case States.CO:
      return MFBLogoCO;
    case States.NC:
      return MFBLogoNC;
    default:
      return MFBDefaultLogo;
  }
};

