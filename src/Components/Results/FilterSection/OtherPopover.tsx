import type { ChangeEvent } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CustomSwitch from '../../CustomSwitch/CustomSwitch';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { FormattedMessage } from 'react-intl';
import { UpdateFilterArg } from '../Results';
import './OtherPopover.css';

type StateType<T> = [T, React.Dispatch<React.SetStateAction<T>>];
type FilterProps = {
  updateFilter: (...args: UpdateFilterArg[]) => void;
  categories: { defaultMessage: string; label: string }[];
  categoryState: StateType<string>;
  eligibilityState: StateType<string>;
  alreadyHasToggleState: StateType<boolean>;
  close: () => void;
};
const OtherPopover = ({
  updateFilter,
  categories,
  categoryState,
  eligibilityState,
  alreadyHasToggleState,
  close,
}: FilterProps) => {
  const [selectedCategory, setSelectedCategory] = categoryState;
  const [selectedEligibility, setSelectedEligibility] = eligibilityState;
  const [alreadyHasToggle, setAlreadyHasToggle] = alreadyHasToggleState;

  const eligibilityFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
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

    const eligibilityFilterValue = event.target.value as 'eligibleBenefits' | 'ineligibleBenefits' | 'alreadyHave';
    setSelectedEligibility(eligibilityFilterValue);
    updateFilter({ name: 'eligible', filter: eligibilityFilters[eligibilityFilterValue] });
  };

  const categoryFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    setSelectedCategory(event.target.value);
  };

  const handleAlreadyHasToggle = (event: ChangeEvent<HTMLInputElement>) => {
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

  const renderCategoryRadioOptions = () => {
    const allCategoriesRadioOption = (
      <article className="radio-option" key="All Categories">
        <FormControlLabel
          checked={selectedCategory === 'All Categories'}
          value="All Categories"
          control={<Radio />}
          label={<FormattedMessage id="filter.filterAllCategories" defaultMessage="All Categories" />}
        />
      </article>
    );
    const otherRadioOptions = categories.map((category) => {
      return (
        <article className="radio-option" key={category.defaultMessage}>
          <FormControlLabel
            checked={selectedCategory === category.defaultMessage}
            value={category.defaultMessage}
            control={<Radio />}
            label={<FormattedMessage defaultMessage={category.defaultMessage} id={category.label} />}
          />
        </article>
      );
    });
    return [allCategoriesRadioOption, ...otherRadioOptions];
  };

  return (
    <div className="popover">
      <div>
        <FormControl className="full-width">
          <FormLabel id="benefit-category" sx={{ color: '#000000', fontWeight: 500, mr: '1rem' }}>
            <FormattedMessage id="filter.filterByCategory" defaultMessage="Filter By Category" />
          </FormLabel>
          <RadioGroup aria-labelledby="benefit-category" name="benefit-category" onChange={categoryFilterChange}>
            {renderCategoryRadioOptions()}
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
            value={selectedEligibility}
            name="benefit-eligibility"
            onChange={eligibilityFilterChange}
          >
            <article className="radio-option">
              <FormControlLabel
                checked={selectedEligibility === 'eligibleBenefits'}
                value="eligibleBenefits"
                control={<Radio />}
                label={<FormattedMessage id="filter.filterEligible" defaultMessage="Eligible" />}
              />
            </article>
            <article className="radio-option">
              <FormControlLabel
                checked={selectedEligibility === 'ineligibleBenefits'}
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
            <FormattedMessage id="filter.filterAlreadyHave" defaultMessage="Include benefits that I already have" />
          }
          control={<CustomSwitch handleCustomSwitchToggle={handleAlreadyHasToggle} checked={alreadyHasToggle} />}
        />
      </div>
      <IconButton
        aria-label="close"
        onClick={close}
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export default OtherPopover;
