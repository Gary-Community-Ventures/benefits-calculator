import { FormControlLabel, FormGroup, Checkbox, FormControl } from "@mui/material";

const CheckboxGroup = ({ options, householdData, setHouseholdData, index }) => {
 
  const handleCheckboxChange = (event) => {
    const { name } = event.target;

    const updatedHouseholdData = householdData.map((personData, i) => {
      if (i === index) {
        return {
          ...personData,
          [name]: !(householdData[index][name])
        };
      } else {
        return personData;
      }
    });

    setHouseholdData(updatedHouseholdData);
  }

  const createFormControlLabels = (optionList) => {
    const optionKeys = Object.keys(optionList);

    const formControlLabels = optionKeys.map((optionKey) => {
      return (
        <FormControlLabel 
          control={
            <Checkbox 
              checked={householdData[index][optionKey]} 
              onChange={handleCheckboxChange}
              name={optionKey} />
          } 
          label={optionList[optionKey]}
          key={optionKey}
        />
      );
    });
    
    return formControlLabels;
  }

  return (
    <FormControl>
      <FormGroup>
        {createFormControlLabels(options)}
      </FormGroup>
    </FormControl>
  );
}

export default CheckboxGroup;