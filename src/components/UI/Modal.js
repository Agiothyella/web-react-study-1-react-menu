import reactDom from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => (
  <div className={classes["backdrop"]} onClick={props.onClose} />
);

const ModalOverlay = (props) => (
  <div className={classes["modal"]}>
    <div>{props.children}</div>
  </div>
);

const overlayEl = document.getElementById("overlays");

function Modal(props) {
  return (
    <>
      {reactDom.createPortal(<Backdrop onClose={props.onClose} />, overlayEl)}

      {reactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlayEl)}
    </>
  );
}

export default Modal;
