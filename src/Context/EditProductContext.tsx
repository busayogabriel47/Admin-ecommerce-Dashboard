import React, { createContext, useContext, useState } from "react";
import API from "../api/axios";

// Define the context type
interface EditProductContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editProduct: (id: string, updatedData: any) => Promise<{ success: boolean; data?: any; message?: string }>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with an initial undefined value
const EditProductContext = createContext<EditProductContextType | undefined>(undefined);

// Provider Component
export const EditProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editProduct = async (id: string, updatedData: any) => {
    setIsLoading(true);
    try {
      const response = await API.put(`/products/${id}`, updatedData);
      console.log("API response:", response.data);
      setIsLoading(false);
      return { success: true, data: response.data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("API error:", error.response?.data?.message || error.message);
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
  if (!context) {
    throw new Error("useEditProduct must be used within an EditProductProvider");
  }
  return context;
};
