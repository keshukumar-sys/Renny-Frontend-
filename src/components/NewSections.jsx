import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import certificate from '../assets/Certificate -  BIS Certification –  IS 11612014(2).webp';
// import BGimg from '../assets/whyChooseBg.webp';
import BGimg from '../assets/Why Global Companies.webp'
/* ==========================================================================
   1. CERTIFICATES DATASET
   ========================================================================== */
// const certificatesData = [
//   {
//     id: 'bis-certified',
//     title: 'BIS-Certified Manufacturing',
//     description:
//       'All products conform to Bureau of Indian Standards specifications ensuring structural integrity and compliance.',
//     thumbnail: certificate,
//     fullImage: certificate,
//     downloadUrl: '#',
//     code: 'IS 2062:2011',
//     issuer: 'Bureau of Indian Standards',
//   },
//   {
//     id: 'iso-quality',
//     title: 'ISO Quality Management',
//     description:
//       'Our manufacturing processes are governed by internationally recognized quality management systems.',
//     thumbnail: certificate,
//     fullImage: certificate,
//     downloadUrl: '#',
//     code: 'ISO 9001:2015',
//     issuer: 'International Organization for Standardization',
//   },
//   {
//     id: 'green-steel',
//     title: '5-Star Green Steel Rating',
//     description:
//       "Renny Strips holds India's prestigious 5-Star Green Steel Manufacturing Rating  a benchmark for green steel producers committed to low-carbon operations.",
//     thumbnail: certificate,
//     fullImage: certificate,
//     downloadUrl: '#',
//     code: 'GSR-5STAR-2024',
//     issuer: 'Ministry of Steel / CII GreenCo',
//   },
//   {
//     id: 'cbam-compliance',
//     title: 'CBAM Compliance Documentation',
//     description:
//       'For buyers in the European Union, Renny Strips provides full CBAM-compliant documentation, making cross-border procurement seamless.',
//     thumbnail: certificate,
//     fullImage: certificate,
//     downloadUrl: '#',
//     code: 'EU-CBAM-REG-2023',
//     issuer: 'European Commission Customs & Tax',
//   },
// ];

/* ==========================================================================
   2. SUB-COMPONENTS FOR CERTIFICATIONS
   ========================================================================== */
// const CertificateCard = ({ cert, onSelect, cardVariants, iconVariants }) => {
//   return (
//     <motion.div
//       variants={cardVariants}
//       whileHover={{ y: -8 }}
//       onClick={() => onSelect(cert)}
//       className="group relative overflow-hidden rounded-3xl cursor-pointer bg-white shadow-lg"
//     >
//       {/* Image */}
//       <div className="relative aspect-[4/5] pt-3 overflow-hidden">
//         <img
//           src={cert.thumbnail}
//           alt={cert.title}
//           width={400}
//           height={500}
//           className="w-full h-90 object-cover transition-transform duration-700 group-hover:scale-105"
//         />

      
//       </div>

//       {/* Bottom Bar */}
//       <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-5  transition-opacity duration-300">
//         <h3 className="text-lg font-bold text-[#292c44]">{cert.title}</h3>

//         <span className="text-sm text-[#05267e] font-semibold">
//           View Certificate 
//         </span>
//       </div>
//     </motion.div>
//   );
// };

