import { useRef, useState } from "react";
import Input from "../../UI/Input";
import style from "./MealItemForm.module.css";

function MealItemForm(props) {
  const [isAmountValid, setIsAmountValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const amountStr = amountInputRef.current.value;
    const enteredAmount = +amountStr;

    if (amountStr.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5) {
      setIsAmountValid(false);
      return;
    }

    props.onAddToCart(enteredAmount);
  };

  return (
    <form className={style["form"]} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
}

export default MealItemForm;
