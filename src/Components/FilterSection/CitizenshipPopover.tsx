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
        let legalStatusRequiredOfProgramContainsAnyFilterValue = false;
        const selectedFilters = filterItem.value;
        const legalStatusRequired = params.value;

        selectedFilters.forEach((citizenshipType: string) => {
          if (legalStatusRequired.includes(citizenshipType)) {
            legalStatusRequiredOfProgramContainsAnyFilterValue = true;
          }
        });
        return legalStatusRequiredOfProgramContainsAnyFilterValue;
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
  const handleFilterSelect = (citizenshipType: CitizenLabels) => {
    const isChecked = citizenshipFilterIsChecked[citizenshipType];

    const updatedCitizenshipFilterIsChecked: Record<CitizenLabels, boolean> = { ...citizenshipFilterIsChecked, [citizenshipType]: !isChecked };
    const typedUpdatedCitizenshipFilterIsChecked = Object.keys(updatedCitizenshipFilterIsChecked) as CitizenLabels[];
    const selectedCitizenshipFilters = typedUpdatedCitizenshipFilterIsChecked.filter((citizenshipType) => {
      return updatedCitizenshipFilterIsChecked[citizenshipType];
    });

    updateFilter({
      name: 'citizen',
      filter: {
        id: 1,
        columnField: 'citizenship',
        operatorValue: 'customCitizenshipOperator',
        value: selectedCitizenshipFilters,
      },
    });

    setCitizenshipFilterIsChecked(updatedCitizenshipFilterIsChecked);
  };

  const typedCitizenshipFilterIsChecked = Object.keys(citizenshipFilterIsChecked) as CitizenLabels[];
  const citizenshipCheckboxFilters = typedCitizenshipFilterIsChecked.map((citizenshipType) => {
    return (
      <FormControlLabel
        key={citizenshipType}
        className="popover"
        label={citizenshipFilterFormControlLabels[citizenshipType]}
        control={
          <Checkbox
            checked={citizenshipFilterIsChecked[citizenshipType]}
            onChange={() => handleFilterSelect(citizenshipType)}
          />
        }
      />
    );
  });

  return <Stack>{citizenshipCheckboxFilters}</Stack>;
};

export default CitizenshipPopover;
