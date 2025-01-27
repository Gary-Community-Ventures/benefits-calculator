import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { FormattedMessageType } from '../../Types/Questions';
import { FormData } from '../../Types/FormData';
import { Context } from '../Wrapper/Wrapper';
import ErrorMessageWrapper from '../ErrorMessage/ErrorMessageWrapper';
import { useConfig } from '../Config/configHook';
import * as z from 'zod';
import QuestionHeader from '../QuestionComponents/QuestionHeader';
import QuestionLeadText from '../QuestionComponents/QuestionLeadText';
import QuestionQuestion from '../QuestionComponents/QuestionQuestion';
import PrevAndContinueButtons from '../PrevAndContinueButtons/PrevAndContinueButtons';
import { useDefaultBackNavigationFunction, useGoToNextStep } from '../QuestionComponents/questionHooks';
import { handleNumbersOnly, NUM_PAD_PROPS } from '../../Assets/numInputHelpers';
import useScreenApi from '../../Assets/updateScreen';

export const Zipcode = () => {
  const { formData, setFormData } = useContext(Context);
  const { uuid } = useParams();
  const backNavigationFunction = useDefaultBackNavigationFunction('zipcode');
  const { updateScreen } = useScreenApi();

  const countiesByZipcode = useConfig<{ [key: string]: { [key: string]: string } }>('counties_by_zipcode');

  const checkCountyIsValid = ({ zipcode, county }: { zipcode: string; county: string }) => {
    const validCounties = countiesByZipcode[zipcode];

    if (validCounties && county in validCounties) {
      return true;
    }
    return false;
  };

  const numberMustBeFiveDigitsLongRegex = /^\d{5}$/;
  const zipcodeSchema = z
    .string()
    .trim()
    .regex(numberMustBeFiveDigitsLongRegex)
    .refine((data) => data in countiesByZipcode);

  const formSchema = z
    .object({
      zipcode: zipcodeSchema,
      county: z.string(),
    })
    .refine((data) => checkCountyIsValid(data), { message: 'invalid county', path: ['county'] });

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipcode: formData.zipcode ?? '',
      county: formData.county ?? 'disabled-select',
    },
  });

  const currentZipcodeValue = watch('zipcode');
  const parsedZipCode = zipcodeSchema.safeParse(currentZipcodeValue);

  const nextStep = useGoToNextStep('zipcode');

  const formSubmitHandler = (zipCodeAndCountyData: FormData) => {
    if (uuid) {
      const updatedFormData = { ...formData, ...zipCodeAndCountyData };
      setFormData(updatedFormData);
      updateScreen(updatedFormData);
      nextStep();
    }
  };

  const createMenuItems = (disabledSelectMenuItemText: FormattedMessageType, options: Record<string, string>) => {
    const disabledSelectMenuItem = (
      <MenuItem value="disabled-select" key="disabled-select" disabled>
        {disabledSelectMenuItemText}
      </MenuItem>
    );
    const menuItemKeys = Object.keys(options);
    const menuItemLabels = Object.values(options);

    const dropdownMenuItems = menuItemKeys.map((option, i) => {
      // checks for transformed config formatted messages
      if (typeof menuItemLabels[i] === 'object')
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

  const getZipcodeHelperText = (hasZipcodeErrors: boolean) => {
    if (!hasZipcodeErrors) return '';
    return <FormattedMessage id="validation-helperText.zipcode" defaultMessage="Please enter a valid zip code" />;
  };

  const renderCountyHelperText = () => {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="errorMessage-county" defaultMessage="Please Select a county" />
      </ErrorMessageWrapper>
    );
  };

  return (
    <div>
      <QuestionLeadText>
        <FormattedMessage id="qcc.tell-us-text" defaultMessage="Let's Get Started!" />
      </QuestionLeadText>
      <QuestionHeader>
        <FormattedMessage id="qcc.zipcode-header" defaultMessage="Tell us where you live." />
      </QuestionHeader>
      <QuestionQuestion>
        <FormattedMessage id="questions.zipcode" defaultMessage="What is your zip code?" />
      </QuestionQuestion>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Controller
          name="zipcode"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label={<FormattedMessage id="questions.zipcode-inputLabel" defaultMessage="Zip Code" />}
              variant="outlined"
              inputProps={NUM_PAD_PROPS}
              onChange={handleNumbersOnly(field.onChange)}
              error={errors.zipcode !== undefined}
              helperText={getZipcodeHelperText(errors.zipcode !== undefined)}
            />
          )}
        />
        {parsedZipCode.success && (
          <div>
            <QuestionQuestion>
              <FormattedMessage id="questions.zipcode-a" defaultMessage="Please select a county:" />
            </QuestionQuestion>
            <FormControl sx={{ mt: 1, mb: 2, minWidth: 210, maxWidth: '100%' }} error={errors.county !== undefined}>
              <InputLabel id="county">
                <FormattedMessage id="questions.zipcode-a-inputLabel" defaultMessage="County" />
              </InputLabel>
              <Controller
                name="county"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      labelId="county-select-label"
                      id="county-source-select"
                      label={<FormattedMessage id="questions.zipcode-a-inputLabel" defaultMessage="County" />}
                    >
                      {createMenuItems(
                        <FormattedMessage
                          id="questions.zipcode-a-disabledSelectMenuItemText"
                          defaultMessage="Select a county"
                        />,
                        countiesByZipcode[parsedZipCode.data],
                      )}
                    </Select>
                    <FormHelperText>{errors.county !== undefined && renderCountyHelperText()}</FormHelperText>
                  </>
                )}
              />
            </FormControl>
          </div>
        )}
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
    </div>
  );
};
