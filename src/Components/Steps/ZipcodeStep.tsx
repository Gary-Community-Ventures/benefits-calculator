import { ReactNode, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { FormattedMessageType } from '../../Types/Questions';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { FormData } from '../../Types/FormData';
import { Context } from '../Wrapper/Wrapper';
import PreviousButton from '../PreviousButton/PreviousButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';
import * as z from 'zod';

// interface ZipcodeStepProps {
// }

export const ZipcodeStep = () => {
  const { config } = useContext(Context);
  const { counties_by_zipcode: countiesByZipcode } = config ?? {};

  const numberMustBeFiveDigitsLongRegex = /^\d{5}$/;
  const zipcodeSchema = z.string().regex(numberMustBeFiveDigitsLongRegex);
  const countySchema = z.string();
  const formSchema = z.object({
    zipcode: zipcodeSchema,
    county: countySchema,
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const currentZipcodeValue = watch('zipcode');
  const doesZipcodeValuePassSchema = zipcodeSchema.safeParse(currentZipcodeValue).success;
  const shouldShowCountyInput = doesZipcodeValuePassSchema && Object.keys(countiesByZipcode).includes(currentZipcodeValue);

  const formSubmitHandler: SubmitHandler<FormData> = (data: FormData) => {
    console.log(`in formSubmitHandler`)
  };

  const getZipcodeHelperText = (hasZipcodeErrors: boolean) => {
    if (!hasZipcodeErrors) return '';
    return (
      <FormattedMessage id="validation-helperText.zipcode" defaultMessage="Please enter a valid CO zip code" />
    );
  }

  const sortNumbersDescendingThenStringsLastWithoutSorting = (a: number | string, z: number | string) => {
    //instructions on how to compare elements when they're being sorted
    if (isNaN(Number(a)) || isNaN(Number(z))) {
      return 0; // if either key is string, keep original order
    } else if (Number(a) < Number(z)) {
      return 1; // sort a after z
    } else if (Number(a) > Number(z)) {
      return -1; // sort z after a
    } else {
      return 0; // a === z, so keep original order
    }
  };

  const createMenuItems = (disabledSelectMenuItemText, options) => {
    const disabledSelectMenuItem = (
      <MenuItem value="disabled-select" key="disabled-select" disabled>
        {disabledSelectMenuItemText}
      </MenuItem>
    );
    const menuItemKeys = Object.keys(options);
    const menuItemLabels = Object.values(options);
    menuItemKeys.sort((a, z) => sortNumbersDescendingThenStringsLastWithoutSorting(a, z));
    menuItemLabels.sort((a, z) => sortNumbersDescendingThenStringsLastWithoutSorting(a, z));

    const dropdownMenuItems = menuItemKeys.map((option, i) => {
      // checks for transformed config formatted messages
      if (typeof menuItemLabels[i] === 'object' && menuItemLabels[i])
        return (
          <MenuItem value={option} key={option}>
            {menuItemLabels[i]}
          </MenuItem>
        );

      return (
        <MenuItem value={option} key={option}>
          {menuItemLabels[i]}
        </MenuItem>
      );
    });

    return [disabledSelectMenuItem, dropdownMenuItems];
  };

  return (
    <Stack>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Controller
          name="zipcode"
          control={control}
          rules={{ required: true }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label={<FormattedMessage id="questions.zipcode-inputLabel" defaultMessage="Zip Code" />}
              variant="outlined"
              error={!!errors.zipcode}
              helperText={getZipcodeHelperText(!!errors.zipcode)}
            />
          )}
        />
        {shouldShowCountyInput && (
          <FormControl
            sx={{ mt: 1, mb: 2, minWidth: 210, maxWidth: '100%' }}
            error={!!errors.county}
          >
            <InputLabel id="county">
              <FormattedMessage id="questions.zipcode-a-inputLabel" defaultMessage="County" />
            </InputLabel>
            <Controller
              name="county"
              control={control}
              rules={{ required: true }}
              defaultValue="disabled-select"
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="county-select-label"
                  id="county-source-select"
                  label={<FormattedMessage id="questions.zipcode-a-inputLabel" defaultMessage="County" />}
                >
                  {createMenuItems(
                    <FormattedMessage id="questions.zipcode-a-disabledSelectMenuItemText" defaultMessage="Select a county" />,
                    countiesByZipcode[watch('zipcode')]
                  )}
                </Select>
              )}
            />
          </FormControl>
        )}
        <input type="submit" />
      </form>
    </Stack>
  );
};
