import style from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

function Header(props) {
  return (
    <>
      <header className={style["header"]}>
        <h1>React Meals</h1>
        <HeaderCartButton onCartOpen={props.onCartOpen} />
      </header>
      <div className={style["main-image"]}>
        <img src={mealsImg} alt="A table full of delicious food" />
      </div>
    </>
  );
}

export default Header;
