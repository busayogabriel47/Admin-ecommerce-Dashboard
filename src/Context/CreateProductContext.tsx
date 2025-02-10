import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, CreateProductResponse } from "../Types/ProductTypes";
import API from "../api/axios";

export interface ProductContextValue {
    products: CreateProductResponse[];
    createProduct: (productData: Product) => Promise<CreateProductResponse>;
    setProducts: React.Dispatch<React.SetStateAction<CreateProductResponse[]>>; // Add this line
}

const ProductContext = createContext<ProductContextValue | undefined>(undefined);

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProductContext must be used within a ProductProvider");
    }
    return context;
};

export const CreateProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<CreateProductResponse[]>([]);

    const createProduct = async (productData: Product): Promise<CreateProductResponse> => {
        try {
            const response = await API.post<CreateProductResponse>("/products", productData);
            setProducts((prev) => [...prev, response.data]);
            return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error creating product:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Failed to create product");
        }
    };

    return (
        <ProductContext.Provider value={{ products, createProduct, setProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
