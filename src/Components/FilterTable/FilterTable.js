import FilterListIcon from '@mui/icons-material/FilterList';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import './FilterTable.css';

const Filter = ({ filt, setFilt }) => {
	const [showFilters, setShowFilter] = useState(false);

	const toggleFilterForm = () => {
		setShowFilter(!showFilters);
	};

	return (
		<div className="filter">
			<Button
				startIcon={<FilterListIcon />}
				sx={{ mt: 1 }}
				variant="contained"
				onClick={toggleFilterForm}
			>
				<FormattedMessage
					id="results.filterByCategoryButton"
					defaultMessage="Filter By Category"
				/>
			</Button>
			{showFilters && (
				<div className="filterForm">
					<div>
						<FormControl>
							<FormLabel id="benefit-eligibility">
								Benefit Eligibility
							</FormLabel>
							<RadioGroup
								aria-labelledby="benefit-eligibility"
								defaultValue="Eligible Benefits"
								name="benefit-eligibility"
							>
								<FormControlLabel
									value="Eligible Benefits"
									control={<Radio />}
									label={
										<FormattedMessage
											id="results.filterByCategoryButton"
											defaultMessage="Filter By Category"
										/>
									}
								/>
								<FormControlLabel
									value="Ineligible Benefits"
									control={<Radio />}
									label={
										<FormattedMessage
											id="results.filterByCategoryButton"
											defaultMessage="Filter By Category"
										/>
									}
								/>
								<FormControlLabel
									value="Benefits I already have"
									control={<Radio />}
									label={
										<FormattedMessage
											id="results.filterByCategoryButton"
											defaultMessage="Filter By Category"
										/>
									}
								/>
							</RadioGroup>
						</FormControl>
					</div>
					<div>
						<FormControl>
							<FormLabel id="benefit-category">
								Benefit Category
							</FormLabel>
							<RadioGroup
								aria-labelledby="benefit-category"
								defaultValue="Eligible Benefits"
								name="benefit-category"
							>
								<FormControlLabel
									value="Eligible Benefits"
									control={<Radio />}
									label={
										<FormattedMessage
											id="results.filterByCategoryButton"
											defaultMessage="Filter By Category"
										/>
									}
								/>
								<FormControlLabel
									value="Ineligible Benefits"
									control={<Radio />}
									label={
										<FormattedMessage
											id="results.filterByCategoryButton"
											defaultMessage="Filter By Category"
										/>
									}
								/>
								<FormControlLabel
									value="Benefits I already have"
									control={<Radio />}
									label={
										<FormattedMessage
											id="results.filterByCategoryButton"
											defaultMessage="Filter By Category"
										/>
									}
								/>
							</RadioGroup>
						</FormControl>
					</div>
				</div>
			)}
		</div>
	);
};

export default Filter;
