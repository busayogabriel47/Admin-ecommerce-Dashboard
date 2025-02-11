export interface Product {
    title: string; // Required, unique
    description: string; // Required
    img: string[]; // Array of image URLs
    slug: string; // Required, unique, lowercase
    categories: string[]; // Array of category ObjectId strings (from MongoDB)
    size: string[]; // Array of sizes
    color: string[]; // Array of color ObjectId strings (from MongoDB)
    tags: string[]; // Array of tags
    price: number; // Required
    quantity: number; // Required
    currency: "USD" | "NGN"; // Required, enum
    inStock: boolean; // Required
    brand: string; // Required, brand ObjectId string (from MongoDB)
}

export interface CreateProductResponse {
    _id: string;
    title: string;
    description: string;
    img: string[];
    slug: string;
    categories: string[];
    size: string[];
    color: string[];
    tags: string[];
    price: number;
    quantity: number;
    currency: "USD" | "NGN";
    inStock: boolean;
    brand: string;
    createdAt: string;
    updatedAt: string;
}
