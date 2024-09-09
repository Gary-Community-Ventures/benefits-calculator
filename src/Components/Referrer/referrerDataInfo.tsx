import MFBDEFAULT from '../../Assets/Logos/mfb_default_logo_header.png';
import MFBCOLogo from '../../Assets/Logos/mfb_colorado_logo.png';
import MFBNCLogo from '../../Assets/Logos/mfb_nc_logo.png';
import BIAMFBLogo from '../../Assets/WhiteLabels/BIA/biamfbcombinedlogo.png';
import JHSAMFBLogo from '../../Assets/WhiteLabels/JeffcoAssets/jeffcobrand.png';
import VELogo from '../../Assets/WhiteLabels/VillageExchange/villageExchangeLogo.png';
import CCHMFBLogo from '../../Assets/WhiteLabels/ColoradoCoalitionHomeless/cchcobrand.png';
import LGSLogo from '../../Assets/WhiteLabels/LetsGetSet/lgsLogo.png';
import GACLogo from '../../Assets/WhiteLabels/GetAheadColorado/gaclogo.png';
import FIRCLogo from '../../Assets/WhiteLabels/FircCobrand/FIRCLogo.png';
import COMFBLogo from '../../Assets/colorado-mfb-logo.png';
import DHSMFBLogo from '../../Assets/WhiteLabels/DenverHumanServices/denverHSLogo.png';
import CCIGLogo from '../../Assets/WhiteLabels/CCIG/ccigLogo.png';

const logoMap = {
  MFB_COLogo: MFBCOLogo,
  MFB_NCLogo: MFBNCLogo,
  BIA_MFBLogo: BIAMFBLogo,
  JHS_AMFBLogo: JHSAMFBLogo,
  JHSA_MFBLogo: JHSAMFBLogo,
  VE_Logo: VELogo,
  CCH_MFBLogo: CCHMFBLogo,
  LGS_Logo: LGSLogo,
  GAC_Logo: GACLogo,
  FIRC_Logo: FIRCLogo,
  CO_MFBLogo: COMFBLogo,
  DHS_MFBLogo: DHSMFBLogo,
  CCIG_Logo: CCIGLogo,
};

export type LogoSource = keyof typeof logoMap;

export const renderLogoSource = (sourceLabel: LogoSource, logoAlt: string, logoClass: string) => {
  const logoSrc = logoMap[sourceLabel] || MFBDEFAULT;
  return <img src={logoSrc} alt={logoAlt} className={logoClass} />;
};
