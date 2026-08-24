import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios"; // Ensure axios is installed
import SEO from "../../components/SEO";

import InvestorSidebar from "../../components/InvestorSidebar";
import usePageHero from "../../hooks/usePageHero";

// 1. HARDCODED TABS: These will always show in the scroller
const FIXED_POLICIES = [
  { slug: "archival", label: "Archival Policy" },
  {
    slug: "independent",
    label: "Terms of an Independent Director’s Appointment",
  },
  { slug: "party", label: "Policy on Material Related Party Transaction" },
  {
    slug: "disclosure",
    label: "Policy on Disclosure on Material Event Information",
  },
  { slug: "whistle", label: "Whistle Blower Policy" },
  { slug: "nomination", label: "Nomination & Remuneration Policy" },
  {
    slug: "familiarisation",
    label: "Familiarisation Programme for Independent Directors",
  },
  { slug: "conduct", label: "Code of Conduct for Board & Senior Managements" },
  { slug: "risk", label: "Risk Management Policy" },
  { slug: "fair", label: "Code of Fair Disclosure" },
  { slug: "csr", label: "Corporate Social Responsibility Policy" },
  { slug: "succession", label: "Succession Policy" },
  {
    slug: "posh",
    label: "Policy on Prevention of Sexual Harassment at Workplace",
  },
  { slug: "dividend", label: "Dividend Policy" },
  {
    slug: "trading",
    label: "Code of Conduct to Regulate Monitor and Report Trading",
  },
  { slug: "evaluation", label: "Board Evaluation Policy" },
  { slug: "diversity", label: "Policy on Diversity of the Board" },
];

import { API_BASE_URL } from "../../lib/api";

const Policies = () => {
  const [activeTab, setActiveTab] = useState("archival");
  const [groupedPolicies, setGroupedPolicies] = useState({}); // Grouping docs by slug
  const [isLoading, setIsLoading] = useState(true);

  const { heroSrc, heroHeading } = usePageHero("our-policies", "Our Policies");

  const scrollRef = useRef(null);
  const brandColor = "#292C44";
  const mainHeadingFont =
    "font-['Helvetica','Arial',sans-serif] text-2xl lg:text-[37px] font-semibold";
  const subHeadingFont =
    "font-['Helvetica','Arial',sans-serif] text-[18px] font-semibold";
  const btnClass =
    "text-white px-5 py-2.5 rounded-lg text-[14px] font-medium hover:opacity-90 transition-all duration-300 font-['Helvetica','Arial',sans-serif]";

  // 2. FETCH AND GROUP POLICIES
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        // Updated to Port 3000
        const response = await axios.get(
          `${API_BASE_URL}/api/policies`,
        );
        const data = response.data;

        // Grouping logic: Merges documents if multiple records exist for one slug
        const groups = {};
        data.forEach((item) => {
          if (!groups[item.slug]) {
            groups[item.slug] = [];
          }
          groups[item.slug].push(item);
        });

        setGroupedPolicies(groups);
      } catch (error) {
        console.error("Error fetching policies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - 350 : scrollLeft + 350;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // Get current docs for the selected tab
  const activeDocs = groupedPolicies[activeTab] || [];

  if (isLoading) return null;

  return (
    <>
      <SEO
        title="Policies | Investor Relations | Renny Strips"
        description="Explore Renny Strips corporate policies, governance frameworks, compliance documents, and investor relation disclosures."
        keywords="Renny Strips policies, corporate governance policies, investor relations, compliance documents, company policies, steel company governance"
        url="https://rennystrips.com/our-policies"
        image={heroSrc}
      />
      <div className="font-['Helvetica','Arial',sans-serif]">
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

        {/* HERO SECTION */}
        <section className="relative w-full h-[40vh] lg:h-[100vh] overflow-hidden">
          {heroSrc && (
            <img
              key={heroSrc}
              src={heroSrc}
              alt="Policies"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute bottom-16 left-0 w-full px-6  z-10">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              className="relative z-10 text-white text-4xl md:text-6xl lg:text-7xl font-bold flex items-end justify-start h-full px-6 md:px-10"
            >
              {heroHeading}
            </motion.h1>
          </div>
        </section>

        <section className="pt-20 pb-32 bg-white px-6">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="col-span-1 lg:col-span-8">
              <div
                className="inline-block text-white px-5 py-1.5 rounded-md mb-6 font-semibold text-[13px]"
                style={{ backgroundColor: brandColor }}
              >
                INVESTOR RELATIONS
              </div>
              <h2 className={`${mainHeadingFont} mb-12 text-gray-900`}>
                Our Policies
              </h2>

              {/* TAB SCROLLER - All buttons always visible */}
              <div className="relative mb-12 group flex items-center">
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 z-20 p-2 bg-white/90 shadow-lg rounded-full -ml-4 opacity-0 group-hover:opacity-100 transition-opacity border border-gray-100"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={brandColor}
                    strokeWidth="3"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <div
                  ref={scrollRef}
                  className="flex overflow-x-auto gap-3 pb-2 no-scrollbar scroll-smooth w-full px-2"
                >
                  {FIXED_POLICIES.map((item) => (
                    <button
                      key={item.slug}
                      onClick={() => setActiveTab(item.slug)}
                      className={`whitespace-nowrap px-6 py-3 rounded-lg text-[14px] font-bold transition-all border ${
                        activeTab === item.slug
                          ? "text-white shadow-lg border-transparent"
                          : "bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100"
                      }`}
                      style={
                        activeTab === item.slug
                          ? { backgroundColor: brandColor }
                          : {}
                      }
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 z-20 p-2 bg-white/90 shadow-lg rounded-full -mr-4 opacity-0 group-hover:opacity-100 transition-opacity border border-gray-100"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={brandColor}
                    strokeWidth="3"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {activeDocs.length > 0 ? (
                    activeDocs.map((policy) => (
                      <div
                        key={policy._id}
                        className="p-6 md:p-10 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8"
                      >
                        <div className="flex-1">
                          <h3
                            className={`${subHeadingFont} text-gray-900 mb-2 leading-snug`}
                          >
                            {policy.docName}
                          </h3>
                          <p className="text-[13px] text-gray-400 font-medium italic">
                            Category: {policy.label}
                          </p>
                        </div>
                        <a
                          href={policy.url}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0"
                        >
                          <button
                            className={btnClass}
                            style={{ backgroundColor: brandColor }}
                          >
                            Download PDF
                          </button>
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="p-10 text-center text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-200">
                      This policy document has not been uploaded yet.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="col-span-1 lg:col-span-4">
              <InvestorSidebar />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Policies;
