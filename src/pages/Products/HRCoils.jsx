// ========== Imports ==========
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../../components/SEO";
import SchemaMarkup from "../../components/SchemaMarkup";
import narrowHrCoilSchema from "../../schema/narrowHrCoilSchema";
// import ProductEnquiryModal from "../../components/ProductEnquiryModal";

const ProductEnquiryModal = lazy(
  () => import("../../components/ProductEnquiryModal"),
);

// ========== Hooks ==========
import usePageHero from "../../hooks/usePageHero";

// ========== Assets ==========
import banner from "../../assets/HR Coil.webm";
import bannerPoster from "../../assets/HR_Banner.webp";

import coreStrength1 from "../../assets/core-strength-7-1.webp";
import coreStrength2 from "../../assets/core-strength-8-1.webp";
import coreStrength3 from "../../assets/core-strength-9-1.webp";
import coreStrength4 from "../../assets/core-strength-10-1.webp";
import coreStrength5 from "../../assets/core-strength-11-1.webp";
import coreStrength6 from "../../assets/core-strength-12-1.webp";

import Application1 from "../../assets/Application6-1.webp";
import Application2 from "../../assets/Application7-1.webp";
import Application3 from "../../assets/Application8-1.webp";
import Application4 from "../../assets/Application88-1.webp";
import Application5 from "../../assets/Application888-1.webp";

import manufacturingProcess from "../../assets/manufacturingProcess-3.webp";

import img3 from "../../assets/HR-Coil-scaled.webp";
import img3_Mobile from "../../assets/HR-Coil-scaled-Mobile.webp";

import Information from "../../assets/Information3-1.webp";

import { API_BASE_URL } from "../../lib/api";

const tabs = [
  "MANUFACTURING PROCESS",
  "PRODUCT SPECIFICATIONS",
  "CORE STRENGTH",
  "APPLICATIONS",
];

