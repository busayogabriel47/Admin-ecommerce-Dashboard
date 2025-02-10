import React, { useState } from "react";
import { useCreateColorContext, ColorContextType } from "../../Context/CreateColors";

const AddColor = () => {
  const { createColor, loading, error } = useCreateColorContext() as ColorContextType;
  const [title, setTitle] = useState("");
  const [hexCode, setHexCode] = useState(""); // Assuming colors have a hex code
  const [message, setMessage] = useState("");

  const generateSlug = (title: string): string => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!title || !hexCode) {
      setMessage("Please provide both color name and hex code.");
      return;
    }

    const newColor = await createColor({
      title,
      slug: generateSlug(title),
      hexCode,
    });

    if (newColor) {
      setMessage(`Color "${newColor.title}" added successfully!`);
      setTitle("");
      setHexCode("");
    } else {
      setMessage(error || "Error adding color.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add a New Color</h2>
      {message && <p className="text-center mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">Color Name:</label>
          <input
            type="text"
            id="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="hexCode">Hex Code:</label>
          <input
            type="text"
            id="hexCode"
            value={hexCode}
            onChange={(e) => setHexCode(e.target.value)}
            className="w-full p-2 border rounded"
            required
            placeholder="#000000"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Adding Color..." : "Add Color"}
        </button>
      </form>
    </div>
  );
};

export default AddColor;