// import { useContext } from "react";

import CartItem from "./CartItem";
import classes from "./Cart.module.css";
// import CartContext from "../../store/cart-context";

const Cart = (props) => {
  // const cartCtx = useContext(CartContext);

  // const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  // const hasItems = cartCtx.items.length > 0;

  // const cartItemRemoveHandler = (id) => {
  //   cartCtx.removeItem(id);
  // };

  // const cartItemAddHandler = (item) => {
  //   cartCtx.addItem(item);
  // };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {props.context.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={props.onRemove.bind(null, item.id)}
          onAdd={props.onAdd.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{props.context.totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {props.context.hasItems && (
          <button className={classes.button} onClick={props.onOrder}>
            Order
          </button>
        )}
      </div>
    </>
  );
};

export default Cart;
