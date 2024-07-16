import { States } from './state';
import MFBLogoCO from '../Assets/co_logo_header.png';
import MFBLogoNC from '../Assets/nc_logo_header_white.png';

export const getFooterLogo = (state: States): string => {

  switch (state) {
    case States.CO:
      return MFBLogoCO;
    case States.NC:
      console.log(MFBLogoNC);
      return MFBLogoNC;
  }
};

export const getHeaderLogo = (state: States): string => {
  switch (state) {
    case States.CO:
      return MFBLogoCO;
    case States.NC:
      return MFBLogoNC;
  }
};

