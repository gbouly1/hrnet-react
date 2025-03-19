// Modal.jsx
import React from "react";

function Modal({ isOpen, onClose, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md flex flex-col">
        <h2 className=" font-semibold mb-4">{title}</h2>
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
