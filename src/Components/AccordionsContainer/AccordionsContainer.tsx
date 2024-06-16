import { useState, useEffect, useContext } from 'react';
import { BenefitAccordion, CategoryOptions } from '../../Assets/BenefitCategoryLists/benefitAccordions.ts';
import CategoryAccordion from '../CategoryAccordion/CategoryAccordion.tsx';
import { Config } from '../../Types/Config.ts';
import { FormattedMessageType } from '../../Types/Questions.ts';
import { Context } from '../Wrapper/Wrapper.tsx';
import './AccordionsContainer.css';
import { useErrorController } from '../../Assets/validationFunctions.tsx';
import { AccordionContainerDetails } from '../../Types/Questions.ts';

type Props = {
  componentDetails: AccordionContainerDetails;
  submitted: number;
};

// transforms config benefits and returns array of accordion object array
const formatCategoryBenefits = (categoryBenefits: Config['category_benefits']): BenefitAccordion[] => {
  return Object.entries(categoryBenefits).map(([categoryKey, categoryValue]) => {
    const categoryName: FormattedMessageType = categoryValue.category_name;
    const categoryOptions: CategoryOptions = Object.entries(categoryValue.benefits).reduce(
      (options, [benefitKey, benefitValue]) => {
        const benefitMessage: FormattedMessageType = benefitValue as FormattedMessageType;

        options[benefitKey] = benefitMessage;
        return options;
      },
      {} as CategoryOptions,
    );

    return {
      categoryName,
      categoryOptions,
    };
  });
};

const AccordionsContainer = ({ componentDetails, submitted }: Props) => {
  const { formData, config } = useContext(Context);
  let formattedBenefits: BenefitAccordion[] = [];

  if (config) formattedBenefits = formatCategoryBenefits(config.category_benefits);
  else console.error('Error: config or category_benefits is undefined.');

  const [expanded, setExpanded] = useState<boolean | number>(false);

  useEffect(() => {
    setExpanded(0);
  }, []);

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
      <div className="accordions-container">{createAccordions(formattedBenefits)}</div>
      {errorController.showError && errorController.message(formData.hasBenefits, formData)}
    </>
  );
};

export default AccordionsContainer;
