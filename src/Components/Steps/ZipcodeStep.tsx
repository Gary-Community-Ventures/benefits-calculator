import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { FormattedMessageType } from '../../Types/Questions';
import { FormData } from '../../Types/FormData';
import { Context } from '../Wrapper/Wrapper';
import PreviousButton from '../PreviousButton/PreviousButton';
import { updateScreen } from '../../Assets/updateScreen';
import ErrorMessageWrapper from '../ErrorMessage/ErrorMessageWrapper.tsx';
import { getQuestion } from '../../Assets/stepDirectory.ts';
import { useConfig } from '../Config/configHook.tsx';
import * as z from 'zod';

interface ZipcodeStepProps {
  currentStepId: number;
}

export const ZipcodeStep = ({ currentStepId }: ZipcodeStepProps) => {
  const { formData, locale, setFormData } = useContext(Context);
  const { uuid } = useParams();
  const navigate = useNavigate();
  const matchingQuestion = getQuestion(currentStepId, formData.immutableReferrer);
  const requiredField = matchingQuestion.componentDetails.required;

  const countiesByZipcode = useConfig('counties_by_zipcode');
  const numberMustBeFiveDigitsLongRegex = /^\d{5}$/;
  const zipcodeSchema = z
    .string()
    .regex(numberMustBeFiveDigitsLongRegex)
    .refine((data) => data in countiesByZipcode);

  const backNavigationFunction = () => navigate(`/${uuid}/step-${currentStepId - 1}`);

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
  const shouldShowCountyInput = zipcodeSchema.safeParse(currentZipcodeValue).success;

  const formSubmitHandler = async (zipCodeAndCountyData: FormData) => {
    if (uuid) {
      const updatedFormData = { ...formData, ...zipCodeAndCountyData };
      setFormData(updatedFormData);
      await updateScreen(uuid, updatedFormData, locale);
      navigate(`/${uuid}/step-${currentStepId + 1}`);
    }
  };

  const checkCountyIsValid = ({ zipcode, county }) => {
    const validCounties = countiesByZipcode[zipcode];

    if (validCounties && county in validCounties) {
      return true;
    }
    return false;
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
    return <FormattedMessage id="validation-helperText.zipcode" defaultMessage="Please enter a valid CO zip code" />;
  };

  const renderCountyHelperText = () => {
    return (
      <ErrorMessageWrapper fontSize="1rem">
        <FormattedMessage id="errorMessage-county" defaultMessage="Please Select a county" />
      </ErrorMessageWrapper>
    );
  };

  return (
    <div className="question-container" id={currentStepId.toString()}>
      {<h2 className="question-label">{matchingQuestion.question}</h2>}
      {matchingQuestion.questionDescription && (
        <p className="question-description">{matchingQuestion.questionDescription}</p>
      )}
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Controller
          name="zipcode"
          control={control}
          rules={{ required: requiredField }}
          render={({ field }) => (
            <TextField
              {...field}
              label={<FormattedMessage id="questions.zipcode-inputLabel" defaultMessage="Zip Code" />}
              variant="outlined"
              error={errors.zipcode !== undefined}
              helperText={getZipcodeHelperText(errors.zipcode !== undefined)}
            />
          )}
        />
        {shouldShowCountyInput && matchingQuestion.followUpQuestions?.length && (
          <div className="question-container">
            <h2 className="question-label">{matchingQuestion.followUpQuestions[0].question}</h2>
            <FormControl sx={{ mt: 1, mb: 2, minWidth: 210, maxWidth: '100%' }} error={errors.county !== undefined}>
              <InputLabel id="county">
                <FormattedMessage id="questions.zipcode-a-inputLabel" defaultMessage="County" />
              </InputLabel>
              <Controller
                name="county"
                control={control}
                rules={{ required: requiredField }}
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
                        countiesByZipcode[watch('zipcode')],
                      )}
                    </Select>
                    <FormHelperText>{errors.county !== undefined && renderCountyHelperText()}</FormHelperText>
                  </>
                )}
              />
            </FormControl>
          </div>
        )}
        <div className="question-buttons">
          <PreviousButton navFunction={backNavigationFunction} />
          <Button variant="contained" onClick={handleSubmit(formSubmitHandler)}>
            <FormattedMessage id="continueButton" defaultMessage="Continue" />
          </Button>
        </div>
      </form>
    </div>
  );
};
