import React from 'react'; // Import React
import beanOne from "../../assets/beanie4.png";
import beanTwo from "../../assets/beanie2.png";
import beanFive from "../../assets/Beanie5.png";
import beanSix from "../../assets/Beanie6.png";
import squareFour from "../../assets/square-list4.png";

import {Product} from "../../Context/ProductContext"

// // Define a type for the selectedProduct
// export interface Product {
//     _id: string;
//     title?: string;
//     img?: string[];
//     category?: string;
//     description?: string;
//     price?: string;
//     discountPrice?: string;
//     // Add other properties as needed based on your actual product data
// }

export interface ViewProductModalProps {
    setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
    selectedProduct: Product | null;
}

const ViewProductModal: React.FC<ViewProductModalProps> = ({ setSelectedProduct, selectedProduct }) => {
    return (
        <>
            <div
                className="w-[100%] fixed inset-0 flex items-center justify-center z-50 overflow-y-auto backdrop-blur-sm bg-black/30">
                <div className="bg-white rounded-lg shadow-xl w-[60%] max-w-5xl top-10 p-4 sm:p-6 relative max-h-screen overflow-y-auto">
                    <button
                        aria-label="Close"
                        className="absolute top-4 right-4 text-gray-500 hover:text-black"
                        onClick={() => setSelectedProduct(null)}
                    >
                        &#x2715;
                    </button>
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Left Section */}
                        <div className="basis-[35%]">
                            <img
                                loading="lazy"
                                src={
                                    selectedProduct?.img && selectedProduct.img.length > 0
                                        ? selectedProduct.img[0]
                                        : beanOne
                                }
                                alt={selectedProduct?.title || "Product Image"}
                                className="rounded-3xl w-full"
                            />
                            <div className="flex flex-wrap gap-4 mt-4">
                                {[beanTwo, beanFive, beanSix].map((img, idx) => (
                                    <img
                                        key={idx}
                                        loading="lazy"
                                        src={selectedProduct?.img && selectedProduct.img[idx + 1] ? selectedProduct.img[idx + 1] : img}
                                        alt={`Product ${idx + 1}`}
                                        className="rounded-3xl w-1/3 sm:w-[28%]"
                                    />
                                ))}
                            </div>
                        </div>
                        {/* Right Section */}
                        <div className="basis-[65%]">
                            <h2 className="font-bold text-lg sm:text-xl md:text-2xl">
                                {selectedProduct?.title || "Cotton Rich Jersey Slim Blazer"}
                            </h2>
                            <p className="mb-4">Product ID: {selectedProduct?._id.slice(0, 8)}</p>
                            <h5 className="font-bold">{selectedProduct?.category || "Category"}</h5>
                            <p>{selectedProduct?.description || "Product description goes here."}</p>
                            <div className="flex flex-wrap md:flex-nowrap gap-4 mt-12">
                                <div className="flex items-center gap-3 basis-1/2">
                                    <img src={squareFour} alt="Icon" />
                                    <div>
                                        <p className="font-bold">${selectedProduct?.price || "120.40"}</p>
                                        <p>Price</p>
                                    </div>
                                </div>
                                {/* <div className="flex items-center gap-3 basis-1/2">
                                    <img src={squareThree} alt="Icon" />
                                    <div>
                                        <p className="font-bold">${selectedProduct?.discountPrice || "100.00"}</p>
                                        <p>Discount</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewProductModal;
