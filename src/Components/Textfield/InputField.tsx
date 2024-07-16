import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { FormData } from '../../Types/FormData';
import { FormattedMessageType } from '../../Types/Questions';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@mui/material';
import { Context } from '../Wrapper/Wrapper';
import { useContext } from 'react';
import * as z from 'zod';

type InputFieldProps = {
  defaultValue: string;
  name: keyof FormData;
  label: FormattedMessageType;
  helperText: FormattedMessageType;
  required: boolean;
};

const schema = z.object({
  zipcode: z.string().regex(/^\d{5}$/),
  // and have to include that it's a part of a countiesByZipcode somehow
  householdSize: z.string().max(8),
  householdAssets: z.number(),
  // otherSource: z.string()
});

const InputField = ({ defaultValue, name, label, helperText, required }: InputFieldProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { formData, setFormData } = useContext(Context);

  console.log({ formData });

  console.log(errors);

  const formSubmitHandler: SubmitHandler<FormData> = (data: FormData) => {
    //this is where we should store our values?

    console.log(data);

    if (!!errors[name] === false) {
      setFormData({ ...formData, [name]: data });
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

      {/* we should have a continue button tied to this one and create one for the HHDB completely separately */}

      <input type="submit" />
    </form>
  );
};

export default InputField;
