import CitizenshipSwitch from "../CustomSwitch/CitizenshipSwitch";

const CitizenshipPopover = ({ updateFilter }) => {
  return (
    <div>
      <CitizenshipSwitch updateFilter={updateFilter} />
    </div>
  );
}

export default CitizenshipPopover;