import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';
import { GridFilterItem, GridFilterOperator } from '@mui/x-data-grid';
import { UpdateFilterArg } from '../Results/Results';
import citizenshipFilterFormControlLabels from '../../Assets/citizenshipFilterFormControlLabels';

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
  citizenshipFilterIsChecked: Record<string, boolean>;
  setCitizenshipFilterIsChecked: (citizenshipFilterState: Record<string, boolean>) => void;
};

const CitizenshipPopover = ({
  updateFilter,
  citizenshipFilterIsChecked,
  setCitizenshipFilterIsChecked,
}: CitizenshipPopoverProps) => {
  const handleFilterSelect = (citizenshipType: string) => {
    const isChecked = citizenshipFilterIsChecked[citizenshipType];

    const updatedCitizenshipFilterIsChecked = { ...citizenshipFilterIsChecked, [citizenshipType]: !isChecked };
    const selectedCitizenshipFilters = Object.keys(updatedCitizenshipFilterIsChecked).filter((citizenshipType) => {
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

  return Object.keys(citizenshipFilterIsChecked).map((citizenshipType) => {
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
};

export default CitizenshipPopover;
