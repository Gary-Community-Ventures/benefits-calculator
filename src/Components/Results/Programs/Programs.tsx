import { Program, Translation } from '../../../Types/Results';
import { useResultsContext } from '../Results';
import Filter from './Filter';
import ProgramCard from './ProgramCard';
import CategoryHeading from '../CategoryHeading/CategoryHeading';
import { useContext, useMemo } from 'react';
import { Context } from '../../Wrapper/Wrapper';
import BackToScreen from '../../BackToScreen/BackToScreen';
import { calculateTotalValue } from '../FormattedValue';

type Category = {
  name: Translation;
  programs: Program[];
};

function sortProgramsIntoCategories(programs: Program[]): Category[] {
  // group programs by category
  const categories = programs.reduce((acc: Category[], program) => {
    const categoryName = program.category.default_message;

    let category = acc.find((cat) => cat.name.default_message === categoryName);

    if (category === undefined) {
      category = { name: program.category, programs: [] };
      acc.push(category);
    }

    category.programs.push(program);

    return acc;
  }, []);

  // sort categories by total category value in decending order
  categories.sort((a, b) => {
    return (
      calculateTotalValue(b.programs, b.name.default_message) - calculateTotalValue(a.programs, a.name.default_message)
    );
  });

  // sort programs in each category by decending estimated value
  for (const category of categories) {
    category.programs.sort((a, b) => b.estimated_value - a.estimated_value);
  }

  return categories;
}

const Programs = () => {
  const { formData } = useContext(Context);
  const { programs, missingPrograms } = useResultsContext();

  const categories = useMemo(() => sortProgramsIntoCategories(programs), [programs]);

  return (
    <>
      {formData.immutableReferrer === 'lgs' && missingPrograms && <BackToScreen />}
      <Filter />
      {categories.map(({ name, programs }) => {
        return (
          <div key={name.default_message}>
            <CategoryHeading headingType={name} />
            {programs.map((program, index) => {
              return <ProgramCard program={program} key={index} />;
            })}
          </div>
        );
      })}
    </>
  );
};

export default Programs;
