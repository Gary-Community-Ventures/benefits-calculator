import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CustomSwitch from '../CustomSwitch/CustomSwitch';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import './FilterTable.css';

const FilterTable = ({
  updateFilter,
  categories,
}) => {
  const [selectedEligibility, setSelectedEligibility] = useState('eligibleBenefits');
  const [alreadyHasToggle, setAlreadyHasToggle] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

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

    setEligibilitySelected(event.target.value);
    updateFilter({ name: 'eligible', filter: eligibilityFilters[event.target.value] });
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

  const handleAlreadyHasToggle = (event) => {
    if (event.target.checked) {
      updateFilter({
        name: 'hasBenefit',
        filter: false,
      });
    } else {
      updateFilter({
        name: 'hasBenefit',
        filter: {
          id: 3,
          columnField: 'has_benefit',
          operatorValue: 'is',
          value: 'false',
        },
      });
    }
    setAlreadyHasToggle(event.target.checked);
  };

  return (
    <>
      <div>
        <FormControl className="full-width">
          <FormLabel id="benefit-category" sx={{ color: '#000000', fontWeight: 500 }}>
            <FormattedMessage id="filter.filterByCategory" defaultMessage="Filter By Category" />
          </FormLabel>
          <RadioGroup aria-labelledby="benefit-category" name="benefit-category" onChange={categoryFilterChange}>
            <article className="radio-option">
              <FormControlLabel
                checked={categorySelected === 'All Categories'}
                value="All Categories"
                control={<Radio />}
                label={<FormattedMessage id="filter.filterAllCategories" defaultMessage="All Categories" />}
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
      <div>
        <FormControl className="full-width">
          <FormLabel id="benefit-eligibility" sx={{ color: '#000000', fontWeight: 500 }}>
            <FormattedMessage id="filter.filterByEligibility" defaultMessage="Filter By Eligibility" />
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
                label={<FormattedMessage id="filter.filterEligible" defaultMessage="Eligible" />}
              />
            </article>
            <article className="radio-option">
              <FormControlLabel
                checked={eligibilitySelected === 'ineligibleBenefits'}
                value="ineligibleBenefits"
                control={<Radio />}
                label={<FormattedMessage id="filter.filterInEligible" defaultMessage="Ineligible" />}
              />
            </article>
          </RadioGroup>
        </FormControl>
      </div>
      <div>
        <FormControlLabel
          className="toggle"
          label={
            <FormattedMessage
              id="filter.filterAlreadyHave"
              defaultMessage="Include benefits that I already have"
            />
          }
          control={<CustomSwitch handleCustomSwitchToggle={handleAlreadyHasToggle} checked={alreadyHasToggle} />}
        />
      </div>
    </>
  );
};

export default FilterTable;
