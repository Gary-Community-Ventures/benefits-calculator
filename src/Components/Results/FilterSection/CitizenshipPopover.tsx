import { FormattedMessage } from 'react-intl';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Checkbox, Stack } from '@mui/material';
import { GridFilterItem, GridFilterOperator } from '@mui/x-data-grid';
import { UpdateFilterArg } from '../Results';
import citizenshipFilterFormControlLabels, {
  filterNestedMap,
} from '../../../Assets/citizenshipFilterFormControlLabels';
import type { CitizenLabels } from '../../../Assets/citizenshipFilterFormControlLabels';
import './CitizenshipPopover.css';

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
  close: () => void;
};

const CitizenshipPopover = ({
  updateFilter,
  citizenshipFilterIsChecked,
  setCitizenshipFilterIsChecked,
  close,
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

    for (const nestedFilter of filterNestedMap.get(citizenshipType) ?? []) {
      // if a parent is not checked, then set its children to false, and if a parent becomes checked, then set its children to true
      updatedCitizenshipFilterIsChecked[nestedFilter] = !isChecked;
    }

    const typedUpdatedCitizenshipFilterIsChecked = Object.keys(updatedCitizenshipFilterIsChecked) as CitizenLabels[];
    const selectedCitizenshipFilters = typedUpdatedCitizenshipFilterIsChecked.filter((citizenshipType) => {
      return updatedCitizenshipFilterIsChecked[citizenshipType];
    });

    //update the MUI filter that is being passed to the citizenship column
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

    //update citizenshipFilterIsChecked state
    setCitizenshipFilterIsChecked(updatedCitizenshipFilterIsChecked);
  };

  const renderCitizenshipFilters = (citizenshipFilters: Record<CitizenLabels, boolean>) => {
    const filters: JSX.Element[] = [];
    filterNestedMap.forEach((children, parentLabel) => {
      filters.push(
        <FormControlLabel
          key={parentLabel}
          label={citizenshipFilterFormControlLabels[parentLabel]}
          control={
            <Checkbox checked={citizenshipFilters[parentLabel]} onChange={() => handleFilterSelect(parentLabel)} />
          }
        />,
      );

      if (citizenshipFilters[parentLabel]) {
        children.forEach((label) => {
          filters.push(
            <FormControlLabel
              key={label}
              className="gc-subcitizen-indentation"
              label={citizenshipFilterFormControlLabels[label]}
              control={<Checkbox checked={citizenshipFilters[label]} onChange={() => handleFilterSelect(label)} />}
            />,
          );
        });
      }
    });

    return filters;
  };

  return (
    <Stack sx={{ padding: '0.5rem', gap: '0.25rem', ml: '0.5rem' }}>
      <IconButton
        aria-label="close"
        onClick={close}
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      >
        <CloseIcon />
      </IconButton>
      <Stack
        sx={{
          color: '#000000',
          fontWeight: 500,
          mt: '.5rem',
          mr: '1rem',
        }}
      >
        <FormattedMessage id="citizenshipPopover.showBenefits" defaultMessage="Show benefits available to:" />
      </Stack>
      <Stack>{renderCitizenshipFilters(citizenshipFilterIsChecked)}</Stack>
    </Stack>
  );
};

export default CitizenshipPopover;
