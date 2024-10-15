import { ProgramCategory } from '../../../Types/Results';
import { findValidationForProgram, useResultsContext } from '../Results';
import Filter from './Filter';
import ProgramCard from './ProgramCard';
import CategoryHeading from '../CategoryHeading/CategoryHeading';
import { useMemo } from 'react';
import { calculateTotalValue } from '../FormattedValue';
import { ResultsMessage } from '../../Referrer/Referrer';

function sortProgramsIntoCategories(categories: ProgramCategory[]): ProgramCategory[] {
  // sort categories by total category value in decending order
  const sortedCategories = categories
    .filter((category) => category.programs.length > 0)
    .sort((a, b) => {
      return calculateTotalValue(b) - calculateTotalValue(a);
    });

  // sort programs in each category by decending estimated value
  for (const category of sortedCategories) {
    category.programs = [...category.programs].sort((a, b) => b.estimated_value - a.estimated_value);
  }

  return sortedCategories;
}

const ValidationCategory = () => {
  const { programs, isAdminView, validations } = useResultsContext();

  const validationPrograms = useMemo(
    () => programs.filter((program) => findValidationForProgram(validations, program) !== undefined),
    [validations, programs],
  );

  const validationCategory = useMemo<ProgramCategory>(() => {
    return {
      external_name: 'validation_category',
      icon: '',
      name: { label: 'programs.categories.validation.header', default_message: 'Validations' },
      description: { label: '', default_message: '' },
      caps: [],
      programs: validationPrograms,
    };
  }, [validationPrograms]);

  if (!isAdminView || validationPrograms.length === 0) {
    return null;
  }

  return (
    <>
      <CategoryHeading category={validationCategory} />
      {validationPrograms.map((program, index) => {
        return <ProgramCard program={program} key={index} />;
      })}
    </>
  );
};

const Programs = () => {
  const { programCategories } = useResultsContext();

  const categories = useMemo(() => sortProgramsIntoCategories(programCategories), [programCategories]);

  return (
    <>
      <ResultsMessage />
      <Filter />
      <ValidationCategory />
      {categories.map((category) => {
        return (
          <div key={category.name.default_message}>
            <CategoryHeading category={category} />
            {category.programs.map((program, index) => {
              return <ProgramCard program={program} key={index} />;
            })}
          </div>
        );
      })}
    </>
  );
};

export default Programs;
