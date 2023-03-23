import {forwardRef, useState} from 'react'
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
import './Share.css'

const Share = forwardRef(() => {
  const shareUrl = 'https://screener.myfriendben.org/step-0?test=true';
  const appId = '1268913277361574'
  const [copied, setCopied] = useState(false)

  const iconSize = {fontSize: '1.3rem'}

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 5000)
  }

  const Icon = ({name, children, color}) => {
    return (
			<span
				className={`${color} icon`}
			>
				{children}
				<span className="icon-name">{name}</span>
			</span>
		);
  }

	return (
		<div className="container">
			<h3 className="header">Share MyFriendBen:</h3>
			<div className="icons">
				<div className="row-group">
					<FacebookShareButton url={shareUrl}>
						<Icon name="Facebook" color="facebook">
							<FacebookIcon sx={iconSize} />
						</Icon>
					</FacebookShareButton>
					<TwitterShareButton url={shareUrl}>
						<Icon name="Twitter" color="twitter">
							<TwitterIcon sx={iconSize} />
						</Icon>
					</TwitterShareButton>
					<EmailShareButton url={shareUrl}>
						<Icon name="Correo Electronico" color="gray">
							<EmailIcon sx={iconSize} />
						</Icon>
					</EmailShareButton>
				</div>
				<div className="row-group">
					<WhatsappShareButton url={shareUrl}>
						<Icon name="WhatsApp" color="whatsApp">
							<WhatsAppIcon sx={iconSize} />
						</Icon>
					</WhatsappShareButton>
					<FacebookMessengerShareButton url={shareUrl} appId={appId}>
						<Icon name="Messenger" color="messenger">
							<FacebookMessengerIcon size={20.5} />
						</Icon>
					</FacebookMessengerShareButton>
					<button onClick={copyLink} className="button-no-format">
						<Icon name={copied ? 'Copied' : 'Copy Link'} color="gray">
							{copied ? (
								<CheckIcon sx={iconSize} />
							) : (
								<LinkIcon sx={iconSize} />
							)}
						</Icon>
					</button>
				</div>
			</div>
		</div>
	);
});

export default Share;
