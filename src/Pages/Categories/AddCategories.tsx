import React, { useState } from "react";
import API from "../../api/axios";

const AddCategories = () => {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        } else {
            setImage(null);
        }
    };

    const generateSlug = (name: string) => {
        return name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("slug", generateSlug(name)); // Generate slug here
            if (image) {
                formData.append("images", image);
            }


            const response = await API.post("/categories", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setMessage(`Category "${response.data.name}" added successfully!`);
            setName("");
            setSlug(""); // Clear the slug input as well
            setImage(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setMessage(
                error.response?.data?.message || "Error adding category. Please try again."
            );
        } finally {
            setLoading(false);
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
                        onChange={(e) => {
                            setName(e.target.value);
                            setSlug(generateSlug(e.target.value)); // Update slug on name change
                        }}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="slug">Slug:</label>
                    <input
                        type="text"
                        id="slug"
                        value={slug}
                        className="w-full p-2 border rounded"
                        readOnly // Make it read-only as it's auto-generated
                    />
                </div>
                <div>
                    <label htmlFor="image">Category Image:</label>
                    <input
                        type="file"
                        id="image"
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

export default AddCategories;
