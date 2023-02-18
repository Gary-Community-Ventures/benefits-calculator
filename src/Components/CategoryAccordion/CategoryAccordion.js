import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BasicCheckboxGroup from '../CheckboxGroup/BasicCheckboxGroup';

const CategoryAccordion = ({ categoryName, categoryOptions, formData, setFormData }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{categoryName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <BasicCheckboxGroup
          stateVariable='benefits'
          options={categoryOptions}
          state={formData}
          setState={setFormData}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export default CategoryAccordion;