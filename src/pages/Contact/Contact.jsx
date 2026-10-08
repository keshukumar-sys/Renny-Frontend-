// ========== Imports ==========
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SEO from "../../components/SEO";
import ReCAPTCHA from "react-google-recaptcha";

import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

import axios from "axios";

import { toast } from "react-toastify/unstyled";

// ========== Hooks ==========
import usePageHero from "../../hooks/usePageHero";

// ========== Utilities ==========
import { buildApiUrl, RECAPTCHA_SITE_KEY } from "../../lib/api";

// ========== Assets ==========
import banner from "../../assets/contactus.webp";
import rennylocation from "../../assets/renny's-location.webp";
import unit1 from "../../assets/Unit-1.webp";
import unit3 from "../../assets/Unit-3.webp";
import { useNavigate } from "react-router-dom";

// ========== Hardcoded Plants ==========
const hardcodedPlants = [
  {
    title: "Unit I & II",
    address:
      "Village Mangarh, Machhiwara Road, Kohara,\nDistrict Ludhiana, Punjab – 141112, India.",
    image: unit1,
    order: 1,
  },
  {
    title: "Unit III",
    address:
      "Lakhowal Road, Opposite PSPCL House, Kohara,\nLudhiana, Punjab – 141112, India.",
    image: unit3,
    order: 2,
  },
];

