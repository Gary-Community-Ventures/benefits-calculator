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
import { Context } from '../Wrapper/Wrapper';
import dataLayerPush from '../../Assets/analytics';
import TranslateAriaLabel from '../Results/Translate/TranslateAriaLabel';
import './Share.css';

const Share = forwardRef(function Share({ close }, ref) {
  const [copied, setCopied] = useState(false);
  const { getReferrer } = useContext(Context);
  const intl = useIntl();

  const labels = {
    email: intl.formatMessage({
      id: 'results.share-email',
      defaultMessage: 'Email',
    }),
    copyLink: intl.formatMessage({
      id: 'results.share-copyLink',
      defaultMessage: 'Copy Link',
    }),
    copied: intl.formatMessage({
      id: 'results.share-copied',
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

  const Icon = ({ name, children, color }) => {
    return (
      <span className={`${color} icon`}>
        {children}
        <span className="icon-name">{name}</span>
      </span>
    );
  };

  const trackOutboundLinks = (label) => {
    return () => {
      dataLayerPush({
        event: 'media_share',
        action: 'share link click',
        label: label,
      });
    };
  };

  const closeALProps = {
    id: 'share.close',
    defaultMsg: 'close',
  };

  return (
    <div className="container">
      <IconButton aria-label={TranslateAriaLabel(closeALProps)} onClick={close} className="share-close-button">
        <CloseIcon />
      </IconButton>
      <h2 className="share-header">
        <FormattedMessage id="results.share-header" defaultMessage="Share MyFriendBen with a friend:" />
      </h2>
      <div className="icons">
        <div className="row-group">
          <FacebookShareButton url={shareUrl} onClick={trackOutboundLinks('Share to Facebook')}>
            <Icon name="Facebook" color="facebook">
              <FacebookIcon sx={iconSize} />
            </Icon>
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} onClick={trackOutboundLinks('Share to Twitter')}>
            <Icon name="Twitter" color="twitter">
              <TwitterIcon sx={iconSize} />
            </Icon>
          </TwitterShareButton>
          <EmailShareButton url={shareUrl} onClick={trackOutboundLinks('Share With Email')}>
            <Icon name={labels.email} color="gray">
              <EmailIcon sx={iconSize} />
            </Icon>
          </EmailShareButton>
        </div>
        <div className="row-group">
          <WhatsappShareButton url={shareUrl} onClick={trackOutboundLinks('Share With WhatsApp')}>
            <Icon name="WhatsApp" color="whatsApp">
              <WhatsAppIcon sx={iconSize} />
            </Icon>
          </WhatsappShareButton>
          <FacebookMessengerShareButton
            url={shareUrl}
            appId={appId}
            onClick={trackOutboundLinks('Share With Facebook Messanger')}
          >
            <Icon name="Messenger" color="messenger">
              <FacebookMessengerIcon size={20.5} />
            </Icon>
          </FacebookMessengerShareButton>
          <button onClick={copyLink} className="button-no-format">
            <Icon name={copied ? labels.copied : labels.copyLink} color="gray">
              {copied ? <CheckIcon sx={iconSize} /> : <LinkIcon sx={iconSize} />}
            </Icon>
          </button>
        </div>
      </div>
    </div>
  );
});

export default Share;
