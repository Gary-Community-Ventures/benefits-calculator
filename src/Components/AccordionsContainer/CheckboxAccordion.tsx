import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactNode, useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { FormattedMessageType } from '../../Types/Questions';
import { Checkbox, FormControlLabel } from '@mui/material';
import './CheckboxAccordion.css';

type Option<T = string> = {
  value: T;
  text: ReactNode;
};

type Props<T = string> = {
  name: FormattedMessageType;
  options: Option<T>[];
  expanded: boolean;
  onExpand: (isExpanded: boolean) => void;
  values: T[];
  onChange: (values: T[]) => void;
};

function CheckBoxAccordion<T = string>({ name, options, onExpand, expanded, values, onChange }: Props<T>) {
  const { theme } = useContext(Context);

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, isExpanded) => {
        onExpand(isExpanded);
      }}
      sx={{ marginBottom: '.25rem' }}
      className="checkbox-accordion-container"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: '#ffffff', height: '28.8' }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ backgroundColor: theme.primaryColor }}
      >
        <span className='checkbox-accordion-title'>{name}</span>
      </AccordionSummary>
      <AccordionDetails>
        {options.map((option, index) => {
          const onCheckboxChange = () => {
            let newValue: T[] = [];
            if (values.includes(option.value)) {
              newValue = values.filter((value) => value !== option.value);
            } else {
              newValue = [...values, option.value];
            }

            onChange(newValue);
          };

          return (
            <div key={index}>
              <FormControlLabel
                sx={{ alignItems: 'center', marginTop: '1rem' }}
                control={<Checkbox checked={values.includes(option.value)} onChange={onCheckboxChange} />}
                label={option.text}
              />
            </div>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
}

export default CheckBoxAccordion;
