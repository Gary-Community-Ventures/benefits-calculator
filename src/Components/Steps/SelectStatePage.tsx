import { FormControl, Select, InputLabel, MenuItem, FormHelperText } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionHeader from '../QuestionComponents/QuestionHeader.tsx';
import { useQueryString } from '../QuestionComponents/questionHooks.ts';
import QuestionQuestion from '../QuestionComponents/QuestionQuestion';
import PrevAndContinueButtons from '../PrevAndContinueButtons/PrevAndContinueButtons';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export const STATES = { co: 'Colorado' };

const SelectStatePage = () => {
  const { whiteLabel, uuid } = useParams();

  const queryString = useQueryString();
  const navigate = useNavigate();

  const formSchema = z.object({
    // TODO: add error message
    state: z.string().min(1),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: whiteLabel ?? '',
    },
  });

  const submitHandler: SubmitHandler<z.infer<typeof formSchema>> = ({ state }) => {
    if (uuid !== undefined) {
      navigate(`/${state}/${uuid}/step-2${queryString}`);
      return;
    }

    navigate(`/${state}/step-2${queryString}`);
  };

  const createMenuItems = (optionList: Record<string, string>, disabledFMId: string, disabledFMDefault: string) => {
    const disabledSelectMenuItem = (
      <MenuItem value="disabled-select" key="disabled-select" disabled>
        <FormattedMessage id={disabledFMId} defaultMessage={disabledFMDefault} />
      </MenuItem>
    );
    const menuItemKeyLabelPairArr = Object.entries(optionList);

    const dropdownMenuItems = menuItemKeyLabelPairArr.map((key) => {
      return (
        <MenuItem value={key[0]} key={key[0]}>
          {key[1]}
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

  // TODO: add language

  return (
    <main className="benefits-form">
      <QuestionHeader>
        <FormattedMessage id="a" defaultMessage="Some message" />
      </QuestionHeader>
      <QuestionQuestion>
        <FormattedMessage id="a" defaultMessage="Another message" />
      </QuestionQuestion>
      <form onSubmit={handleSubmit(submitHandler)}>
        <FormControl sx={{ mt: 1, mb: 2, minWidth: 210, maxWidth: '100%' }} error={errors.state !== undefined}>
          <InputLabel>
            <FormattedMessage id="a" defaultMessage="State" />
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
                  label={<FormattedMessage id="a" defaultMessage="State" />}
                >
                  {createMenuItems(STATES, 'a', 'Choose your state')}
                </Select>
                <FormHelperText>{errors.state !== undefined && 'change me'}</FormHelperText>
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
