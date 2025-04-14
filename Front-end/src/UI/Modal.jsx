import { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/50 z-40"
      onClick={props.onClose}
    />
  );
};
const ModalOverlay = (props) => {
  return (
    <div className="fixed  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col  items-center animate-slideCardDown  z-50 p-3 rounded-lg max-h-[90vh] overflow-y-auto">
      {props.children}
    </div>
  );
};
const SideModalOverlay = (props) => {
  return (
    <div className="fixed top-0 h-screen w-60 right-0 animate-slideLeft bg-[var(--base)] z-50  rounded-l-lg">
      {props.children}
    </div>
  );
};
const portalElement = document.getElementById("overlays");

export const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};
export const SideModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <SideModalOverlay>{props.children}</SideModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};
