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

  const EmailResults = () => {
		navigate(`/email-results/${screenUUID}`);
	};

  return (
		<AppBar position="sticky">
			<Box sx={{ flexGrow: 1, mt: 1 }}>
				<Grid container spacing={2} flexDirection="column">
					<Grid item xs={10}>
						<Typography
							variant="h4"
							align="left"
							onClick={() => navigate(`/step-0${urlSearchParams}`)}
						>
							<img
								src={isBIAUser ? BIAMFBLogo : MFBLogo}
								alt={
									isBIAUser
										? 'benefits in action and my friend ben logo'
										: 'my friend ben logo'
								}
								className="logo"
							/>
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<Box sx={{ flexGrow: 1 }}>
							<Grid item={true} container spacing={2}>
								<Grid item={true} xs={isResults ? 6 : 10}>
									<FormControl fullWidth>
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
								</Grid>
								{isResults && (
									<>
										<Grid
											item
											xs={2}
											className="share-icon-container"
											onClick={handleOpenShare}
										>
											<ShareIcon />
										</Grid>
										<Modal open={openShare} onClose={handleCloseShare}>
											<Share />
										</Modal>
										<Grid
											item
											xs={2}
											className="share-icon-container"
											onClick={EmailResults}
										>
											<SaveAltIcon />
										</Grid>
									</>
								)}
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</AppBar>
	);
}

export default Header;