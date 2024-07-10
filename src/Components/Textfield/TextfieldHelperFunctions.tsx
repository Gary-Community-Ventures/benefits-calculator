export const zipcodeOnChange = (value: string, stateObj: FormData, stateInputValue: keyof FormData, setFormData: () => void) => {
    const numberUpToEightDigitsLongRegex = /^\d{0,8}$/;
    console.log({value})
    if (numberUpToEightDigitsLongRegex.test(stateObj[stateInputValue])) {
      if (value === '') {
        setFormData({ ...stateObj, [stateInputValue]: value });
        return;
      }
      setFormData({ ...stateObj, [stateInputValue]: Number(value) });
    }
};