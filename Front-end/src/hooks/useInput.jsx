import { useCallback, useState } from "react";
export const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [valueIsTouched, setValueIsTouched] = useState(false);
  const isValid = validateValue(enteredValue);
  const hasError = !isValid && valueIsTouched;

  const valueChangeHandler = useCallback(
    (event) => {
      console.log(event.target.value);  
      setValueIsTouched(true);
      setEnteredValue(event.target.value);
    },
    [setValueIsTouched, setEnteredValue]
  );

  const valueBlurHandler = useCallback(() => {
    setValueIsTouched(true);
  }, [setValueIsTouched]);
  const setValue = (value) => {
    setEnteredValue(value);
  };
  const reset = () => {
    setEnteredValue("");
    setValueIsTouched(false);
  };
  return {
    enteredValue,
    hasError,
    isValid,
    setValue,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};