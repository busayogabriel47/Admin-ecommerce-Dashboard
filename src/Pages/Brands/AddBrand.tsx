import React, { useState } from "react";
import API from "../../api/axios";

const AddBrand = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState<File | null>(null); // File for the logo
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("website", website);
      if (logo) {
        formData.append("images", logo); // File upload field must match backend
      }

      const response = await API.post("/brands", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(`Brand "${response.data.name}" added successfully!`);
      setName("");
      setDescription("");
      setWebsite("");
      setLogo(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Error adding brand. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add a New Brand</h2>
      {message && <p className="text-center mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">Brand Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {/* <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div> */}
        {/* <div>
          <label htmlFor="website">Website:</label>
          <input
            type="url"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div> */}
        <div>
          <label htmlFor="logo">Brand Logo:</label>
          <input
            type="file"
            id="logo"
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
          {loading ? "Adding Brand..." : "Add Brand"}
        </button>
      </form>
    </div>
  );
};

export default AddBrand;
