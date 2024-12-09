import { Card, CardActionArea, CardContent, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { FormattedMessageType } from '../../Types/Questions';
import { ReactComponent as Checkmark } from '../../Assets/OptionCardIcons/checkmark.svg';
import './MultiSelectTiles.css';
import { useIntl } from 'react-intl';

type Option<T = string | number> = {
  value: T;
  text: FormattedMessageType;
  icon: ReactNode;
};

type TileProps<T> = {
  option: Option<T>;
  selected: boolean;
  onClick: () => void;
};

function Tile<T = string | number>({ option, selected, onClick }: TileProps<T>) {
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

type MultiSelectTilesProps<T = string | number> = {
  options: Option<T>[];
  values: T[];
  onChange: (value: T[]) => void;
};

function MultiSelectTiles<T = string | number>({ options, values, onChange }: MultiSelectTilesProps<T>) {
  return (
    <div className="multiselect-tiles-container">
      {options.map((option, index) => {
        const onClick = () => {
          let newValues: T[];
          if (values.includes(option.value)) {
            newValues = values.filter((value) => value !== option.value);
          } else {
            newValues = [...values, option.value];
          }

          onChange(newValues);
        };

        const selected = values.includes(option.value);

        return <Tile option={option} onClick={onClick} key={index} selected={selected} />;
      })}
    </div>
  );
}

export default MultiSelectTiles;
