import React, { createContext, useContext, useState } from "react";
import API from "../api/axios";

// Define the context
const UpdateCategoryContext = createContext<any>(null);

// Define the provider
export const UpdateCategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateCategory = async (
    id: string,
    updatedData: { name: string; image?: string; description?: string }
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await API.put(`/categories/${id}`, updatedData);
      setSuccess(true);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating category");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <UpdateCategoryContext.Provider value={{ updateCategory, loading, error, success }}>
      {children}
    </UpdateCategoryContext.Provider>
  );
};

// Hook for using the context
export const useUpdateCategory = () => useContext(UpdateCategoryContext);