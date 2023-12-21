import { Program } from '../../../Types/Results';
import { useResultsContext } from '../Results';
import ResultsTranslate from '../Translate/Translate';
import Filter from './Filter';
import ProgramCard from './ProgramCard';

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
            <h2>
              <ResultsTranslate translation={programs[0].category} />
            </h2>
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
