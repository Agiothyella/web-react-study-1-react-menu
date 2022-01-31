import { useState } from "react";

function useInput(validatorFuction) {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isInputValid = validatorFuction(inputValue);
  const isInputError = !isInputValid && isTouched;

  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const touchedInput = () => {
    setIsTouched(true);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  const resetInput = () => {
    setInputValue("");
    setIsTouched(false);
  };

  return {
    inputValue,
    isInputValid,
    isInputError,
    blurHandler,
    changeHandler,
    touchedInput,
    resetInput,
  };
}

export default useInput;
