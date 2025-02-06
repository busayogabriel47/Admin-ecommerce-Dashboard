import React, { useState, useEffect } from "react";
import { useUpdateColor } from "../../Context/EditColorsContext";

const EditColorModal = ({ color, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: color.title || "",
  });

  const [error, setError] = useState("");
  const { updateColor, loading } = useUpdateColor();

  // Update formData when color prop changes
  useEffect(() => {
    setFormData({
      title: color.title || "",
    });
  }, [color]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const updatedColor = await updateColor(color._id, formData);
      if (updatedColor) {
        onUpdate(updatedColor); // Update parent component
        onClose(); // Close the modal
      }
    } catch (err) {
      setError(err.message || "Failed to update color.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Edit Color</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Color Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditColorModal;
