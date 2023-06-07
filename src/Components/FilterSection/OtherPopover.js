import FilterTable from "../FilterTable/FilterTable";

const OtherPopover = ({
  updateFilter,
  categories,
  eligibilityState,
  categoryState,
  alreadyHasToggleState
 }) => {

  return (
    <div>
      <FilterTable
        updateFilter={updateFilter}
        categories={categories}
        eligibilityState={eligibilityState}
        categoryState={categoryState}
        alreadyHasToggleState={alreadyHasToggleState}
      />
    </div>
  );
}

export default OtherPopover;