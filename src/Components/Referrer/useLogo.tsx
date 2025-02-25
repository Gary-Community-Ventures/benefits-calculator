import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { MessageDescriptor, useIntl } from 'react-intl';
import { renderLogoSource } from '../Referrer/referrerDataInfo';
import { ReferrerData } from './referrerHook';

export const useLogo = (src: keyof ReferrerData, alt: keyof ReferrerData, className: string) => {
  const { getReferrer } = useContext(Context);
  const intl = useIntl();

  const logoSourceValue = getReferrer(src) as string;
  const logoAlt = getReferrer(alt) as MessageDescriptor;

  // Apply special class for NC footer logo
  const finalClassName = logoSourceValue.trim() === 'MFB_NCFooterLogo' 
    ? `${className} footer-logo-nc`
    : className;

  return renderLogoSource(logoSourceValue.trim(), intl.formatMessage(logoAlt), finalClassName);
};
