import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { FormattedMessageType } from '../../Types/Questions';
import { Button, TextField } from '@mui/material';
import { FormData } from '../../Types/FormData';
import { Context } from '../Wrapper/Wrapper';
import PreviousButton from '../PreviousButton/PreviousButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';

type InputFieldProps = {
  defaultValue: string;
  name: keyof FormData;
  label: FormattedMessageType;
  helperText: FormattedMessageType;
  required: boolean;
  inputSchema: ZodType<any, any, any>;
};


const InputField = ({ defaultValue, name, label, helperText, required, inputSchema }: InputFieldProps) => {
  const { formData, setFormData } = useContext(Context);
  const navigate = useNavigate();
  const { uuid, id } = useParams();
  const stepId = id? Number(id) : 1;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(inputSchema) });

  const formSubmitHandler: SubmitHandler<FormData> = (data: FormData) => {
    //this is where we should store our values?
    // TODO: add validation function for the followup questions in the if stmt
    // s.t. it doesn't go to the next question on submit
    if (!!errors[name] === false) {
      console.log(`in here`)
      setFormData({ ...formData, [name]: data[name] });
      navigate(`/${uuid}/step-${stepId + 1}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: required }}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            variant="outlined"
            error={!!errors[name]}
            helperText={errors[name] ? helperText : ''}
          />
        )}
      />
      <div className="question-buttons">
        <PreviousButton />
        <Button variant="contained" onClick={handleSubmit(formSubmitHandler)}>
          <FormattedMessage id="continueButton" defaultMessage="Continue" />
        </Button>
      </div>
    </form>
  );
};

export default InputField;
