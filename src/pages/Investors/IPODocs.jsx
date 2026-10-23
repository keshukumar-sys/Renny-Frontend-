// ========== Imports ==========
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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
              width={1920}
              height={1080}
              loading="eager"
              fetchPriority="high"
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
                        onClick={() =>
                          window.open(doc.url, "_blank", "noreferrer")
                        }
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
      </div>
    </>
  );
};

export default IPODocs;
