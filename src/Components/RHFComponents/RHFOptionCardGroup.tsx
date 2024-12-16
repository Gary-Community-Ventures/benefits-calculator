import { useIntl } from 'react-intl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, Typography, Stack, Box } from '@mui/material';
import { ReactComponent as Checkmark } from '../../Assets/OptionCardIcons/checkmark.svg';
import { FieldValues, UseFormTrigger } from 'react-hook-form';
import '../OptionCardGroup/OptionCardGroup.css';
import { ReactNode } from 'react';
import { FormattedMessageType } from '../../Types/Questions';

type Option<T = string | number> = {
  value: T;
  text: FormattedMessageType;
  icon: ReactNode;
};

type RHFOptionCardGroupProps<T extends FieldValues> = {
  fields: Record<string, boolean>;
  setValue: (name: string, value: unknown, config?: Object) => void;
  name: string;
  options: Option<T>[];
  triggerValidation: UseFormTrigger<FormSchema>;
};

const RHFOptionCardGroup = <T extends FieldValues>({
  fields,
  setValue,
  name,
  options,
  triggerValidation,
}: RHFOptionCardGroupProps<T>) => {
  const intl = useIntl();

  const handleOptionCardClick = async (optionName: string) => {
    const updatedValue = !fields[optionName];
    setValue(`${name}.${optionName}`, updatedValue, { shouldValidate: true, shouldDirty: true });

    await triggerValidation(name);
  };

  const displayOptionCards = (options: Record<any, any>, name: string, values: Record<string, boolean>) => {
    const optionCards = Object.keys(options).map((optionKey, index) => {
      const translatedAriaLabel = intl.formatMessage({
        id: options[optionKey].text.props.id,
        defaultMessage: options[optionKey].text.props.defaultMessage,
      });

      const isSelected = values[optionKey];

      return (
        <CardActionArea
          key={`${name}-key-${index}`}
          sx={{ width: '15rem' }}
          className="card-action-area"
          onClick={() => handleOptionCardClick(optionKey)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
            }
          }}
        >
          <Card className={isSelected ? 'option-card selected-option-card' : 'option-card'}>
            <Stack direction="column" justifyContent="center" sx={{ flex: 1 }}>
              <CardContent sx={{ textAlign: 'center', padding: '0.5rem' }}>
                <Box>{options[optionKey].icon}</Box>
                <Typography className={isSelected ? 'option-card-text' : ''}>{translatedAriaLabel}</Typography>
              </CardContent>
            </Stack>
            {isSelected && (
              <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
                <Checkmark className="checkmark" />
              </Stack>
            )}
          </Card>
        </CardActionArea>
      );
    });

    return <div className="option-cards-container">{optionCards}</div>;
  };

  return <Stack sx={{ alignItems: 'center' }}>{fields && displayOptionCards(options, name, fields)}</Stack>;
};

export default RHFOptionCardGroup;