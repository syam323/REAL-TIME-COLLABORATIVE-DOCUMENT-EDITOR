import React from "react";
import "../styles/PopupComponent.css"; 

export default function PopupComponent({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Are you sure?</h2>
        <div className="button-group">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              alert("Okay clicked!");
            }}
            className="okay-button"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}
