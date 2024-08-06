import { forwardRef, useState, useContext, ReactElement } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from 'react-share';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';
import CheckIcon from '@mui/icons-material/Check';
import { Context } from '../Wrapper/Wrapper';
import dataLayerPush from '../../Assets/analytics';
import './Share.css';
import { useConfig } from '../Config/configHook';
import { getReferrerInfo } from '../../Shared/helperFunctions';
import { coShareLink } from '../Referrer/referrerDataInfo';

const Share = forwardRef(function Share() {
  const [copied, setCopied] = useState(false);
  const { formData, getReferrer } = useContext(Context);
  const intl = useIntl();

  const labels = {
    email: intl.formatMessage({
      id: 'results.share-emailAL',
      defaultMessage: 'Email',
    }),
    copyLink: intl.formatMessage({
      id: 'results.share-copyLinkAL',
      defaultMessage: 'Copy Link',
    }),
    copied: intl.formatMessage({
      id: 'results.share-copiedAL',
      defaultMessage: 'Copied',
    }),
  };
  const referrer = formData.immutableReferrer ? formData.immutableReferrer : 'default';
  const getShareLinkfromConfig: Record<string, any> = useConfig('referrerData');
  const getShareLinkArray: Record<string, any>[] = getReferrerInfo(Number(getShareLinkfromConfig?.shareLink)) ?? [coShareLink];
  const shareLink = getShareLinkArray[3][referrer] ?? getShareLinkArray[3]['default'];


  const iconSize = { color: '#fff', fontSize: '2rem' };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);    
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  const Icon = ({ name, children }: { name: string; children: ReactElement }) => {
    return <span className={`${name} icon`}>{children}</span>;
  };

  const trackOutboundLinks = (label: string) => {
    return () => {
      dataLayerPush({
        event: 'media_share',
        action: 'share link click',
        label: label,
      });
    };
  };

  return (
    <div>
      <div className="share-text-container">
        <p className="white-font">
          <FormattedMessage id="results.share-header" defaultMessage="Share MyFriendBen Via:" />
        </p>
      </div>
      <div className="row-group">
        <FacebookShareButton url={shareLink} onClick={trackOutboundLinks('Share to Facebook')}>
          <Icon name="facebook">
            <FacebookIcon sx={iconSize} />
          </Icon>
        </FacebookShareButton>
        <TwitterShareButton url={shareLink} onClick={trackOutboundLinks('Share to Twitter')}>
          <Icon name="twitter">
            <XIcon sx={iconSize} />
          </Icon>
        </TwitterShareButton>
        <EmailShareButton url={shareLink} onClick={trackOutboundLinks('Share With Email')}>
          <Icon name={labels.email}>
            <EmailIcon sx={iconSize} />
          </Icon>
        </EmailShareButton>
        <WhatsappShareButton url={shareLink} onClick={trackOutboundLinks('Share With WhatsApp')}>
          <Icon name="whatsApp">
            <WhatsAppIcon sx={iconSize} />
          </Icon>
        </WhatsappShareButton>
        <LinkedinShareButton url={shareLink} onClick={trackOutboundLinks('Share With LinkedIn')}>
          <Icon name="linkedIn">
            <LinkedInIcon sx={iconSize} />
          </Icon>
        </LinkedinShareButton>
        <button onClick={copyLink} className="button-no-format" aria-label={copied ? labels.copied : labels.copyLink}>
          <Icon name={copied ? labels.copied : labels.copyLink}>
            {copied ? <CheckIcon sx={iconSize} /> : <LinkIcon sx={iconSize} />}
          </Icon>
        </button>
      </div>
    </div>
  );
});

export default Share;
