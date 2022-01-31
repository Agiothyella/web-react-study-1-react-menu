import useInput from "../../hooks/use-input";
import classes from "./CheckOut.module.css";

// FIXME: MAKE THE INPUT FIELD A SEPARATE COMPONENT TO BE REUSED BY EACH INPUT WITH ITS SEPARATE STATE. THIS CODE IS TOO CLUTERED. BAD.

function CheckOut(props) {
  // VARIABLES: STATES --------------------------------------- //
  const {
    inputValue: nameValue,
    isInputValid: isNameValid,
    isInputError: isNameError,
    blurHandler: nameBlurHandler,
    changeHandler: nameChangeHandler,
    touchedInput: nameTouchedInput,
    resetInput: resetName,
  } = useInput((input) => input.trim() !== "");

  const {
    inputValue: streetValue,
    isInputValid: isStreetValid,
    isInputError: isStreetError,
    blurHandler: streetBlurHandler,
    changeHandler: streetChangeHandler,
    touchedInput: streetTouchedInput,
    resetInput: resetStreet,
  } = useInput((input) => input.trim() !== "");

  const {
    inputValue: postalValue,
    isInputValid: isPostalValid,
    isInputError: isPostalError,
    blurHandler: postalBlurHandler,
    changeHandler: postalChangeHandler,
    touchedInput: postalTouchedInput,
    resetInput: resetPostal,
  } = useInput((input) => input.trim().length === 5);

  const {
    inputValue: cityValue,
    isInputValid: isCityValid,
    isInputError: isCityError,
    blurHandler: cityBlurHandler,
    changeHandler: cityChangeHandler,
    touchedInput: cityTouchedInput,
    resetInput: resetCity,
  } = useInput((input) => input.trim() !== "");

  const touchAll = () => {
    nameTouchedInput();
    streetTouchedInput();
    postalTouchedInput();
    cityTouchedInput();
  };

  const resetAll = () => {
    resetName();
    resetStreet();
    resetPostal();
    resetCity();
  };

  // FUNCTION: ----------------------------------------------- //
  const mealsToConfirm = props.context.items.map((item) => (
    <li key={item.id}>
      <h3>{item.name}</h3>
      <div>
        <span>{`€${item.price.toFixed(2)}`}</span>
        <span>{item.amount}</span>
        <span>{`€${(item.amount * item.price).toFixed(2)}`}</span>
      </div>
    </li>
  ));

  const formSubmitHandler = (e) => {
    e.preventDefault();

    touchAll();
    if (!isFormValid) return;

    const formValues = {
      name: nameValue,
      street: streetValue,
      postal: postalValue,
      city: cityValue,
    };

    resetAll();
    props.onConfirm(formValues);
  };

  const isFormValid = isNameValid && isStreetValid && isPostalValid && isCityValid;

  return (
    <>
      <ul className={classes["recipe"]}>{mealsToConfirm}</ul>
      <div className={classes["recipe-bottom"]}>
        <span>Total</span>
        <span>{props.context.totalAmount}</span>
      </div>
      <form onSubmit={formSubmitHandler} className={classes["form"]}>
        <div className={classes["inputs"]}>
          <div
            className={
              isNameError
                ? `${classes["control"]} ${classes["invalid"]}`
                : classes["control"]
            }
          >
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={nameValue}
            />
            {isNameError && <p>Please enter valid name!</p>}
          </div>
          <div
            className={
              isStreetError
                ? `${classes["control"]} ${classes["invalid"]}`
                : classes["control"]
            }
          >
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              onChange={streetChangeHandler}
              onBlur={streetBlurHandler}
              value={streetValue}
            />
            {isNameError && <p>Please enter valid street!</p>}
          </div>
          <div
            className={
              isPostalError
                ? `${classes["control"]} ${classes["invalid"]}`
                : classes["control"]
            }
          >
            <label htmlFor="postal">Postal Code</label>
            <input
              type="text"
              id="postal"
              onChange={postalChangeHandler}
              onBlur={postalBlurHandler}
              value={postalValue}
            />
            {isPostalError && <p>Please enter valid postal code! (5 characters long)</p>}
          </div>
          <div
            className={
              isCityError
                ? `${classes["control"]} ${classes["invalid"]}`
                : classes["control"]
            }
          >
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              onChange={cityChangeHandler}
              onBlur={cityBlurHandler}
              value={cityValue}
            />
            {isCityError && <p>Please enter valid city!</p>}
          </div>
        </div>

        <div className={classes.actions}>
          <button type="button" onClick={props.onClose}>
            Close
          </button>
          <button type="button" onClick={props.onCancel}>
            Back
          </button>
          <button type="submit" className={classes.submit}>
            Confirm
          </button>
        </div>
      </form>
    </>
  );
}

export default CheckOut;
