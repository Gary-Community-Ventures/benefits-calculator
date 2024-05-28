import { forwardRef, useState, useContext } from 'react';
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

  const iconSize = { color: '#fff', fontSize: '2rem' };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  const Icon = ({ children, name }) => {
    return (
      <span className={`${name} icon`}>
        {children}
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

  return (
    <div>
      <div className="share-text-container">
        <p className="white-font">
          <FormattedMessage id="results.share-header" defaultMessage="Share MyFriendBen Via:" />
        </p>
      </div>
      <div className="row-group">
        <FacebookShareButton url={shareUrl} onClick={trackOutboundLinks('Share to Facebook')}>
          <Icon name="facebook">
            <FacebookIcon sx={iconSize} />
          </Icon>
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} onClick={trackOutboundLinks('Share to Twitter')}>
          <Icon name="twitter">
            <XIcon sx={iconSize} />
          </Icon>
        </TwitterShareButton>
        <EmailShareButton url={shareUrl} onClick={trackOutboundLinks('Share With Email')}>
          <Icon name="email">
            <EmailIcon sx={iconSize} />
          </Icon>
        </EmailShareButton>
        <WhatsappShareButton url={shareUrl} onClick={trackOutboundLinks('Share With WhatsApp')}>
          <Icon name="whatsApp">
            <WhatsAppIcon sx={iconSize} />
          </Icon>
        </WhatsappShareButton>
        <LinkedinShareButton url={shareUrl} onClick={trackOutboundLinks('Share With LinkedIn')}>
          <Icon name="linkedIn">
            <LinkedInIcon sx={iconSize} />
          </Icon>
        </LinkedinShareButton>
        <button onClick={copyLink} className="button-no-format">
          <Icon name="link">{copied ? <CheckIcon sx={iconSize} /> : <LinkIcon sx={iconSize} />}</Icon>
        </button>
      </div>
    </div>
  );
});

export default Share;