const cards = [
  {
    img: coreStrength1,
    title: "Fully Automated Rolling",
    desc: "Manufactured in automated hot rolling mills ensuring accurate dimensions, superior finish, and consistent mechanical properties.",
    bg: "bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white",
  },
  {
    img: coreStrength2,
    title: "Stringent Quality Control",
    desc: "Subjected to dimensional, mechanical, and chemical testing for compliance with Indian and global standards.",
    bg: "bg-white hover:bg-blue",
    textHover: "group-hover:text-white",
  },
  {
    img: coreStrength3,
    title: "Superior Surface & Strength",
    desc: "Delivers high tensile strength, excellent surface quality, and precise thickness control for demanding applications",
    bg: "bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white",
  },
  {
    img: coreStrength4,
    title: "Customized Grades",
    desc: "Available in tailored grades with required strength, ductility, weldability, and formability",
    bg: "bg-white hover:bg-blue",
    textHover: "group-hover:text-white",
  },
  {
    img: coreStrength5,
    title: "Cost-Effective Performance",
    desc: "Offers high performance at competitive pricing, ideal for large-scale and value-driven applications",
    bg: "bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white",
  },
  {
    img: coreStrength6,
    title: "Versatile Use & Reliable Supply",
    desc: "Used across construction, automotive, fabrication, and engineering, backed by consistent supply and timely delivery.",
    bg: "bg-white hover:bg-blue",
    textHover: "group-hover:text-white",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const imageZoom = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const HRCoils = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [pageData, setPageData] = useState(null);
  const { heroSrc, heroHeading } = usePageHero(
    "hr-coils",
    "Narrow Width HR Coils",
    banner,
  );

  const fetchData = useCallback(async () => {
    try {
      const baseURL = API_BASE_URL;
      const res = await axios.get(`${baseURL}/api/product-content/hr-coils`);
      if (res.data && res.data.data) {
        setPageData(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching page data:", err);
    }
  }, []);

  useEffect(() => {
    const onPageLoaded = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(fetchData);
      } else {
        setTimeout(fetchData, 1000);
      }
    };

    if (document.readyState === "complete") {
      onPageLoaded();
    } else {
      window.addEventListener("load", onPageLoaded);
    }

    return () => {
      window.removeEventListener("load", onPageLoaded);
    };
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayCapacity = useMemo(() => {
    return pageData?.capacity || "Annualised Capacity: 97,222 MTPA";
  }, [pageData?.capacity]);

  const displayDescription = useMemo(() => {
    return pageData?.description &&
      pageData.description.length > 0 &&
      pageData.description[0].trim() !== ""
      ? pageData.description
      : [
          "Renny Strips produces narrow-width Hot-Rolled (HR) coils at its integrated manufacturing facility. Our 4 High- hot rolling mill is equipped with advanced Gauge Control technology, delivering precise thickness control and consistent surface quality that matches the performance of wider primary HR coils.",
          "Our HR coils are sold to prominent tube and solar structure manufactures and also consumed in-house as feedstock for ERW pipe and tube production, ensuring a captive, reliable supply chain.",
        ];
  }, [pageData?.description]);
  const displayHighlightsImg = useMemo(() => {
    return pageData?.highlightsImage || img3;
  }, [pageData?.highlightsImage, img3]);

  const displayHighlights = useMemo(() => {
    return pageData?.highlights &&
      pageData.highlights.length > 0 &&
      pageData.highlights[0]?.text?.trim() !== ""
      ? pageData.highlights
      : [
          { text: "In-House Production" },
          { text: "Uniform thickness" },
          { text: "Narrow Width Specialist" },
          { text: "Consistent \n Quality" },
          { text: "BIS \n Certified" },
        ];
  }, [pageData?.highlights]);

  const displayManufacturingImg = useMemo(() => {
    return pageData?.manufacturingImage || manufacturingProcess;
  }, [pageData?.manufacturingImage, manufacturingProcess]);

  const displayManufacturingDesc = useMemo(() => {
    return pageData?.manufacturingProcess &&
      pageData.manufacturingProcess.length > 0 &&
      pageData.manufacturingProcess[0].trim() !== ""
      ? pageData.manufacturingProcess
      : [
          "HR coil production begins with MS billets (or blooms/slabs) produced at our in-house steel melting shop. These semi-finished products are reheated to rolling temperatures and passed through a series of roughing and finishing stands at our hot rolling mill. The HAGC system continuously monitors and adjusts roll gaps in real-time, ensuring the strip maintains exact thickness targets throughout the rolling process.",
          "After rolling, the strip is cooled on a controlled run-out table and coiled at the downcoiler. The finished HR coils are inspected for dimensional accuracy, surface quality, and mechanical properties before being dispatched either to our own ERW pipe mills or to external customers.",
          "This billet-to-coil integration gives Renny Strips a distinct cost and quality advantage. We control the steel grade, chemistry, and rolling parameters end-to-end, enabling us to produce coils tailored precisely to the downstream application.",
        ];
  }, [pageData?.manufacturingProcess]);

  const displayCards = useMemo(() => {
    return pageData?.coreStrengths &&
      pageData.coreStrengths.length > 0 &&
      pageData.coreStrengths[0]?.title?.trim() !== ""
      ? pageData.coreStrengths
      : cards;
  }, [pageData?.coreStrengths, cards]);

  const displaySpecs = useMemo(() => {
    return pageData?.specifications &&
      pageData.specifications.length > 0 &&
      pageData.specifications[0]?.parameter?.trim() !== ""
      ? pageData.specifications
      : [
          { parameter: "Thickness Range", details: "1.3 mm to 5.00 mm" },
          {
            parameter: "Width Range",
            details: "As per downstream requirement (narrow width)",
          },
          { parameter: "Grades", details: "YS235-YS460, E250, E350" },
          { parameter: "Standards", details: "IS 2062:2011, IS 10748:2004" },
        ];
  }, [pageData?.specifications]);

  const displayAppIntro = pageData?.applicationsIntro || null;

  const displayApps = useMemo(() => {
    return pageData?.applications &&
      pageData.applications.length > 0 &&
      pageData.applications[0]?.label?.trim() !== ""
      ? pageData.applications
      : [
          { img: Application1, label: "Tube Manufacturing" },
          { img: Application2, label: "Scaffolding & Formwork Systems" },
          { img: Application3, label: "Automotive Components" },
          { img: Application4, label: "Furniture Fabrication" },
          { img: Application5, label: "Construction Hardware" },
        ];
  }, [
    pageData?.applications,
    Application1,
    Application2,
    Application3,
    Application4,
    Application5,
  ]);


  return (
    <>
      {" "}
      <SchemaMarkup schema={narrowHrCoilSchema} />
      <SEO
        title="Hot Rolled Coils (HR Coils) Manufacturer in India | Renny Strips"
        description="Looking for a trusted HR coils manufacturer in India? Renny Strips produces narrow-width Hot-Rolled (HR) coils engineered for strength and durability."
        keywords="hot rolled coil, hr coil, hrc steel, hot rolled sheet"
        url="https://rennystrips.com/narrow-hrcoil"
        image={heroSrc}
      />
      <div className="relative w-full overflow-x-hidden font-helvetica">
        {/* ================= BANNER SECTION ================= */}
        <HeroBanner
          heroSrc={heroSrc}
          bannerPoster={bannerPoster}
          heroHeading={heroHeading}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          ProductEnquiryModal={ProductEnquiryModal}
          imageZoom={imageZoom}
          fadeUp={fadeUp}
        />

        {/* ================= INTRO SECTION ================= */}
        <ProductIntro
          pageData={pageData}
          displayCapacity={displayCapacity}
          displayDescription={displayDescription}
          displayHighlights={displayHighlights}
          displayHighlightsImg={displayHighlightsImg}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
        />
        {/* ================= TABS SECTION ================= */}
        <section className="w-full py-12 px-4 sm:px-6 md:px-20 min-h-screen">
          {/* Tabs - Mobile Scrollable & Centered on Desktop */}
          <div className="flex overflow-x-auto no-scrollbar md:justify-center gap-4 mb-10 border-b border-gray-100 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab
                    ? "text-blue border-b-2 border-blue"
                    : "text-gray-500 border-b-2 border-transparent hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content Container (All tabs stay mounted) */}
          <div className="w-full">
            <ManufacturingTab
            displayManufacturingImg={displayManufacturingImg}
            displayManufacturingDesc={displayManufacturingDesc}
            activeTab = {activeTab}
          />

          <CoreStrengthTab
            displayCards={displayCards}
            cards={cards}
            sectionVariants={sectionVariants}
            fadeUp={fadeUp}
            activeTab = {activeTab}
          />

          <ProductSpecificationsTab displaySpecs={displaySpecs} activeTab = {activeTab}/>

           <ApplicationsTab
            displayAppIntro={displayAppIntro}
            displayApps={displayApps}
            fadeUp={fadeUp}
            activeTab = {activeTab}
          />  
            
            </div>
        </section>

        {/* ================= Get Detailed Information ================= */}
        <GetDetailedInformation Information={Information} />
      </div>
    </>
  );
};

const HeroBanner = React.memo(
  ({
    heroSrc,
    bannerPoster,
    heroHeading,
    isModalOpen,
    setIsModalOpen,
    ProductEnquiryModal,
    imageZoom,
    fadeUp,
  }) => {
    const [loadVideo, setLoadVideo] = useState(false);

    useEffect(() => {
      const handleLoad = () => {
        if ("requestIdleCallback" in window) {
          requestIdleCallback(() => setLoadVideo(true));
        } else {
          setTimeout(() => setLoadVideo(true), 1000);
        }
      };

      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }, []);

    return (
      <>
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageZoom}
          className="relative h-[100vh] w-full overflow-hidden mb-10"
        >
          {loadVideo && heroSrc &&
          (heroSrc.endsWith(".webm") || heroSrc.endsWith(".mp4")) ? (
            <video
              key={heroSrc}
              src={heroSrc}
              poster={bannerPoster}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              width="1440"
              height="800"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <img
              key={heroSrc || "fallback"}
              src={heroSrc && !(heroSrc.endsWith(".webm") || heroSrc.endsWith(".mp4")) ? heroSrc : bannerPoster}
              alt="Hero Banner"
              width="1440"
              height="800"
              fetchPriority="high"
              decoding="async"
              loading="eager"
              sizes="(max-width: 768px) 100vw, 90vw"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Optional Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="absolute bottom-10 left-6 md:left-10 z-10">
            <motion.h1
              variants={fadeUp}
              className="text-white text-4xl md:text-7xl font-bold max-w-4xl"
            >
              {heroHeading}
            </motion.h1>

            <button
              onClick={() => setIsModalOpen(true)}
              className="
    mt-6
    inline-flex
    items-center
    gap-2
    px-6
    py-3
    rounded-xl
    
    /* Glassmorphism Core */
    bg-blue/15
    backdrop-blur-md
    border
    border-white/30
    
    /* Text & Icon Color */
    text-white
    font-medium
    text-sm
    tracking-wide
    
    /* Effects & Transitions */
    shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]
    shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)]
    transition-all
    duration-300
    
    /* Hover & Active States */
    hover:bg-white/25
    hover:border-white/40
    hover:-translate-y-0.5
    hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
    active:translate-y-0
  "
            >
              Request a Quote
            </button>
          </div>

          {isModalOpen && (
            <Suspense fallback={null}>
              <ProductEnquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productName={heroHeading}
              />
            </Suspense>
          )}
        </motion.section>
      </>
    );
  },
);

const ProductIntro = React.memo(
  ({
    pageData,
    displayCapacity,
    displayDescription,
    displayHighlights,
    displayHighlightsImg,
    containerVariants,
    itemVariants,
  }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <>
        <section className="bg-white">
          {/* ================= INTRO SECTION ================= */}
          <section className="bg-white">
            {/* ================= WHITE INTRO SECTION ================= */}
            <div className="bg-white text-black py-10 md:py-16">
              <div className="px-6 md:px-20 max-w-7xl mx-auto">
                <motion.h2
                  className="text-[28px] sm:text-[36px] md:text-[48px] text-blue font-bold w-full text-center leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                >
                  {pageData?.title || "Narrow Width HR Coils"}
                  {/* Responsive underline width */}
                  <div className="w-3/4 sm:w-1/2 md:w-3/4 lg:w-full max-w-[400px] h-1 bg-blue mx-auto rounded-full mt-4 mb-8 md:mb-10" />
                </motion.h2>

                <motion.div
                  className="text-center md:text-left"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="font-bold text-lg md:text-xl text-gray-900 mb-6">
                    <p>{displayCapacity}</p>
                  </div>

                  <div className="space-y-4">
                    {displayDescription.map((desc, idx) => (
                      <p
                        key={idx}
                        className="text-gray-600 text-sm md:text-base lg:text-lg font-normal leading-relaxed text-justify md:text-left"
                      >
                        {desc}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ================= WINDOW (IMAGE SECTION) ================= */}
            <section className="px-4 md:px-10 lg:px-20 pb-10">
              <motion.div
                className="relative w-full min-h-[50vh] flex items-center min-[879px]:items-end justify-center py-10 md:py-0 bg-cover bg-center bg-scroll md:bg-fixed rounded-[30px] md:rounded-[60px] overflow-hidden"
                style={{
                  backgroundImage: `url('${isMobile && img3_Mobile ? img3_Mobile : displayHighlightsImg}')`
                }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                {/* Dark overlay: Fixed for mobile readability, gradient for desktop */}
                <div className="absolute inset-0 bg-black/40 min-[879px]:bg-transparent min-[879px]:bg-gradient-to-t min-[879px]:from-black/60 min-[879px]:to-transparent" />

                {/* Responsive Flex Wrapper */}
                <div className="relative z-20 flex flex-col min-[879px]:flex-row items-center min-[879px]:items-end justify-center gap-8 min-[879px]:gap-0 px-6 min-[879px]:pb-20 w-full">
                  {displayHighlights.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className={`
            flex items-center justify-center min-[879px]:items-start h-full w-full min-[879px]:w-auto
            /* Border Right: Appears on every item ONLY on screens larger than 878px */
            min-[879px]:border-r-4 border-blue-highlight
            text-white px-6
          `}
                    >
                      <p className="text-[18px] md:text-[20px] lg:text-[22px] font-bold leading-tight text-center min-[879px]:text-left w-full min-[879px]:max-w-[180px] whitespace-pre-line">
                        {highlight.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          </section>
        </section>
      </>
    );
  },
);

{
  /* MANUFACTURING PROCESS */
}
const ManufacturingTab = React.memo(
  ({ displayManufacturingImg, displayManufacturingDesc, activeTab }) => {
    return (
      <div
              className={
                activeTab === "MANUFACTURING PROCESS" ? "block" : "hidden"
              }
            >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
        <div className="w-full">
          <img
            src={displayManufacturingImg}
            alt="Manufacturing Process"
            width="665"
            height="532"
            className="w-full h-auto rounded-xl shadow-lg object-cover aspect-video md:aspect-auto"
          />
        </div>
        <div className="space-y-4">
          {displayManufacturingDesc.map((desc, idx) => (
            <p
              key={idx}
              className="text-gray-600 text-sm md:text-base leading-relaxed text-justify md:text-left"
            >
              {desc}
            </p>
          ))}
        </div>
      </div>
      </div>
    );
  },
);

{
  /* CORE STRENGTH */
}
const CoreStrengthTab = React.memo(
  ({ displayCards, cards, sectionVariants, fadeUp, activeTab }) => {
    return (
      <div className={activeTab === "CORE STRENGTH" ? "block" : "hidden"}>
      <motion.div
        className="w-full max-w-7xl mx-auto rounded-xl overflow-hidden border border-gray-100"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {displayCards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`flex flex-col items-center text-center p-8 transition-all duration-300 group min-h-[250px] justify-center ${
                i % 2 === 0
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white"
                  : "bg-white hover:bg-blue hover:text-white"
              }`}
            >
              <img
                src={card.img || cards[i % cards.length]?.img}
                alt=""
                width="64"
                height="64"
                className="w-16 h-16 mb-4 transition duration-300 group-hover:brightness-0 group-hover:invert"
              />
              <h2 className="font-bold text-lg md:text-xl mb-2">
                {card.title}
              </h2>
              <p className="text-sm md:text-base leading-snug opacity-90 px-2">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      </div>
    );
  },
);

{
  /* PRODUCT SPECIFICATIONS */
}
const ProductSpecificationsTab = React.memo(({ displaySpecs,activeTab }) => {
  return (
    <div
              className={
                activeTab === "PRODUCT SPECIFICATIONS" ? "block" : "hidden"
              }
            >
    <div className="max-w-7xl mx-auto py-6">
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue text-white">
              <th className="px-6 py-4 font-semibold text-base md:text-lg">
                Parameter
              </th>
              <th className="px-6 py-4 font-semibold text-base md:text-lg border-l border-blue-400">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displaySpecs.map((spec, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <th className="px-6 py-4 bg-gray-50/50 font-bold text-gray-700 text-sm md:text-base w-1/3">
                  {spec.parameter}
                </th>
                <td className="px-6 py-4 text-gray-600 text-sm md:text-base">
                  {spec.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
});

{
  /* APPLICATIONS */
}
const ApplicationsTab = React.memo(
  ({ displayAppIntro, displayApps, fadeUp,activeTab }) => {
    return (
      <div className={activeTab === "APPLICATIONS" ? "block" : "hidden"}> 
      <div className="max-w-7xl mx-auto space-y-10">
        {displayAppIntro && (
          <p className="text-gray-600 text-sm md:text-lg leading-relaxed text-justify md:text-left">
            {displayAppIntro}
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 justify-items-center">
          {displayApps.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="flex flex-col items-center group w-full"
            >
              <div className="relative w-full aspect-square max-w-[180px] flex flex-col items-center justify-center rounded-2xl bg-gray-50 transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:shadow-xl border border-transparent group-hover:border-blue/20">
                <div className="w-16 h-16 md:w-20 md:h-20 mb-3">
                  <img
                    src={item.img}
                    alt={item.label}
                    width="80"
                    height="80"
                    className="w-full h-full object-contain group-hover:drop-shadow-md"
                    style={
                      item.scale ? { transform: `scale(${item.scale})` } : {}
                    }
                  />
                </div>

                <p className="text-center font-bold text-xs md:text-sm text-gray-800 px-2 group-hover:text-blue">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    );
  },
);

const GetDetailedInformation = React.memo(({ Information }) => {
  return (
    <section className="bg-blue text-white w-full py-12 md:py-20 px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden">
      {/* LEFT CONTENT */}
      <div className="flex-1 text-center lg:text-left">
        <motion.h2
          className="text-[1.75rem] md:text-[2.5rem] font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get Detailed Information
          <div className="w-52 md:w-72 lg:w-96 h-0.5 bg-white rounded-full mt-2 mx-auto lg:mx-0" />
        </motion.h2>

        <p className="text-sm md:text-base leading-7 text-gray-100 max-w-2xl mx-auto lg:mx-0">
          Looking for more information? We’re here to help. Reach out and get
          all the answers you need.
        </p>

        <Link
          to="/contact-us"
          className="inline-block px-8 py-3 md:py-4 hover:text-white bg-gray-400 text-black rounded-full mt-6 md:mt-8 font-medium hover:scale-105 transition"
        >
          Contact Us
        </Link>
      </div>

      {/* RIGHT IMAGE */}
      <div className="flex-1 w-full flex justify-center lg:justify-end">
        <img
          src={Information}
          alt="Detailed product information"
          width="559"
          height="447"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="
               w-full
               max-w-md
               lg:max-w-xl
               h-64
               md:h-80
               lg:h-[30rem]
               object-cover
               rounded-2xl
               md:rounded-3xl
             "
        />
      </div>
    </section>
  );
});

export default HRCoils;
