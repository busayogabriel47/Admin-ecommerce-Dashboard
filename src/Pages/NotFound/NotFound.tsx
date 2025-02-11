import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-yellow-500">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
        <p className="mt-2 text-gray-400">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Illustration */}
        <div className="mt-6">
          <img
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="Not Found"
            className="w-64 md:w-80 mx-auto"
          />
        </div>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="mt-6 inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-all"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
