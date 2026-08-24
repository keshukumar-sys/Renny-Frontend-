import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <>
      <SEO
        title="Page Not Found | Renny Strips"
        description="The page you are looking for could not be found. Explore our steel products, wire rods, strips, and industrial solutions."
        keywords="404, page not found, Renny Strips"
        url="https://rennystrips.com/404"
        noindex={true}
        nofollow={true}
      />

      <div className="min-h-screen flex items-center justify-center px-6 bg-gray-100">
        <div className="max-w-2xl text-center bg-white p-10 rounded-xl shadow-md">
          <div className="text-blue text-6xl font-bold mb-4">404</div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Sorry, we couldn't find the page you're looking for.
          </p>

          <p className="text-gray-600 mb-8">
            The page may have been moved, deleted, or the URL may be incorrect.
            You can return to the homepage or contact our team for assistance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-blue text-white rounded-lg hover:bg-blue-highlight transition"
            >
              Back to Home
            </Link>

            <Link
              to="/contact-us"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
