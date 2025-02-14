import { InputBaseComponentProps } from '@mui/material';
import { ChangeEvent, ReactEventHandler } from 'react';

export const NUM_PAD_PROPS: InputBaseComponentProps = { inputMode: 'decimal' };

type EventElements = HTMLInputElement | HTMLTextAreaElement;

export const INTEGERS = /^\d*$/; // any numbers
export const DECIMALS = /^\d*\.?\d*$/; // any numbers with unlimited decimal places
export const DOLLARS = /^\d*\.?\d{0,2}$/; // any numbers with a maximum of 2 decimal places

type OnChangeFunction<EventElement extends EventElements> = (func: ChangeEvent<EventElement>) => void;

// restrict what a user can enter into a text field
export function handleNumbersOnly<EventElement extends EventElements>(
  onChange: OnChangeFunction<EventElement> = () => {},
  regex: RegExp = INTEGERS,
): OnChangeFunction<EventElement> {
  return (event) => {
    const value = event.target.value;

    if (!regex.test(value)) {
      return;
    }

    onChange(event);
  };
}

export function numberInputProps(onChange: ReactEventHandler<EventElements> = () => {}, regex: RegExp = INTEGERS) {
  return {
    ...NUM_PAD_PROPS,
    onChange: handleNumbersOnly(onChange, regex),
  };
}
