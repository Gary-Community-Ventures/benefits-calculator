import FilterTable from "../FilterTable/FilterTable";

const OtherPopover = ({
  updateFilter,
  categories,
 }) => {
  return (
    <div>
      <FilterTable
        updateFilter={updateFilter}
        categories={categories}
      />
    </div>
  );
}

export default OtherPopover;