import style from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cart-context";

function HeaderCartButton(props) {
  const [btnHighlighted, setBtnHighlighted] = useState(false);

  const cartContext = useContext(CartContext);
  const cartItemAmount = cartContext.items.reduce((cur, item) => cur + item.amount, 0);

  const btnClasses = `${style.button} ${btnHighlighted ? style.bump : ""}`;

  useEffect(() => {
    if (cartContext.items.length === 0) {
      return;
    }

    setBtnHighlighted(true);
    const timer = setTimeout(() => {
      setBtnHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  return (
    <button className={btnClasses} onClick={props.onCartOpen}>
      <span className={style.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={style.badge}>{cartItemAmount}</span>
    </button>
  );
}

export default HeaderCartButton;
