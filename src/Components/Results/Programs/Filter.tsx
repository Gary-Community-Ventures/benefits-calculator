import { Button } from '@mui/material';
import { useResultsContext } from '../Results';
import { FormattedMessage } from 'react-intl';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import './Filter.css';

export const Filter = () => {
  const { filtersChecked, setFiltersChecked } = useResultsContext();
  // console.log({filters})

  const [citizenshipFilterIsOpen, setCitizenshipFilterIsOpen] = useState(false);

  const handleCitizenshipBtnClick = () => {
    const updatedCitizenshipFilterIsOpen = !citizenshipFilterIsOpen;
    setCitizenshipFilterIsOpen(updatedCitizenshipFilterIsOpen);
  }

  const displayCitizenshipButton = () => {
    return (
      <Button className="citizenship-button" variant="contained" onClick={handleCitizenshipBtnClick}>
        <FormattedMessage id="filterSection.citizenship" defaultMessage="CITIZENSHIP" />
        {citizenshipFilterIsOpen ? (
          <KeyboardArrowDownIcon className="arrow-margin" />
        ) : (
          <KeyboardArrowRightIcon className="arrow-margin" />
        )}
      </Button>
    );
  }

  const displayResetFiltersButton = () => {
    return (
      <Button className="reset-button" variant="contained" onClick={() => setFiltersChecked(['citizen']) }>
        <FormattedMessage id="filterSection.reset" defaultMessage="RESET FILTERS" />
      </Button>
    );
  }

  return (
    <div className="filter-section-container">
      <h2 className="results-section-header">
        <FormattedMessage id="filterSection.header" defaultMessage="Filter Results By:" />
      </h2>
      {displayCitizenshipButton()}
      {displayResetFiltersButton()}
    </div>
  );
};

export default Filter;
