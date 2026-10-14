import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { toast } from "react-toastify/unstyled";
import { buildApiUrl, RECAPTCHA_SITE_KEY } from "../../lib/api";

// Asset Imports
import envSustainabilityImg from "../../assets/Environmental Sustainability.webp";
import sustainableDevImg from "../../assets/Sustainable_Development.webp";
import greenLeafBG from "../../assets/GreenLeaf.webp";

/* --------------------------------------------------------------------------
   Animation Components
   -------------------------------------------------------------------------- */
const AnimatedSection = ({ children, xValue = 0, yValue = 0, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    isInView ? controls.start("visible") : controls.start("hidden");
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.8, delay: delay * 0.2, ease: "easeOut" },
        },
        hidden: { opacity: 0, x: xValue, y: yValue },
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const EnvironmentalAndReport = () => {
  const [activeBox, setActiveBox] = useState(0);
  const recaptchaRef = useRef();

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", message: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const stewardshipData = [
    {
      title: "Go Green with Solar",
      desc: "At Renny Strips, sustainability is more than a goal it’s a responsibility. Our 22MW solar power setup helps minimize conventional energy use and supports our journey towards a greener tomorrow.",
    },
    {
      title: "CBAM & Sustainable Market Access",
      desc: " Renny Strips Ltd. strengthens its European presence through CBAM-aligned practices, delivering high-quality steel productswith strong ROI. Fully in-house production enables rapid execution while maintaining a significantly lower carbon footprint than industry standards.",
    },
    {
      title: "Low-Emission Manufacturing Excellence",
      desc: "With vertically integrated facilities, Renny tracks emission from raw materials to finished goods. In-house HR coils, tubes, and wire rods reduce logistics emissions,control costs,and ensure complete carbon accountability",
    },
    {
      title: "Circular Economy & Green Stewardship",
      desc: "Committed to circular economy principles, Renny prioritize waste optimization and partners with government bodies to expandgreen cover. These initiatives support ecological restoration and long-term environmental resilience.",
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!RECAPTCHA_SITE_KEY) {
      const message = "Report downloads are temporarily unavailable. Please try again later.";
      setStatusMessage({ type: "error", message });
      toast.error(message);
      return;
    }

    const token = recaptchaRef.current.getValue();

    if (!token) {
      const message = "Please complete the verification step before submitting.";
      setStatusMessage({ type: "error", message });
      toast.error(message);
      return;
    }

    setLoading(true);
    setStatusMessage({ type: "", message: "" });
    try {
      const response = await axios.post(buildApiUrl('/api/sustainability/submit'), {
        ...formData,
        captchaToken: token
      });

      if (response.data.success) {
        const message =
          "Your request has been received. The emission report download will start shortly.";
        setStatusMessage({ type: "success", message });
        toast.success(message);
        setFormData({ name: "", email: "", phone: "" });
        recaptchaRef.current.reset();
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "We could not process your request right now. Please try again later.";
      setStatusMessage({ type: "error", message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* 7. Environmental Stewardship Section */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-16 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="w-full lg:w-1/2 shrink-0 ">
            <AnimatedSection xValue={-100}>
              <div className="mb-8 relative w-fit m">
                <h2
                  className="font-bold pb-4 tracking-tight text-[27px] md:text-5xl lg:text-[48px]"
                  style={{
                    fontFamily: "var(--font-helvetica)",
                    background: "linear-gradient(90deg, #000000 0%, #00A63E 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: "1.2",
                    whiteSpace: "nowrap",
                    display: "block",
                  }}
                >
                  Environmental Stewardship
                </h2>
                <div className="w-full h-0.5 bg-blue mx-auto rounded-full mt-1" />
              </div>

              <div className="space-y-4">
                {stewardshipData.map((item, index) => {
                  const isActive = activeBox === index;
                  return (
                    <motion.div
                      key={index}
                      onClick={() => setActiveBox(index)}
                      className={`group p-4 rounded-lg border transition-all duration-300 cursor-pointer shadow-sm ${isActive
                          ? "bg-[#292c44] border-[#292c44]"
                          : "bg-[#f8faff] border-gray-200 hover:bg-[#292c44]"
                        }`}
                    >
                      <h3
                        className={`text-[17px] font-bold mb-2 transition-colors duration-300 ${isActive ? "text-white" : "text-black group-hover:text-white"
                          }`}
                        style={{ fontFamily: "var(--font-helvetica)" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`text-[14px] transition-colors duration-300 ${isActive ? "text-gray-200" : "text-gray-600 group-hover:text-gray-200"
                          }`}
                        style={{ fontFamily: "var(--font-helvetica)" }}
                      >
                        {item.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>

          <div className="w-full lg:w-1/2 flex justify-end">
            <AnimatedSection xValue={100} delay={1}>
              <div
                className="overflow-hidden rounded-[2.5rem] shadow-2xl w-full h-[300px] md:h-[500px] lg:h-[650px]"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={envSustainabilityImg}
                  alt="Environmental Sustainability"
                  className="w-full h-full object-cover cursor-pointer"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 8. Download Emission Report Section */}
      <section className="py-20 px-6 md:px-16 lg:px-24 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          <div className="w-full lg:w-3/5">
            <AnimatedSection xValue={-50}>
              <img
                src={sustainableDevImg}
                alt="SDG Goals"
                className="w-full h-auto object-contain"
              />
            </AnimatedSection>
          </div>

          <div className="w-full lg:w-2/5 relative min-h-[650px] flex items-center justify-center rounded-[32px] overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 z-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${greenLeafBG})` }}
            >
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
            </div>

            <div className="relative z-10 w-full flex items-center justify-center p-6">
              <AnimatedSection yValue={50} delay={2}>
                <div className="w-full max-w-[400px] bg-white/85 backdrop-blur-lg rounded-[24px] p-8 shadow-xl border border-white/50">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full border-2 border-[#19d366] overflow-hidden bg-white shadow-sm">
                      <img
                        src={sustainableDevImg}
                        alt="Sustainable Goal Development"
                        className="scale-[3.5] mt-1"
                      />
                    </div>
                    <h2
                      className="text-2xl font-bold text-gray-800 leading-tight"
                      style={{ fontFamily: "var(--font-helvetica)" }}
                    >
                      Download <br /> Emission Report
                    </h2>
                  </div>

                  <form onSubmit={handleDownload} className="space-y-4">
                    {statusMessage.message && (
                      <div
                        className={`rounded-xl px-4 py-3 text-sm ${
                          statusMessage.type === "success"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {statusMessage.message}
                      </div>
                    )}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter Name"
                        className="w-full p-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#19d366] outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="email@company.com"
                        className="w-full p-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#19d366] outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 00000 00000"
                        className="w-full p-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#19d366] outline-none transition-all"
                      />
                    </div>

                    <div className="py-2 flex justify-center scale-[0.8] origin-center">
                      {RECAPTCHA_SITE_KEY ? (
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={RECAPTCHA_SITE_KEY}
                        />
                      ) : (
                        <div className="rounded-xl bg-yellow-50 px-4 py-3 text-center text-sm text-yellow-800">
                          Verification is unavailable until `VITE_RECAPTCHA_SITE_KEY` is configured.
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full bg-[#3d6b3d] hover:bg-[#2a4d2a] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      style={{ fontFamily: "var(--font-helvetica)" }}
                    >
                      {loading ? "PROCESSING..." : "DOWNLOAD REPORT"} <span className="text-xl">›</span>
                    </button>
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnvironmentalAndReport;
