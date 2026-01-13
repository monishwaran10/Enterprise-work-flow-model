import React from "react";
import "../App.css"

function Modal({ message, onClose }) {
  return (
    <div className="modalContainer">
      <div className="modalBox">
        <h3>Error</h3>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