const CertificateModal = ({ cert, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    if (modalRef.current) modalRef.current.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () =>
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));

  if (!cert) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/65 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative z-10 w-[95vw] md:w-[90vw] lg:w-[80vw] h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden outline-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white z-20">
            <div>
              <h2
                id="modal-title"
                className="text-xl sm:text-2xl font-bold text-[#292c44]"
              >
                {cert.title}
              </h2>
              <p className="text-xs text-[#6a7282] mt-0.5">
                {cert.issuer} • Standard Code: {cert.code}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2.5 rounded-full text-gray-400 hover:text-[#292c44] hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#05267e]"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Canvas Viewport */}
          <div className="flex-1 bg-gray-50/50 overflow-auto p-4 sm:p-8 flex items-center justify-center relative">
            <motion.div
              animate={{ scale: zoomLevel }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="max-w-full max-h-full flex items-center justify-center origin-center"
            >
              <img
                src={cert.fullImage}
                alt={cert.title}
                width={1200}
                height={1600}
                loading="lazy"
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-xl border border-gray-200 bg-white"
              />
            </motion.div>
          </div>

          {/* Bottom Toolbar */}
          <div className="px-6 py-4 bg-white border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 z-20">
            <div className="flex items-center gap-2 bg-gray-100/80 p-1 rounded-xl">
              <button
                onClick={handleZoomOut}
                aria-label="Zoom Out"
                disabled={zoomLevel <= 0.75}
                className="p-2 rounded-lg text-[#292c44] hover:bg-white hover:shadow-sm disabled:opacity-40 transition-all focus:outline-none"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <span className="text-xs font-semibold text-[#292c44] min-w-[50px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                aria-label="Zoom In"
                disabled={zoomLevel >= 2.5}
                className="p-2 rounded-lg text-[#292c44] hover:bg-white hover:shadow-sm disabled:opacity-40 transition-all focus:outline-none"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={cert.downloadUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00A43D] hover:bg-[#008a33] text-white text-sm font-medium shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A43D]"
              >
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>Download Document</span>
              </a>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-[#292c44] hover:bg-gray-50 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#292c44]"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

/* ==========================================================================
   3. MAIN COMPONENT (NewSections)
   ========================================================================== */
const NewSections = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const cards = [
    {
      id: 1,
      title: 'Vertically Integrated - One Source, Complete Control',
      description:
        'From melting to dispatch, every stage happens in-house. This means tighter quality control, faster turnaround, and lower costs for you.',
      // Factory / Plant Icon
      icon: (
        <svg
          className="w-6 h-6 text-blue"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'CBAM-Ready Green Steel for European Markets',
      description:
        'As a CBAM-compliant structural steel company, Renny Strips enables Indian and European buyers to source green steel with confidence - backed by documented carbon reporting and low-emission production.',
      // Globe / Export Icon
      icon: (
        <svg
          className="w-6 h-6 text-blue"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: '5-Star Green Steel Manufacturing Rating',
      description:
        'Independently recognized as a top-tier green steel manufacturer in India reflecting our commitment to sustainable, low-carbon structural steel production.',
      // Certificate / Star Icon
      icon: (
        <svg
          className="w-6 h-6 text-blue"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: '22 MW Solar Power Sustainability Built In',
      description:
        'Nearly 30% of our energy needs are met through captive solar, directly reducing the carbon footprint of every tonne we produce.',
      // Sun / Power Icon
      icon: (
        <svg
          className="w-6 h-6 text-blue"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      id: 5,
      title: 'Competitive Pricing at Scale',
      description:
        'With 199,200 TPA capacity and in-house energy generation, we offer structural steel company and contractors cost-efficient procurement without compromising quality.',
      // Link / Chain Icon
      icon: (
        <svg
          className="w-6 h-6 text-blue"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Variant for individual cards sliding up
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15,
      },
    },
  };

  // Variant for icon popping effect
  const iconVariants = {
    hidden: { scale: 0, rotate: -20 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10,
        delay: 0.1,
      },
    },
  };

  return (
    <div>
      {/* Why Choose Renny Strips Limited */}
      <section className="relative min-h-screen min-h-[100dvh] w-full py-12 md:py-20 px-4 overflow-hidden flex flex-col justify-center items-center">
        {/* ---------------------------------------------------------------- */}
        {/* Background Image */}
        {/* ---------------------------------------------------------------- */}
        <div className="absolute inset-0">
          <img
            src={BGimg}
            alt="Why Choose Renny Strips Limited"
            aria-hidden="true"
            width={1920}
            height={1080}
            loading="lazy"
            className="w-full h-full object-contain brightness-105 saturate-110"
          />

          {/* White Overlay */}
          <div className="absolute inset-0 bg-white/15" />

          {/* Blue Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-[#05267e]/15" />

          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.08)_100%)]" />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Blueprint Overlay */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.06 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 pointer-events-none bg-bottom bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 300' fill='none' stroke='%23292c44' stroke-width='1.5'%3E%3Cpath d='M50 300V150h100v150M150 180h120v120M270 200h80v100M400 300V120h150v180M550 160h100v140M700 300V100h200v200M900 150h150v150'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ---------------------------------------------------------------- */}
        {/* Content */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          {/* Heading */}
          <motion.h2
            className="text-3xl text-blue py-8 sm:text-4xl md:text-[48px] font-bold  w-full text-center"
            initial={{ y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            Why Global Companies Choose
            <br className="hidden sm:block" />
            <span className="text-[#6a7282]"> Renny Strips Limited</span>
            <div className="w-36 mt-4 sm:w-48 md:w-100 h-0.5 bg-blue mx-auto rounded-full" />
          </motion.h2>

          {/* Cards */}
          <div className="space-y-5 md:space-y-6">
            {/* Top Row */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
            >
              {cards.slice(0, 3).map((card) => (
                <motion.div
                  key={card.id}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.25 },
                  }}
                  className=" group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_12px_35px_rgba(0,0,0,0.08)] hover:bg-white/80 hover:border-[#05267e]/20 hover:shadow-[0_20px_50px_rgba(5,38,126,0.15)] transition-all duration-300 p-6"
                >
                  {/* Accent */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-[#05267e] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300" />

                  <div className="flex items-start gap-4">
                    <motion.div
                      variants={iconVariants}
                      className="w-12 h-12 rounded-xl bg-[#05267e]/10 text-[#05267e] flex items-center justify-center shrink-0"
                    >
                      {card.icon}
                    </motion.div>

                    <div>
                      <h3 className="text-lg font-bold text-[#292c44] mb-2">
                        {card.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-[#6a7282]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom Row */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto"
            >
              {cards.slice(3, 5).map((card) => (
                <motion.div
                  key={card.id}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.25 },
                  }}
                  className=" group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_12px_35px_rgba(0,0,0,0.08)] hover:bg-white/80 hover:border-[#05267e]/20 hover:shadow-[0_20px_50px_rgba(5,38,126,0.15)] transition-all duration-300 p-6"
                >
                  {/* Accent */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-[#05267e] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300" />

                  <div className="flex items-start gap-4">
                    <motion.div
                      variants={iconVariants}
                      className="w-12 h-12 rounded-xl bg-[#05267e]/10 text-[#05267e] flex items-center justify-center shrink-0"
                    >
                      {card.icon}
                    </motion.div>

                    <div>
                      <h3 className="text-lg font-bold text-[#292c44] mb-2">
                        {card.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-[#6a7282]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* Certifications & Standards */}
      {/* <section className="relative w-full bg-gray-100 text-[#292c44] overflow-hidden py-16 sm:py-20 lg:py-14">
        <div className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="flex flex-col items-center"
          >
            {/* Header */}
            {/* <div className="w-full max-w-4xl text-center mb-12 lg:mb-16">
              <motion.h2
                className="text-3xl text-blue  sm:text-4xl md:text-[48px] font-bold  w-full text-center"
                initial={{ y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                CERTIFICATIONS & STANDARDS
                <div className="w-36 mt-1 sm:w-48 md:w-130 h-0.5 bg-blue mx-auto rounded-full" />
              </motion.h2> */}

              {/* <h3 className="mt-6 text-2xl text-blue py-8 sm:text-3xl md:text-[32px] font-bold  w-full text-center">
                Quality Certifications & Industry Standards
              </h3>

              <p className="text-sm sm:text-base lg:text-lg text-[#292c44]/80 leading-relaxed max-w-3xl mx-auto">
                Engineered for precision and sustainability. Our steel
                production strictly adheres to rigorous global quality
                specifications and low-carbon compliance benchmarks.
              </p>
            </div> */}

            {/* Cards */}
            {/* <div className="grid w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
              {certificatesData.map((cert) => (
                <CertificateCard
                  key={cert.id}
                  cert={cert}
                  onSelect={(selected) => setSelectedCert(selected)}
                  cardVariants={cardVariants}
                  iconVariants={iconVariants}
                />
              ))}
            </div>
          </motion.div>
        </div> */}

        {/* Modal */}
        {/* {selectedCert && (
          <CertificateModal
            cert={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )} */}
      {/* </section>  */}
    </div>
  );
};

export default NewSections;
