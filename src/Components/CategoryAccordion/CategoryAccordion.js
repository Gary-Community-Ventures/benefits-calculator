import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BasicCheckboxGroup from '../CheckboxGroup/BasicCheckboxGroup';

const CategoryAccordion = ({ categoryName, categoryOptions, formData, setFormData, handleAccordionSelectChange, expanded, index }) => {
  const accordionSummaryColor = (expanded === index) ? '#0096B0' : '#8d8d8d';

  return (
    <Accordion
      expanded={expanded === index}
      onChange={handleAccordionSelectChange(index)}
      sx={{ marginBottom: '.25rem' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: '#ffffff', height: '28.8' }}/>}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ backgroundColor: accordionSummaryColor }}
      >
        <Typography
          sx={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: '400' }}>
          {categoryName}
        </Typography>
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