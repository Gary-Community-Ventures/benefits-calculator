import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CurrentBenefitsCheckboxGroup  from '../CheckboxGroup/CurrentBenefitsCheckboxGroup';
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { CategoryOptions } from '../../Assets/BenefitCategoryLists/benefitAccordions';
import { FormattedMessageType } from '../../Types/Questions';

type Props = {
  categoryName: FormattedMessageType;
  categoryOptions: CategoryOptions;
  setExpanded: (index: boolean | number) => void;
  expanded: number | boolean;
  index: number;
};

const CategoryAccordion = ({ categoryName, categoryOptions, setExpanded, expanded, index }: Props) => {
  const { theme } = useContext(Context);

  return (
    <Accordion
      expanded={expanded === index}
      onChange={(event, isExpanded) => {
        setExpanded(isExpanded ? index : false);
      }}
      sx={{ marginBottom: '.25rem' }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: '#ffffff', height: '28.8' }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ backgroundColor: theme.primaryColor }}
      >
        <Typography sx={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: '400' }}>{categoryName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CurrentBenefitsCheckboxGroup stateVariable="benefits" options={categoryOptions} />
      </AccordionDetails>
    </Accordion>
  );
};

export default CategoryAccordion;
