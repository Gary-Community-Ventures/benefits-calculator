import React, { useState, useEffect, useContext, MouseEvent } from 'react';
import { Context } from '../../Wrapper/Wrapper';
import FilterListIcon from '@mui/icons-material/FilterList';
import CitizenshipPopover from './CitizenshipPopover';
import OtherPopover from './OtherPopover';
import Popover from '@mui/material/Popover';
import { FormattedMessage } from 'react-intl';
import { Button } from '@mui/material';
import './FilterSection.css';
import { UpdateFilterArg } from '../Results';
import type { CitizenLabels } from '../../../Assets/citizenshipFilterFormControlLabels';

type StateType<T> = [T, React.Dispatch<React.SetStateAction<T>>];
type FilterProps = {
  updateFilter: (...args: UpdateFilterArg[]) => void;
  categories: { defaultMessage: string; label: string }[];
  citizenshipFilterIsChecked: Record<CitizenLabels, boolean>;
  setCitizenshipFilterIsChecked: (citizenshipFilterState: Record<CitizenLabels, boolean>) => void;
  categoryState: StateType<string>;
  eligibilityState: StateType<string>;
  alreadyHasToggleState: StateType<boolean>;
};
const FilterSection = ({
  updateFilter,
  categories,
  citizenshipFilterIsChecked,
  setCitizenshipFilterIsChecked,
  categoryState,
  eligibilityState,
  alreadyHasToggleState,
}: FilterProps) => {
  const { theme } = useContext(Context);
  const [citizenshipPopoverAnchor, setCitizenshipPopoverAnchor] = useState<null | Element>(null);
  const [otherPopoverAnchor, setOtherPopoverAnchor] = useState<null | Element>(null);

  const [otherActive, setOtherActive] = useState(false);
  useEffect(() => {
    setOtherActive(
      categoryState[0] !== 'All Categories' ||
        eligibilityState[0] !== 'eligibleBenefits' ||
        alreadyHasToggleState[0] !== false,
    );
  }, [categoryState[0], eligibilityState[0], alreadyHasToggleState[0]]);

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
          operatorValue: 'customCitizenshipOperator',
          value: ['citizen'],
        },
      },
    );

    //this resets the radio buttons
    setCitizenshipFilterIsChecked({
      non_citizen: false,
      green_card: false,
      gc_5plus: false,
      gc_18plus_no5: false,
      gc_under18_no5: false,
      gc_under19_pregnant_no5: false,
      refugee: false,
    });
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

  const isSomeCitizenshipFilterChecked = () => {
    return Object.values(citizenshipFilterIsChecked).some((citizenshipFilterIsChecked) => {
      return citizenshipFilterIsChecked === true;
    });
  };

  return (
    <div className="filter-button-container">
      <FilterListIcon sx={{ mr: '.5rem', color: theme.primaryColor }} />
      <Button
        id="citizenship"
        variant="contained"
        className={(isSomeCitizenshipFilterChecked() && 'active-filter') + ' filter-button citizen'}
        onClick={(event) => {
          setCitizenshipPopoverAnchor(event.currentTarget);
        }}
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
        sx={{ position: 'absolute' }}
      >
        <CitizenshipPopover
          updateFilter={updateFilter}
          citizenshipFilterIsChecked={citizenshipFilterIsChecked}
          setCitizenshipFilterIsChecked={setCitizenshipFilterIsChecked}
          close={handleCitizenshipPopoverClose}
        />
      </Popover>
      <Button
        id="other"
        variant="contained"
        className={(otherActive && 'active-filter') + ' filter-button other'}
        onClick={(event) => {
          setOtherPopoverAnchor(event.currentTarget);
        }}
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
        sx={{ position: 'absolute' }}
      >
        <OtherPopover
          updateFilter={updateFilter}
          categories={categories}
          categoryState={categoryState}
          eligibilityState={eligibilityState}
          alreadyHasToggleState={alreadyHasToggleState}
          close={handleOtherPopoverClose}
        />
      </Popover>
      <Button id="reset" variant="text" className="reset-button" onClick={handleResetButtonClick}>
        <FormattedMessage id="filterSection.reset" defaultMessage="Reset" />
      </Button>
    </div>
  );
};

export default FilterSection;
