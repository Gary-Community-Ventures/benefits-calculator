import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useResultsContext } from '../Results';
import { Button, Popover, Checkbox } from '@mui/material';
import { CitizenLabelOptions, CitizenLabels } from '../../../Assets/citizenshipFilterFormControlLabels';
import citizenshipFilterFormControlLabels from '../../../Assets/citizenshipFilterFormControlLabels';
import { FormattedMessageType } from '../../../Types/Questions';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import './Filter.css';
import TranslateAriaLabel from '../Translate/TranslateAriaLabel';

export const Filter = () => {
  const [citizenshipFilterIsOpen, setCitizenshipFilterIsOpen] = useState(false);
  const [citizenshipPopoverAnchor, setCitizenshipPopoverAnchor] = useState<null | Element>(null);
  const { filtersChecked, setFiltersChecked } = useResultsContext();
  const [citButtonClass, setCitButtonClass] = useState('citizenship-button');

  useEffect(() => {
    const filtersCheckedStrArr = Object.entries(filtersChecked)
      .filter((filterKeyValPair) => {
        return filterKeyValPair[1];
      })
      .map((filteredKeyValPair) => filteredKeyValPair[0]);

    //if a filter is selected/truthy then remove citizen from the filtersCheckedStrArray and set citizen state to false
    //and add the active-blue css class to the citizenshipButtonClass
    if (filtersCheckedStrArr.includes('citizen') && filtersCheckedStrArr.length > 1) {
      filtersCheckedStrArr.filter((filter) => filter !== 'citizen');
      setFiltersChecked({ ...filtersChecked, citizen: false });
      setCitButtonClass(citButtonClass + ' active-blue');
    }

    //if they deselect all of the filters then we want the filtersChecked to start with a truthy citizen value
    //and the default citButtonClass
    if (filtersCheckedStrArr.length === 0 && !citizenshipFilterIsOpen) {
      setFiltersChecked({ ...filtersChecked, citizen: true });
      setCitButtonClass('citizenship-button');
    } else if (filtersCheckedStrArr.length === 0 && citizenshipFilterIsOpen) {
      setFiltersChecked({ ...filtersChecked, citizen: true });
      setCitButtonClass('citizenship-button flat-white-border-bottom');
    }
  }, [filtersChecked]);

  useEffect(() => {
    if (citizenshipFilterIsOpen) {
      setCitButtonClass(citButtonClass + ' flat-white-border-bottom');
    }
  }, [citizenshipFilterIsOpen]);

  const handleCitizenshipBtnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCitizenshipFilterIsOpen(!citizenshipFilterIsOpen);
    setCitizenshipPopoverAnchor(event.currentTarget);
  };

  const handleFilterSelect = (selectedFilterStr: CitizenLabels) => {
    const updatedSelectedFilterValue = !filtersChecked[selectedFilterStr];
    const greenCardSubFilters: CitizenLabels[] = ['gc_5plus', 'gc_18plus_no5', 'gc_under18_no5'];
    const otherSubFilters: CitizenLabels[] = [
      'otherWithWorkPermission',
      'otherHealthCareUnder19',
      'otherHealthCarePregnant',
    ];

    if (selectedFilterStr === 'green_card') {
      const updatedFiltersChecked = { ...filtersChecked };
      greenCardSubFilters.forEach((subfilter) => {
        updatedFiltersChecked[subfilter] = updatedSelectedFilterValue;
      });

      setFiltersChecked({ ...updatedFiltersChecked, [selectedFilterStr]: updatedSelectedFilterValue });
    } else if (selectedFilterStr === 'other') {
      const updatedFiltersChecked = { ...filtersChecked };
      otherSubFilters.forEach((subfilter) => {
        updatedFiltersChecked[subfilter] = updatedSelectedFilterValue;
      });

      setFiltersChecked({ ...updatedFiltersChecked, [selectedFilterStr]: updatedSelectedFilterValue });
    } else {
      setFiltersChecked({ ...filtersChecked, [selectedFilterStr]: updatedSelectedFilterValue });
    }
  };

  const renderCitizenshipFilters = (
    citizenshipFCLabels: Record<CitizenLabelOptions, FormattedMessageType>,
    filtersChecked: Record<CitizenLabels, boolean>,
  ) => {
    const greenCardSubFilters = ['gc_5plus', 'gc_18plus_no5', 'gc_under18_no5'];
    const otherSubFilters = ['otherWithWorkPermission', 'otherHealthCareUnder19', 'otherHealthCarePregnant'];
    const filters: JSX.Element[] = [];

    Object.entries(citizenshipFCLabels).forEach((citizenshipFCLEntry) => {
      const citizenshipFCLKey = citizenshipFCLEntry[0] as CitizenLabelOptions;
      const citizenshipFCLabel = citizenshipFCLEntry[1];

      const isAMainFilter =
        !greenCardSubFilters.includes(citizenshipFCLKey) && !otherSubFilters.includes(citizenshipFCLKey);
      const isSubfilterAndMainFilterIsChecked =
        (greenCardSubFilters.includes(citizenshipFCLKey) && filtersChecked.green_card === true) ||
        (otherSubFilters.includes(citizenshipFCLKey) && filtersChecked.other === true);

      //if this is a main filter push it otherwise check to see if the main filter is truthy and then push it
      if (isAMainFilter) {
        filters.push(
          <FormControlLabel
            key={citizenshipFCLKey}
            label={citizenshipFCLabel}
            control={
              <Checkbox
                checked={filtersChecked[citizenshipFCLKey]}
                onChange={() => handleFilterSelect(citizenshipFCLKey)}
              />
            }
            className="vertical-align"
          />,
        );
      } else if (isSubfilterAndMainFilterIsChecked) {
        filters.push(
          <FormControlLabel
            key={citizenshipFCLKey}
            label={citizenshipFCLabel}
            control={
              <Checkbox
                checked={filtersChecked[citizenshipFCLKey]}
                onChange={() => handleFilterSelect(citizenshipFCLKey)}
              />
            }
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
    id: 'filter.citFilterModal',
    defaultMsg: 'citizenship filters modal',
  };
  const closeCitFiltersALProps = {
    id: 'filter.closeCitFilter',
    defaultMsg: 'close citizenship filters modal',
  };
  const citFiltersALProps = {
    id: 'filter.citFilters',
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
          aria-label={TranslateAriaLabel(citizenshipFiltersModalALProps)}
        >
          <div className="filters-close-button">
            <IconButton
              size="small"
              aria-label={TranslateAriaLabel(closeCitFiltersALProps)}
              color="inherit"
              onClick={handleFilterClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
          {renderCitizenshipFilters(citizenshipFilterFormControlLabels, filtersChecked)}
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
          aria-label={TranslateAriaLabel(citFiltersALProps)}
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
        <FormattedMessage id="filterSection.header" defaultMessage="Filter Results By:" />
      </h2>
      <div className="flex-direction-row">
        {displayCitizenshipButton()}
        {displayResetFiltersButton()}
      </div>
    </div>
  );
};

export default Filter;
