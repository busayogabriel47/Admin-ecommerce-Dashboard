import React from "react";

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, message, warning }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-sm">
        <h2 className="text-lg font-bold text-red-600">Are you sure?</h2>
        <p className="mt-2 text-gray-700">{message}</p>
        {warning && <p className="mt-2 text-sm text-red-500">{warning}</p>}
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
