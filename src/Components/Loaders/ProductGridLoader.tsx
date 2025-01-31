

const ProductGridLoader = () => {
  return (
    <div>
            <div className="mt-5">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
    {[...Array(4)].map((_, index) => (
      <div
        key={index}
        className="relative shadow-md rounded-lg overflow-hidden border border-gray-200 bg-white"
      >
        <div className="relative">
          <div className="skeleton w-full h-40 bg-gray-200"></div>
          <div className="absolute top-2 left-2 px-3 py-1 text-xs rounded-md bg-gray-300 text-gray-500">
            <div className="skeleton w-16 h-5"></div>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-3">
            <div className="skeleton w-24 h-4 bg-gray-200 mb-2"></div>
            <div className="skeleton w-32 h-5 bg-gray-200"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <div className="skeleton w-16 h-4 bg-gray-200"></div>
            <div className="skeleton w-20 h-4 bg-gray-200"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

{/* Styles for Skeleton Loader */}
<style jsx>{`
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite linear;
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`}</style>

    </div>
  )
}

export default ProductGridLoader