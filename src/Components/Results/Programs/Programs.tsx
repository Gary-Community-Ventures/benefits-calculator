import { Program } from '../../../Types/Results';
import { useResultsContext } from '../Results';
import Filter from './Filter';
import ProgramCard from './ProgramCard';
import CategoryHeading from '../CategoryHeading/CategoryHeading';

const Programs = () => {
  const { programs } = useResultsContext();

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
      <Filter />
      {Object.entries(categories).map(([category, programs]) => {
        return (
          <div key={category}>
            <CategoryHeading headingType={programs[0].category} amount="200"></CategoryHeading>
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
