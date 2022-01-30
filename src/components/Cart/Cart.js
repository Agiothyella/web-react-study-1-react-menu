import CartItem from "./CartItem";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {props.context.items.map((item) => (
        <CartItem
          key={item.id}
          onAdd={props.onAdd.bind(null, item)}
          onRemove={props.onRemove.bind(null, item)}
          data={{
            name: item.name,
            price: item.price,
            amount: item.amount,
          }}
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
