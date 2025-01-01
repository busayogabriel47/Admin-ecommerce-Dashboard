import React, { useEffect, useState } from "react";
import { useEditProduct } from "../../Context/EditProductContext";
import { toast } from "react-toastify";
import API from "../../api/axios";
import Select from 'react-select';


const EditProductModal = ({ product, onClose, onUpdate }) => {
    const { editProduct, isLoading } = useEditProduct();
    const [formData, setFormData] = useState({
        title: product.title || "",
        description: product.description || "",
        img: product.img || [],
        slug: product.slug || "",
        categories: product.categories || [],
        size: product.size || [],
        color: product.color || "",
        tags: product.tags || [],
        price: product.price || "",
        quantity: product.quantity || "",
        currency: product.currency || "USD",
        brand: product.brand || "",
        inStock: product.inStock || false,
    });

    const [colors, setColors] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    // State to track existing images and those marked for removal
    const [existingImages, setExistingImages] = useState(product.img || []);
    const [imagesToRemove, setImagesToRemove] = useState([]);

    useEffect(() => {
      // Fetch existing colors, brands, and categories
      const fetchData = async () => {
          try {
              const colorResponse = await API.get('/color'); // Adjust API endpoint
              const brandResponse = await API.get('/brands'); // Adjust API endpoint
              const categoryResponse = await API.get('/categories'); // Adjust API endpoint
              
              // Log the responses to check their structure
              console.log("Colors Response:", colorResponse);
              console.log("Brands Response:", brandResponse);
              console.log("Categories Response:", categoryResponse);
  
              // Assuming response.data contains the array of items
              setColors(Array.isArray(colorResponse.data) ? colorResponse.data : []);
              setBrands(Array.isArray(brandResponse.data) ? brandResponse.data : []);
              setCategories(Array.isArray(categoryResponse.data) ? categoryResponse.data : []);
          } catch (error) {
              console.error("Error fetching data:", error);
              toast.error("Failed to load data.");
          }
      };
  
      fetchData();
  }, []);
  
  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // If the value is an object (like in react-select), extract the correct property
    const finalValue = typeof value === 'object' ? value.value : (type === "checkbox" ? checked : value);

    setFormData((prevData) => ({
        ...prevData,
        [name]: finalValue,
    }));
};

    // For multi-select fields like categories
const handleArrayChange = (name, selectedOptions) => {
  const values = selectedOptions.map(option => option.value); // Extract values from selected options
  setFormData((prevData) => ({
      ...prevData,
      [name]: values,
  }));
};

const handleImageUpload = (e) => {
  const files = Array.from(e.target.files);
  const newImages = files.map(file => {
      return URL.createObjectURL(file); // Create a Blob URL for each file
  });

  setFormData((prevData) => ({
      ...prevData,
      img: [...prevData.img, ...newImages], // Append new Blob URLs to existing ones
  }));
};


const handleRemoveImage = (imgUrl) => {
  setExistingImages((prev) => prev.filter((url) => url !== imgUrl)); // Remove from displayed images
  setImagesToRemove((prev) => [...prev, imgUrl]); // Mark for removal
};

const handleSubmit = async (e) => {
e.preventDefault();

const data = new FormData();

// Append product fields to FormData
Object.keys(formData).forEach(key => {
    if (Array.isArray(formData[key])) {
        formData[key].forEach(file => data.append(key, file)); // Append each file for images
    } else {
        data.append(key, formData[key]); // Append other fields like title and description
    }
});

// Append images to remove
if (imagesToRemove.length > 0) {
    data.append('imagesToRemove', JSON.stringify(imagesToRemove));
}

try {
    const response = await fetch(`http://localhost:5000/api/upload/${product._id}`, {
        method: 'PUT',
        body: data,
    });

    if (!response.ok) throw new Error("Failed to update product");

    const updatedProduct = await response.json();
    toast.success("Product updated successfully!");
    onUpdate(updatedProduct); // Update parent state with the new product
    setTimeout(onClose, 2000); // Close modal after 2 seconds
} catch (error) {
    toast.error(error.message || "Failed to update product.");
}
};

    return (
        <div className="fixed overflow-y-auto min-h-[70vh] pt-[50%] inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-2xl p-6 relative">
                <button className="absolute top-4 right-4 text-gray-500 hover:text-black" onClick={onClose}>
                    &#x2715;
                </button>
                <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-gray-700">Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700">Price</label>
                            <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700">Quantity</label>
                            <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700">Currency</label>
                            <select name="currency" value={formData.currency} onChange={handleInputChange} className="w-full p-2 border rounded">
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="NGN">NGN</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Slug</label>
                            <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700">Brand</label>
                            <select name="brand" value={formData.brand} onChange={handleInputChange} className="w-full p-2 border rounded">
                                <option value="">Select Brand</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.name}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">In Stock</label>
                            <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleInputChange} className="ml-2" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-gray-700">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full p-2 border rounded" rows="4" />
                        </div>

                        {/* Categories Dropdown */}
                        <div className="col-span-2">
                            <label className="block text-gray-700">Categories</label>
                            <Select
                                  name="categories"
                                  options={categories.map(cat => ({ value: cat.name, label: cat.name }))}
                                  isMulti
                                  onChange={(selectedOptions) => handleArrayChange("categories", selectedOptions)}
                              />
                        </div>

                        {/* Tags Input */}
                        <div className="col-span-2">
                            <label className="block text-gray-700">Tags</label>
                            <input type="text" name="tags" value={formData.tags.join(", ")} onChange={(e) => handleArrayChange("tags", e.target.value)} placeholder="Separate by commas" className="w-full p-2 border rounded" />
                        </div>

                        {/* Image Upload */}
                        <div className="col-span-2">
                            <label className="block text-gray-700">Upload Images</label>
                            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded" />
                            {/* Optionally display image previews */}
                            {existingImages.map((imgUrl, index) => (
                          <div key={index}>
                              <img src={imgUrl} alt={`Existing Image ${index}`} className="w-16 h-16 object-cover mr-2" />
                              <button type="button" onClick={() => handleRemoveImage(imgUrl)}>Remove</button>
                          </div>
                      ))}
                        </div>

                        

                        {/* Size Input */}
                        <div className="col-span-2">
                            <label className="block text-gray-700">Size</label>
                            <input type="text" name="size" value={formData.size.join(", ")} onChange={(e) => handleArrayChange("size", e.target.value)} placeholder="Separate by commas" className="w-full p-2 border rounded" />
                        </div>

                        {/* Color Dropdown */}
                        <div className="">
                            <label className="block text-gray-700">Color</label>
                            <select name="color" value={formData.color} onChange={handleInputChange} className="w-full p-2 border rounded">
                                <option value="">Select Color</option>
                                {colors.map((color) => (
                                    <option key={color.id} value={color.name}>{color.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    {/* Submit and Cancel Buttons */}
                    <div className="mt-4 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
                        <button type="submit" className={`px-4 py-2 ${isLoading ? 'bg-blue-300' : 'bg-blue-600'} text-white rounded hover:bg-blue-${isLoading ? '400' : '700'}`}>
                            {isLoading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
