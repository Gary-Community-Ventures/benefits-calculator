import {forwardRef, useState} from 'react'
import {
	EmailShareButton,
	FacebookShareButton,
	HatenaShareButton,
	InstapaperShareButton,
	LineShareButton,
	LinkedinShareButton,
	LivejournalShareButton,
	MailruShareButton,
	OKShareButton,
	PinterestShareButton,
	PocketShareButton,
	RedditShareButton,
	TelegramShareButton,
	TumblrShareButton,
	TwitterShareButton,
	ViberShareButton,
	VKShareButton,
	WhatsappShareButton,
	WorkplaceShareButton,
} from 'react-share';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkIcon from '@mui/icons-material/Link';
import './Share.css'

const Share = forwardRef(() => {
  const shareUrl = 'https://screener.myfriendben.org/step-0?test=true';
  const [copied, setCopied] = useState(false)

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
			<h2>Share MyFriendBen with a friend:</h2>
			<div className="icons">
				<FacebookShareButton url={shareUrl}>
					<Icon name="Facebook" color="facebook">
						<FacebookIcon />
					</Icon>
				</FacebookShareButton>
				<TwitterShareButton url={shareUrl}>
					<Icon name="Twitter" color="twitter">
						<TwitterIcon />
					</Icon>
				</TwitterShareButton>
				<EmailShareButton url={shareUrl}>
					<Icon name="Email" color="gray">
						<EmailIcon />
					</Icon>
				</EmailShareButton>
				<WhatsappShareButton url={shareUrl}>
					<Icon name="WhatsApp" color="whatsApp">
						<WhatsAppIcon />
					</Icon>
				</WhatsappShareButton>
				<span onClick={copyLink}>
					<Icon name="Copy Link" color="gray">
						<LinkIcon />
					</Icon>
				</span>
			</div>
      { copied && (
        <div className="copied">
          Copied
        </div>
)}
		</div>
	)
});

export default Share;
