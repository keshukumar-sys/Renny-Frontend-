import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
const Thankyou = () => {
  return (
    <div>
      {" "}
      <SEO
        title="Thank You | Renny Strips"
        description="Thank you for contacting Renny Strips. Our team has received your enquiry and will get back to you shortly."
        keywords="thank you, enquiry submitted, contact confirmation"
        url="https://rennystrips.com/thank-you"
        noindex={true}
        nofollow={true}
      />
      <div className="min-h-screen flex items-center justify-center px-6 bg-gray-100">
        <div className="max-w-2xl text-center bg-white p-10 rounded-xl shadow-md">
          <div className="text-green-600 text-6xl mb-4">✓</div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>

          <p className="text-lg text-gray-600 mb-6">
            Your message has been successfully submitted.
          </p>

          <p className="text-gray-600 mb-8">
            Thank you for contacting Renny Strips Limited. Our team has received
            your inquiry and will get back to you shortly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-blue text-white rounded-lg hover:bg-blue-highlight transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
