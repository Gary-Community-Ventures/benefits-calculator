import {
  CalculatedCitizenLabel,
  calculatedCitizenshipFilters,
  CitizenLabels,
} from '../../Assets/citizenshipFilterFormControlLabels';
import { FormData } from '../../Types/FormData';
import { Program } from '../../Types/Results';
import { programValue } from './FormattedValue';
import { findMemberEligibilityMember } from './Results';

export default function filterProgramsGenerator(
  formData: FormData,
  filtersChecked: Record<CitizenLabels, boolean>,
  isAdminView: boolean,
) {
  function updateMemberEligibility(program: Program) {
    // Check if one of the non calculated filters is checked
    // then we don't apply any more calculations
    const filtersCheckedStrArr = Object.entries(filtersChecked)
      .filter(([key, value]) => {
        if (key in calculatedCitizenshipFilters) {
          return false;
        }

        return value;
      })
      .map(([key, _]) => key);

    const meetsLegalStatus = program.legal_status_required.some((status) => filtersCheckedStrArr.includes(status));

    if (meetsLegalStatus) {
      return program;
    }

    for (const memberEligibility of program.members) {
      const member = findMemberEligibilityMember(formData, memberEligibility);

      let meetsCondition = false;
      let hasMemberCondition = false;

      for (const [filterNameUntyped, calculator] of Object.entries(calculatedCitizenshipFilters)) {
        const filterName = filterNameUntyped as CalculatedCitizenLabel;

        // If the filter is not checked don't calculate eligibility
        if (filtersChecked[filterName] === false) {
          continue;
        }

        // If the program does not require the citizenship status don't calculate eligibility
        if (program.legal_status_required.every((status) => status !== filterName)) {
          continue;
        }

        hasMemberCondition = true;

        if (calculator.func(member)) {
          meetsCondition = true;
        }
      }

      // Make members ineligble if they don't meet any of the conditions
      // and at least one of the condtions is being used
      if (hasMemberCondition && !meetsCondition) {
        memberEligibility.value = 0;
        memberEligibility.eligible = false;
      }
    }

    return program;
  }

  function showProgram(program: Program) {
    // show all programs in the admin view
    if (isAdminView) {
      return true;
    }

    const filtersCheckedStrArr = Object.entries(filtersChecked)
      .filter((filterKeyValPair) => {
        return filterKeyValPair[1];
      })
      .map((filteredKeyValPair) => filteredKeyValPair[0]);

    const meetsLegalStatus = program.legal_status_required.some((status) => filtersCheckedStrArr.includes(status));
    const isEligible = program.eligible;
    const hasValue = programValue(program) > 0;
    const doesNotHave = !program.already_has;

    return meetsLegalStatus && isEligible && hasValue && doesNotHave;
  }

  return (programs: Program[]) => {
    return structuredClone(programs).map(updateMemberEligibility).filter(showProgram);
  };
}
