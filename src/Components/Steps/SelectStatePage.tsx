import { FormControl, Select, InputLabel, MenuItem, FormHelperText } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionHeader from '../QuestionComponents/QuestionHeader';
import { useQueryString } from '../QuestionComponents/questionHooks';
import QuestionQuestion from '../QuestionComponents/QuestionQuestion';
import PrevAndContinueButtons from '../PrevAndContinueButtons/PrevAndContinueButtons';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import ErrorMessageWrapper from '../ErrorMessage/ErrorMessageWrapper';

// This will get removed once NC is moved into the main server
export const STATES: { [key: string]: string } =
  process.env.REACT_APP_STATE === 'CO' ? { co: 'Colorado', nc: 'North Carolina' } : { nc: 'North Carolina' };

const SelectStatePage = () => {
  const { formData, setFormData } = useContext(Context);
  const { whiteLabel, uuid } = useParams();

  const queryString = useQueryString();
  const navigate = useNavigate();

  const { formatMessage } = useIntl();

  const formSchema = z.object({
    state: z
      .string({
        errorMap: () => {
          return { message: formatMessage({ id: 'stateStep.error', defaultMessage: 'Please select a state' }) };
        },
      })
      .min(1),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: whiteLabel ?? '',
    },
  });

  const submitHandler: SubmitHandler<z.infer<typeof formSchema>> = ({ state }) => {
    setFormData({ ...formData, whiteLabel: state });

    // wait for the new config to be loaded
    setTimeout(() => {
      if (uuid !== undefined) {
        navigate(`/${state}/${uuid}/step-2${queryString}`);
      } else {
        navigate(`/${state}/step-2${queryString}`);
      }
    });
  };

  const createMenuItems = () => {
    const disabledSelectMenuItem = (
      <MenuItem value="disabled-select" key="disabled-select" disabled>
        <FormattedMessage id="selectState.disabledItem" defaultMessage="Choose your state" />
      </MenuItem>
    );

    const dropdownMenuItems = Object.entries(STATES).map(([value, message]) => {
      return (
        <MenuItem value={value} key={value}>
          {message}
        </MenuItem>
      );
    });

    return [disabledSelectMenuItem, dropdownMenuItems];
  };

  const backNavigationFunction = () => {
    if (uuid !== undefined && whiteLabel !== undefined) {
      navigate(`/${whiteLabel}/${uuid}/step-1${queryString}`);
      return;
    }

    navigate(`/step-1${queryString}`);
  };

  return (
    <main className="benefits-form">
      <QuestionHeader>
        <FormattedMessage id="stateStep.header" defaultMessage="Before you begin..." />
      </QuestionHeader>
      <QuestionQuestion>
        <FormattedMessage id="stateStep.header" defaultMessage="What is your state?" />
      </QuestionQuestion>
      <form onSubmit={handleSubmit(submitHandler)}>
        <FormControl sx={{ mt: 1, mb: 2, minWidth: 210, maxWidth: '100%' }} error={errors.state !== undefined}>
          <InputLabel>
            <FormattedMessage id="stateStep.placeholder" defaultMessage="State" />
          </InputLabel>
          <Controller
            name="state"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  labelId="county-select-label"
                  id="county-source-select"
                  label={<FormattedMessage id="stateStep.placeholder" defaultMessage="State" />}
                >
                  {createMenuItems()}
                </Select>
                {errors.state !== undefined && (
                  <FormHelperText>
                    <ErrorMessageWrapper fontSize="1rem">{errors.state.message}</ErrorMessageWrapper>
                  </FormHelperText>
                )}
              </>
            )}
          />
        </FormControl>
        <div style={{ marginTop: '1rem' }}>
          <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
        </div>
      </form>
    </main>
  );
};

export default SelectStatePage;
