export default function filterAllPrograms(programs, allFilters) {
  //so it's not getting any of the programs
  console.log({programs})

  const renderFilteredCitizenshipPrograms = (currentPrograms: []) => {
    const truthyFilterValues = Object.entries(allFilters)
      .filter(entry => entry[1])
      .map(entry => {
        return entry[0]
      });
    // console.log({ truthyFilterValues })//['green_card', 'refugee'];
    let resultingPrograms = {};

    if (truthyFilterValues.length > 0) {
      truthyFilterValues.forEach(truthyValue => {
        currentPrograms.forEach(currentProgram => {
          if (currentProgram.legal_status_required.includes(truthyValue) && !resultingPrograms[truthyValue] as string) {
            //need to make sure that it's not pushing in duplicates
            resultingPrograms[truthyValue] = currentProgram;
          }
        });
      });
      return Object.values(resultingPrograms);
    } else { //no filters have been selected so return all currentPrograms
      return currentPrograms;
    }
  };

  console.log(`filtered programs`,renderFilteredCitizenshipPrograms(programs))
  return renderFilteredCitizenshipPrograms(programs);
}