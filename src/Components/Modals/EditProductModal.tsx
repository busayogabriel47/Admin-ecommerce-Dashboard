import { useEffect, useState } from "react";
import { useEditProduct } from "../../Context/EditProductContext";
import { toast } from "react-toastify";
import API from "../../api/axios";
import Select from 'react-select';

// Define types for Brand, Category, Color, and Product based on your data structure
interface Brand {
    _id: string;
    name: string;
}

interface Category {
    slug: string;
    name: string;
}

interface Color {
    _id: string;
    title: string;
}

interface Product {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    img: any;
    _id: string;
    title: string;
    price: number;
    quantity: number;
    currency: string;
    slug: string;
    sold: number;
    brand: Brand;
    inStock: boolean;
    earning: number;
    description: string;
    category: Category[];
    tags: string[];
    size: string[];
    color: Color[];
    date: string
}

interface EditProductModalProps {
    product: Product;
    onClose: () => void;
    onUpdate: (updatedProduct: Product) => void;
}


const EditProductModal: React.FC<EditProductModalProps> = ({ product, onClose, onUpdate }) => {

    const { editProduct, isLoading, setIsLoading } = useEditProduct();

    interface FormDataState {
        title: string;
        price: number;
        quantity: number;
        currency: string;
        slug: string;
        brand: string;
        inStock: boolean;
        description: string;
        categories: string[];
        tags: string[];
        size: string[];
        color: string[];
    }


    const [formData, setFormData] = useState<FormDataState>({
        title: product?.title || "",
        price: product?.price || 0,
        quantity: product?.quantity || 0,
        currency: product?.currency || "USD",
        slug: product?.slug || "",
        brand: product?.brand?._id || "",
        inStock: product?.inStock || false,
        description: product?.description || "",
        categories: product?.category?.map(cat => cat.slug) || [],
        tags: product?.tags || [],
        size: product?.size || [],
        color: product?.color?.map(col => col._id) || [],
    });
    const [images, setImages] = useState<File[]>([]);
    const [brands, setBrands] = useState<Array<{ value: string; label: string }>>([]);
    const [categories, setCategories] = useState<Array<{ value: string; label: string }>>([]);
    const [colors, setColors] = useState<Array<{ value: string; label: string }>>([]);
    const [selectedBrand, setSelectedBrand] = useState<{ value: string; label: string } | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<Array<{ value: string; label: string }>>([]);
    const [selectedColors, setSelectedColors] = useState<Array<{ value: string; label: string }>>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>(
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

                setBrands(brandsRes.data.map((brand: Brand) => ({ value: brand._id, label: brand.name })));
                setCategories(categoriesRes.data.map((category: Category) => ({ value: category.slug, label: category.name })));

                if (colorsRes?.data?.success && Array.isArray(colorsRes.data.colors)) {
                    setColors(
                        colorsRes.data.colors.map((color: Color) => ({
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
                    if (product.category) {
                        setSelectedCategories(
                            product.category.map((cat) => ({ value: cat.slug, label: cat.name }))
                        );
                    }
                    if (product?.color) {
                        setSelectedColors(
                            product.color.map((col) => ({
                                value: col._id,
                                label: col.title,
                            }))
                        );
                    }
                }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data for dropdowns");
            }
        };
        fetchData();
    }, [product]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const target = e.target as HTMLInputElement;  // Type assertion
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? target.checked : value,
        });
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files as FileList);
        setImages(files);
        setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    };

    const handleImageRemove = (index: number) => {
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleArrayChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value.split(",").map(item => item.trim()) });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formDataObj = new FormData();

            // Append other form fields
            Object.keys(formData).forEach((key) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formDataObj.append(key, (formData as any)[key]);
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
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
                                <textarea name="description" value={formData.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded" rows={4} />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-gray-700">Categories</label>
                                <Select
                                    isMulti
                                    options={categories}
                                    value={selectedCategories}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    onChange={(selectedOptions) => setSelectedCategories(selectedOptions as any)}
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
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        onChange={(selectedOptions) => setSelectedColors(selectedOptions as any)}
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
