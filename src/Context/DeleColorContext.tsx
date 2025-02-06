import { createContext, useContext, useState } from "react";
import axios from "axios";

const DeleteColorContext = createContext();

export const useDeleteColorContext = () => {
  return useContext(DeleteColorContext);
};

const DeleteColorProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteColor = async (colorId) => {
    setLoading(true);
    try {
      await axios.delete(`/api/colors/${colorId}`);
      return true;
    } catch (err) {
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
