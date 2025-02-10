/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

export interface DeleteColorContextType {
  deleteColor: (colorId: string) => Promise<boolean | undefined>;
  loading: boolean;
  error: string | null;
}

const DeleteColorContext = createContext<DeleteColorContextType | undefined>(undefined);

export const useDeleteColorContext = () => {
  return useContext(DeleteColorContext);
};

interface DeleteColorProviderProps {
    children: React.ReactNode;
}

const DeleteColorProvider = ({ children }: DeleteColorProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteColor = async (colorId: string) => {
    setLoading(true);
    try {
      const response = await API.delete(`/color/${colorId}`);
      toast.success(response.data.message || "Color deleted successfully")
    } catch (err: any) {
      setError(err.response?.data?.message || "Error deleting color");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DeleteColorContext.Provider value={{ deleteColor, loading, error }}>
      {children}
    </DeleteColorContext.Provider>
  );
};

export default DeleteColorProvider;
