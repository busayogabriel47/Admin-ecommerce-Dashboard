import React, { useEffect, useState } from 'react';
import ellipsis from "../../assets/ellipsis.png";
import { useProducts } from "../../Context/ProductContext";
import ProductListLoader from '../../Components/Loaders/ProductListLoader';
import { Link } from 'react-router-dom';


import ViewProductModal from '../../Components/Modals/ViewProductModal';
import EditProductModal from '../../Components/Modals/EditProductModal';
import { useDeleteProduct } from '../../Context/DeleteProductContext';
import ConfirmationDialog from '../../Components/Confirmation/ConfirmationDialog';

const ProductList = () => {
  const {
    products,
    setProducts,
    loading,
    error,
    fetchProducts,
  } = useProducts();

  const [actionMenu, setActionMenu] = useState(null); // Tracks which product menu is open
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null)
  const {deleteProduct, isLoading} = useDeleteProduct()
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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


//handleViewDetails
const handleViewDetails = (product) => {
  setSelectedProduct(product); // Store the selected product to show in the modal
};

//handleEditClick
const handleEditClick = (product) => {
  setEditProduct(product);
};


const handleUpdate = (id, updatedProduct) => {
  setProducts((prevProducts) =>
    prevProducts.map((product) =>
      product._id === id ? updatedProduct : product
    )
  );
};



const handleDeleteClick = (product) => {
  setSelectedProduct(product);
  setIsDialogOpen(true);
};

const handleConfirmDelete = async () => {
  if (selectedProduct) {
    const result = await deleteProduct(selectedProduct._id);
    if (result.success) {
      setProducts((prev) =>
        prev.filter((product) => product._id !== selectedProduct._id)
      );
    }
    setSelectedProduct(null);
  }
  setIsDialogOpen(false);
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
        <td className="py-3 px-4 text-sm text-gray-800">₦{product.price}</td>
        <td className="py-3 px-4">
          <div
            className={`text-center px-2 py-1 rounded-xl text-sm ${product.inStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          >
            {product.inStock > 0 ? 'In Stock' : 'Out of Stock'}
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
                onClick={() => handleEditClick(product)}
              >
                Edit Product
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                onClick={() => handleDeleteClick(product)}
                disabled={isLoading}
              >
                Delete Product
              </button>
            </div>
          )}
        </td>


        {/* View Product Modal*/}
        {selectedProduct && (
            <ViewProductModal 
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
            />
        )}

        
        {/* Edit Product Modal*/}
        {editProduct && (
            <EditProductModal
            product={editProduct}
            onClose={() => setEditProduct(null)}
            onUpdate={handleUpdate}
          />
        )}

      {/* Delete confirmation dialog */}
    <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete "${selectedProduct?.title}"?`}
        warning="This action cannot be undone."
      />

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
