import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (prevState, action) => {
  if (action.type === "ADD_TO_CART") {
    const updatedTotalAmount =
      prevState.totalAmount + action.payload.price * action.payload.amount;

    const existingCartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.payload.id
    );
    const existingCartItem = prevState.items[existingCartItemIndex];

    let updatedCartItems;

    if (existingCartItem) {
      const updatedCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.payload.amount,
      };

      updatedCartItems = [...prevState.items];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
    } else {
      updatedCartItems = [...prevState.items, action.payload];
    }

    return { items: updatedCartItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "REMOVE_FROM_CART") {
    const existingCartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.payload.id
    );
    const existingCartItem = prevState.items[existingCartItemIndex];
    // const updatedTotalAmount = prevState.totalAmount - existingCartItem.price;

    const updatedTotalAmount = prevState.totalAmount - existingCartItem.price;
    let updatedCartItems;

    // ------ AMOUNT > 1 ------------------------------
    if (existingCartItem.amount > 1) {
      const updatedCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };

      updatedCartItems = [...prevState.items];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
      // ------ AMOUNT = 1 ------------------------------
    } else {
      updatedCartItems = prevState.items.filter((item) => item.id !== action.payload.id);
    }

    return { items: updatedCartItems, totalAmount: updatedTotalAmount };
  }

  return defaultCartState;
};

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_TO_CART", payload: item });
  };
  const removeItemFromCartHandler = (item) => {
    dispatchCartAction({ type: "REMOVE_FROM_CART", payload: item });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
  );
}

export default CartProvider;
