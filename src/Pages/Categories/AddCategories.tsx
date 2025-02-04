import React, { useState } from "react";
import { useCategoryContext } from "../../Context/createCategories";

const AddCategory = () => {
  const { createCategory, loading, error } = useCategoryContext();
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !img) {
      setMessage("Please provide both category name and image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", generateSlug(name)); // Generate slug automatically
    formData.append("images", img);

    const newCategory = await createCategory(formData);
    if (newCategory) {
      setMessage(`Category "${newCategory.name}" added successfully!`);
      setName("");
      setImg(null);
    } else {
      setMessage(error || "Error adding category.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add a New Category</h2>
      {message && <p className="text-center mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">Category Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="img">Category Image:</label>
          <input
            type="file"
            id="img"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            required
            accept="image/png, image/jpeg, image/jpg"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Adding Category..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
