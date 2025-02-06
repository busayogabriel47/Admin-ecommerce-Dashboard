import { useState } from 'react';
import ellipsis from "../../assets/ellipsis.png";
import ProductListLoader from '../../Components/Loaders/ProductListLoader';
import { useColors } from "../../Context/GetColorsContext";
import { useUpdateColor } from "../../Context/EditColorsContext";
import { useDeleteColorContext } from "../../Context/DeleColorContext";
import ConfirmationDialog from '../../Components/Confirmation/ConfirmationDialog';
import EditColorModal from '../../Components/Modals/EditColorModal';
import { toast } from 'react-toastify';

const ColorList = () => {
  const { colors, loading, error, removeColorFromState } = useColors();
  const { updateColor } = useUpdateColor();
  const { deleteColor, isLoading: isDeleting } = useDeleteColorContext();

  const [actionMenu, setActionMenu] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [editColor, setEditColor] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleMenu = (_id) => {
    setActionMenu(actionMenu === _id ? null : _id);
  };

  const handleDeleteClick = (color) => {
    setSelectedColor(color);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedColor) {
      setIsDialogOpen(false);
      try {
        const result = await deleteColor(selectedColor._id);
        if (result.success) {
          toast.success("Color deleted successfully");
          removeColorFromState(selectedColor._id);
          setSelectedColor(null);
          setActionMenu(null);
        } else {
          toast.error("Failed to delete color");
        }
      } catch (error) {
        toast.error("Error deleting color");
      }
    }
  };

  const handleEditClick = (color) => {
    setEditColor(color);
  };

  const handleUpdate = async (updatedColor) => {
    const result = await updateColor(editColor._id, updatedColor);
    if (result.success) {
      setEditColor(null);
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
                <th className="py-3 px-4 border-b border-gray-300">Name</th>
                <th className="py-3 px-4 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {colors && colors.length > 0 ? (
                colors.map((color, index) => (
                  <tr key={color._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{color.title}</td>
                    <td className="py-3 px-4 relative">
                      <button
                        onClick={() => toggleMenu(color._id)}
                        aria-label="Options"
                        className="focus:outline-none"
                      >
                        <img
                          src={ellipsis}
                          alt="Options"
                          className="w-6 h-6 cursor-pointer"
                        />
                      </button>
                      {actionMenu === color._id && (
                        <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-40 z-10">
                          <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() => handleEditClick(color)}
                          >
                            Edit
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteClick(color)}
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
                  <td colSpan="3" className="text-center py-5 text-gray-500">
                    No colors available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editColor && (
        <EditColorModal
          color={editColor}
          onClose={() => setEditColor(null)}
          onUpdate={(updatedColor) => {
            handleUpdate(updatedColor);
          }}
        />
      )}

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete "${selectedColor?.title}"?`}
        warning="This action cannot be undone."
      />
    </div>
  );
};

export default ColorList;
