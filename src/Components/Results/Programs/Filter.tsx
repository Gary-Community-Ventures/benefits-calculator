import { Button } from '@mui/material';
import { useResultsContext } from '../Results';
import { FormattedMessage } from 'react-intl';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import './Filter.css';

export const Filter = () => {
  const { filters, setFilters } = useResultsContext();
  // console.log({filters})

  const [filterIsOpen, setFilterIsOpen] = useState(false);

  const handleFilterClick = () => {
    const updatedFilterIsOpenStatus = !filterIsOpen;
    setFilterIsOpen(updatedFilterIsOpenStatus);
  }

  const displayCitizenshipButton = () => {
    return (
      <Button id="citizenship" variant="contained" onClick={handleFilterClick}>
        <FormattedMessage id="filterSection.citizenship" defaultMessage="Citizenship" />
        {filterIsOpen ? (
          <KeyboardArrowDownIcon className="arrow-margin" />
        ) : (
          <KeyboardArrowRightIcon className="arrow-margin" />
        )}
      </Button>
    );
  }

  return (
    <div className="filter-section-container">
      <h2 className="results-section-header">
        <FormattedMessage id="filterSection.header" defaultMessage="Filter Results By:" />
      </h2>
      {displayCitizenshipButton()}
    </div>
  );
};

export default Filter;
