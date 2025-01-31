
const ProductListLoader = () => {
  return (
    <div>
            <div className="p-4">
  <div className="border-2 border-gray-200 p-5 rounded-xl">
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-700">
            <th className="py-3 px-4 border-b border-gray-300">
              <div className="skeleton w-24 h-6"></div>
            </th>
            <th className="py-3 px-4 border-b border-gray-300">
              <div className="skeleton w-16 h-6"></div>
            </th>
            <th className="py-3 px-4 border-b border-gray-300">
              <div className="skeleton w-20 h-6"></div>
            </th>
            <th className="py-3 px-4 border-b border-gray-300">
              <div className="skeleton w-16 h-6"></div>
            </th>
            <th className="py-3 px-4 border-b border-gray-300">
              <div className="skeleton w-20 h-6"></div>
            </th>
            <th className="py-3 px-4 border-b border-gray-300">
              <div className="skeleton w-12 h-6"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeating Skeleton Rows */}
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3 px-4 flex items-center gap-4">
                <div className="skeleton w-12 h-12 rounded"></div>
                <div>
                  <div className="skeleton w-24 h-4 mb-2"></div>
                  <div className="skeleton w-32 h-3"></div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="skeleton w-20 h-4"></div>
              </td>
              <td className="py-3 px-4">
                <div className="skeleton w-16 h-6 rounded-xl"></div>
              </td>
              <td className="py-3 px-4">
                <div className="skeleton w-16 h-4"></div>
              </td>
              <td className="py-3 px-4">
                <div className="skeleton w-20 h-4"></div>
              </td>
              <td className="py-3 px-4">
                <div className="skeleton w-6 h-6 rounded-full"></div>
              </td>
            </tr>
          ))}
          {/* End of skeleton rows */}
        </tbody>
      </table>
    </div>
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

export default ProductListLoader