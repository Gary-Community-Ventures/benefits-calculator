import { AppBar, Typography, Box, MenuItem, FormControl, Select, Grid, Modal } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Context } from '../Wrapper/Wrapper';
import LanguageIcon from '@mui/icons-material/Language';
import ShareIcon from '@mui/icons-material/Share';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Share from '../Share/Share';
import MFBLogo from '../../Assets/logo.png';
import BIAMFBLogo from '../../Assets/biamfbcombinedlogo.png';
import './Header.css';

const Header = ({ formData }) => {
  const context = useContext(Context);
  const navigate = useNavigate();
  const { urlSearchParams, isBIAUser } = formData;
  const location = useLocation();
  const urlRegex = /^(\/results\/)(.+)$/;
  const url = location.pathname.match(urlRegex);
  const isResults = url !== null;
  const screenUUID = url ? url[2]: undefined;
	
  const [openShare, setOpenShare] = useState(false);

  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const emailResults = () => {
		navigate(`/email-results/${screenUUID}`);
	};

  return (
		<>
			<AppBar
				position="sticky"
				id="nav-container"
				sx={{ flexDirection: 'row' }}
			>
				<img
					src={isBIAUser ? BIAMFBLogo : MFBLogo}
					alt={
						isBIAUser
							? 'benefits in action and my friend ben logo'
							: 'my friend ben logo'
					}
					className="logo"
					onClick={() => navigate(`/step-0${urlSearchParams}`)}
				/>
				<div className="icon-wrapper">
					<FormControl className="language-select">
						<Select
							labelId="select-language-label"
							id="select-language"
							value={context.locale}
							label="Language"
							onChange={context.selectLanguage}
							aria-label="select a language"
							IconComponent={LanguageIcon}
							className="language-switcher"
							variant="standard"
							disableUnderline={true}
						>
							<MenuItem value="en-US">English</MenuItem>
							<MenuItem value="es">Español</MenuItem>
						</Select>
					</FormControl>
					<button className="icon-container" onClick={handleOpenShare} >
						<ShareIcon />
					</button>
					{isResults && (
						<button className="icon-container" onClick={emailResults} >
							<SaveAltIcon />
						</button>
					)}
				</div>
			</AppBar>
			<Modal open={openShare} onClose={handleCloseShare}>
				<Share />
			</Modal>
		</>
	);
}

export default Header;