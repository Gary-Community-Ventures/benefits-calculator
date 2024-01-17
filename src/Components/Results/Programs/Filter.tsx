import { Button, Popover, Stack, Checkbox, Box } from '@mui/material';
import { useResultsContext } from '../Results';
import { FormattedMessage } from 'react-intl';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import { CitizenLabels } from '../../../Assets/citizenshipFilterFormControlLabels';
import citizenshipFilterFormControlLabels from '../../../Assets/citizenshipFilterFormControlLabels';
import { FormattedMessageType } from '../../../Types/Questions';
import './Filter.css';

export const Filter = () => {
  const [citizenshipFilterIsOpen, setCitizenshipFilterIsOpen] = useState(false);
  const [citizenshipPopoverAnchor, setCitizenshipPopoverAnchor] = useState<null | Element>(null);
  const { filtersChecked, setFiltersChecked } = useResultsContext();

  const handleCitizenshipBtnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const updatedCitizenshipFilterIsOpen = !citizenshipFilterIsOpen;
    setCitizenshipFilterIsOpen(updatedCitizenshipFilterIsOpen);
    setCitizenshipPopoverAnchor(event.currentTarget);
  };

  const handleFilterSelect = (selectedFilterStr: CitizenLabels) => {
    const updatedSelectedFilterValue = !filtersChecked[selectedFilterStr];
    const greenCardSubFilters = ['gc_5plus', 'gc_18plus_no5', 'gc_under18_no5'];
    const otherSubFilters = ['otherWithWorkPermission', 'otherHealthCareUnder19', 'otherHealthCarePregnant'];

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
  }

  const renderCitizenshipFilters = (citizenshipFCLabels: Record<CitizenLabels, FormattedMessageType>, filtersChecked) => {
    const greenCardSubFilters = ['gc_5plus', 'gc_18plus_no5', 'gc_under18_no5'];
    const otherSubFilters = ['otherWithWorkPermission', 'otherHealthCareUnder19', 'otherHealthCarePregnant'];
    const filters: JSX.Element[] = [];

    Object.entries(citizenshipFCLabels).forEach(citizenshipFCLEntry => {
      const citizenshipFCLKey = citizenshipFCLEntry[0];
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
            sx={{ verticalAlign: 'middle', display: 'inline-block' }}
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
            className="subcategory-indentation"
            sx={{ verticalAlign: 'middle', display: 'inline-block' }}
          />,
        );
      }
    });

    return <Stack sx={{ padding: '1rem' }}>{filters}</Stack>;
  };


  const displayCitizenshipPopover = () => {
    return (
      <Stack>
        <Popover
          id="citizenshipPopover"
          open={Boolean(citizenshipPopoverAnchor)}
          onClose={() => {
            const updatedCitizenshipFilterIsOpen = !citizenshipFilterIsOpen;
            setCitizenshipPopoverAnchor(null);
            setCitizenshipFilterIsOpen(updatedCitizenshipFilterIsOpen);
          }}
          anchorEl={citizenshipPopoverAnchor}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{ vertical: 2, horizontal: 0 }}
        >
          {renderCitizenshipFilters(citizenshipFilterFormControlLabels, filtersChecked)}
        </Popover>
      </Stack>
    );
  }

  const displayCitizenshipButton = () => {
    const citizenshipButtonClass = citizenshipFilterIsOpen
      ? 'citizenship-button flat-white-border-bottom'
      : 'citizenship-button';
    return (
      <Box>
        <Button
          className={citizenshipButtonClass}
          variant="contained"
          onClick={(event) => handleCitizenshipBtnClick(event)}
        >
          <FormattedMessage id="filterSection.citizenship" defaultMessage="CITIZENSHIP" />
          {citizenshipFilterIsOpen ? (
            <KeyboardArrowDownIcon className="arrow-margin" />
          ) : (
            <KeyboardArrowRightIcon className="arrow-margin" />
          )}
        </Button>
        {displayCitizenshipPopover()}
      </Box>
    );
  }

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
  }

  const displayResetFiltersButton = () => {
    return (
      <Button className="reset-button" variant="contained" onClick={resetFilters} >
        <FormattedMessage id="filterSection.reset" defaultMessage="RESET FILTERS" />
      </Button>
    );
  }

  return (
    <div className="filter-section-container">
      <h2 className="results-section-header">
        <FormattedMessage id="filterSection.header" defaultMessage="Filter Results By:" />
      </h2>
      <Stack direction="row">
        {displayCitizenshipButton()}
        {displayResetFiltersButton()}
      </Stack>
    </div>
  );
};

export default Filter;
