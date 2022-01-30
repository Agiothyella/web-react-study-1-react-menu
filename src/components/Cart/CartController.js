import { useContext, useState } from "react";
import CartContext from "../../context/cart-context";

import Modal from "../UI/Modal";
import Cart from "./Cart";
import CheckOut from "./CheckOut";

function CartController(props) {
  const [isCheckOut, setIsCheckOut] = useState(false);

  // VARIABLES: ------------------------------------------------//
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

  const confirmOrderHandler = (e) => {
    e.preventDefault();
    console.log("ordered");
  };
  // -------- HANDLERS -------------------------------------- //

  return (
    <Modal onClose={props.onCartClose}>
      {!isCheckOut && (
        <Cart
          onClose={props.onCartClose}
          context={cartContextProp}
          onRemove={removeFromCartHandler}
          onAdd={addToCartHandler}
          onOrder={orderHandler}
        />
      )}
      {isCheckOut && (
        <CheckOut
          context={cartContextProp}
          onConfirm={confirmOrderHandler}
          onCancel={cancelOrderHandler}
          onClose={props.onCartClose}
        />
      )}
    </Modal>
  );
}

export default CartController;
