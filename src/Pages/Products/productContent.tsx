import { useEffect } from "react"


import {useProducts} from "../../Context/ProductContext"
import ProductGridLoader from "../../Components/Loaders/ProductGridLoader"

const ProductContent:React.FC = () => {


    const {
        products,
        loading,
        error,
        fetchProducts,
      } = useProducts();


      useEffect(() => {
        fetchProducts({ page: 1, limit: 10 }); // Fetch the first page of products
      }, []);


      if (loading) return <ProductGridLoader/>;
  if (error) return <p>Error: {error}</p>;


  return (

    <>
       <div className="mt-5">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
    {products && products.length > 0 ? (
      products.map((product) => (
        <div
          key={product.id}
          className="relative shadow-md rounded-lg overflow-hidden border border-gray-200 bg-white"
        >
          <div className="relative">
            <img
              src={product.img[0]}
              alt={product.title}
              className="w-full h-40 object-cover"
            />
            <button
              className={`absolute top-2 left-2 px-3 py-1 text-xs rounded-md ${
                product.inStock > 0
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {product.inStock > 0 ? 'In Stock' : 'Out of Stock'}
            </button>
          </div>
          <div className="p-4">
            <div className="mb-3">
              <span className="block text-xs text-gray-500">
                Category: Accessories
              </span>
              <h5 className="text-sm font-bold text-gray-800">
                {product.title}
              </h5>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <p>{product.date || 'N/A'}</p>
              <p className="font-bold text-gray-800">${product.price}</p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="col-span-full text-center text-sm text-gray-500">
        No products available.
      </p>
    )}
  </div>
</div>

    </>

  )

}

export default ProductContent;