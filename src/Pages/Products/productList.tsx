import React, { useEffect, useState } from 'react';
import ellipsis from "../../assets/ellipsis.png";
import { useProducts, ProductContextProps } from "../../Context/ProductContext";
import ProductListLoader from '../../Components/Loaders/ProductListLoader';
import ViewProductModal from '../../Components/Modals/ViewProductModal';
import EditProductModal from '../../Components/Modals/EditProductModal';
import { useDeleteProduct, DeleteProductContextType } from '../../Context/DeleteProductContext';
import ConfirmationDialog from '../../Components/Confirmation/ConfirmationDialog';

import {Product} from "../../Context/ProductContext"

const ProductList: React.FC = () => {
  const { products, setProducts, loading, error, fetchProducts } = useProducts() as ProductContextProps;
  const [actionMenu, setActionMenu] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const { deleteProduct, isLoading } = useDeleteProduct() as DeleteProductContextType;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts({ page: 1, limit: 20 });
  }, []);

  const toggleMenu = (_id: string) => {
    setActionMenu(actionMenu === _id ? null : _id);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleEditClick = (product: Product) => {
    setEditProduct(product);
  };

  const handleUpdate = (id: string, updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => (product._id === id ? updatedProduct : product))
    );
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      const result = await deleteProduct(selectedProduct._id);
      if (result.success) {
        setProducts((prev) => prev.filter((product) => product._id !== selectedProduct._id));
      }
      setSelectedProduct(null);
    }
    setIsDialogOpen(false);
  };

  if (loading) return <ProductListLoader />;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <div className="border-2 border-gray-200 p-5 rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-700">
                <th className="py-3 px-2 sm:px-4 border-b border-gray-300">Product</th>
                <th className="py-3 px-2 sm:px-4 border-b border-gray-300">Price</th>
                <th className="py-3 px-2 sm:px-4 border-b border-gray-300">Status</th>
                <th className="py-3 px-2 sm:px-4 border-b border-gray-300">Sold</th>
                <th className="py-3 px-2 sm:px-4 border-b border-gray-300">Earnings</th>
                <th className="py-3 px-2 sm:px-4 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 text-xs sm:text-sm">
                    <td className="py-3 px-2 sm:px-4 flex items-center gap-2 sm:gap-4">
                      <img src={product.img[0]} alt={product.title} className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded" />
                      <div>
                        <h5 className="font-semibold text-gray-800">{product.title}</h5>
                        <p className="text-gray-500">ID: {product._id.substring(0, 8)}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:px-4">₦{product.price}</td>
                    <td className="py-3 px-2 sm:px-4">
                      <div className={`px-2 py-1 rounded-xl text-center ${product.inStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{product.inStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                    </td>
                    <td className="py-3 px-2 sm:px-4">{product.sold} pcs</td>
                    <td className="py-3 px-2 sm:px-4">₦{product.earning}</td>
                    <td className="py-3 px-2 sm:px-4 relative">
                      <img src={ellipsis} alt="Options" className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" onClick={() => toggleMenu(product._id)} />
                      {actionMenu === product._id && (
                        <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-32 sm:w-40 z-10">
                          <button className="w-full text-left px-3 py-2 hover:bg-gray-100" onClick={() => handleViewDetails(product)}>View</button>
                          <button className="w-full text-left px-3 py-2 hover:bg-gray-100" onClick={() => handleEditClick(product)}>Edit</button>
                          <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50" onClick={() => handleDeleteClick(product)} disabled={isLoading}>Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-gray-500">No products available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {selectedProduct && <ViewProductModal setSelectedProduct={setSelectedProduct} selectedProduct={selectedProduct} />}
      {editProduct && <EditProductModal product={editProduct} onClose={() => setEditProduct(null)} onUpdate={handleUpdate} />}
      <ConfirmationDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onConfirm={handleConfirmDelete} message={`Delete "${selectedProduct?.title}"?`} warning="This action cannot be undone." />
    </div>
  );
};

export default ProductList;