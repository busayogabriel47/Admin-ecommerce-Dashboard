import React, { useState } from 'react';
import ellipsis from "../../assets/ellipsis.png";
import ProductListLoader from '../../Components/Loaders/ProductListLoader';
import { useCategories } from "../../Context/GetCategories";
import { useUpdateCategory } from "../../Context/EditCategoryContext";
import { useDeleteCategory } from "../../Context/DeleteCategoryContext";
import ConfirmationDialog from '../../Components/Confirmation/ConfirmationDialog';
import EditCategoryModal from '../../Components/Modals/EditCategory';
import { toast } from 'react-toastify';

const CategoryList = () => {
  const { categories, loading, error, removeCategoryFromState } = useCategories();
  const { updateCategory } = useUpdateCategory();
  const { deleteCategory, isLoading: isDeleting } = useDeleteCategory();

  const [actionMenu, setActionMenu] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleMenu = (_id) => {
    setActionMenu(actionMenu === _id ? null : _id);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedCategory) {
      setIsDialogOpen(false);
      try {
        const result = await deleteCategory(selectedCategory._id);
        if (result.success) {
          toast.success("Category deleted successfully");
          removeCategoryFromState(selectedCategory._id);
          setSelectedCategory(null);
          setActionMenu(null);
        } else {
          toast.error("Failed to delete category");
        }
      } catch (error) {
        toast.error("Error deleting category");
      }
    }
  };

  const handleEditClick = (category) => {
    setEditCategory(category);
  };

  const handleUpdate = async (updatedCategory) => {
    const result = await updateCategory(editCategory._id, updatedCategory);
    if (result.success) {
      setEditCategory(null);
    }
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
                <th className="py-3 px-4 border-b border-gray-300">SNo</th>
                <th className="py-3 px-4 border-b border-gray-300">Image</th>
                <th className="py-3 px-4 border-b border-gray-300">Name</th>
                <th className="py-3 px-4 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories && categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={category._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">
                      <img
                        src={category.image || 'path/to/placeholder.png'}
                        alt={`${category.name} image`}
                        className="w-16 h-16 object-cover rounded"
                        onError={(event) => {
                          event.target.src = 'path/to/placeholder.png';
                        }}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <h5 className="font-semibold text-gray-800">{category.name}</h5>
                        <p className="text-sm text-gray-500">ID: {category._id.substring(0, 8)}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 relative">
                      <button
                        onClick={() => toggleMenu(category._id)}
                        aria-label="Options"
                        className="focus:outline-none"
                      >
                        <img
                          src={ellipsis}
                          alt="Options"
                          className="w-6 h-6 cursor-pointer"
                        />
                      </button>
                      {actionMenu === category._id && (
                        <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-40 z-10">
                          <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() => handleEditClick(category)}
                          >
                            Edit
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteClick(category)}
                            disabled={isDeleting}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-5 text-gray-500">
                    No categories available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editCategory && (
        <EditCategoryModal
          category={editCategory}
          onClose={() => setEditCategory(null)}
          onUpdate={(updatedCategory) => {
            handleUpdate(updatedCategory);
          }}
        />
      )}

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete "${selectedCategory?.name}"?`}
        warning="This action cannot be undone."
      />
    </div>
  );
};

export default CategoryList;
