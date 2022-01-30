import { useContext } from "react";
import CartContext from "../../../context/cart-context";
import style from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

function MealItem(props) {
  const price = `€${props.price.toFixed(2)}`;
  const cartContext = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={style["meal"]}>
      <div>
        <h3>{props.name}</h3>
        <p className={style["description"]}>{props.description}</p>
        <p className={style["price"]}>{price}</p>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
