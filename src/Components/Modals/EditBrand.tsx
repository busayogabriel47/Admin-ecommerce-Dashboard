import React, { useState, useEffect } from "react";
import { useUpdateBrand } from "../../Context/EditBrandContext";

const EditBrandModal = ({ brands, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: brands.name || "",
    logo: null, // New image field
  });

  const [error, setError] = useState("");
  const { updateBrand, loading } = useUpdateBrand();

  // Update formData when the brands prop changes
  useEffect(() => {
    setFormData({
      name: brands.name || "",
      logo: null, // Reset the image when a new brand is selected
    });
  }, [brands]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Create FormData object to handle file upload
      const data = new FormData();
      data.append("name", formData.name);
      if (formData.logo) {
        data.append("images", formData.logo);
      }

      const updatedBrand = await updateBrand(brands._id, data);
      if (updatedBrand) {
        onUpdate(updatedBrand); // Update parent component
        onClose(); // Close the modal
      }
    } catch (err) {
      setError(err.message || "Failed to update brand.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Edit Brand</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Brand Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="image">
              Brand Image
            </label>
            <input
              id="logo"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
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

export default EditBrandModal;
