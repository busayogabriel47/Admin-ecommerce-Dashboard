import React, { useEffect, useState } from 'react';
import ellipsis from "../../assets/ellipsis.png";
import { useProducts } from "../../Context/ProductContext";
import ProductListLoader from '../../Components/Loaders/ProductListLoader';
import { Link } from 'react-router-dom';

import beanOne from "../../assets/beanie4.png";
import beanTwo from "../../assets/beanie2.png";
import beanFive from "../../assets/Beanie5.png";
import beanSix from "../../assets/Beanie6.png";
import squareFour from "../../assets/square-list4.png";
import squareTwo from "../../assets/square-list2.png";
import squareThree from "../../assets/square-list3.png";
import squareOne from "../../assets/square-list1.png";

const ProductList = () => {
  const {
    products,
    loading,
    error,
    fetchProducts,
  } = useProducts();

  const [actionMenu, setActionMenu] = useState(null); // Tracks which product menu is open
  const [selectedProduct, setSelectedProduct] = useState(null);

// Fetch products with reduced limit
useEffect(() => {
  fetchProducts({ page: 1, limit: 20 }); // Fetch the first 5 products
}, []);

// Function to toggle the menu visibility for a specific product
const toggleMenu = (_id) => {
  setActionMenu(actionMenu === _id ? null : _id); // If same product clicked, close it; otherwise, open new one
};

// Handle action clicks (e.g., View, Edit, Delete)
const handleActionClick = (action, productId) => {
  console.log(`${action} for product with ID: ${productId}`);
  setActionMenu(null); // Close the dropdown after an action
};



const handleViewDetails = (product) => {
  setSelectedProduct(product); // Store the selected product to show in the modal
};

  if (loading) return <ProductListLoader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <div className="border-2 border-gray-200 p-5 rounded-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-700">
                <th className="py-3 px-4 border-b border-gray-300">Product Name</th>
                <th className="py-3 px-4 border-b border-gray-300">Price</th>
                <th className="py-3 px-4 border-b border-gray-300">Status</th>
                <th className="py-3 px-4 border-b border-gray-300">Sold</th>
                <th className="py-3 px-4 border-b border-gray-300">Total Earning</th>
                <th className="py-3 px-4 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
  {products && products.length > 0 ? (
    products.map((product) => (
      <tr key={product._id} className="hover:bg-gray-50">
        <td className="py-3 px-4 flex items-center gap-4">
          <img
            src={product.img[0]}
            alt={product.title}
            className="w-12 h-12 object-cover rounded"
          />
          <div>
            <h5 className="font-semibold text-gray-800">{product.title}</h5>
            <p className="text-sm text-gray-500">Product ID: {product._id.substring(0, 8)}</p>
          </div>
        </td>
        <td className="py-3 px-4 text-sm text-gray-800">${product.price}</td>
        <td className="py-3 px-4">
          <div
            className={`text-center px-2 py-1 rounded-xl text-sm ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          >
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </div>
        </td>
        <td className="py-3 px-4 text-sm text-gray-800">{product.sold} pcs</td>
        <td className="py-3 px-4 text-sm text-gray-800">${product.earning}</td>
        <td className="py-3 px-4 relative">
          <img
            src={ellipsis}
            alt="Options"
            className="w-6 h-6 cursor-pointer"
            onClick={() => toggleMenu(product._id)} // Correctly use product._id
          />
          {actionMenu === product._id && ( // Only show dropdown for the selected _id
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-40 z-10">
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => handleViewDetails(product)}
              >
                View Details
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => handleActionClick("Edit Product", product._id)}
              >
                Edit Product
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                onClick={() => handleActionClick("Delete Product", product._id)}
              >
                Delete Product
              </button>
            </div>
          )}
        </td>


        {/*Modal Component*/}
        {selectedProduct && (
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-5xl p-6 relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
            onClick={() => setSelectedProduct(null)}
          >
            &#x2715;
          </button>
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-[2rem]">
              {/* Left Section */}
              <div className="basis-[35%] flex-col">
                <div>
                  <img
                    src={
                      selectedProduct.img && selectedProduct.img.length > 0
                        ? selectedProduct.img[0]
                        : beanOne
                    }
                    alt={selectedProduct.title || "Product Image"}
                    width="100%"
                    className="rounded-3xl"
                  />

                </div>
                <div className="flex gap-7 mt-7">
                <img
                    src={selectedProduct.img && selectedProduct.img[1] ? selectedProduct.img[1] : beanTwo}
                    alt="Product 1"
                    width="28%"
                    className="rounded-3xl"
                  />
                  <img
                    src={selectedProduct.img && selectedProduct.img[2] ? selectedProduct.img[2] : beanFive}
                    alt="Product 2"
                    width="28%"
                    className="rounded-3xl"
                  />
                  <img
                    src={selectedProduct.img && selectedProduct.img[3] ? selectedProduct.img[3] : beanSix}
                    alt="Product 3"
                    width="28%"
                    className="rounded-3xl"
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="basis-[65%] flex flex-col">
                <div>
                  <h2 className="font-bold text-[1.5rem]">
                    {selectedProduct.title || "Cotton Rich Jersey Slim Blazer"}
                  </h2>
                  <p className="mb-[2rem]">
                    Product ID: {selectedProduct._id.slice(0, 8)}
                  </p>

                  <h5 className="font-bold">
                    {selectedProduct.category || "Cotton Rich Jersey Slim Blazer"}
                  </h5>
                  <p>{selectedProduct.description || "Product description goes here."}</p>
                </div>
                <div className="flex flex-col md:flex-row mt-[5rem]">
                  {/* Pricing Details */}
                  <div className="basis-[50%] flex">
                    <div className="basis-[50%]">
                      <div className="flex gap-3 items-center">
                        <img src={squareFour} alt="Icon" />
                        <div className="mt-5">
                          <p className="font-bold text-[1rem]">
                            ${selectedProduct.price || "120.40"}
                          </p>
                          <p>Price</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-[50%]">
                      <div className="flex gap-3 items-center">
                        <img src={squareThree} alt="Icon" />
                        <div className="mt-5">
                          <p className="font-bold text-[1rem]">
                            ${selectedProduct.discountPrice || "100.00"}
                          </p>
                          <p>Discount</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="basis-[50%] flex">
                    <div className="basis-[50%]">
                      <div className="flex gap-3 items-center">
                        <img src={squareTwo} alt="Icon" />
                        <div className="mt-5">
                          <p className="font-bold text-[1rem]">
                            {selectedProduct.stock || "In Stock"}
                          </p>
                          <p>Stock</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-[50%]">
                      <div className="flex gap-3 items-center">
                        <img src={squareOne} alt="Icon" />
                        <div className="mt-5">
                          <p className="font-bold text-[1rem]">SKU</p>
                          <p>{selectedProduct.sku || "SKU123"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}


      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center py-5 text-gray-500">
        No products available.
      </td>
    </tr>
  )}
</tbody>


          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
