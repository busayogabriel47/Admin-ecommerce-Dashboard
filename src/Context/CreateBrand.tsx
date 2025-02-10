import React, { createContext, useContext, useState } from 'react';
import API from '../api/axios';

// Define a type for the BrandContext value
interface BrandContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createBrand: (formData: FormData) => Promise<any>; // Replace any with a more specific type if possible
  loading: boolean;
  error: string | null;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const useBrandContext = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrandContext must be used within a BrandProvider');
  }
  return context;
};

interface BrandProviderProps {
    children: React.ReactNode;
}

export const BrandProvider = ({ children }:BrandProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBrand = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.post('/brands', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Brand created successfully:', response.data);
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((err as any).response?.data?.message || 'Error creating brand');
      console.error('Error creating brand:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrandContext.Provider value={{ createBrand, loading, error }}>
      {children}
    </BrandContext.Provider>
  );
};
