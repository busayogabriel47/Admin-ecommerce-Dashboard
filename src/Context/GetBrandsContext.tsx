import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import API from '../api/axios';

// Create a context
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BrandsContext = createContext<any>(null);

// Define the props type for the provider
interface BrandsProviderProps {
  children?: ReactNode;
}

// Create a provider
export const BrandsProvider: React.FC<BrandsProviderProps> = ({ children }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch brands from the backend
  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await API.get('/brands'); // Update the endpoint to match your backend
      setBrands(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Error fetching brands');
    } finally {
      setLoading(false);
    }
  };

  // Fetch brands on component mount
  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <BrandsContext.Provider value={{ brands, loading, error, fetchBrands }}>
      {children}
    </BrandsContext.Provider>
  );
};

// Custom hook to use the Brands context
export const useBrands = () => useContext(BrandsContext);
