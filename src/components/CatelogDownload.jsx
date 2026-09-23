import React, { useState } from 'react';
import { buildApiUrl } from '../lib/api';

const CatelogDownload = () => {
  const pdfUrl =
    'https://renny-assets-storage.s3.ap-south-1.amazonaws.com/documents/Product+Brochur-01+-+Final-flap+page.pdf';

  // Form input state
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    contactNumber: '',
  });

  // Validation error state
  const [errors, setErrors] = useState({});
  const [IsSubmitted, setIsSubmitted] = useState(false);
  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-level error on user input
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Field validation rules
  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    // Company Name validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email ID is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Contact Number validation
    const phoneRegex = /^[0-9+\s-]{10,15}$/;
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required.';
    } else if (!phoneRegex.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid contact number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit');

    if (validate()) {
      try {
        const response = await fetch(buildApiUrl('/api/brochure-download'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        console.log(response);
        const data = await response.json();

        if (response.ok && data.success) {
          setIsSubmitted(true);
          window.open(pdfUrl, '_blank');
        } else {
          alert(data.message || 'Submission failed. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Network error. Please check your connection.');
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-xl shadow-lg p-5 sm:p-8 border border-gray-100">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-2">
          Download Brochure
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 text-center mb-6">
          Please fill out the form below to access the brochure.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-3 py-2 text-xs sm:text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue transition-colors ${
                errors.name ? 'border-red-500 bg-red-50/30' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1"
            >
              Email ID <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`w-full px-3 py-2 text-xs sm:text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue transition-colors ${
                errors.email ? 'border-red-500 bg-red-50/30' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Company Name Field */}
          <div>
            <label
              htmlFor="companyName"
              className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1"
            >
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className={`w-full px-3 py-2 text-xs sm:text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue transition-colors ${
                errors.companyName
                  ? 'border-red-500 bg-red-50/30'
                  : 'border-gray-300'
              }`}
            />
            {errors.companyName && (
              <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>
            )}
          </div>

          {/* Contact Number Field */}
          <div>
            <label
              htmlFor="contactNumber"
              className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1"
            >
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="+91 ... "
              className={`w-full px-3 py-2 text-xs sm:text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue transition-colors ${
                errors.contactNumber
                  ? 'border-red-500 bg-red-50/30'
                  : 'border-gray-300'
              }`}
            />
            {errors.contactNumber && (
              <p className="mt-1 text-xs text-red-500">
                {errors.contactNumber}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-2.5 px-4 bg-blue hover:bg-blue-highlight text-white font-semibold text-xs sm:text-sm rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2"
          >
            Submit & Download Brochure
          </button>
        </form>
      </div>
    </div>
  );
};

export default CatelogDownload;
