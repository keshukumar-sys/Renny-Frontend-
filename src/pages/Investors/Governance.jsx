import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import SEO from "../../components/SEO";
import InvestorSidebar from "../../components/InvestorSidebar";
import usePageHero from "../../hooks/usePageHero";

const GOVERNANCE_TABS = [
  { key: "board", label: "Board of Directors" },
  { key: "committee", label: "Committee Composition of Board" },
  { key: "contact", label: "Investor Contacts" },
];

// Animation Variants for orchestration
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between each child card
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const COMMITTEE_ORDER = [
  "audit committee",
  "nomination and remuneration committee",
  "nomination & remuneration committee",
  "stakeholder relationship committee",
  "stakeholders relationship committee",
  "corporate social responsibility",
  "corporate social responsibility committee",
  "risk management committee",
  "ipo committee",
];

const normalizeCommitteeTitle = (title = "") =>
  title
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getCommitteeOrder = (title = "") => {
  const normalized = normalizeCommitteeTitle(title);
  const index = COMMITTEE_ORDER.indexOf(normalized);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
};

import { API_BASE_URL } from "../../lib/api";

const Governance = () => {
  const [activeTab, setActiveTab] = useState("board");
  const [governanceData, setGovernanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredMember, setHoveredMember] = useState(null);

  const { heroSrc, heroHeading } = usePageHero(
    "corporate-governance",
    "Corporate Governance",
  );

  const brandColor = "#292C44";
  const mainHeadingFont =
    "font-['Helvetica','Arial',sans-serif] text-2xl lg:text-[37px] font-semibold";

  const getImageUrl = (url) => {
    if (!url || !url.includes("drive.google.com")) return url;
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}=s1000`;
    }
    return url;
  };

  useEffect(() => {
    const fetchGovernance = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/governance`,
        );
        setGovernanceData(response.data);
      } catch (error) {
        console.error("Error fetching governance data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGovernance();
  }, []);

  // 1. BOARD OF DIRECTORS RENDERER (Staggered Fade-Up)
  const renderBoard = () => {
    const boardDoc = governanceData.find((item) => item.slug === "board");
    const members = boardDoc?.content || [];

    return (
      <>
        <SEO
          title="Board of Directors | Corporate Governance | Renny Strips"
          description="Meet the Renny Strips Board of Directors driving corporate governance, compliance, transparency, and strategic growth."
          keywords="Renny Strips board of directors, corporate governance, management team, steel company leadership, investor governance, directors and committee"
          url="https://rennystrips.com/corporate-governance"
          image={heroSrc}
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {members.map((member) => (
            <motion.div
              key={member._id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onMouseEnter={() => setHoveredMember(member._id)}
              onMouseLeave={() => setHoveredMember(null)}
              className="flex items-center gap-5 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow cursor-default"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0 bg-gray-50">
                <img
                  src={getImageUrl(member.img)}
                  alt={member.name}
                  width={400}
                  height={400}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    hoveredMember === member._id ? "grayscale-0" : "grayscale"
                  }`}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=292C44&color=fff`;
                  }}
                />
              </div>
              <div>
                <h4 className="text-[18px] font-bold text-gray-900 leading-tight">
                  {member.name}
                </h4>
                <p className="text-[14px] text-gray-500 mt-1 font-medium">
                  {member.designation}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </>
    );
  };

  // 2. COMMITTEES RENDERER (Slide-in from Left)
  const renderCommittee = () => {
    const committeeDoc = governanceData.find(
      (item) => item.slug === "committee",
    );
    const members = committeeDoc?.content || [];
    const grouped = members.reduce((acc, item) => {
      const title = item.committeeTitle || "Other Committee";
      if (!acc[title]) acc[title] = [];
      acc[title].push(item);
      return acc;
    }, {});

    const orderedTitles = Object.keys(grouped).sort(
      (a, b) => getCommitteeOrder(a) - getCommitteeOrder(b),
    );

    return (
      <>
        <SEO
          title="Board Committee Composition | Corporate Governance | Renny Strips"
          description="Explore the committee composition of the Board at Renny Strips including director roles, governance structure, compliance oversight, and management responsibilities."
          keywords="Renny Strips committee composition, board committee, corporate governance committee, directors committee, governance structure, audit committee, management board"
          url="https://rennystrips.com/corporate-governance"
          image={heroSrc}
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-8"
        >
          {orderedTitles.map((title, i) => {
            const sortedMembers = [...grouped[title]].sort((a, b) => {
              const aIsChairman = a.position?.trim().toLowerCase() === "chairman";
              const bIsChairman = b.position?.trim().toLowerCase() === "chairman";

              if (aIsChairman !== bIsChairman) {
                return aIsChairman ? -1 : 1;
              }

              return (a.name || "").localeCompare(b.name || "");
            });

            return (
              <motion.div
                key={`${title}-${i}`}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
                }}
                className="p-8 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <h3 className="text-[16px] font-bold mb-6 text-[#292C44] border-b border-gray-200 pb-3 tracking-wide uppercase">
                  {title}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[14px]">
                    <thead>
                      <tr className="text-gray-400 font-medium">
                        <th className="pb-4 pr-4">Name of Director</th>
                        <th className="pb-4 pr-4">Position</th>
                        <th className="pb-4">Designation</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {sortedMembers.map((m) => (
                        <tr key={m._id} className="border-t border-gray-200/60">
                          <td className="py-4 pr-4 font-semibold">{m.name}</td>
                          <td
                            className={`py-4 pr-4 font-medium ${m.position?.trim().toLowerCase() === "chairman" ? "text-blue-600" : ""}`}
                          >
                            {m.position}
                          </td>
                          <td className="py-4 italic text-gray-500">
                            {m.designation}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </>
    );
  };

  // 3. INVESTOR CONTACT RENDERER (Scale & Fade Pop)
  const renderContact = () => {
    const contactDoc = governanceData.find((item) => item.slug === "contact");
    const contacts = contactDoc?.content || [];

    return (
      <>
        {" "}
        <SEO
          title="Board Committee Composition | Corporate Governance | Renny Strips"
          description="Explore the committee composition of the Board at Renny Strips including director roles, governance structure, compliance oversight, and management responsibilities."
          keywords="Renny Strips committee composition, board committee, corporate governance committee, directors committee, governance structure, audit committee, management board"
          url="https://rennystrips.com/corporate-governance"
          image={heroSrc}
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-8"
        >
          {contacts.map((contact) => (
            <motion.div
              key={contact._id}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
              }}
              className="p-10 bg-[#292C44] text-white rounded-2xl shadow-xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-1">{contact.name}</h3>
                <p className="text-[15px] opacity-80 mb-6 font-medium">
                  {contact.designation}
                </p>
                <p className="text-[15px] font-bold mb-6">
                  {contact.companyName}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-white/10">
                  <div>
                    <h5 className="text-[12px] uppercase tracking-widest opacity-60 mb-2">
                      Direct Contact
                    </h5>
                    <a
                      href={`mailto:${contact.email}`}
                      className="block text-[16px] font-semibold hover:text-blue-400 transition-colors"
                    >
                      {contact.email}
                    </a>
                    <a
                      href={`tel:${contact.phone?.replace(/\s+/g, "")}`}
                      className="block text-[16px] font-semibold mt-1 hover:text-blue-400 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                  <div>
                    <h5 className="text-[12px] uppercase tracking-widest opacity-60 mb-2">
                      Office Address
                    </h5>
                    <p className="text-[14px] leading-relaxed opacity-90 whitespace-pre-line">
                      {contact.officeAddress}
                    </p>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"
              />
            </motion.div>
          ))}
        </motion.div>
      </>
    );
  };

  return (
    <>
      {" "}
      <SEO
        title="Board Committee Composition | Corporate Governance | Renny Strips"
        description="Explore the committee composition of the Board at Renny Strips including director roles, governance structure, compliance oversight, and management responsibilities."
        keywords="Renny Strips committee composition, board committee, corporate governance committee, directors committee, governance structure, audit committee, management board"
        url="https://rennystrips.com/corporate-governance"
        image={heroSrc}
      />
      <div className="font-['Helvetica','Arial',sans-serif] bg-white min-h-screen">
        {/* Banner */}
        <motion.section
          className="relative h-[50vh] md:h-[100vh] w-full overflow-hidden mb-12"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          {heroSrc && (
            <img
              key={heroSrc}
              src={heroSrc}
              alt="Corporate Governance Banner"
              width={1920}
              height={1080}
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

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

        <section className="pt-20 pb-32 px-6">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="col-span-1 lg:col-span-8">
              <div
                className="inline-block text-white px-5 py-1.5 rounded-md mb-6 font-semibold text-[13px] tracking-wide"
                style={{ backgroundColor: brandColor }}
              >
                INVESTOR RELATIONS
              </div>
              <h2 className={`${mainHeadingFont} mb-12 text-gray-900`}>
                Governance Overview
              </h2>

              <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-100 pb-2">
                {GOVERNANCE_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-6 py-3 rounded-t-lg text-[14px] font-bold transition-all relative ${activeTab === tab.key ? "text-[#292C44]" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    {tab.label}
                    {activeTab === tab.key && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#292C44]"
                      />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  {isLoading ? (
                    <div className="p-20 text-center flex flex-col items-center">
                      <div className="w-10 h-10 border-4 border-gray-200 border-t-[#292C44] rounded-full animate-spin mb-4" />
                      <p className="text-gray-400 animate-pulse">
                        Fetching Records...
                      </p>
                    </div>
                  ) : (
                    <>
                      {activeTab === "board" && renderBoard()}
                      {activeTab === "committee" && renderCommittee()}
                      {activeTab === "contact" && renderContact()}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <aside className="col-span-1 lg:col-span-4">
              <InvestorSidebar />
            </aside>
          </div>
        </section>
      </div>
    </>
  );
};

export default Governance;