const Contact = () => {
  const recaptchaRef = useRef();

  // ========== Hero Content ==========
  const { heroSrc, heroHeading } = usePageHero(
    "contact-us",
    "Contact Us",
    banner,
  );

  // ========== Backend State ==========
  const [loading, setLoading] = useState(false);
  const [serverPlants, setServerPlants] = useState([]);
  const [contactInfo, setContactInfo] = useState(null);
  const [pageError, setPageError] = useState("");

  const [submitStatus, setSubmitStatus] = useState({
    type: "",
    message: "",
  });

  // ========== Form Data ==========
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    enquiryType: "",
    approxQuantity: "",
    message: "",
  });

  // ========== Handle Input Change ==========
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ========== Fetch Plants ==========
  // const fetchPlants = async () => {
  //   try {
  //     const res = await axios.get(buildApiUrl("/api/plants"));
  //     const data = res.data?.data || res.data;
  //     if (Array.isArray(data)) {
  //       setServerPlants(data);
  //     }
  //   } catch {
  //     setPageError("Some location details are temporarily unavailable.");
  //   }
  // };

  // ========== Fetch Contact Info ==========
  const fetchContactInfo = async () => {
    try {
      const res = await axios.get(buildApiUrl("/api/contact-info"));
      if (res.data.success && res.data.data) {
        setContactInfo(res.data.data);
      }
    } catch {
      setPageError("Some contact details are temporarily unavailable.");
    }
  };

  // ========== Initial Data Load ==========
  useEffect(() => {
    // fetchPlants();
    fetchContactInfo();
  }, []);

  // ========== Plants Data ==========
  const plants = (() => {
    const mappedServer = serverPlants.map((p) => ({
      title: p.title,
      image: p.image,
      address: p.address,
      order: p.order || 0,
    }));

    return [
      ...mappedServer,
      ...hardcodedPlants.filter(
        (h) => !mappedServer.some((s) => s.title === h.title),
      ),
    ].sort((a, b) => (a.order || 0) - (b.order || 0));
  })();

  // ========== Form Submit ==========
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
      const res = await axios.post(buildApiUrl("/api/contact/submit"), {
        ...formData,
        captchaToken: token,
      });
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

  const offices = contactInfo?.offices?.length
    ? contactInfo.offices
    : [
        {
          type: "Registered and Corporate Office",
          addressLine1: "Khasra No 34/6/2 (0-8)-7 (8-0)-9,",
          addressLine2: "Khata No. 121/127, Lakhowal Road, Kohara,",
          cityStateZip: "Ludhiana, Punjab - 141112, India",
        },
      ];
  const displayOffices = offices.slice(0, 1).map((office) => ({
    ...office,
    type: "Registered and Corporate Office",
    title: "",
    addressLine1: "Khasra No 34/6/2 (0-8)-7 (8-0)-9,",
    addressLine2: "Khata No. 121/127, Lakhowal Road, Kohara,",
    cityStateZip: "Ludhiana, Punjab - 141112, India",
  }));

  const imageZoom = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  console.log(plants);
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Contact Renny Strips | Get in Touch With Our Team"
        description="Contact Renny Strips for product enquiries, partnerships, industrial solutions, and support from our offices and manufacturing units."
        keywords="Contact Renny Strips, steel manufacturer contact, industrial plant contact, scaffolding solutions India, product enquiry, partnership enquiry, Ludhiana manufacturing company"
        url="https://rennystrips.com/contact-us"
        image={banner}
      />
      {/* Banner */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={imageZoom}
        className="relative h-[100vh] w-full overflow-hidden mb-10"
      >
        {heroSrc && (heroSrc.endsWith(".webm") || heroSrc.endsWith(".mp4")) ? (
          <video
            key={heroSrc}
            src={heroSrc}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img
            key={heroSrc || "fallback"}
            src={heroSrc || banner}
            alt="Hero Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <motion.h1
          variants={fadeUp}
          className="relative z-10 text-white text-4xl md:text-7xl font-bold
                flex items-end justify-start h-full py-10 px-6 md:px-10"
        >
          {heroHeading}
        </motion.h1>
      </motion.section>

      {/* Get In Touch With Us */}
      <section className="w-full bg-white text-black px-6 md:px-20 ">
        {/* Heading */}
        <motion.h2
          className="text-[32px] md:text-[48px] font-bold mb-5 w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get In Touch With Us
          <div className="w-64 md:w-86 h-0.5 bg-blue mx-auto rounded-full mb-20" />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* LEFT SIDE */}
          <motion.div
            className="flex flex-col gap-6 w-full md:max-w-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-semibold leading-tight"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            ></motion.h2>

            <motion.p
              className="text-base md:text-lg mt-10 text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
            >
              We believe in building strong partnerships rooted in trust,
              transparency, and collaboration. Our team focuses on understanding
              your needs and delivering solutions that exceed expectations.
              <br />
              <br />
              With open communication, thoughtful execution, and attention to
              detail, we ensure every interaction is smooth, efficient, and
              meaningful.
            </motion.p>

            {/* Image */}
            <motion.div
              className="w-full h-[260px] rounded-lg overflow-hidden mb-12"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              viewport={{ once: true }}
            >
              <img
                src={rennylocation}
                alt="Renny Location"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE – Form Submission */}
          <motion.div
            className="w-full max-w-[450px] mx-auto  mb-10  bg-blue-50 pb-20 rounded-2xl p-6 md:p-8 shadow-sm "
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
          >
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="bg-gray/10 text-gray-700 font-medium text-xs px-3 py-1.5 rounded-full border border-gray-200/60 shadow-xs">
                Est. 1996
              </span>
              <span className="bg-gray/10 text-gray-700 font-medium text-xs px-3 py-1.5 rounded-full border border-gray-200/60 shadow-xs">
                5 continents
              </span>
              <span className="bg-gray/10 text-gray-700 font-medium text-xs px-3 py-1.5 rounded-full border border-gray-200/60 shadow-xs">
                IS/ISO certified
              </span>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {submitStatus.type === "error" && submitStatus.message && (
                <div className="rounded-xl px-4 py-3 text-sm bg-red-50 text-red-700">
                  {submitStatus.message}
                </div>
              )}

              <motion.input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full name *"
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 outline-none text-gray-900 placeholder-gray-400 focus:border-black transition-all text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
              />

              <motion.input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address *"
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 outline-none text-gray-900 placeholder-gray-400 focus:border-black transition-all text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true }}
              />

              <motion.input
                type="tel"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone number *"
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 outline-none text-gray-900 placeholder-gray-400 focus:border-black transition-all text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                viewport={{ once: true }}
              />
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="enquiryType"
                    value="Dealer / Distributor Enquiry"
                    checked={
                      formData.enquiryType === "Dealer / Distributor Enquiry"
                    }
                    onChange={handleChange}
                    required
                  />
                  <span>Dealer / Distributor Enquiry</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="enquiryType"
                    value="Export / International Enquiry"
                    checked={
                      formData.enquiryType === "Export / International Enquiry"
                    }
                    onChange={handleChange}
                  />
                  <span>Export Enquiry</span>
                </label>
              </div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
              >
                <select
                  name="enquiryType"
                  required
                  value={formData.enquiryType}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 outline-none text-gray-900 placeholder-gray-400 focus:border-black transition-all appearance-none text-base font-medium"
                >
                  <option value="" disabled hidden>
                    Product enquiry type *
                  </option>

                  <option value="MS Billets">MS Billets</option>
                  <option value="Wire Rods">Wire Rods</option>
                  <option value="Narrow-width HR Coils">
                    Narrow-width HR Coils
                  </option>
                  <option value="ERW Pipes & Tubes">ERW Pipes & Tubes</option>
                  <option value="General Enquiry">
                    Scaffolding & Formwork
                  </option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </motion.div>

              <motion.input
                type="text"
                name="approxQuantity"
                value={formData.approxQuantity}
                onChange={handleChange}
                placeholder="Approx. quantity (tonnes / units)"
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 outline-none text-gray-900 placeholder-gray-400 focus:border-black transition-all text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
                viewport={{ once: true }}
              />

              <motion.textarea
                rows="4"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Your requirement or message"
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 outline-none text-gray-900 placeholder-gray-400 focus:border-black transition-all resize-none h-[130px] text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true }}
              />

              <motion.div
                className="flex flex-col items-center gap-2 pt-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
                viewport={{ once: true }}
              >
                <div className="py-2 flex justify-center scale-[0.9] origin-center">
                  {RECAPTCHA_SITE_KEY ? (
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                    />
                  ) : (
                    <div className="rounded-xl bg-yellow-50 px-4 py-3 text-center text-sm text-yellow-800">
                      Verification is unavailable until
                      `VITE_RECAPTCHA_SITE_KEY` is configured.
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 text-white font-bold tracking-wide rounded-lg border-2 border-gray-200 bg-blue text-black transition-all duration-200 hover:bg-blue-highlight hover:text-white focus:border-black disabled:bg-gray-100 disabled:text-gray-400"
                >
                  {loading ? "Sending..." : "Request A Quote"}
                </button>
                <span className="text-xs text-gray-500 font-medium mt-1">
                  We respond within 1 business day
                </span>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="w-full px-6 md:px-20 py-20 bg-gradient-to-t to-[#262731] from-[#879cefe6]">
        {pageError && (
          <div className="max-w-6xl mx-auto mb-6 rounded-xl bg-blue-50 px-4 py-3 text-sm text-[#292c44] shadow-sm">
            {pageError}
          </div>
        )}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-8 max-w-5xl mx-auto justify-items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {/* BOX 1 – Email & Phone */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="bg-gray-200 hover:bg-white rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-xl transition-all duration-300 w-full"
          >
            <h2 className="text-2xl md:text-2xl font-semibold text-[#292c44]">
              Get in Touch
            </h2>

            {/* Emails – CMS or fallback */}
            {(contactInfo?.emails?.length
              ? contactInfo.emails
              : ["info@rennystrips.com", "exports@rennystrips.com"]
            ).map((email, i) => (
              <div key={i} className="flex items-center gap-3">
                <MdEmail size={22} />
                <span>{email}</span>
              </div>
            ))}

            {/* Phones – CMS or fallback */}
            {(contactInfo?.phones?.length
              ? contactInfo.phones
              : ["+91-8288001300", "+91-9688001300"]
            ).map((phone, i) => (
              <div key={i} className="flex items-center gap-3">
                <MdPhone size={22} />
                <span>{phone.replace("82880-01300", "8288001300")}</span>
              </div>
            ))}
          </motion.div>

          {/* Office Boxes – CMS or fallback */}
          {displayOffices.map((office, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="bg-gray-200 hover:bg-white rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-xl transition-all duration-300 w-full"
            >
              <div className="flex items-start justify-start gap-3">
                <MdLocationOn size={28} className="text-[#292c44] shrink-0" />
                <h2 className="text-2xl md:text-2xl font-semibold text-[#292c44]">
                  {office.type}
                </h2>
              </div>
              {office.title && (
                <h2 className="text-lg md:text-xl font-semibold text-black leading-snug">
                  {office.title}
                </h2>
              )}
              <p className="text-base font-normal leading-relaxed text-black">
                {office.addressLine1}
                {office.addressLine2 && (
                  <>
                    <br />
                    {office.addressLine2}
                  </>
                )}
                {office.cityStateZip && (
                  <>
                    <br />
                    {office.cityStateZip}
                  </>
                )}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Industrial Plant Sections */}
      <section className="w-full bg-blue-50 px-6 md:px-10 relative">
        <motion.h2
          className="text-[32px] md:text-[48px] font-bold mt-10 mb-10 w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Industrial plant
          <div className="w-48 md:w-68 h-0.5 bg-blue mx-auto rounded-full mb-10" />
        </motion.h2>

        <section className="relative overflow-hidden ">
          {plants.map((plant, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`grid grid-cols-1 md:grid-cols-2 ${index === plants.length - 1 ? "mb-20" : "mb-28"} gap-10 md:gap-16 items-center`}
              >
                {isEven ? (
                  <>
                    {/* Image First for Even Items */}
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.03 }}
                      className="rounded-2xl overflow-hidden shadow-md"
                    >
                      <img
                        src={plant.image}
                        alt={plant.title}
                        className="w-full h-full object-cover transition-transform duration-500"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="space-y-6 p-6 border-l-4 border-[#292c44]"
                    >
                      <div className="flex  items-center gap-3">
                        <img src={banner} className="hidden" alt="Contact Img" />
                        <MdLocationOn size={30} className="text-[#292c44]" />
                        <h3 className="text-2xl md:text-3xl font-semibold text-[#292c44]">
                          {plant.title}
                        </h3>
                      </div>
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {plant.address}
                      </p>
                      <div className="w-16 h-[2px] bg-[#292c44]" />
                    </motion.div>
                  </>
                ) : (
                  <>
                    {/* Content First for Odd Items */}
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="space-y-6 p-6 border-l-4 border-[#292c44] order-2 md:order-1"
                    >
                      <div className="flex items-center gap-3">
                        <MdLocationOn size={30} className="text-[#292c44]" />
                        <h3 className="text-2xl md:text-3xl font-semibold text-[#292c44]">
                          {plant.title}
                        </h3>
                      </div>
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {plant.address}
                      </p>
                      <div className="w-16 h-[2px] bg-[#292c44]" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.03 }}
                      className="rounded-2xl overflow-hidden shadow-md order-1 md:order-2"
                    >
                      <img
                        src={plant.image}
                        alt={plant.title}
                        className="w-full h-full object-cover transition-transform duration-500"
                      />
                    </motion.div>
                  </>
                )}
              </div>
            );
          })}
        </section>
      </section>
    </>
  );
};

export default Contact;
