import { Card, CardActionArea, CardContent, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { FormattedMessageType } from '../../Types/Questions';
import { ReactComponent as Checkmark } from '../../Assets/OptionCardIcons/checkmark.svg';
import './MultiSelectTiles.css';
import { useIntl } from 'react-intl';

type Option = {
  value: string;
  text: FormattedMessageType;
  icon: ReactNode;
};

type TileProps = {
  option: Option;
  selected: boolean;
  onClick: () => void;
};

function Tile({ option, selected, onClick }: TileProps) {
  const { formatMessage } = useIntl();
  return (
    <CardActionArea key={option.value} sx={{ width: '15rem' }} className="card-action-area" onClick={onClick}>
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
              title={formatMessage({ id: 'multiSelect.checkmark.alt', description: 'checked' })}
              className="checkmark"
            />
          </Stack>
        )}
      </Card>
    </CardActionArea>
  );
}

type MultiSelectTilesProps = {
  options: Option[];
  values: string[];
  onChange: (value: string[]) => void;
};

function MultiSelectTiles({ options, values, onChange }: MultiSelectTilesProps) {
  return (
    <div className="multiselect-tiles-container">
      {options.map((option) => {
        const onClick = () => {
          let newValues: string[];
          if (values.includes(option.value)) {
            newValues = values.filter((value) => value !== option.value);
          } else {
            newValues = [...values, option.value];
          }

          onChange(newValues);
        };

        const selected = values.includes(option.value);

        return <Tile option={option} onClick={onClick} key={option.value} selected={selected} />;
      })}
    </div>
  );
}

export default MultiSelectTiles;
