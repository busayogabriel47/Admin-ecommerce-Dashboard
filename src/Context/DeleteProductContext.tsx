import React, { createContext, useContext, useState } from "react";
import API from "../api/axios"; // Ensure this points to your axios API instance
import { toast } from "react-toastify";

const DeleteProductContext = createContext();

export const useDeleteProduct = () => useContext(DeleteProductContext);

export const DeleteProductProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteProduct = async (id) => {
    setIsLoading(true);
    try {
      const response = await API.delete(`/products/${id}`);
      toast.success(response.data.message || "Product deleted successfully");
      return { success: true };
    } catch (error) {
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
