import { Program } from '../../../Types/Results';
import { useResultsContext } from '../Results';
import Filter from './Filter';
import ProgramCard from './ProgramCard';
import CategoryHeading from '../CategoryHeading/CategoryHeading';
import { useContext } from 'react';
import { Context } from '../../Wrapper/Wrapper';
import BackToScreen from '../../BackToScreen/BackToScreen';

const Programs = () => {
  const { formData } = useContext(Context);
  const { programs, missingPrograms } = useResultsContext();

  const categories = programs.reduce((acc: { [key: string]: Program[] }, program) => {
    const category = program.category.default_message;
    if (acc[category] === undefined) {
      acc[category] = [];
    }

    acc[category].push(program);

    return acc;
  }, {});

  return (
    <>
      {formData.immutableReferrer === 'lgs' && missingPrograms && <BackToScreen />}
      <Filter />
      {Object.entries(categories).map(([category, programs]) => {
        return (
          <div key={category}>
            <CategoryHeading headingType={programs[0].category} />
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
