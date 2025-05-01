import { useIntl } from 'react-intl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, Typography, Stack, Box } from '@mui/material';
import { ReactComponent as Checkmark } from '../../Assets/icons/General/OptionCard/checkmark.svg';
import { FieldValues, Path, UseFormTrigger } from 'react-hook-form';
import '../OptionCardGroup/OptionCardGroup.css';
import { Context } from '../Wrapper/Wrapper';
import { useContext } from 'react';

type IconType =
  | React.ReactNode // // For energy_calculator options
  | { _icon: string; _classname: string }; // // For nested config options

type TextType =
  | { props: { id: string; default_message: string } } // For energy_calculator options
  | { _label: string; _default_message: string }; // For nested config options

type Option = {
  icon: IconType;
  text: TextType;
};

type Options = Record<string, Option | Record<string, Option>>;

type RHFOptionCardGroupProps<T extends FieldValues> = {
  fields: Record<string, boolean>;
  setValue: (name: string, value: unknown, config?: Object) => void;
  name: Path<T>;
  options: Options;
  triggerValidation?: UseFormTrigger<T>;
  customColumnNo?: string;
};

const RHFOptionCardGroup = <T extends FieldValues>({
  fields,
  setValue,
  name,
  options,
  triggerValidation,
  customColumnNo,
}: RHFOptionCardGroupProps<T>) => {
  const { getReferrer } = useContext(Context);
  const intl = useIntl();

  const handleOptionCardClick = async (optionName: string) => {
    const updatedValue = !fields[optionName];
    setValue(`${name}.${optionName}`, updatedValue, { shouldValidate: true, shouldDirty: true });

    if (triggerValidation) {
      await triggerValidation(name);
    }
  };

  const displayOptionCards = (options: Record<any, any>, name: string, values: Record<string, boolean>) => {
    const finalClassname = customColumnNo ? `option-cards-container ${customColumnNo}` : 'option-cards-container';

    const optionCards = Object.keys(options).map((optionKey, index) => {
      const translatedAriaLabel = intl.formatMessage({
        id: options[optionKey].text.props.id,
        defaultMessage: options[optionKey].text.props.defaultMessage,
      });

      const isSelected = values[optionKey];
      let containerClass = 'option-card';

      if (isSelected) {
        containerClass += ' selected-option-card';
      }

      if (getReferrer('featureFlags').includes('white_multi_select_tile_icon')) {
        containerClass += ' white-icons';
      }

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
          <Card className={containerClass}>
            <Stack direction="column" justifyContent="center" sx={{ flex: 1 }}>
              <CardContent sx={{ textAlign: 'center', padding: '0.5rem' }}>
                <Box className="multi-select-icon">{options[optionKey].icon}</Box>
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

    return <div className={finalClassname}>{optionCards}</div>;
  };

  return <Stack sx={{ alignItems: 'center' }}>{fields && displayOptionCards(options, name, fields)}</Stack>;
};

export default RHFOptionCardGroup;
