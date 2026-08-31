// ========== Imports ==========
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import SEO from "../../components/SEO";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useParams, useNavigate } from "react-router-dom";

import { FiUploadCloud, FiCheckCircle, FiLoader } from "react-icons/fi";

import { toast } from "react-toastify/unstyled";

// ========== Components ==========
import RequiredLabel from "../../components/RequiredLabel";

// ========== Utilities ==========
import { buildApiUrl } from "../../lib/api";

// ========== Countries ==========
const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Singapore",
  "UAE",
  "Japan",
  "China",
  "Brazil",
  "South Africa",
];

const JobApply = () => {
  // ========== Route Params ==========
  const { jobId } = useParams();

  // ========== Navigation ==========
  const navigate = useNavigate();

  // ========== Loading States ==========
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ========== Status Message ==========
  const [statusMessage, setStatusMessage] = useState({
    type: "",
    message: "",
  });

  // ========== Form Data ==========
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",

    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },

    resumeUrl: "",
    coverLetter: "",
    dob: "",
    gender: "",
  });

  // ========== Resume Upload ==========
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      const message = "Please upload a PDF smaller than 2 MB.";

      setStatusMessage({
        type: "error",
        message,
      });

      toast.error(message);

      return;
    }

    const data = new FormData();

    data.append("file", file);

    setUploading(true);

    setStatusMessage({
      type: "",
      message: "",
    });

    try {
      const res = await axios.post(buildApiUrl("/api/upload"), data);

      setFormData((prev) => ({
        ...prev,
        resumeUrl: res.data.fileUrl,
      }));

      const message = "Resume uploaded successfully.";

      setStatusMessage({
        type: "success",
        message,
      });

      toast.success(message);
    } catch {
      const message = "Resume upload failed. Please try again.";

      setStatusMessage({
        type: "error",
        message,
      });

      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  // ========== Form Submit ==========
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resumeUrl) {
      const message = "Please upload your resume before submitting.";

      setStatusMessage({
        type: "error",
        message,
      });

      toast.error(message);

      return;
    }

    setLoading(true);

    setStatusMessage({
      type: "",
      message: "",
    });

    try {
      const payload = {
        ...formData,
        jobId,
      };

      const res = await axios.post(buildApiUrl("/api/career/apply"), payload);

      if (res.data.success) {
        toast.success("Application submitted successfully.");

        navigate("/careers");
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "We could not submit your application right now. Please try again.";

      setStatusMessage({
        type: "error",
        message,
      });

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <SEO
        title="Apply for Jobs at Renny Strips | Career Application Form"
        description="Apply for jobs at Renny Strips in steel manufacturing, engineering, production, quality assurance, and industrial operations."
        keywords="Renny Strips application form, apply jobs online, steel industry careers, manufacturing jobs India, engineering application, industrial jobs, scaffolding careers, ERW pipe careers"
        url={`https://rennystrips.com/careers/${jobId}/apply`}
        image="https://rennystrips.com/og-careers.jpg"
      />
      <section className="min-h-screen font-helvetica bg-gray-100 flex items-center justify-center py-20 px-4">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white w-full max-w-5xl rounded-2xl shadow-xl p-6 md:p-10"
        >
          <h2 className="text-xl font-semibold text-[#292c44] mb-6">
            Personal Information
          </h2>

          {statusMessage.message && (
            <div
              className={`mb-6 rounded-xl px-4 py-3 text-sm ${
                statusMessage.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {statusMessage.message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col">
              <RequiredLabel text="First Name" />
              <input
                type="text"
                className="input"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col">
              <RequiredLabel text="Last Name" />
              <input
                type="text"
                className="input"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="mb-8">
            <div className="flex items-center gap-1 mb-4">
              <h3 className="text-lg font-semibold text-[#292c44]">Address</h3>
              <span className="text-red-500">*</span>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                className="input"
                placeholder="Street Address"
                value={formData.address.street}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value },
                  })
                }
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  className="input"
                  placeholder="City"
                  value={formData.address.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, city: e.target.value },
                    })
                  }
                  required
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Province / State"
                  value={formData.address.state}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, state: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  className="input"
                  placeholder="Postal / Zip Code"
                  value={formData.address.zipCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, zipCode: e.target.value },
                    })
                  }
                  required
                />
                <select
                  className="input"
                  value={formData.address.country}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, country: e.target.value },
                    })
                  }
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-1 mb-4">
                <h3 className="text-lg font-semibold text-[#292c44]">
                  Phone Number
                </h3>
                <span className="text-red-500">*</span>
              </div>
              <PhoneInput
                country={"in"}
                value={formData.phoneNumber}
                onChange={(val) =>
                  setFormData({ ...formData, phoneNumber: val })
                }
                inputStyle={{
                  width: "100%",
                  height: "46px",
                  borderRadius: "10px",
                  border: "1px solid #d1d5db",
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1 mb-4">
                <h3 className="text-lg font-semibold text-[#292c44]">Email</h3>
                <span className="text-red-500">*</span>
              </div>
              <input
                type="email"
                className="input"
                placeholder="company@gmail.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Documents */}
          <h2 className="text-xl font-semibold text-[#292c44] mb-6">
            Documents
          </h2>
          <div className="mb-8">
            <div className="flex items-center gap-1 mb-3">
              <h3 className="text-sm font-medium text-gray-800">
                Resume (PDF) – Max 2MB
              </h3>
              <span className="text-red-500">*</span>
            </div>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer ${formData.resumeUrl ? "bg-green-50 border-green-500" : "border-gray-300 hover:border-[#292c44]"}`}
            >
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                id="resumeUpload"
                onChange={handleResumeUpload}
              />
              <label htmlFor="resumeUpload" className="cursor-pointer block">
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <FiLoader className="animate-spin" />
                    <span>Uploading resume...</span>
                  </div>
                ) : formData.resumeUrl ? (
                  <div className="flex flex-col items-center gap-1 text-green-700">
                    <FiCheckCircle />
                    <span>Resume Ready</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <FiUploadCloud />
                    <span>Browse resume or drop it here</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-1 mb-2">
              <label className="text-sm font-medium text-gray-800">
                Cover Letter
              </label>
              <span className="text-red-500">*</span>
            </div>
            <textarea
              rows={7}
              placeholder="Write your cover letter here..."
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-[#292c44] resize-none"
              value={formData.coverLetter}
              onChange={(e) =>
                setFormData({ ...formData, coverLetter: e.target.value })
              }
              required
            />
          </div>

          {/* Other Info */}
          <h3 className="text-xl font-semibold text-[#292c44] mb-6">
            Other Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-1 mb-2">
                <label className="text-sm font-medium text-gray-800">
                  Date of Birth
                </label>
                <span className="text-red-500">*</span>
              </div>
              <input
                type="date"
                className="input"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                required
              />
            </div>
            <div>
              <div className="flex items-center gap-1 mb-2">
                <label className="text-sm font-medium text-gray-800">
                  Gender
                </label>
                <span className="text-red-500">*</span>
              </div>
              <select
                className="input"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                required
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <motion.button
              disabled={loading || uploading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-3 bg-[#292c44] text-white rounded-lg font-medium disabled:bg-gray-400"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </motion.button>
          </div>
        </motion.form>

        <style>{`.input { width: 100%; height: 46px; border-radius: 10px; border: 1px solid #d1d5db; padding: 0 14px; outline: none; } .input:focus { border-color: #292c44; }`}</style>
      </section>
    </>
  );
};

export default JobApply;
