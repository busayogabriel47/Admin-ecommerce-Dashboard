import React, { createContext, useContext, useState } from "react";
import API from "../api/axios";

// Define the context
const DeleteCategoryContext = createContext<any>(null);

// Define the provider
export const DeleteCategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteCategory = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await API.delete(`/categories/${id}`);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error deleting category");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DeleteCategoryContext.Provider value={{ deleteCategory, loading, error, success }}>
      {children}
    </DeleteCategoryContext.Provider>
  );
};

// Hook for using the context
export const useDeleteCategory = () => useContext(DeleteCategoryContext);