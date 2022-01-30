import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";

import Modal from "../UI/Modal";
import Cart from "./Cart";
import CheckOut from "./CheckOut";

function CartController(props) {
  const [isCheckOut, setIsCheckOut] = useState(false);

  // VARIABLES: ------------------------------------------------//
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartContextProp = {
    items: cartCtx.items,
    totalAmount,
    hasItems,
  };
  // --------- ------------------------------------------------//

  // FUNCTION: HANDLERS -------------------------------------- //
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = (e) => {
    e.preventDefault();
    setIsCheckOut(true);
  };

  const cancelOrderHandler = (e) => {
    e.preventDefault();
    setIsCheckOut(false);
  };

  const confirmOrderHandler = (e) => {
    e.preventDefault();
    console.log("ordered");
  };
  // -------- HANDLERS -------------------------------------- //

  return (
    <Modal onClose={props.onClose}>
      {!isCheckOut && (
        <Cart
          onClose={props.onClose}
          context={cartContextProp}
          onRemove={cartItemRemoveHandler}
          onAdd={cartItemAddHandler}
          onOrder={orderHandler}
        />
      )}
      {isCheckOut && (
        <CheckOut
          context={cartContextProp}
          onConfirm={confirmOrderHandler}
          onCancel={cancelOrderHandler}
          onClose={props.onClose}
        />
      )}
    </Modal>
  );
}

export default CartController;
