import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const ColorsContext = createContext();

export const useColors = () => {
  return useContext(ColorsContext);
};

export const ColorsProvider = ({ children }) => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await API.get("/color");
        setColors(response.data.colors);
      } catch (error) {
        setError("Failed to fetch colors");
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, []);

  const removeColorFromState = (colorId) => {
    setColors((prevColors) => prevColors.filter((color) => color._id !== colorId));
  };

  return (
    <ColorsContext.Provider value={{ colors, loading, error, removeColorFromState }}>
      {children}
    </ColorsContext.Provider>
  );
};
