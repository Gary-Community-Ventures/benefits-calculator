import { Card, CardActionArea, CardContent, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { FormattedMessageType } from '../../Types/Questions';
import { ReactComponent as Checkmark } from '../../Assets/OptionCardIcons/checkmark.svg';
import './MultiSelectTiles.css';
import { useIntl } from 'react-intl';

type Option<T extends string | number> = {
  value: T;
  text: FormattedMessageType;
  icon: ReactNode;
};

type TileProps<T extends string | number> = {
  option: Option<T>;
  selected: boolean;
  onClick: () => void;
};

function Tile<T extends string | number>({ option, selected, onClick }: TileProps<T>) {
  const { formatMessage } = useIntl();
  return (
    <CardActionArea sx={{ width: '15rem' }} className="card-action-area" onClick={onClick}>
      <Card className={selected ? 'option-card selected-option-card' : 'option-card'}>
        <div className="multi-select-card-container">
          <CardContent sx={{ textAlign: 'center', padding: '0.5rem' }}>
            <div>{option.icon}</div>
            <div className={selected ? 'option-card-text' : ''}>{option.text}</div>
          </CardContent>
        </div>
        {selected && (
          <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
            <Checkmark
              title={formatMessage({ id: 'multiSelect.checkmark.alt', defaultMessage: 'checked' })}
              className="checkmark"
            />
          </Stack>
        )}
      </Card>
    </CardActionArea>
  );
}

type MultiSelectTilesProps<T extends string | number> = {
  options: Option<T>[];
  values: Record<T, boolean>;
  onChange: (value: Record<T, boolean>) => void;
};

function MultiSelectTiles<T extends string | number>({ options, values, onChange }: MultiSelectTilesProps<T>) {
  return (
    <div className="multiselect-tiles-container">
      {options.map((option, index) => {
        const onClick = () => {
          let newValues: Record<T, boolean> = { ...values };
          newValues[option.value] = !newValues[option.value];

          onChange(newValues);
        };

        const selected = values[option.value];

        return <Tile option={option} onClick={onClick} key={index} selected={selected} />;
      })}
    </div>
  );
}

export default MultiSelectTiles;
