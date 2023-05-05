import { useParams } from 'react-router'
import { FormattedMessage } from 'react-intl';
import LinearProgress from '@mui/material/LinearProgress';
import stepDirectory from '../../Assets/stepDirectory';
import './ProgressBar.css'

const ProgressBar = ({ step }) => {
	const totalSteps = Object.keys(stepDirectory).length + 2;
  let { id } = useParams();
	step = step ?? id;

	return (
		 <aside className='progress-bar-container'>
			<LinearProgress
				sx={{
					marginBottom: '5px',
					backgroundColor: '#d6d6d6c4',
					border: '1px solid #B0B0B0',
					borderRadius: '500rem;',
					height: '1rem',
					boxShadow: 'inset -1px 1px 3px rgb(0 0 0 / 0.2)',
					'& .MuiLinearProgress-bar': {
						background:
							'linear-gradient(90deg, hsla(189, 100%, 35%, 1) 0%, hsla(176, 56%, 55%, 1) 100%)',
						borderRadius: '500rem;',
					},
				}}
				variant="determinate"
				value={(step / totalSteps) * 100}
				className="progress-bar"
				aria-label='Progress Bar'
			/>
			<p className='step-progress-title'>
				<FormattedMessage
					id='confirmation.return-stepLabel'
					defaultMessage='Step ' />
				{ step }
				<FormattedMessage
					id='confirmation.return-ofLabel'
					defaultMessage=' of ' />
				{ totalSteps }
			</p>
		</aside>
	);
};

export default ProgressBar;
