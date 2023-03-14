import LinearProgress from '@mui/material/LinearProgress';
import stepDirectory from '../../Assets/stepDirectory';

const ProgressBar = ({ step }) => {
  const totalSteps = Object.keys(stepDirectory).length + 2;
	return (
		<LinearProgress
			sx={{
				backgroundColor: '#d6d6d6c4',
				border: '1px solid #00000052',
				borderRadius: '500rem;',
				height: '.5rem',
				boxShadow: '1px 1px 4px rgb(0 0 0 / 0.4)',
				'& .MuiLinearProgress-bar': {
					backgroundColor: '#0096B0',
					borderRadius: '500rem;',
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
