import React, { createContext, useContext, useState } from "react";
import API from "../api/axios";

// Create the context
const EditProductContext = createContext();

// Provider Component
export const EditProductProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const editProduct = async (id, updatedData) => {
    setIsLoading(true);
    try {
      const response = await API.put(`/products/${id}`, updatedData);
      console.log("API response:", response.data);
      setIsLoading(false);
      return { success: true, data: response.data };
    } catch (error) {
      console.error(
        "API error:",
        error.response?.data?.message || error.message
      );
      setIsLoading(false);
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  };
  

  return (
    <EditProductContext.Provider value={{ editProduct, isLoading, setIsLoading }}>
      {children}
    </EditProductContext.Provider>
  );
};


// Hook to use the context
export const useEditProduct = () => {
    const context = useContext(EditProductContext);
    console.log("useEditProduct context value:", context);
    return context;
  };
