import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import API from '../api/axios';

// Create a context
const CategoriesContext = createContext<any>(null);

// Define the props type for the provider
interface CategoriesProviderProps {
  children?: ReactNode;
}

// Create a provider
export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await API.get('/categories'); // Update the endpoint to match your backend
      setCategories(response.data);
    } catch (err: any) {
      setError(err.message || 'Error fetching categories');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading, error, fetchCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

// Custom hook to use the Categories context
export const useCategories = () => useContext(CategoriesContext);