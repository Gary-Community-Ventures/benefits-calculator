import { AppBar, MenuItem, Select, Modal } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Context } from '../Wrapper/Wrapper';
import LanguageIcon from '@mui/icons-material/Language';
import ShareIcon from '@mui/icons-material/Share';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Share from '../Share/Share';
import EmailResults from '../EmailResults/EmailResults';
import MFBLogo from '../../Assets/logo.png';
import BIAMFBLogo from '../../Assets/biamfbcombinedlogo.png';
import './Header.css';

const Header = ({ formData, handleTextfieldChange }) => {
	const context = useContext(Context);
	const navigate = useNavigate();
	const { urlSearchParams, isBIAUser } = formData;
	const location = useLocation();
	const urlRegex = /^(\/results\/)(.+)$/;
	const url = location.pathname.match(urlRegex);
	const isResults = url !== null;
	const screenUUID = url ? url[2] : undefined;

	const [openShare, setOpenShare] = useState(false);
	const [openEmailResults, setOpenEmailResults] = useState(false);
	const [isLanguageSelectOpen, setIsLanguageSelectOpen] = useState(false);

	const handleOpenShare = () => {
		setOpenShare(true);
	};

	const handleCloseShare = () => {
		setOpenShare(false);
	};

	const handleOpenEmailResults = () => {
		setOpenEmailResults(true);
	};

	const handleCloseEmailResults = () => {
		setOpenEmailResults(false);
	};

	const handleCloseLanguage = () => {
    setIsLanguageSelectOpen(false);
  };

  const handleOpenLanguage = () => {
    setIsLanguageSelectOpen(true);
  };

	const handleLanguageChange = (event) => {
		context.selectLanguage(event);
	}

	return (
		<>
			<AppBar
				position="sticky"
				id="nav-container"
				sx={{ flexDirection: 'row' }}
			>
				<a
					href={`/step-0${urlSearchParams}`}
				>
					<img
						src={isBIAUser ? BIAMFBLogo : MFBLogo}
						alt={
							isBIAUser
								? 'benefits in action and my friend ben home page button'
								: 'my friend ben home page button'
						}
						className="logo"
					/>
				</a>
				<div className="icon-wrapper">
					<Select
						labelId="select-language-label"
						id="select-language"
						value={context.locale}
						label="Language"
						onChange={handleLanguageChange}
						aria-label="select a language"
						variant="standard"
						disableUnderline={true}
						open={isLanguageSelectOpen}
						onOpen={handleOpenLanguage}
						onClose={handleCloseLanguage}
						IconComponent={LanguageIcon}
						renderValue={() => context.locale === "en-US" ? "EN" : "ES"}
						sx={{ "& .MuiSvgIcon-root": { right: "1.5rem", color: '#FFFFFF' } }}
					>
						<MenuItem value="en-US">English</MenuItem>
						<MenuItem value="es">Español</MenuItem>
					</Select>
					<button
						className="icon-container"
						onClick={handleOpenShare}
						aria-label="share button">
						<ShareIcon role="img"/>
					</button>
					{isResults && (
						<button
							className="icon-container"
							onClick={handleOpenEmailResults}
							aria-label="email results button">
							<SaveAltIcon role="img"/>
						</button>
					)}
				</div>
			</AppBar>
			<Modal
				open={openShare}
				onClose={handleCloseShare}>
				<Share close={handleCloseShare} />
			</Modal>
			<Modal
				open={openEmailResults}
				onClose={handleCloseEmailResults}>
				<EmailResults
					formData={formData}
					handleTextfieldChange={handleTextfieldChange}
					screenId={screenUUID}
					close={handleCloseEmailResults}
				/>
			</Modal>
		</>
	);
};

export default Header;
