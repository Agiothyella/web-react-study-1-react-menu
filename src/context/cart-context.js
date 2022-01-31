import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removItem: (id) => {},
  resetItem: () => {},
});

export default CartContext;
