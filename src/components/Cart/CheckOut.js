// import useInput from "../../hooks/use-input";
import classes from "./CheckOut.module.css";

function CheckOut(props) {
  // VARIABLES: STATES --------------------------------------- //
  // const {} = useInput((input) => input.trim() !== "");
  // const {} = useInput((input) => input.trim() !== "");
  // const {} = useInput((input) => input.trim() !== "");
  // const {} = useInput((input) => input.trim() !== "");

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

  return (
    <>
      <ul className={classes["recipe"]}>{mealsToConfirm}</ul>
      <div className={classes["recipe-bottom"]}>
        <span>Total</span>
        <span>{props.context.totalAmount}</span>
      </div>
      <form onSubmit={props.onConfirm} className={classes["form"]}>
        <div className={classes["inputs"]}>
          <div className={classes["control"]}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" />
          </div>
          <div className={classes["control"]}>
            <label htmlFor="street">Street</label>
            <input type="text" id="street" />
          </div>
          <div className={classes["control"]}>
            <label htmlFor="postal">Postal Code</label>
            <input type="text" id="postal" />
          </div>
          <div className={classes["control"]}>
            <label htmlFor="city">City</label>
            <input type="text" id="city" />
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
