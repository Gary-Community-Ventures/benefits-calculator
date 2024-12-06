import { DetailedHTMLProps, HTMLAttributes, ReactNode, SelectHTMLAttributes, useEffect, useState } from 'react';
import { Control, FieldValues, UseFormRegister } from 'react-hook-form';
import { FormattedMessageType } from '../../Types/Questions';

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
  return (
    <div>
      <button type="button" onClick={onClick}>
        {option.text} {String(selected)}
      </button>
    </div>
  );
}

type MultiSelectTilesProps = {
  options: Option[];
  selectProps: ReturnType<UseFormRegister<FieldValues>>;
};

function MultiSelectTiles({ options, selectProps }: MultiSelectTilesProps) {
  const [htmlSelect, setHtmlSelect] = useState<HTMLSelectElement | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selectProps.value);

  const onSelectChange = () => {
    if (htmlSelect === null) {
      return;
    }

    const newSelectedOptions: string[] = [];

    for (let i = 0; i < htmlSelect.options.length; i++) {
      const htmlOption = htmlSelect[i] as HTMLOptionElement;

      if (htmlOption.selected) {
        newSelectedOptions.push(htmlOption.value);
      }
    }

    setSelectedOptions(newSelectedOptions);
  };

  useEffect(() => {
    onSelectChange();
  }, [htmlSelect]);

  return (
    <div>
      <select {...selectProps} multiple value={selectedOptions}>
        {options.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
      <div className="multiselect-tiles-container">
        {options.map((option) => {
          const onClick = () => {
            if (selectedOptions.includes(option.value)) {
              setSelectedOptions(selectedOptions.filter((value) => value !== option.value));
            } else {
              setSelectedOptions([...selectedOptions, option.value]);
            }
          };

          const selected = selectedOptions.includes(option.value);

          return <Tile option={option} onClick={onClick} key={option.value} selected={selected} />;
        })}
      </div>
    </div>
  );
}

export default MultiSelectTiles;
