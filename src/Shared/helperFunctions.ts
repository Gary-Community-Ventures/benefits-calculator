import { States } from './state';
import MFBLogoCO from '../Assets/co_logo_header.png';
import MFBLogoNC from '../Assets/nc_logo_header_white.png';

export const getLogo = (state: States): string => {
  switch (state) {
    case States.CO:
      return MFBLogoCO;
    case States.NC:
      return MFBLogoNC;
  }
};

