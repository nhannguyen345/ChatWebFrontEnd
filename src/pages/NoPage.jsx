import React from "react";
import { Link } from "react-router-dom";

function NoPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl mt-4">Oops! Page not found.</p>
        <p className="mt-2 text-gray-600">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
        >
          Go to Login Page
        </Link>
      </div>
    </div>
  );
}

export default NoPage;
