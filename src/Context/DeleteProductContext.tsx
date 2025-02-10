import React, { createContext, useContext, useState } from "react";
import API from "../api/axios"; // Ensure this points to your axios API instance
import { toast } from "react-toastify";

export interface DeleteProductContextType {
    deleteProduct: (id: string) => Promise<{ success: boolean }>;
    isLoading: boolean;
}

const DeleteProductContext = createContext<DeleteProductContextType | undefined>(undefined);

export const useDeleteProduct = () => useContext(DeleteProductContext);

interface DeleteProductProviderProps {
    children: React.ReactNode;
}

export const DeleteProductProvider = ({ children }: DeleteProductProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteProduct = async (id: string): Promise<{ success: boolean }> => {
    setIsLoading(true);
    try {
      const response = await API.delete(`/products/${id}`);
      toast.success(response.data.message || "Product deleted successfully");
      return { success: true };
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete product");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DeleteProductContext.Provider value={{ deleteProduct, isLoading }}>
      {children}
    </DeleteProductContext.Provider>
  );
};
