import React, { createContext, useContext, useState } from "react";
import API from "../api/axios";

// Define a type for the CategoryContext value
interface CategoryContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createCategory: (formData: FormData) => Promise<any>; // Replace any with a more specific type if possible
  loading: boolean;
  error: string | null;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategoryContext must be used within a CategoryProvider");
  }
  return context;
};

interface CategoryProviderProps {
    children: React.ReactNode;
}

export const CategoryProvider = ({ children }:CategoryProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCategory = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await API.post("/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Category created successfully:", response.data);
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) { // Use 'any' here since we don't know the exact error type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((err as any).response?.data?.message || "Error creating category");
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
