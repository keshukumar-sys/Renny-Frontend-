import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify/unstyled";
import { FaTimes } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { buildApiUrl, RECAPTCHA_SITE_KEY } from "../lib/api";

const ProductEnquiryModal = ({ isOpen, onClose, productName = "" }) => {
  const recaptchaRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const [submitStatus, setSubmitStatus] = useState({
    type: "",
    message: "",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    enquiryType: "",
    approxQuantity: "",
    message: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!RECAPTCHA_SITE_KEY) {
      const message =
        "Enquiry submissions are temporarily unavailable. Please try again later.";
      setSubmitStatus({ type: "error", message });
      toast.error(message);
      return;
    }

    const token = recaptchaRef.current?.getValue();

    if (!token) {
      const message =
        "Please complete the verification step before submitting.";
      setSubmitStatus({ type: "error", message });
      toast.error(message);
      return;
    }

    setLoading(true);

    setSubmitStatus({
      type: "",
      message: "",
    });

    try {
      const payload = {
        ...formData,
        productInterested: productName,
        captchaToken: token,
      };

      const res = await axios.post(buildApiUrl("/api/contact/submit"), payload);

      if (res.data.success) {
        setFormData({
          fullName: "",
          companyName: "",
          email: "",
          phoneNumber: "",
          enquiryType: "",
          approxQuantity: "",
          message: "",
        });

        recaptchaRef.current?.reset();

        onClose();

        navigate(`${location.pathname}/thank-you`);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "We could not send your enquiry right now. Please try again shortly.";

      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[550px] no-scrollbar max-h-[90vh]  scrollbar-none overflow-y-auto rounded-2xl bg-blue-50 p-6 md:p-8 shadow-2xl"
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: 20,
          }}
        >
          <button onClick={onClose} className="absolute right-4 top-4">
            <FaTimes />
          </button>

          <h2 className="text-2xl font-bold mb-2">Request A Quote</h2>

          {productName && (
            <p className="text-gray-600 mb-6">
              Product: <span className="font-semibold">{productName}</span>
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {submitStatus.message && (
              <div
                className={`rounded-xl px-4 py-3 text-sm ${
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full name *"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3"
            />

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address *"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3"
            />

            <input
              type="tel"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone number *"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3"
            />

            <div className="space-y-3">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Enquiry Type *
                </p>

                <div className="flex flex-wrap items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="enquiryType"
                      value="Dealer / Distributor Enquiry"
                      checked={
                        formData.enquiryType === "Dealer / Distributor Enquiry"
                      }
                      onChange={handleChange}
                      required
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">
                      Dealer / Distributor Enquiry
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="enquiryType"
                      value="Export / International Enquiry"
                      checked={
                        formData.enquiryType ===
                        "Export / International Enquiry"
                      }
                      onChange={handleChange}
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">
                      Export Enquiry
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <input
              type="text"
              name="approxQuantity"
              value={formData.approxQuantity}
              onChange={handleChange}
              placeholder="Approx quantity"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3"
            />

            <textarea
              rows="4"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Your requirement or message"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3"
            />

            <div className="py-2 flex justify-center scale-[0.9] origin-center">
              {RECAPTCHA_SITE_KEY ? (
                <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} />
              ) : (
                <div className="rounded-xl bg-yellow-50 px-4 py-3 text-center text-sm text-yellow-800">
                  Verification is unavailable until `VITE_RECAPTCHA_SITE_KEY` is
                  configured.
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue py-3 font-bold text-white"
            >
              {loading ? "Sending..." : "Request A Quote"}
            </button>

            <p className="text-center text-xs text-gray-500">
              We respond within 1 business day
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductEnquiryModal;
