import { createContext, useContext, useState } from "react";
import axios from "axios";

const EditColorContext = createContext();

export const useUpdateColor = () => useContext(EditColorContext);

export const EditColorProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const updateColor = async (id, formData) => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/colors/update/${id}`, formData);
      return response.data.color;
    } catch (error) {
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
