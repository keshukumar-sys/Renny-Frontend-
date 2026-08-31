import { useState, useEffect } from "react";
import axios from "axios"; // Added axios for backend communication
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import InvestorSidebar from "../../components/InvestorSidebar";
import usePageHero from "../../hooks/usePageHero";
import SEO from "../../components/SEO";

import { API_BASE_URL } from "../../lib/api";

const Shareholding = () => {
  const location = useLocation();

  // 1. STATE FOR DYNAMIC DATA
  const [shareholdingDocs, setShareholdingDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { heroSrc, heroHeading } = usePageHero(
    "share-holding-pattern",
    "Share Holding Pattern",
  );

  const brandColor = "#292C44";
  const mainHeadingFont =
    "font-['Helvetica','Arial',sans-serif] text-2xl lg:text-[37px] font-semibold";
  const subHeadingFont =
    "font-['Helvetica','Arial',sans-serif] text-[18px] font-semibold";
  const btnClass =
    "text-white px-5 py-2.5 rounded-lg text-[14px] font-medium hover:opacity-90 transition-all duration-300 font-['Helvetica','Arial',sans-serif]";

  // 2. FETCH DATA FROM BACKEND (Port 3000)
  useEffect(() => {
    const fetchShareholding = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/shareholding-pattern`,
        );
        setShareholdingDocs(response.data);
      } catch (error) {
        console.error("Error fetching shareholding pattern:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchShareholding();
  }, []);

  return (
    <>
      <SEO
        title="Share Holding Pattern | Investor Relations | Renny Strips"
        description="View Renny Strips shareholding patterns, investor ownership details, and equity distribution reports."
        keywords="Renny Strips shareholding pattern, shareholder structure, investor relations, equity holdings, promoter holdings, public shareholding"
        url="https://rennystrips.com/share-holding-pattern"
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
              alt="Share Holding Pattern Banner"
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
        {/* -------------------- MAIN CONTENT SECTION -------------------- */}
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
                Share Holding Pattern
              </h2>

              <div className="mb-8">
                <button
                  className="text-white px-6 py-2 rounded font-bold text-[14px] shadow-sm cursor-default"
                  style={{ backgroundColor: brandColor }}
                >
                  Share Holding Pattern
                </button>
              </div>

              {/* DOCUMENT LIST - Renders from Backend */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-gray-400 animate-pulse">
                    Loading patterns...
                  </div>
                ) : shareholdingDocs.length > 0 ? (
                  shareholdingDocs.map((doc, i) => (
                    <motion.div
                      key={doc._id || i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className={subHeadingFont}>{doc.title}</span>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full md:w-auto"
                      >
                        <button
                          className={`${btnClass} w-full md:w-auto`}
                          style={{ backgroundColor: brandColor }}
                        >
                          Click here
                        </button>
                      </a>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-gray-400 italic">
                    No shareholding patterns available.
                  </div>
                )}
              </div>
            </div>

            <aside className="col-span-1 lg:col-span-4">
              <InvestorSidebar />
            </aside>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default Shareholding;
