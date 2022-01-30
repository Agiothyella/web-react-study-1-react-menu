import { useState } from "react";

function useInput(validatorFuction) {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isInputValid = validatorFuction(inputValue);
  const isInputError = !isInputValid && isTouched;

  const changeHandler = (e) => {
    setInputValue(e.target.value);
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
    resetInput,
  };
}

export default useInput;
