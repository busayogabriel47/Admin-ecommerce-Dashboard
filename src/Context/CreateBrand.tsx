import React, { createContext, useContext, useState } from 'react';

import API from '../api/axios';

const BrandContext = createContext();

export const useBrandContext = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrandContext must be used within a BrandProvider');
  }
  return context;
};

export const BrandProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBrand = async (formData) => {
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
    } catch (err) {
      setError(err.response.data.message || 'Error creating brand');
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
