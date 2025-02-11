import { createContext, useContext, useEffect, useState, ReactNode} from "react";
import API from "../api/axios";

interface ColorType {
  title: string;
  _id: string;
  // Add other properties of your color object here 
}

export interface ColorsContextType {
  colors: ColorType[];
  loading: boolean;
  error: string | null;
  removeColorFromState: (colorId: string) => void;
}

const ColorsContext = createContext<ColorsContextType | undefined>(undefined);

export const useColors = () => {
  return useContext(ColorsContext);
};

interface ColorsProviderProps {
  children: ReactNode;
}

export const ColorsProvider = ({ children }: ColorsProviderProps) => {
  const [colors, setColors] = useState<ColorType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const removeColorFromState = (colorId: string) => {
    setColors((prevColors) => prevColors.filter((color) => color._id !== colorId));
  };

  return (
    <ColorsContext.Provider value={{ colors, loading, error, removeColorFromState }}>
      {children}
    </ColorsContext.Provider>
  );
};
