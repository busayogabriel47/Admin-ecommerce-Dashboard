
import React, { createContext, useContext, useState } from "react";
import API from "../api/axios";

interface Brand {
  _id: string;
  name: string;
}

interface Category {
  slug: string;
  name: string;
}

interface Color {
  _id: string;
  title: string;
}



 export interface Product {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _id: string,
    img: any;
    title: string,
    inStock: number;
    date: string;
    id: string;
    name: string;
    description: string,
    price: number;
    category: string;
    sold: number,
    slug: string,
    quantity: number,
    earning: number,
    categories: Category[];
    tags: string[];
    size: string[];
    color: Color[];
    brand: Brand,
    currency: string
  }


  export interface ProductContextProps {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>; // Add this line
    totalProducts: number;
    totalPages: number;
    currentPage: number;
    loading: boolean;
    error: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fetchProducts = async (queryParams?: Record<string, any>) => {
        setLoading(true);
        setError(null);
    
        try {
          const query = new URLSearchParams(queryParams).toString();
          const { data } = await API.get(
            `/products?${query}`
          );

          console.log("Fetched Products Data:", data);
         setProducts(data.products);
      setTotalProducts(data.totalProducts);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        setProducts,
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