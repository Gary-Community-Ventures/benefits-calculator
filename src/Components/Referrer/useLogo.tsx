import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { MessageDescriptor, useIntl } from 'react-intl';
import { LogoSource, renderLogoSource } from '../Referrer/referrerDataInfo';
import { ReferrerData } from './referrerHook';

export const useLogo = (src: keyof ReferrerData, alt: keyof ReferrerData, className: string) => {
  const { getReferrer } = useContext(Context);
  const intl = useIntl();

  const logoSourceValue = getReferrer(src) as LogoSource;
  const logoAlt = getReferrer(alt) as MessageDescriptor;

  const logo = renderLogoSource(logoSourceValue, intl.formatMessage(logoAlt), className);

  return logo;
};
