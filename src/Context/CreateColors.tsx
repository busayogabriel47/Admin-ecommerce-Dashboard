import React, { createContext, useContext, useState } from "react";
import API from "../api/axios";

export interface ColorContextType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createColor: (colorData: any) => Promise<any>;
    loading: boolean;
    error: string | null;
}

const CreateColorContext = createContext<ColorContextType | undefined>(undefined);

export const useCreateColorContext = () => {
  return useContext(CreateColorContext);
};

interface CreateColorProviderProps {
    children: React.ReactNode;
}

const CreateColorProvider = ({ children }:CreateColorProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createColor = async (colorData: any) => {
    setLoading(true);
    try {
      const { data } = await API.post("/color", colorData);
      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Error adding color");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateColorContext.Provider value={{ createColor, loading, error }}>
      {children}
    </CreateColorContext.Provider>
  );
};

export default CreateColorProvider;
