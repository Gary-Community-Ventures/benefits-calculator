import { forwardRef, useState, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookMessengerIcon,
} from 'react-share';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkIcon from '@mui/icons-material/Link';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Context } from '../../Wrapper/Wrapper';
import dataLayerPush from '../../../Assets/analytics';
import { Stack } from '@mui/material';
import './LancShare.css';

type LancShareProps = {
  close: () => void;
};

const LancShareNC = ({ close }: LancShareProps) => {
  const [copied, setCopied] = useState(false);
  const { getReferrer } = useContext(Context);
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

  const shareUrl = getReferrer('shareLink');

  const appId = '1268913277361574';

  const iconSize = { fontSize: '1.3rem' };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  const Icon = ({ name, children, color }: { name: string; children: React.ReactNode; color: string }) => {
    return (
      <span className={`${color} icon`}>
        {children}
        <span className="lanc-icon-name">{name}</span>
      </span>
    );
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

  const closeALProps = {
    id: 'share.closeAL',
    defaultMessage: 'close',
  };

  return (
    <Stack className="lanc-share-container">
      <IconButton aria-label={intl.formatMessage(closeALProps)} onClick={close} className="lanc-share-close">
        <CloseIcon />
      </IconButton>
      <h2 className="lanc-share-header">
        <FormattedMessage id="results.lanc-share-header" defaultMessage="Share MyFriendBen with a friend:" />
      </h2>
      <div className="lanc-share-icons">
        <div className="lanc-row-group">
          <FacebookShareButton url={shareUrl} onClick={trackOutboundLinks('Share to Facebook')}>
            <Icon name="Facebook" color="lanc-fb">
              <FacebookIcon sx={iconSize} />
            </Icon>
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} onClick={trackOutboundLinks('Share to Twitter')}>
            <Icon name="Twitter" color="lanc-twitter">
              <TwitterIcon sx={iconSize} />
            </Icon>
          </TwitterShareButton>
        </div>
        <div className="lanc-row-group">
          <WhatsappShareButton url={shareUrl} onClick={trackOutboundLinks('Share With WhatsApp')}>
            <Icon name="WhatsApp" color="lanc-whatsApp">
              <WhatsAppIcon sx={iconSize} />
            </Icon>
          </WhatsappShareButton>
          <FacebookMessengerShareButton
            url={shareUrl}
            appId={appId}
            onClick={trackOutboundLinks('Share With Facebook Messenger')}
          >
            <Icon name="Messenger" color="lanc-messenger">
              <FacebookMessengerIcon size={20.5} />
            </Icon>
          </FacebookMessengerShareButton>
          <button onClick={copyLink} className="copy-link-btn">
            <Icon name={copied ? labels.copied : labels.copyLink} color="lanc-gray">
              {copied ? <CheckIcon sx={iconSize} /> : <LinkIcon sx={iconSize} />}
            </Icon>
          </button>
        </div>
      </div>
    </Stack>
  );
};

export default LancShareNC;
