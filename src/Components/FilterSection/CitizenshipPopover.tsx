import { FormattedMessage } from 'react-intl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox, Stack } from '@mui/material';
import { GridFilterItem, GridFilterOperator } from '@mui/x-data-grid';
import { UpdateFilterArg } from '../Results/Results';
import citizenshipFilterFormControlLabels from '../../Assets/citizenshipFilterFormControlLabels';
import type { CitizenLabels } from '../../Assets/citizenshipFilterFormControlLabels';

export const citizenshipFilterOperators: GridFilterOperator[] = [
  {
    value: 'customCitizenshipOperator',
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      // filterItem.value is `selectedCitizenshipFilters`
      if (!filterItem.columnField || !filterItem.value || !filterItem.operatorValue) {
        return null;
      }

      return (params): boolean => {
        // params.value is the value of the columnField in the DataRow
        // so `programs[i].legal_status_required` for the citizenship column
        const selectedFilters = filterItem.value;
        const legalStatusRequired = params.value;

        return selectedFilters.some((citizenshipType: string) => {
          return legalStatusRequired.includes(citizenshipType);
        });
      };
    },
  },
];

type CitizenshipPopoverProps = {
  updateFilter: (...args: UpdateFilterArg[]) => void;
  citizenshipFilterIsChecked: Record<CitizenLabels, boolean>;
  setCitizenshipFilterIsChecked: (citizenshipFilterState: Record<CitizenLabels, boolean>) => void;
};

const CitizenshipPopover = ({
  updateFilter,
  citizenshipFilterIsChecked,
  setCitizenshipFilterIsChecked,
}: CitizenshipPopoverProps) => {
  const hasAtLeastOneCitizenshipFilter = (currentCitizenshipFilters: Record<CitizenLabels, boolean>) => {
    const citizenshipFilterValues = Object.values(currentCitizenshipFilters);

    return citizenshipFilterValues.some((citizenshipFilterValue) => {
      return citizenshipFilterValue === true;
    });
  };

  const handleFilterSelect = (citizenshipType: CitizenLabels) => {
    const isChecked = citizenshipFilterIsChecked[citizenshipType];

    const updatedCitizenshipFilterIsChecked: Record<CitizenLabels, boolean> = {
      ...citizenshipFilterIsChecked,
      [citizenshipType]: !isChecked,
    };
    const typedUpdatedCitizenshipFilterIsChecked = Object.keys(updatedCitizenshipFilterIsChecked) as CitizenLabels[];
    const selectedCitizenshipFilters = typedUpdatedCitizenshipFilterIsChecked.filter((citizenshipType) => {
      return updatedCitizenshipFilterIsChecked[citizenshipType];
    });

    if (hasAtLeastOneCitizenshipFilter(updatedCitizenshipFilterIsChecked)) {
      updateFilter({
        name: 'citizen',
        filter: {
          id: 1,
          columnField: 'citizenship',
          operatorValue: 'customCitizenshipOperator',
          value: selectedCitizenshipFilters,
        },
      });
    } else {
      // set the citizenship filter back to the default
      updateFilter({
        name: 'citizen',
        filter: {
          id: 1,
          columnField: 'citizenship',
          operatorValue: 'customCitizenshipOperator',
          value: ['citizen'],
        },
      });
    }

    setCitizenshipFilterIsChecked(updatedCitizenshipFilterIsChecked);
  };

  const typedCitizenshipFilterIsChecked = Object.keys(citizenshipFilterIsChecked) as CitizenLabels[];

  const renderCitizenshipFilters = (citizenshipFilters: Record<CitizenLabels, boolean>) => {
    if (citizenshipFilters.green_card) {
      const allCitizenshipCheckboxes = typedCitizenshipFilterIsChecked.map((citizenshipType) => {
        return (
          <FormControlLabel
            key={citizenshipType}
            className="popover"
            label={citizenshipFilterFormControlLabels[citizenshipType]}
            control={
              <Checkbox
                checked={citizenshipFilters[citizenshipType]}
                onChange={() => handleFilterSelect(citizenshipType)}
              />
            }
          />
        );
      });

      return allCitizenshipCheckboxes;
    } else {
      //green_card is false
      const initialThreeFilters = ['non_citizen', 'green_card', 'refugee'];
      const initialCitizenshipCheckboxes = initialThreeFilters.map((initialFilter) => {
        return (
          <FormControlLabel
            key={initialFilter}
            className="popover"
            label={citizenshipFilterFormControlLabels[initialFilter]}
            control={
              <Checkbox
                checked={citizenshipFilters[initialFilter]}
                onChange={() => handleFilterSelect(initialFilter)}
              />
            }
          />
        );
      });

      return initialCitizenshipCheckboxes;
    }
  };

  return (
    <Stack>
      <Stack sx={{ color: '#000000', fontWeight: 500, mt: '.5rem', ml: '.5rem' }}>
        <FormattedMessage id="citizenshipPopover.showBenefits" defaultMessage="Show benefits available to:" />
      </Stack>
      {citizenshipCheckboxFilters}
    </Stack>
  );
};

export default CitizenshipPopover;
