import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { createScreen } from '../../Assets/updateScreen.js'
import './LandingPage.css';

const LandingPage = ({ formData, setFetchedScreen, clearLocalStorageFormDataAndResults }) => {
	let { uuid } = useParams();

  const navigate = useNavigate();
	const handleContinue = async () => {
		if (uuid) {
			navigate(`/${uuid}/step-1`);
		} else {
			// create screen
			const response = await createScreen(formData)
			// don't refetch screen
			setFetchedScreen(true);
			// navigate to screen
			navigate(`/${response.uuid}/step-1`);
		}
	}

  useEffect(() => {
    clearLocalStorageFormDataAndResults();
  }, []);

  return (
		<main className="benefits-form">
			<h1 className="sub-header">
				<FormattedMessage
					id="disclaimer.header"
					defaultMessage="What you should know before we begin: "
				/>
			</h1>
			<Card variant="outlined">
				<CardContent>
					<Typography variant="body1">
						<FormattedMessage
							id="landingPage.body"
							defaultMessage="MyFriendBen is a tool that can help determine benefits you are likely eligible for. Here's what you should know before you get started:"
						/>
					</Typography>
					<ul className="landing-page-list-container">
						<li>
							<FormattedMessage
								id="landingPage.firstBulletItem"
								defaultMessage="This tool cannot guarantee eligibility. You will need to apply for benefits to get a final decision."
							/>
						</li>
						<li>
							<FormattedMessage
								id="landingPage.secondBulletItem"
								defaultMessage="Some benefits are available only to household members who are U.S. citizens or immigrants who are qualified non-citizens. In some cases, even after someone obtains citizenship or qualified non-citizenship status, a waiting period or other conditions may apply. When you get to the end of this tool, you will have a chance to sort results so that you see only benefits that do not require a citizen or qualified non-citizen in the household."
							/>
						</li>
						<li>
							<p>
								<FormattedMessage
									id="landingPage.publicCharge"
									defaultMessage="Non-U.S. citizens planning to apply for legal permanent residency or a visa should consider how applying for any benefits on this site may affect their immigration status. For more information, please review the "
								/>
								<a
									className="public-charge-link"
									variant="contained"
									target="_blank"
									href="https://cdhs.colorado.gov/public-charge-rule-and-colorado-immigrants#:~:text=About%20public%20charge&text=The%20test%20looks%20at%20whether,affidavit%20of%20support%20or%20contract."
									rel="noopener noreferrer"
								>
									<FormattedMessage
										id="landingPage.publicChargeLink"
										defaultMessage="Colorado Department of Human Services Public Charge Rule"
									/>
								</a>
							</p>
						</li>
						<li>
							<FormattedMessage
								id="landingPage.thirdBulletItem"
								defaultMessage="We take data security seriously. We collect the minimum data we need to provide you with accurate results. The screener never requires personal identifiable information such as first and last name or address. You may opt in to providing this information in order to receive paid opportunities for feedback, or future notifications about benefits that you are likely eligible for."
							/>
						</li>
					</ul>
				</CardContent>
			</Card>
			<CardActions sx={{ mt: '1rem', ml: '-.5rem' }}>
				<Button
					variant="contained"
					onClick={handleContinue}
				>
					<FormattedMessage id="continue-button" defaultMessage="Continue" />
				</Button>
			</CardActions>
		</main>
	);
}

export default LandingPage;
