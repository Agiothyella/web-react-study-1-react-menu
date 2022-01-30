import style from "./Card.module.css";

function Card(props) {
  const cardStyle = `${style["card"]} ${props.className}`;

  return <div className={cardStyle}>{props.children}</div>;
}

export default Card;
