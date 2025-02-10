import React, { createContext, useContext, useState } from "react";
import API from "../api/axios";






// Define the context
const DeleteBrandContext = createContext<any>(null);

// Define the provider
export const DeleteBrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteBrand = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await API.delete(`/brands/${id}`);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error deleting brand");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DeleteBrandContext.Provider value={{ deleteBrand, loading, error, success }}>
      {children}
    </DeleteBrandContext.Provider>
  );
};

// Hook for using the context
export const useDeleteBrand = () => useContext(DeleteBrandContext);
