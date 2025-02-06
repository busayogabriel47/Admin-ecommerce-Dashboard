import { createContext, useContext, useState } from "react";
import axios from "axios";
import API from "../api/axios";

const CreateColorContext = createContext();

export const useCreateColorContext = () => {
  return useContext(CreateColorContext);
};

const CreateColorProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createColor = async (colorData) => {
    setLoading(true);
    try {
      const { data } = await API.post("/color", colorData);
      return data;
    } catch (err) {
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
