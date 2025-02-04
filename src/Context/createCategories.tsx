import React, { createContext, useContext, useState } from "react";
import API from "../api/axios";

const CategoryContext = createContext();

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategoryContext must be used within a CategoryProvider");
  }
  return context;
};

export const CategoryProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCategory = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await API.post("/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Category created successfully:", response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error creating category");
      console.error("Error creating category:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryContext.Provider value={{ createCategory, loading, error }}>
      {children}
    </CategoryContext.Provider>
  );
};
