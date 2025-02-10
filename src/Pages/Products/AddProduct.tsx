import React, { useEffect, useState } from "react";
// import { useProductContext } from "../../Context/CreateProductContext";
import { Product } from "../../Types/ProductTypes";
import API from "../../api/axios";
import Select, { MultiValue } from 'react-select';
import { toast } from "react-toastify";

interface Category {
  _id: string;
  slug: string;
  name: string;
}

interface Color {
  _id: string;
  title: string;
}

interface Brand {
  _id: string;
  name: string;
}

const AddProduct: React.FC = () => {
//   const { createProduct } = useProductContext();
  const [formData, setFormData] = useState<Product>({
    title: "",
    description: "",
    img: [],
    slug: "",
    categories: [],
    size: [],
    color: [],
    tags: [],
    price: 0,
    quantity: 0,
    currency: "USD",
    inStock: true,
    brand: "",
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (name: keyof Product, selectedOptions: MultiValue<{ value: string; label: string }>) => {
    const values = selectedOptions.map(option => option.value);
    setFormData((prev) => ({
      ...prev,
      [name]: values,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [brandRes, categoryRes, colorRes] = await Promise.all([
          API.get("/brands"),
          API.get("/categories"),
          API.get("/color"),
        ]);
        setBrands(brandRes.data || []);
        setCategories(categoryRes.data || []);
        setColors(colorRes.data.colors || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("slug", formData.slug);
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("quantity", formData.quantity.toString());
    formDataToSend.append("currency", formData.currency);
    formDataToSend.append("inStock", formData.inStock.toString());
    formData.categories.forEach(category => formDataToSend.append("categories[]", category));
    formData.color.forEach(color => formDataToSend.append("color[]", color));
    selectedImages.forEach(image => formDataToSend.append("images", image));
    formData.size.forEach(size => formDataToSend.append("size[]", size));
    if (formData.brand) formDataToSend.append("brand", formData.brand);

    try {
      await API.post("/products", formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success("Product created successfully!");
      setFormData({
        title: "",
        description: "",
        img: [],
        slug: "",
        categories: [],
        size: [],
        color: [],
        tags: [],
        price: 0,
        quantity: 0,
        currency: "USD",
        inStock: true,
        brand: "",
      });
      setSelectedImages([]);
    } catch (error) {
      let errorMessage = "Error creating product";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#EEEEEE] min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-6">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields remain the same */}
          <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        {/* Title */}
                        <div>
                            <label className="block text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                rows={4}
                                required
                            ></textarea>
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-gray-700">Slug</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        {/* Images */}
                        <div>
                            <label className="block text-gray-700">Images</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="w-full p-2 border rounded"
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {selectedImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(image)}
                                        alt={`Selected ${index}`}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Categories */}
                        {Array.isArray(categories) && categories.length > 0 && (
                            <div>
                                <label className="block text-gray-700">Categories</label>
                                <Select
                                    name="categories"
                                    options={categories.map((cat) => ({
                                        value: cat.slug,
                                        label: cat.name,
                                    }))}
                                    isMulti
                                    className="w-full"
                                    classNamePrefix="select"
                                    onChange={(selectedOptions) => handleArrayChange("categories", selectedOptions)}
                                    value={categories
                                        .filter((cat) => formData.categories.includes(cat.slug))
                                        .map((cat) => ({ value: cat.slug, label: cat.name }))}
                                    required
                                />
                            </div>
                        )}

                        {/* Size */}
                        <div>
                            <label className="block text-gray-700">Size</label>
                            <div className="flex flex-wrap gap-3">
                                {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                                    <div key={s} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={s}
                                            name="size"
                                            value={s}
                                            checked={formData.size.includes(s)}
                                            onChange={(e) => {
                                                const selectedSize = e.target.value;
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    size: prev.size.includes(selectedSize)
                                                        ? prev.size.filter((size) => size !== selectedSize)
                                                        : [...prev.size, selectedSize],
                                                }));
                                            }}
                                            className="mr-1"
                                        />
                                        <label htmlFor={s} className="text-sm">{s}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Color */}
                        {Array.isArray(colors) && colors.length > 0 && (
                            <div>
                                <label className="block text-gray-700">Color</label>
                                <Select
                                    name="color"
                                    options={colors.map((color) => ({
                                        value: color._id,
                                        label: color.title,
                                    }))}
                                    isMulti
                                    onChange={(selectedOptions) => handleArrayChange("color", selectedOptions)}
                                    value={colors
                                        .filter((color) => formData.color.includes(color._id))
                                        .map((color) => ({
                                            value: color._id,
                                            label: color.title,
                                        }))}
                                    required
                                />
                            </div>
                        )}

                        {/* Price */}
                        <div>
                            <label className="block text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="block text-gray-700">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        {/* Currency */}
                        <div>
                            <label className="block text-gray-700">Currency</label>
                            <select
                                name="currency"
                                value={formData.currency}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="USD">USD</option>
                                <option value="NGN">NGN</option>
                            </select>
                        </div>

                        {/* In Stock */}
                        <div>
                            <label className="block text-gray-700">In Stock</label>
                            <select
                                name="inStock"
                                value={formData.inStock ? "true" : "false"}
                                onChange={(e) =>
                                    setFormData({ ...formData, inStock: e.target.value === "true" })
                                }
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        {/* Brand */}
                        {Array.isArray(brands) && brands.length > 0 && (
                            <div>
                                <label className="block text-gray-700">Brand</label>
                                <Select
                                    name="brand"
                                    options={brands.map((brand) => ({
                                        value: brand._id,
                                        label: brand.name,
                                    }))}
                                    onChange={(selectedOption) => {
                                        setFormData({
                                            ...formData,
                                            brand: selectedOption ? selectedOption.value : "",
                                        });
                                    }}
                                    value={formData.brand ? { value: formData.brand, label: brands.find((brand) => brand._id === formData.brand)?.name } : null}
                                    menuPlacement="auto" // Dropdown opens upward
                                    required
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6 flex justify-center">
                        <button
                            type="submit"
                            className={`px-8 py-2 ${
                                isLoading ? "bg-gray-700" : "bg-black"
                            } text-white rounded hover:bg-gray-800 transition-all`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Adding Product..." : "Add Product"}
                        </button>
                    </div>
                </form>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;