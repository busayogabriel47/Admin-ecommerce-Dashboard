
import React, { createContext, useContext, useState } from "react";
import axios from "axios";


interface Product {
    id: string;
    name: string;
    size: string;
    color: string;
    price: number;
    category: string;
    brand: string;
  }


  interface ProductContextProps {
    products: Product[];
    totalProducts: number;
    totalPages: number;
    currentPage: number;
    loading: boolean;
    error: string | null;
    fetchProducts: (queryParams?: Record<string, any>) => Promise<void>;
  }


  const ProductContext = createContext<ProductContextProps | undefined>(
    undefined
  );


  

  export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const fetchProducts = async (queryParams?: Record<string, any>) => {
        setLoading(true);
        setError(null);
    
        try {
          const query = new URLSearchParams(queryParams).toString();
          const { data } = await axios.get(
            `http://localhost:5000/api/products?${query}`
          );

          console.log("Fetched Products Data:", data);
         setProducts(data.products);
      setTotalProducts(data.totalProducts);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        totalProducts,
        totalPages,
        currentPage,
        loading,
        error,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};