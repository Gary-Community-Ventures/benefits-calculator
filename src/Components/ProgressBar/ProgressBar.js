import LinearProgress from '@mui/material/LinearProgress';
import stepDirectory from '../../Assets/stepDirectory';

const ProgressBar = ({ step }) => {
  const totalSteps = Object.keys(stepDirectory).length + 2;
	return (
		<LinearProgress
			sx={{
				backgroundColor: '#ededed',
				'& .MuiLinearProgress-bar': {
					backgroundColor: '#0096B0',
				},
			}}
			variant="determinate"
			value={(step / totalSteps) * 100}
			className="progress-bar"
		/>
	);
};

const styles = (props) => ({
	colorPrimary: {
		backgroundColor: '#00695C',
	},
	barColorPrimary: {
		backgroundColor: '#B2DFDB',
	},
});

export default ProgressBar;
