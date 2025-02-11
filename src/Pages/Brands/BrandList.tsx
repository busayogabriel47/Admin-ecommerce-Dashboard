import { useState } from 'react';
import ellipsis from "../../assets/ellipsis.png";
import ProductListLoader from '../../Components/Loaders/ProductListLoader';
import { useBrands } from "../../Context/GetBrandsContext";
import { useUpdateBrand } from "../../Context/EditBrandContext";
import { useDeleteBrand } from "../../Context/DeleteBrandContext";
import ConfirmationDialog from '../../Components/Confirmation/ConfirmationDialog';
import EditBrandModal from '../../Components/Modals/EditBrand';
import { toast } from 'react-toastify';

interface Brand {
  _id: string;
  name: string;
  logo?: string; // Assuming logo is optional
}

const BrandList = () => {
  const { brands, loading, error, removeBrandFromState } = useBrands();
  const { updateBrand } = useUpdateBrand();
  const { deleteBrand, isLoading: isDeleting } = useDeleteBrand();

  const [actionMenu, setActionMenu] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [editBrand, setEditBrand] = useState<Brand | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleMenu = (_id: string) => {
    setActionMenu(actionMenu === _id ? null : _id);
  };

  const handleDeleteClick = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedBrand) {
      setIsDialogOpen(false);

      try {
        if (selectedBrand._id) {
        const result = await deleteBrand(selectedBrand._id);

        if (result.success) {
          toast.success("Brand deleted successfully");
          removeBrandFromState(selectedBrand._id);
          setSelectedBrand(null);
          setActionMenu(null);
        } else {
          toast.error("Failed to delete brand");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error("Error deleting brand");
      }
    }
  };

  const handleEditClick = (brand: Brand) => {
    setEditBrand(brand);
  };

  const handleUpdate = async (updatedBrand: Brand) => {
    if (editBrand) {
      const result = await updateBrand(editBrand._id, updatedBrand);
      if (result.success) {
        setEditBrand(null);
      }
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
              {brands && brands.length > 0 ? (
                brands.map((brand: Brand, index: number) => (
                  <tr key={brand._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">
                      <img
                        src={brand.logo || 'path/to/placeholder.png'}
                        alt={`${brand.name} logo`}
                        className="w-16 h-16 object-cover rounded"
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onError={(event:any) => {
                          event.target.src = 'path/to/placeholder.png';
                        }}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <h5 className="font-semibold text-gray-800">{brand.name}</h5>
                        <p className="text-sm text-gray-500">ID: {brand._id.substring(0, 8)}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 relative">
                      <button
                        onClick={() => toggleMenu(brand._id)}
                        aria-label="Options"
                        className="focus:outline-none"
                      >
                        <img
                          src={ellipsis}
                          alt="Options"
                          className="w-6 h-6 cursor-pointer"
                        />
                      </button>
                      {actionMenu === brand._id && (
                        <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-40 z-10">
                          <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() => handleEditClick(brand)}
                          >
                            Edit
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteClick(brand)}
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
                  <td colSpan={4} className="text-center py-5 text-gray-500">
                    No brands available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editBrand && (
        <EditBrandModal
          brands={editBrand}
          onClose={() => setEditBrand(null)}
          onUpdate={(updatedBrand) => {
            handleUpdate(updatedBrand);
          }}
        />
      )}

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete "${selectedBrand?.name}"?`}
        warning="This action cannot be undone."
      />
    </div>
  );
};

export default BrandList;
