import { useContext, useState } from "react";
import { DATABASE_URL } from "../../config/config";
import CartContext from "../../context/cart-context";

import Modal from "../UI/Modal";
import Cart from "./Cart";
import CheckOut from "./CheckOut";
import classes from "./Cart.module.css";

// HACK: USING CSS MODULE FROM CART COMPONENT BECAUSE I ONLY NEED A LITTLE STYLING. Creating new css modules seems unnecessary. Might fix later with more proper solution.

function CartController(props) {
  // VARIABLES: ------------------------------------------------//
  // STATE -----------//
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  // CONTEXT -------- //
  const cartContext = useContext(CartContext);

  const totalAmount = `€${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartContextProp = {
    items: cartContext.items,
    totalAmount,
    hasItems,
  };
  // --------- ------------------------------------------------//

  // FUNCTION: HANDLERS -------------------------------------- //
  const addToCartHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const removeFromCartHandler = (item) => {
    cartContext.removItem(item);
    return;
  };

  const orderHandler = (e) => {
    e.preventDefault();
    setIsCheckOut(true);
  };

  const cancelOrderHandler = (e) => {
    e.preventDefault();
    setIsCheckOut(false);
  };

  const confirmOrderHandler = async (formValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${DATABASE_URL}/order.json`, {
        method: "POST",
        body: JSON.stringify({
          user: formValues,
          items: cartContext.items,
          cost: cartContext.totalAmount,
        }),
      });
      if (!res.ok) throw new Error("Something went wrong!");
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
      setDidSubmit(true);
    }

    cartContext.resetItem();
    setTimeout(() => {
      props.onCartClose();
    }, 3000);
  };
  // -------- HANDLERS -------------------------------------- //

  // MARKUP: ------------------------------------------------ //
  const cartSubmitting = (
    <>
      <p>Placing order(s)...</p>
    </>
  );
  const cartSubmitted = (
    <>
      <p>Order has been placed.</p>
      <button
        type="button"
        className={classes["btn__custom"]}
        onClick={props.onCartClose}
      >
        Close
      </button>
    </>
  );
  // MARKUP ------------------------------------------------- //

  return (
    <Modal onClose={props.onCartClose}>
      {!isCheckOut && !isSubmitting && !didSubmit && (
        <Cart
          context={cartContextProp}
          onRemove={removeFromCartHandler}
          onAdd={addToCartHandler}
          onOrder={orderHandler}
          onClose={props.onCartClose}
        />
      )}
      {isCheckOut && !isSubmitting && !didSubmit && (
        <CheckOut
          context={cartContextProp}
          onConfirm={confirmOrderHandler}
          onCancel={cancelOrderHandler}
          onClose={props.onCartClose}
        />
      )}
      {isSubmitting && cartSubmitting}
      {didSubmit && cartSubmitted}
    </Modal>
  );
}

export default CartController;
