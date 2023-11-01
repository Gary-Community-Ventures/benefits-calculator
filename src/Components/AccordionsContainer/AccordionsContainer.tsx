import accordionsData, { BenefitAccordion } from '../../Assets/BenefitCategoryLists/benefitAccordions.ts';
import CategoryAccordion from '../CategoryAccordion/CategoryAccordion.tsx';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import './AccordionsContainer.css';
import { useErrorController } from '../../Assets/validationFunctions.tsx';
import { AccordionContainerDetails } from '../../Types/Questions.ts';

type Props = {
  componentDetails: AccordionContainerDetails;
  submitted: number;
};

const AccordionsContainer = ({ componentDetails, submitted }: Props) => {
  const { formData } = useContext(Context);
  const [expanded, setExpanded] = useState<boolean | number>(false);

  const errorController = useErrorController(componentDetails.inputError, componentDetails.inputHelperText);

  useEffect(() => {
    errorController.setSubmittedCount(submitted);
  }, [submitted]);

  useEffect(() => {
    errorController.updateError(formData.hasBenefits, formData);
  }, [expanded]);

  const createAccordions = (accordionsInfo: BenefitAccordion[]) => {
    const categoryAccordions = accordionsInfo.map((accordionData, index) => {
      return (
        <div key={index}>
          <CategoryAccordion
            categoryName={accordionData.categoryName}
            categoryOptions={accordionData.categoryOptions}
            setExpanded={setExpanded}
            expanded={expanded}
            index={index}
          />
        </div>
      );
    });

    return categoryAccordions;
  };

  return (
    <>
      <div className="accordions-container">{createAccordions(accordionsData)}</div>
      {errorController.showError && errorController.message(formData.hasBenefits, formData)}
    </>
  );
};

export default AccordionsContainer;
