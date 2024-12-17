import { ReactNode, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useResultsContext } from '../Results';
import { Button, Popover, Checkbox } from '@mui/material';
import {
  CitizenLabelOptions,
  CitizenLabels,
  filterNestedMap,
} from '../../../Assets/citizenshipFilterFormControlLabels';
import citizenshipFilterFormControlLabels from '../../../Assets/citizenshipFilterFormControlLabels';
import { FormattedMessageType } from '../../../Types/Questions';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import './Filter.css';
import HelpButton from '../../HelpBubbleIcon/HelpButton';

export const Filter = () => {
  const [citizenshipFilterIsOpen, setCitizenshipFilterIsOpen] = useState(false);
  const [citizenshipPopoverAnchor, setCitizenshipPopoverAnchor] = useState<null | Element>(null);
  const { filtersChecked, setFiltersChecked } = useResultsContext();
  const [citButtonClass, setCitButtonClass] = useState('citizenship-button');
  const intl = useIntl();

  useEffect(() => {
    if (citizenshipFilterIsOpen) {
      setCitButtonClass(citButtonClass + ' flat-white-border-bottom');
    }
  }, [citizenshipFilterIsOpen]);

  const handleCitizenshipBtnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCitizenshipFilterIsOpen(!citizenshipFilterIsOpen);
    setCitizenshipPopoverAnchor(event.currentTarget);
  };

  const handleFilterSelect = (selectedFilterStr: CitizenLabelOptions) => {
    const newFiltersChecked = { ...filtersChecked };

    const newSelected = !newFiltersChecked[selectedFilterStr];

    newFiltersChecked[selectedFilterStr] = newSelected;

    // select or deselect all subfilters when main filter is selected
    const subFilters = filterNestedMap.get(selectedFilterStr);
    if (subFilters !== undefined) {
      for (const subFilter of subFilters) {
        newFiltersChecked[subFilter] = newSelected;
      }
    }

    // if all subfilters are unchecked, uncheck the main filter
    filterNestedMap.forEach((subFilters, mainFilter) => {
      if (!subFilters.includes(selectedFilterStr)) {
        return;
      }

      const allSubFiltersDeselected = subFilters.every((subFilter) => !newFiltersChecked[subFilter]);

      if (allSubFiltersDeselected) {
        newFiltersChecked[mainFilter] = false;
      }
    });

    // if all filters are unchecked set citzenship to false
    let isCitizen = true;
    for (const unTypedFilter in citizenshipFilterFormControlLabels) {
      const filter = unTypedFilter as CitizenLabelOptions;

      if (newFiltersChecked[filter]) {
        isCitizen = false;

        break;
      }
    }
    newFiltersChecked.citizen = isCitizen;

    setFiltersChecked(newFiltersChecked);
  };

  const renderCitizenshipFilters = () => {
    const filters: ReactNode[] = [];
    filterNestedMap.forEach((subFilters, mainFilter) => {
      const mainFilterIsChecked = filtersChecked[mainFilter];

      filters.push(
        <FormControlLabel
          key={mainFilter}
          label={citizenshipFilterFormControlLabels[mainFilter]}
          control={<Checkbox checked={mainFilterIsChecked} onChange={() => handleFilterSelect(mainFilter)} />}
          className="vertical-align"
        />,
      );

      if (!mainFilterIsChecked) {
        return;
      }

      for (const subFilter of subFilters) {
        filters.push(
          <FormControlLabel
            key={subFilter}
            label={citizenshipFilterFormControlLabels[subFilter]}
            control={<Checkbox checked={filtersChecked[subFilter]} onChange={() => handleFilterSelect(subFilter)} />}
            className="subcategory-indentation vertical-align"
            sx={{ padding: '.5rem 0' }}
          />,
        );
      }
    });

    return <section className="filters-container">{filters}</section>;
  };

  const handleFilterClose = () => {
    const updatedCitButtonClass = citButtonClass.replace('flat-white-border-bottom', '');

    setCitizenshipPopoverAnchor(null);
    setCitizenshipFilterIsOpen(false);
    setCitButtonClass(updatedCitButtonClass);
  };
  const citizenshipFiltersModalALProps = {
    id: 'filter.citFilterModalAL',
    defaultMsg: 'citizenship filters modal',
  };
  const closeCitFiltersALProps = {
    id: 'filter.closeCitFilterAL',
    defaultMsg: 'close citizenship filters modal',
  };
  const citFiltersALProps = {
    id: 'filter.citFiltersAL',
    defaultMsg: 'citizenship filters',
  };

  const displayCitizenshipPopover = () => {
    return (
      <section>
        <Popover
          id="citizenshipPopover"
          open={Boolean(citizenshipPopoverAnchor)}
          onClose={handleFilterClose}
          anchorEl={citizenshipPopoverAnchor}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{ vertical: 2, horizontal: 0 }}
          aria-label={intl.formatMessage(citizenshipFiltersModalALProps)}
        >
          <div className="filters-close-button">
            <IconButton
              size="small"
              aria-label={intl.formatMessage(closeCitFiltersALProps)}
              color="inherit"
              onClick={handleFilterClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
          {renderCitizenshipFilters()}
        </Popover>
      </section>
    );
  };

  const displayCitizenshipButton = () => {
    return (
      <section>
        <Button
          className={citButtonClass}
          variant="contained"
          onClick={(event) => handleCitizenshipBtnClick(event)}
          aria-label={intl.formatMessage(citFiltersALProps)}
        >
          <FormattedMessage id="filterSection.citizenship" defaultMessage="CITIZENSHIP" />
          {citizenshipFilterIsOpen ? (
            <KeyboardArrowDownIcon className="arrow-margin" />
          ) : (
            <KeyboardArrowRightIcon className="arrow-margin" />
          )}
        </Button>
        {displayCitizenshipPopover()}
      </section>
    );
  };

  const resetFilters = () => {
    setFiltersChecked({
      citizen: true,
      non_citizen: false,
      green_card: false,
      refugee: false,
      gc_5plus: false,
      gc_18plus_no5: false,
      gc_under18_no5: false,
      other: false,
      otherWithWorkPermission: false,
      otherHealthCareUnder19: false,
      otherHealthCarePregnant: false,
    });

    setCitButtonClass('citizenship-button');
  };

  const displayResetFiltersButton = () => {
    return (
      <Button className="reset-button" variant="contained" onClick={resetFilters}>
        <FormattedMessage id="filterSection.reset" defaultMessage="RESET FILTERS" />
      </Button>
    );
  };

  return (
    <div className="filter-section-container">
      <h2 className="results-section-header">
        <FormattedMessage id="filterSection.header" defaultMessage="Filter Results by Citizenship" />
        <HelpButton
          helpId="filterSection.citizenHelpText"
          helpText="Household members may have mixed immigration status. This means that some people in your home may qualify for benefits even if others do not. Use this filter to see how a person's status affects their ability to qualify."
        />
      </h2>
      <div className="flex-direction-row">
        {displayCitizenshipButton()}
        {displayResetFiltersButton()}
      </div>
    </div>
  );
};

export default Filter;
