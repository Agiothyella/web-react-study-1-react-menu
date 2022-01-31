import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import { useState } from "react";
import CartProvider from "./context/CartProvider";
import CartController from "./components/Cart/CartController";

function App() {
  const [openCartIs, setOpenCartIs] = useState(false);

  const openCartModalHandler = (e) => {
    setOpenCartIs(true);
  };

  const closeCartModalHandler = (e) => {
    setOpenCartIs(false);
  };

  return (
    <CartProvider>
      <Header onCartOpen={openCartModalHandler} />
      <main>
        <Meals />
      </main>
      {openCartIs && <CartController onCartClose={closeCartModalHandler} />}
    </CartProvider>
  );
}

export default App;
