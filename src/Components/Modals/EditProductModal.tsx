import React, { useEffect, useState } from "react";
import { useEditProduct } from "../../Context/EditProductContext";
import { toast } from "react-toastify";
import API from "../../api/axios";
import Select from 'react-select';
import axios from "axios";

const EditProductModal = ({ product, onClose, onUpdate }) => {

    const { editProduct, isLoading, setIsLoading } = useEditProduct();

    const [formData, setFormData] = useState({
        title: product?.title || "",
        price: product?.price || "",
        quantity: product?.quantity || "",
        currency: product?.currency || "USD",
        slug: product?.slug || "",
        brand: product?.brand || "",
        inStock: product?.inStock || false,
        description: product?.description || "",
        categories: product?.categories || [],
        tags: product?.tags || [],
        size: product?.size || [],
        color: product?.color || [],
    });
    const [images, setImages] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [imagePreviews, setImagePreviews] = useState(
        Array.isArray(product?.img)
            ? product.img.filter((img) => typeof img === "string")
            : []
    );
    

    // Cleanup URLs
useEffect(() => {
    return () => {
        imagePreviews.forEach((preview) => {
            if (preview.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        });
    };
}, [imagePreviews]);



    // Fetch brands, categories, and colors
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [brandsRes, categoriesRes, colorsRes] = await Promise.all([
                    API.get("/brands"),
                    API.get("/categories"),
                    API.get("/color"),
                ]);
    
                setBrands(brandsRes.data.map((brand) => ({ value: brand._id, label: brand.name })));
                setCategories(categoriesRes.data.map((category) => ({ value: category.slug, label: category.name })));
    
                if (colorsRes?.data?.success && Array.isArray(colorsRes.data.colors)) {
                    setColors(
                        colorsRes.data.colors.map((color) => ({
                            value: color._id,
                            label: color.title,
                        }))
                    );
                } else {
                    console.error("Expected an array of colors but received:", colorsRes);
                    toast.error("Failed to fetch colors data");
                    setColors([]);
                }
    
                // Pre-select existing product values
                if (product) {
                    if (product.brand) {
                        setSelectedBrand({ value: product.brand._id, label: product.brand.name });
                    }
                    if (product.categories) {
                        setSelectedCategories(
                            product.categories.map((cat) => ({ value: cat.slug, label: cat.name }))
                        );
                    }
                    if (product?.color) {
                        setSelectedColors(
                            product.color.map((col) => ({
                                value: col._id,
                                label: col.name,
                            }))
                        );
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data for dropdowns");
            }
        };
        fetchData();
    }, [product]);
    
  



    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    };

    const handleImageRemove = (index) => {
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleArrayChange = (name, value) => {
        setFormData({ ...formData, [name]: value.split(",").map(item => item.trim()) });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const formDataObj = new FormData();
    
            // Append other form fields
            Object.keys(formData).forEach((key) => {
                if (key === "categories" || key === "color") {
                    formDataObj.append(key, JSON.stringify(formData[key]));
                } else {
                    formDataObj.append(key, formData[key]);
                }
            });
    
            // Correctly append brand
            if (!selectedBrand?.value) {
                toast.error("Please select a brand.");
                setIsLoading(false);
                return;
            }
    
            formDataObj.append("brand", selectedBrand.value);
    
            // Append other multi-select options
            formDataObj.append("categories", JSON.stringify(selectedCategories.map((cat) => cat.value)));
            formDataObj.append("color", JSON.stringify(selectedColors.map((col) => col.value)));
    
            // Append images
            images.forEach((image) => {
                formDataObj.append("images", image);
            });
    
            console.log("Form Data:", Object.fromEntries(formDataObj.entries())); // Debug log
            console.log("Selected Brand:", selectedBrand);
            console.log("Selected Categories:", selectedCategories);
            console.log("Selected Colors:", selectedColors);
    
            const { success, data, message } = await editProduct(product._id, formDataObj);
    
            if (success) {
                toast.success("Product updated successfully");
                onUpdate(data);
                onClose();
            } else {
                toast.error(message || "Error updating product");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating product");
            console.error("Update error:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    
    

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-2xl p-6 relative overflow-y-auto min-h-[50vh]">
                <button className="absolute top-4 right-4 text-gray-500 hover:text-black" onClick={onClose}> &#x2715; </button>
                <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                <div className="max-h-[70vh] overflow-y-auto p-4">
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
                                <Select
                                    options={brands}
                                    value={selectedBrand}
                                    onChange={(selectedOption) => setSelectedBrand(selectedOption)}
                                    placeholder="Select a brand"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">In Stock</label>
                                <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleInputChange} className="ml-2" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-gray-700">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full p-2 border rounded" rows="4" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-gray-700">Categories</label>
                                <Select
                                    isMulti
                                    options={categories}
                                    value={selectedCategories}
                                    onChange={(selectedOptions) => setSelectedCategories(selectedOptions)}
                                    placeholder="Select categories"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-gray-700">Tags</label>
                                <input type="text" name="tags" value={formData.tags.join(", ")} onChange={(e) => handleArrayChange("tags", e.target.value)} placeholder="Separate by commas" className="w-full p-2 border rounded" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-gray-700">Upload Images</label>
                                <input type="file" name="images" multiple accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" />
                                {imagePreviews.map((imgUrl, index) => (
                                    <div key={index} className="relative">
                                        <img src={imgUrl} alt={`Preview ${index}`} className="w-16 h-16 object-cover" />
                                        <button type="button" className="absolute top-0 right-0 bg-red-500 text-white text-sm"
                                            onClick={() => handleImageRemove(index)}> Remove </button>
                                    </div>
                                ))}
                            </div>
                            <div className="col-span-2">
                                <label className="block text-gray-700">Size</label>
                                <input type="text" name="size" value={formData.size.join(", ")} onChange={(e) => handleArrayChange("size", e.target.value)} placeholder="Separate by commas" className="w-full p-2 border rounded" />
                            </div>

                            {Array.isArray(colors) && colors.length > 0 && (
                                <div>
                                    <label className="block text-gray-700">Color</label>
                                    <Select
                                        isMulti
                                        options={colors}
                                        value={selectedColors}
                                        onChange={(selectedOptions) => setSelectedColors(selectedOptions)}
                                        placeholder="Select colors"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="mt-4 flex justify-end gap-4">
                            <button type="button" onClick={onClose} 
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"> Cancel 
                            </button> 
                            <button type="submit"
                                    className={`px-4 py-2 ${isLoading ? "bg-blue-300" : "bg-blue-600"} text-white rounded hover:bg-blue-${isLoading ? "400" : "700"}`}>
                                    {isLoading ? "Saving..." : "Save Changes"}
                            </button> 
                        </div> 
                    </form> 
                </div> 
            </div> 
        </div> 
    ); 
}; 

export default EditProductModal;
