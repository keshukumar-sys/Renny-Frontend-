// ========== Imports ==========
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../../components/SEO";

// ========== Components ==========
import InvestorSidebar from "../../components/InvestorSidebar";

// ========== Hooks ==========
import usePageHero from "../../hooks/usePageHero";

import { API_BASE_URL } from "../../lib/api";

const IPODocs = () => {
  // ========== State ==========
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ========== Hero Content ==========
  const { heroSrc, heroHeading } = usePageHero("ipo", "IPO Documents");

  // ========== Modal State ==========
  const [showModal, setShowModal] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");

  // ========== Theme Styles ==========
  const brandColor = "#292C44";

  const mainHeadingFont =
    "font-['Helvetica','Arial',sans-serif] text-2xl lg:text-[37px] font-semibold";

  const subHeadingFont =
    "font-['Helvetica','Arial',sans-serif] text-[18px] font-semibold";

  const btnClass =
    "text-white px-5 py-2.5 rounded-lg text-[14px] font-medium hover:opacity-90 transition-all duration-300 font-['Helvetica','Arial',sans-serif]";

  // ========== Fetch IPO Documents ==========
  useEffect(() => {
    const fetchIpoDocs = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/ipo-documents`,
        );

        setDocs(response.data);
      } catch (error) {
        console.error("Error fetching IPO Docs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIpoDocs();
  }, []);

  // ========== Open Disclaimer Modal ==========
  const handleOpenDisclaimer = (url) => {
    setSelectedUrl(url);

    setShowModal(true);

    document.body.style.overflow = "hidden";
  };

  // ========== Confirm Disclaimer ==========
  const handleConfirm = () => {
    setShowModal(false);

    document.body.style.overflow = "unset";

    window.open(selectedUrl, "_blank", "noreferrer");
  };

  // ========== Cancel Disclaimer ==========
  const handleCancel = () => {
    setShowModal(false);

    document.body.style.overflow = "unset";

    setSelectedUrl("");
  };

  return (
    <>
      <SEO
        title="IPO Documents | Investor Relations | Renny Strips"
        description="Access Renny Strips IPO documents, DRHP filings, investor disclosures, and public issue records for shareholders and investors."
        keywords="Renny Strips IPO documents, DRHP, offer documents, investor relations, stock market filings, IPO disclosures, red herring prospectus"
        url="https://rennystrips.com/ipo"
        image={heroSrc}
      />
      <div className="font-['Helvetica','Arial',sans-serif]">
        {/* Banner */}
        <motion.section
          className="relative h-[50vh] md:h-[100vh] w-full overflow-hidden mb-12"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          {heroSrc &&
          (heroSrc.toLowerCase().endsWith(".webm") ||
            heroSrc.toLowerCase().endsWith(".mp4")) ? (
            <video
              key={heroSrc}
              src={heroSrc}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : heroSrc ? (
            <img
              key={heroSrc}
              src={heroSrc}
              alt="IPO Documents Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : null}

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            className="relative z-10 text-white text-4xl md:text-6xl lg:text-7xl font-bold flex items-end justify-start h-full py-10 px-6 md:px-10"
          >
            {heroHeading}
          </motion.h1>
        </motion.section>

        {/* MAIN CONTENT SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-20 pb-32 bg-white px-6"
        >
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="col-span-1 lg:col-span-8">
              <div
                className="inline-block text-white px-5 py-1.5 rounded-md mb-6 font-semibold text-[13px] tracking-wide"
                style={{ backgroundColor: brandColor }}
              >
                INVESTOR RELATIONS
              </div>
              <h2 className={`${mainHeadingFont} mb-12 text-gray-900`}>
                IPO Documents
              </h2>

              <div className="mb-8">
                <button
                  className="text-white px-6 py-2 rounded font-bold text-[14px] shadow-sm cursor-default"
                  style={{ backgroundColor: brandColor }}
                >
                  Offer Documents
                </button>
              </div>

              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-gray-400 animate-pulse">
                    Loading documents...
                  </div>
                ) : docs.length > 0 ? (
                  docs.map((doc, i) => (
                    <motion.div
                      key={doc._id || i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className={subHeadingFont}>{doc.title}</span>
                      <button
                        onClick={() => handleOpenDisclaimer(doc.url)}
                        className={`${btnClass} w-full md:w-auto`}
                        style={{ backgroundColor: brandColor }}
                      >
                        Click here
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-gray-400 italic">
                    No offer documents available.
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-1 lg:col-span-4">
              <InvestorSidebar />
            </div>
          </div>
        </motion.section>

        {/* DISCLAIMER MODAL */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Disclaimer
                  </h2>
                </div>

                {/* Modal Body (Scrollable) */}
                <div className="p-4 md:p-8 overflow-y-auto text-gray-700 text-xs md:text-[14px] leading-relaxed space-y-4 text-justify">
                  <p className="font-bold text-gray-900 uppercase">
                    PLEASE READ THIS NOTICE CAREFULLY. IT APPLIES TO ALL PERSONS
                    WHO VIEW THIS WEBSITE. THESE MATERIALS ARE NOT DIRECTED AT
                    OR INTENDED TO BE ACCESSED BY PERSONS LOCATED OUTSIDE INDIA.
                  </p>
                  <p>
                    The prospectus is being made available on this website to
                    comply with Securities and Exchange Board of India (Issue of
                    Capital and Disclosure Requirements) Regulations, 2018, as
                    amended (“SEBI ICDR Regulations”).
                  </p>
                  <p className="font-bold text-gray-900">
                    IMPORTANT: You must read and agree with the terms and
                    conditions of the following disclaimer before continuing.
                  </p>
                  <p>
                    The following disclaimer applies to the draft red herring
                    prospectus of Renny Strips Limited (the “Company”) dated
                    December 12, 2025 (the “Draft Red Herring Prospectus”) filed
                    with the Securities and Exchange Board of India (“SEBI”) and
                    BSE Limited and National Stock Exchange of India Limited and
                    is hosted on this website, in relation to the initial public
                    offering of the equity shares bearing face value of ₹5 each
                    (“Equity Shares”) of the Company (“Offer”).
                  </p>
                  <p>
                    You are advised to read this disclaimer carefully before
                    reading, accessing or making any other use of the Draft Red
                    Herring Prospectus. In accessing the Draft Red Herring
                    Prospectus, you agree to be bound by the following terms and
                    conditions, including any modifications to them from time to
                    time.
                  </p>
                  <p>
                    The Draft Red Herring Prospectus is directed at, and is
                    intended for distribution to, and use by, residents of India
                    only. The information in this portion of our website,
                    including the Draft Red Herring Prospectus, is not for
                    publication or distribution, directly or indirectly, in or
                    into the United States.
                  </p>
                  <p>
                    No part of the contents of the Draft Red Herring Prospectus
                    shall be copied or duplicated in any form by any means, or
                    redistributed. The information contained in the Draft Red
                    Herring Prospectus may not be updated since its original
                    publication date and may not reflect the latest updates.
                    Access to the Draft Red Herring Prospectus does not
                    constitute a recommendation by the Company, the members of
                    the Syndicate (as defined in the Draft Red Herring
                    Prospectus) or any of their respective affiliates or any
                    other person to subscribe to the Equity Shares offered in
                    the Offer.
                  </p>
                  <p>
                    The Draft Red Herring Prospectus has been hosted on this
                    website as prescribed under Regulation 26(1) of the SEBI
                    ICDR Regulations. You are reminded that documents
                    transmitted in electronic form may be altered or changed
                    during the process of transmission and consequently, neither
                    the Company nor any of its affiliates accepts any liability
                    or responsibility whatsoever in respect of alterations or
                    changes which have taken place during the course of
                    transmission of electronic data.
                  </p>
                  <p>
                    To access this information, you must confirm by pressing on
                    the button marked "I Confirm" that, at the time of access
                    you are located in India. If you cannot make this
                    confirmation, you must press the button marked "I Do Not
                    Confirm".
                  </p>
                  <p className="italic text-gray-500">
                    The documentation contained in these pages is posted solely
                    to comply with Indian legal and regulatory requirements.
                    Making the information contained herein available in
                    electronic format does not constitute an offer to sell, the
                    solicitation of an offer to buy, or a recommendation to buy
                    or sell securities of the Company in the United States or in
                    any other jurisdiction, including without limitation, India.
                  </p>
                </div>

                {/* Modal Footer (Buttons) */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    onClick={handleCancel}
                    className="px-8 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    I Do Not Confirm
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="px-8 py-2.5 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "#0066b2" }} // Standard blue from image
                  >
                    I Confirm
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default IPODocs;
