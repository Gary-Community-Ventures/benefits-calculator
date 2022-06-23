const DropdownMenu = (options) => {

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel if='income-type-label'>Income Type</InputLabel>
      <StyledSelectfield
        labelId='income-type-label'
        id={incomeStreamName}
        value={incomeStreamName}
        name={incomeStreamLabel}
        label='Income Type'
        onChange={(event) => { handleSelectChange(event, index) }}>
        {createMenuItems()}
      </StyledSelectfield>
    </FormControl>
  );
}

export default DropdownMenu;