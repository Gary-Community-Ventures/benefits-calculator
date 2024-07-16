import { States } from "./state";
import MFBLogoCO from '../Assets/co_logo_header.png'
import MFBLogoNC from '../Assets/nc_logo_header_white.png';

// export type HeaderLogoOptions = 'MFBLogoCO' | 'MFBLogoNC'

// export const headerLogoOptionsString :
//   { [key in States] :any} = {
//     [States.CO]: 'MFBLogoCO',
//     [States.NC]: 'MFBLogoNC'
//   }

export const getFooterLogo = (state:States):string => {
  switch(state){
    case States.CO:
      return MFBLogoCO;
    case States.NC:
      return MFBLogoNC
  }
}

export const getHeaderLogo = (state:States):string => {
  switch(state){
    case States.CO:
      return MFBLogoCO;
    case States.NC:
      return MFBLogoNC
  }
}

// export const getHeaderLogo = (state: States, logo:any): string => {

//   switch (state) {
//     case States.CO:
//       logo 
//       break;
//     case States.NC:
//       logo ;
//       break;
//     // Add more cases as needed
//     default:
//       logo ; // Assuming you have a default logo
//   }
//   return logo;
// }