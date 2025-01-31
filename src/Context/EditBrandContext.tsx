import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import API from "../api/axios";

// Define the context
const UpdateBrandContext = createContext<any>(null);

// Define the provider
export const UpdateBrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateBrand = async (id: string, updatedData: { name: string; logo?: string; description?: string; website?: string }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await API.put(`/brands/${id}`, updatedData);
      setSuccess(true);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating brand");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <UpdateBrandContext.Provider value={{ updateBrand, loading, error, success }}>
      {children}
    </UpdateBrandContext.Provider>
  );
};

// Hook for using the context
export const useUpdateBrand = () => useContext(UpdateBrandContext);
