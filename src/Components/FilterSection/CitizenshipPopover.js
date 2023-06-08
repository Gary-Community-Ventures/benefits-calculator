import { FormattedMessage } from 'react-intl';
import CustomSwitch from '../CustomSwitch/CustomSwitch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';

const CitizenshipPopover = ({ updateFilter }) => {
  const [citizenshipToggle, setCitizenshipToggle] = useState(false);

  const handleCitizenToggle = (event) => {
    // Filter out citizen benefits when toggle is on
    // Filter out non-citizen benefits when toggle is off
    if (event.target.checked) {
      updateFilter({
        name: 'citizen',
        filter: {
          id: 1,
          columnField: 'citizenship',
          operatorValue: 'isAnyOf',
          value: ['non-citizen', 'none'],
        },
      });
    } else {
      updateFilter({
        name: 'citizen',
        filter: {
          id: 1,
          columnField: 'citizenship',
          operatorValue: 'isAnyOf',
          value: ['citizen', 'none'],
        },
      });
    }
    setCitizenshipToggle(event.target.checked);
  };

  return (
    <div>
      <FormControlLabel
        className="toggle"
        label={
          <FormattedMessage
            id="results.returnSignupCitizenFilter"
            defaultMessage="Only show benefits that do not require a citizen or qualified non-citizen in the household"
          />
        }
        control={<CustomSwitch handleCustomSwitchToggle={handleCitizenToggle} checked={citizenshipToggle} />}
      />
    </div>
  );
}

export default CitizenshipPopover;