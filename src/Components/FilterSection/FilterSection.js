import { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import CitizenshipPopover from './CitizenshipPopover';
import FilterTable from '../FilterTable/FilterTable';
import Popover from '@mui/material/Popover';
import { FormattedMessage } from 'react-intl';
import { Button } from '@mui/material';
import './FilterSection.css';

const FilterSection = ({
  updateFilter,
  categories,
  citizenToggleState,
  categoryState,
  eligibilityState,
  alreadyHasToggleState,
}) => {
  const [citizenshipPopoverAnchor, setCitizenshipPopoverAnchor] = useState(null);
  const [otherPopoverAnchor, setOtherPopoverAnchor] = useState(null);

  const handleCitizenButtonClick = (event) => {
    setCitizenshipPopoverAnchor(event.currentTarget);
  };

  const handleOtherButtonClick = (event) => {
    setOtherPopoverAnchor(event.currentTarget);
  };

  const handleResetButtonClick = () => {
    //this resets the actual table filters
    updateFilter(
      { name: 'category', filter: false },
      {
        name: 'eligible',
        filter: {
          id: 2,
          columnField: 'eligible',
          operatorValue: 'is',
          value: 'true',
        },
      },
      {
        name: 'hasBenefit',
        filter: {
          id: 3,
          columnField: 'has_benefit',
          operatorValue: 'is',
          value: 'false',
        },
      },
      {
        name: 'citizen',
        filter: {
          id: 1,
          columnField: 'citizenship',
          operatorValue: 'isAnyOf',
          value: ['citizen', 'none'],
        },
      },
    );

    //this resets the radio buttons
    citizenToggleState[1](false);
    categoryState[1]('All Categories');
    eligibilityState[1]('eligibleBenefits');
    alreadyHasToggleState[1](false);
  };

  const handleCitizenshipPopoverClose = () => {
    setCitizenshipPopoverAnchor(null);
  };

  const handleOtherPopoverClose = () => {
    setOtherPopoverAnchor(null);
  };

  return (
    <div className="filter-button-container">
      <FilterListIcon sx={{ mr: '.5rem', color: '#037A93' }} />
      <Button
        id="citizenship"
        variant="contained"
        className="filter-button citizen"
        onClick={(event) => handleCitizenButtonClick(event)}
      >
        <FormattedMessage id="filterSection.citizenship" defaultMessage="Citizenship" />
      </Button>
      <Popover
        id="citizenshipPopover"
        open={Boolean(citizenshipPopoverAnchor)}
        onClose={handleCitizenshipPopoverClose}
        anchorEl={citizenshipPopoverAnchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <CitizenshipPopover updateFilter={updateFilter} citizenToggleState={citizenToggleState} />
      </Popover>
      <Button
        id="other"
        variant="contained"
        className="filter-button other"
        onClick={(event) => handleOtherButtonClick(event)}
      >
        <FormattedMessage id="filterSection.other" defaultMessage="Other" />
      </Button>
      <Popover
        id="otherPopover"
        open={Boolean(otherPopoverAnchor)}
        onClose={handleOtherPopoverClose}
        anchorEl={otherPopoverAnchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <FilterTable
          updateFilter={updateFilter}
          categories={categories}
          categoryState={categoryState}
          eligibilityState={eligibilityState}
          alreadyHasToggleState={alreadyHasToggleState}
        />
      </Popover>
      <Button id="reset" variant="contained" className="filter-button" onClick={handleResetButtonClick}>
        <FormattedMessage id="filterSection.reset" defaultMessage="Reset" />
      </Button>
    </div>
  );
};

export default FilterSection;
