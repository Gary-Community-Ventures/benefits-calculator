import MFBDEFAULT from '../../Assets/Logos/mfb_default_logo_header.png';
import MFBCOLogo from '../../Assets/Logos/mfb_colorado_logo.png';
import MFBNCLogo from '../../Assets/Logos/mfb_nc_logo.png';
import BIAMFBLogo from '../../Assets/COWhiteLabels/BIA/biamfbcombinedlogo.png';
import JHSAMFBLogo from '../../Assets/COWhiteLabels/JeffcoAssets/jeffcobrand.png';
import VELogo from '../../Assets/COWhiteLabels/VillageExchange/villageExchangeLogo.png';
import CCHMFBLogo from '../../Assets/COWhiteLabels/ColoradoCoalitionHomeless/cchcobrand.png';
import LGSLogo from '../../Assets/COWhiteLabels/LetsGetSet/lgsLogo.png';
import GACLogo from '../../Assets/COWhiteLabels/GetAheadColorado/gaclogo.png';
import FIRCLogo from '../../Assets/COWhiteLabels/FircCobrand/FIRCLogo.png';
import COMFBLogo from '../../Assets/colorado-mfb-logo.png';
import DHSMFBLogo from '../../Assets/COWhiteLabels/DenverHumanServices/denverHSLogo.png';
import CCIGLogo from '../../Assets/COWhiteLabels/CCIG/ccigLogo.png';
import ECMFBLogo from '../../Assets/COWhiteLabels/EagleCounty/ECMFBLogo.png';

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
  EC_MFBLogo: ECMFBLogo,
};

export type LogoSource = keyof typeof logoMap;

export const renderLogoSource = (sourceLabel: LogoSource, logoAlt: string, logoClass: string) => {
  console.log({sourceLabel})
  const logoSrc = logoMap[sourceLabel] || MFBDEFAULT;
  return <img src={logoSrc} alt={logoAlt} className={logoClass} />;
};
