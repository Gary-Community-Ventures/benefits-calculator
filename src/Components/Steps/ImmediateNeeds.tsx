import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { z } from 'zod';
import MultiSelectTiles from '../OptionCardGroup/MultiSelectTiles';

function ImmediateNeeds() {
  const formSchema = z.object({
    needs: z.array(z.string()),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    register,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      needs: ['a', 'b'],
    },
  });

  const submitHandler = ({ needs }: z.infer<typeof formSchema>) => {
    console.log(needs);
  };

  console.log(watch('needs'));

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Controller
        name="needs"
        control={control}
        render={({ field }) => {
          return (
            <MultiSelectTiles
              selectProps={field}
              options={[
                { value: 'a', icon: 'a', text: <FormattedMessage id="a" defaultMessage="a" /> },
                { value: 'b', icon: 'b', text: <FormattedMessage id="b" defaultMessage="b" /> },
                { value: 'c', icon: 'c', text: <FormattedMessage id="c" defaultMessage="c" /> },
                { value: 'd', icon: 'd', text: <FormattedMessage id="d" defaultMessage="d" /> },
                { value: 'e', icon: 'e', text: <FormattedMessage id="e" defaultMessage="e" /> },
                { value: 'f', icon: 'f', text: <FormattedMessage id="f" defaultMessage="f" /> },
              ]}
            />
          );
        }}
      ></Controller>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ImmediateNeeds;
