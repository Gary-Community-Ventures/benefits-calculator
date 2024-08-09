import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { MessageDescriptor, useIntl } from 'react-intl';
import { LogoSource, renderLogoSource } from '../Referrer/referrerDataInfo';

export const useLogo = (className: string) => {
  const { getReferrer } = useContext(Context);
  const intl = useIntl();

  const logoSourceValue = getReferrer('logoSource') as LogoSource;
  const logoAlt = getReferrer('logoAlt') as MessageDescriptor;
  
  const logo = renderLogoSource(logoSourceValue, intl.formatMessage(logoAlt), className);

  return logo;
};
