import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Define the type of the context value
export interface EditColorsContextType {
  updateColor: (id: string, data: { title: string }) => Promise<any>;
  loading: boolean;
}

// Create the context with a default value of undefined
const EditColorContext = createContext<EditColorsContextType | undefined>(undefined);

export const useUpdateColor = () => useContext(EditColorContext);

interface EditColorProviderProps {
  children: React.ReactNode;
}

export const EditColorProvider = ({ children }: EditColorProviderProps) => {
  const [loading, setLoading] = useState(false);

  const updateColor = async (id: string, formData: { title: string }) => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/colors/update/${id}`, formData);
      return response.data.color;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error updating color:", error);
      throw error.response?.data?.message || "Failed to update color";
    } finally {
      setLoading(false);
    }
  };

  return (
    <EditColorContext.Provider value={{ updateColor, loading }}>
      {children}
    </EditColorContext.Provider>
  );
};
