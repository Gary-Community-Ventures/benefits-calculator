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

const Filter = ({
	updateFilter,
	categories,
	eligibilityState,
	categoryState,
}) => {
	const [showFilters, setShowFilter] = useState(false);
	const [eligibilitySelected, seteligibilitySelected] = eligibilityState;
	const [categorySelected, setCategorySelected] = categoryState;

	const toggleFilterForm = () => {
		setShowFilter(!showFilters);
	};

	const eligibilityFilterChange = (event) => {
		const eligibilityFilters = {
			eligibleBenefits: {
				id: 2,
				columnField: 'eligible',
				operatorValue: 'is',
				value: 'true',
			},
			ineligibleBenefits: {
				id: 2,
				columnField: 'eligible',
				operatorValue: 'is',
				value: 'false',
			},
			alreadyHave: {
				id: 2,
				columnField: 'eligible',
				operatorValue: 'is',
				value: 'true',
			},
		};
		const hasBenefitFilters = {
			eligibleBenefits: {
				id: 3,
				columnField: 'has_benefit',
				operatorValue: 'is',
				value: 'false',
			},
			ineligibleBenefits: {
				id: 3,
				columnField: 'has_benefit',
				operatorValue: 'is',
				value: 'false',
			},
			alreadyHave: false,
		};

		seteligibilitySelected(event.target.value);
		updateFilter(
			{ name: 'eligible', filter: eligibilityFilters[event.target.value] },
			{ name: 'hasBenefit', filter: hasBenefitFilters[event.target.value] }
		);
	};

	const categoryFilterChange = (event) => {
		if (event.target.value === 'All Categories') {
			updateFilter({ name: 'category', filter: false });
		} else {
			updateFilter({
				name: 'category',
				filter: {
					id: 4,
					columnField: 'category',
					operatorValue: 'equals',
					value: event.target.value,
				},
			});
		}
		setCategorySelected(event.target.value);
	};

	return (
		<div className="filter">
			<span className="filters-button" onClick={toggleFilterForm}>
				<FilterListIcon  sx={{mr: '.5rem'}} />
				<FormattedMessage
					id="filter.filterByCategoryButton"
					defaultMessage="Filters"
				/>
			</span>
			{showFilters && (
				<div className="filterForm">
					<div className="filter-selection-container">
						<FormControl className="full-width">
							<FormLabel
								id="benefit-eligibility"
								sx={{ color: '#000000', fontWeight: 500 }}
							>
								<FormattedMessage
									id="filter.filterByEligibility"
									defaultMessage="Filter By Eligibility"
								/>
							</FormLabel>
							<RadioGroup
								aria-labelledby="benefit-eligibility"
								defaultValue="eligibleBenefits"
								value={eligibilitySelected}
								name="benefit-eligibility"
								onChange={eligibilityFilterChange}
							>
								<article className="radio-option">
									<FormControlLabel
										checked={eligibilitySelected === 'eligibleBenefits'}
										value="eligibleBenefits"
										control={<Radio />}
										label={
											<FormattedMessage
												id="filter.filterEligibe"
												defaultMessage="Eligible"
											/>
										}
									/>
								</article>
								<article className="radio-option">
									<FormControlLabel
										checked={eligibilitySelected === 'ineligibleBenefits'}
										value="ineligibleBenefits"
										control={<Radio />}
										label={
											<FormattedMessage
												id="filter.filterIneligibe"
												defaultMessage="Ineligible"
											/>
										}
									/>
								</article>
								<article className="radio-option">
									<FormControlLabel
										checked={eligibilitySelected === 'alreadyHave'}
										value="alreadyHave"
										control={<Radio />}
										label={
											<FormattedMessage
												id="filter.filterAlreadyHave"
												defaultMessage="Benefits I Already Have"
											/>
										}
									/>
								</article>
							</RadioGroup>
						</FormControl>
					</div>
					<div className="filter-selection-container margin-bottom">
						<FormControl className="full-width">
							<FormLabel
								id="benefit-category"
								sx={{ color: '#000000', fontWeight: 500 }}
							>
								<FormattedMessage
									id="filter.filterByCategory"
									defaultMessage="Filter By Category"
								/>
							</FormLabel>
							<RadioGroup
								aria-labelledby="benefit-category"
								name="benefit-category"
								onChange={categoryFilterChange}
							>
								<article className="radio-option">
									<FormControlLabel
										checked={categorySelected === 'All Categories'}
										value="All Categories"
										control={<Radio />}
										label={
											<FormattedMessage
												id="filter.filterAllCategories"
												defaultMessage="All Categories"
											/>
										}
									/>
								</article>
								{categories.map((category) => {
									return (
										<article className="radio-option" key={category}>
											<FormControlLabel
												checked={categorySelected === category}
												value={category}
												control={<Radio />}
												label={category}
											/>
										</article>
									);
								})}
							</RadioGroup>
						</FormControl>
					</div>
				</div>
			)}
		</div>
	);
};

export default Filter;
