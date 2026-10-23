// ========== Imports ==========
import React, {
  useState,
  useEffect,
  useCallback,
  lazy,
  Suspense,
  useMemo,
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ========== Hooks ==========
import usePageHero from "../../hooks/usePageHero";

// ========== Components ==========
import SEO from "../../components/SEO";
import SchemaMarkup from "../../components/SchemaMarkup";
import wireRodsSchema from "../../schema/wireRodsSchema";

// ========== Assets ==========
import banner from "../../assets/Wire-rod.webm";
import banner_Mobile from "../../assets/Wire-rod-Mobile.webm";
import bannerPoster from "../../assets/wireRodPoster.webp";
import bannerPoster_Mobile from "../../assets/wireRodPoster-Mobile.webp";
// import ProductEnquiryModal from "../../components/ProductEnquiryModal";

import Application1 from "../../assets/Application1-1.webp";
import Application2 from "../../assets/Application2-1.webp";
import Application3 from "../../assets/Application3-1.webp";
import Application4 from "../../assets/Application4-1.webp";
import Application5 from "../../assets/Application5-1.webp";

import manufacturingProcess from "../../assets/manufacturingProcess-2.webp";
import manufacturingProcess_Mobile from "../../assets/manufacturingProcess-2-Mobile.webp";

import img3 from "../../assets/wire2.webp";

import Information from "../../assets/Information2-1.webp";

import coreStrength1 from "../../assets/core-strength-1.webp";
import coreStrength2 from "../../assets/core-strength-2.webp";
import coreStrength3 from "../../assets/core-strength-3.webp";
import coreStrength4 from "../../assets/core-strength-4.webp";
import coreStrength5 from "../../assets/core-strength-5.webp";
import coreStrength6 from "../../assets/core-strength-6.webp";

import { API_BASE_URL } from "../../lib/api";

const ProductEnquiryModal = lazy(
  () => import("../../components/ProductEnquiryModal"),
);

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

const cards = [
  {
    img: coreStrength1,
    title: "Advanced Automated Manufacturing",
    desc: "Produced in high-speed automated wire rod mills, ensuring precise dimensions, superior surface finish, and consistent metallurgical quality for critical applications",
    bg: "bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white",
  },
  {
    img: coreStrength2,
    title: "Real-Time Quality Control",
    desc: "Equipped with automated monitoring and inspection systems to deliver tight tolerances, minimal variation, and consistent performance.",
    bg: "bg-white hover:bg-blue",
    textHover: "group-hover:text-white",
  },
  {
    img: coreStrength3,
    title: "Uniform Metallurgy",
    desc: "Manufactured through controlled rolling processes for uniform grain structure and chemical consistency, enhancing machinability and formability",
    bg: "bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white",
  },
  {
    img: coreStrength4,
    title: "High Strength & Ductility",
    desc: "Offers high tensile strength, excellent elongation, and superior ductility, ideal for load-bearing and high-stress applications.",
    bg: "bg-white hover:bg-blue",
    textHover: "group-hover:text-white",
  },
  {
    img: coreStrength5,
    title: "Strict Quality Compliance",
    desc: "Tested through mechanical, chemical, and dimensional checks, ensuring compliance with national and international standards",
    bg: "bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white",
  },
  {
    img: coreStrength6,
    title: "Multi-Industry Applications",
    desc: "Widely used in construction, automotive, fasteners, welding, and engineering sectors, delivering precision, strength, and reliability.",
    bg: "bg-white hover:bg-blue",
    textHover: "group-hover:text-white",
  },
];
const imageZoom = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};
const tabs = [
  "MANUFACTURING PROCESS",
  "PRODUCT SPECIFICATIONS",
  "CORE STRENGTH",
  "APPLICATIONS",
];

const WireRods = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [pageData, setPageData] = useState(null);
  const { heroSrc, heroHeading } = usePageHero(
    "wire-rods",
    "Wire Rods",
    banner,
  );

  const fetchData = useCallback(async () => {
    try {
      const baseURL = API_BASE_URL;
      const res = await axios.get(`${baseURL}/api/product-content/wire-rods`);
      if (res.data && res.data.data) {
        setPageData(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching page data:", err);
    }
  });

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

  const displayCapacity =
    pageData?.capacity || "Annualised Capacity: 77,778 MTPA";
  const displayDescription = useMemo(
    () =>
      pageData?.description &&
      pageData.description.length > 0 &&
      pageData.description[0].trim() !== ""
        ? pageData.description
        : [
            "Renny Strips manufactures mild steel wire rods from in-house MS billets through its integrated wire rod mill. Wire rods serve as a critical intermediate product used both captively for downstream manufacturing (scaffolding components, fasteners) and sold externally to wire drawing units, nail manufacturers, and general engineering fabricators. Our wire rods are produced with controlled chemistry and consistent mechanical properties, making them suitable for a wide range of general engineering applications.",
          ],
    [pageData?.description],
  );
  const displayHighlightsImg = pageData?.highlightsImage || img3;
  const displayHighlights = useMemo(
    () =>
      pageData?.highlights &&
      pageData.highlights.length > 0 &&
      pageData.highlights[0]?.text?.trim() !== ""
        ? pageData.highlights
        : [
            { text: "Integrated Production" },
            { text: "Wide Diameter Range" },
            { text: "Multiple \n Grades" },
            { text: "Consistent Mechanical Properties" },
            { text: "BIS \n Certified" },
          ],
    [pageData?.highlights],
  );
  const displayManufacturingImg =
    pageData?.manufacturingImage || manufacturingProcess;
  const displayManufacturingDesc = useMemo(
    () =>
      pageData?.manufacturingProcess &&
      pageData.manufacturingProcess.length > 0 &&
      pageData.manufacturingProcess[0].trim() !== ""
        ? pageData.manufacturingProcess
        : [
            "Wire rod production at Renny Strips starts at the steel melting shop, where raw materials are melted in induction furnaces to produce MS billets of controlled chemistry. These billets hot rolled into wire rod, where they pass through a series of roughing, intermediate, and finishing stands that progressively reduce the cross-section to the target wire rod diameter.",
            "Because we produce both the billet and the wire rod in-house, we can precisely control the carbon content, manganese levels, and other alloying elements to match the requirements of specific end applications whether it’s a soft wire for drawing or a harder grade for fastener manufacturing.",
          ],
    [pageData?.manufacturingProcess],
  );
  const displayCards = useMemo(
    () =>
      pageData?.coreStrengths &&
      pageData.coreStrengths.length > 0 &&
      pageData.coreStrengths[0]?.title?.trim() !== ""
        ? pageData.coreStrengths
        : cards,
    [pageData?.coreStrengths],
  );
  const displaySpecs = useMemo(
    () =>
      pageData?.specifications &&
      pageData.specifications.length > 0 &&
      pageData.specifications[0]?.parameter?.trim() !== ""
        ? pageData.specifications
        : [
            { parameter: "Diameter Range", details: "5.50 mm to 28.00 mm" },
            {
              parameter: "Grades",
              details: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 4M, 6M, 7M, 8M",
            },
            { parameter: "Standards", details: "IS 7887:1992" },
          ],
    [pageData?.specifications],
  );
  const displayAppIntro = pageData?.applicationsIntro || " ";
  const displayApps = useMemo(
    () =>
      pageData?.applications &&
      pageData.applications.length > 0 &&
      pageData.applications[0]?.label?.trim() !== ""
        ? pageData.applications
        : [
            { img: Application1, label: "Wire Drawing" },
            { img: Application2, label: "Fastener Manufacturing" },
            { img: Application3, label: "Construction" },
            { img: Application4, label: "General Engineering" },
            { img: Application5, label: "In-House Use" },
          ],
    [pageData?.applications],
  );



  return (
    <>
      <SchemaMarkup schema={wireRodsSchema} />
      <SEO
        title="Steel Wire Rod Manufacturer in India | Wire Rod | Renny Strips"
        description="Renny Strips manufactures mild steel wire rods in India with superior surface finish, strength, and reliable performance across industries."
        keywords="wire rod, steel wire rod, wire rod manufacturer"
        url="https://rennystrips.com/wire-rods"
        image={heroSrc}
      />

      <div className="relative w-full overflow-x-hidden font-helvetica">
        {/* ================= BANNER SECTION ================= */}
        <HeroBanner
          heroSrc={heroSrc}
          banner_Mobile={banner_Mobile}
          bannerPoster={bannerPoster}
          bannerPoster_Mobile={bannerPoster_Mobile}
          heroHeading={heroHeading}
          imageZoom={imageZoom}
          fadeUp={fadeUp}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          ProductEnquiryModal={ProductEnquiryModal}
        />
        {/* ================= INTRO SECTION ================= */}
        <ProductIntro
          pageData={pageData}
          displayCapacity={displayCapacity}
          displayDescription={displayDescription}
          displayHighlightsImg={displayHighlightsImg}
          displayHighlights={displayHighlights}
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

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ManufacturingProcess
                displayManufacturingImg={displayManufacturingImg}
                manufacturingProcess_Mobile={manufacturingProcess_Mobile}
                displayManufacturingDesc={displayManufacturingDesc}
                activeTab={activeTab}
              />

          <CoreStrength
            displayCards={displayCards}
            cards={cards}
            sectionVariants={sectionVariants}
            fadeUp={fadeUp}
            activeTab={activeTab}
          />

          <ProductSpecifications displaySpecs={displaySpecs} activeTab={activeTab}/>

          <Applications
            displayAppIntro={displayAppIntro}
            displayApps={displayApps}
            fadeUp={fadeUp}
            activeTab={activeTab} 
          />
              
            </motion.div>
          </AnimatePresence>
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
    banner_Mobile,
    bannerPoster,
    bannerPoster_Mobile,
    heroHeading,
    imageZoom,
    fadeUp,
    isModalOpen,
    setIsModalOpen,
    ProductEnquiryModal,
  }) => {
    const [loadVideo, setLoadVideo] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

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
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={imageZoom}
        className="relative h-[100vh] w-full overflow-hidden mb-10"
      >
        {loadVideo && ((heroSrc && (heroSrc.endsWith(".webm") || heroSrc.endsWith(".mp4"))) || (banner_Mobile && (banner_Mobile.endsWith(".webm") || banner_Mobile.endsWith(".mp4")))) ? (
          <video
            key={heroSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            width="1440"
            height="800"
            className="absolute inset-0 w-full h-full object-cover"
          >
            {banner_Mobile && <source src={banner_Mobile} media="(max-width: 767px)" type="video/webm" />}
            <source src={heroSrc} type="video/webm" />
          </video>
        ) : (
          <picture className="absolute inset-0 w-full h-full block">
            {/* Desktop Poster */}
            <source
              media="(min-width: 768px)"
              srcSet={heroSrc && !(heroSrc.endsWith(".webm") || heroSrc.endsWith(".mp4")) ? heroSrc : bannerPoster}
              width="1440"
              height="800"
              type="image/webp"
            />
            {/* Mobile Poster */}
            <img
              src={heroSrc && !(heroSrc.endsWith(".webm") || heroSrc.endsWith(".mp4")) ? heroSrc : bannerPoster_Mobile}
              alt="Hero Banner Poster"
              width="900"
              height="500"
              fetchpriority="high"
              decoding="async"
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </picture>
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
    );
  },
);

const ProductIntro = React.memo(
  ({
    pageData,
    displayCapacity,
    displayDescription,
    displayHighlightsImg,
    displayHighlights,
    containerVariants,
    itemVariants,
  }) => {
    return (
      <section className="bg-white">
        {/* ================= WHITE INTRO SECTION ================= */}
        <div className="bg-white text-black py-10 md:py-16">
          <div className="px-6 md:px-20 max-w-7xl mx-auto">
            <motion.p
              className="text-[28px] sm:text-[36px] md:text-[48px] text-blue font-bold w-full text-center "
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              {pageData?.title || "Wire Rods"}
              <div className="w-20 md:w-40 h-1 bg-blue mx-auto rounded-full mt-4 mb-8 md:mb-10" />
            </motion.p>

            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="font-bold text-lg md:text-xl text-gray-900 mb-4">
                <p>{displayCapacity}</p>
              </div>

              <div className="space-y-4">
                {displayDescription.map((desc, idx) => (
                  <p
                    key={idx}
                    className="text-gray-600 text-sm md:text-base lg:text-lg font-normal   md:text-left"
                  >
                    {desc}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================= WINDOW (IMAGE SECTION) ================= */}
        <section className="px-4 md:px-20 pb-10">
          <motion.div
            className="relative w-full min-h-[50vh] flex items-center md:items-end justify-center py-10 md:py-0 bg-cover bg-center bg-scroll md:bg-fixed rounded-[30px] md:rounded-[60px] overflow-hidden"
            style={{
              backgroundImage: `url('${displayHighlightsImg}')`
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {/* Dark Overlay for Mobile Readability */}
            <div className="absolute inset-0 bg-black/40 md:bg-transparent" />

            {/* Changes:
        1. Changed grid-cols-1 for all screens under 878px.
        2. Switched sm:grid-cols-2 to only apply above 878px.
    */}
            <div className="relative z-20 grid grid-cols-1 min-[878px]:flex   min-[878px]:flex-row items-center md:items-end justify-center gap-6 md:gap-4 lg:gap-10 px-3 md:pb-20 w-full">
              {displayHighlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`
            flex items-center md:items-start pr-4 text-white  h-full
            /* Border logic: 
               - Hidden by default (mobile/tablet)
               - Visible only on screens larger than 878px (laptop)
               - Hidden on the last item 
            */
            ${idx !== displayHighlights.length - 1 ? "min-[878px]:border-r-4 border-blue-highlight" : "border-none"}
          `}
                >
                  <p className="text-[18px] md:text-[20px] lg:text-[22px] font-bold  text-center min-[878px]:text-left w-full min-[878px]:max-w-[180px] whitespace-pre-line">
                    {highlight.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </section>
    );
  },
);

{
  /* MANUFACTURING PROCESS */
}
const ManufacturingProcess = React.memo(
  ({ displayManufacturingImg, manufacturingProcess_Mobile, displayManufacturingDesc,activeTab }) => {
    return (
      <>
      <div
              className={
                activeTab === "MANUFACTURING PROCESS" ? "block" : "hidden"
              }
            >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
          <div className="w-full">
            <picture className="w-full h-auto block overflow-hidden rounded-xl shadow-lg">
              {/* Desktop Image */}
              <source
                media="(min-width: 768px)"
                srcSet={displayManufacturingImg}
                width="941"
                height="753"
                type="image/webp"
              />
              {/* Mobile Image */}
              <img
                src={manufacturingProcess_Mobile}
                alt="Manufacturing Process"
                width="665"
                height="532"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover aspect-video md:aspect-auto"
              />
            </picture>
          </div>
          <div className="space-y-4">
            {displayManufacturingDesc.map((desc, idx) => (
              <p
                key={idx}
                className="text-gray-600 text-sm md:text-base  md:text-left"
              >
                {desc}
              </p>
            ))}
          </div>
        </div>
        </div>
      </>
    );
  },
);

{
  /* CORE STRENGTH */
}
const CoreStrength = React.memo(
  ({ displayCards, cards, sectionVariants, fadeUp ,activeTab}) => {
    return (
      <><div className={activeTab === "CORE STRENGTH" ? "block" : "hidden"}>
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
                             alt="Core Strength Image"

                  width="64"
                  height="64"
                  loading="lazy"
                  decoding="async"
                  className="w-16 h-16 mb-4 transition duration-300 group-hover:brightness-0 group-hover:invert"
                />
                <h2 className="font-bold text-lg md:text-xl mb-2">
                  {card.title}
                </h2>
                <p className="text-sm md:text-base  opacity-90 px-2">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        </div>
      </>
    );
  },
);

{
  /* PRODUCT SPECIFICATIONS */
}
const ProductSpecifications = React.memo(({ displaySpecs,activeTab }) => {
  return (
    <>
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
    </>
  );
});

{
  /* APPLICATIONS */
}
const Applications = React.memo(({ displayAppIntro, displayApps, fadeUp,activeTab }) => {
  return (
    <>
    <div className={activeTab === "APPLICATIONS" ? "block" : "hidden"}>
      <div className="max-w-7xl mx-auto space-y-10">
        {displayAppIntro && (
          <p className="text-gray-600 text-sm md:text-lg md:text-left">
            {displayAppIntro}
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
          {displayApps.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="flex flex-col items-center group"
            >
              <div className="relative w-full aspect-square max-w-[180px] flex flex-col items-center justify-center rounded-2xl bg-gray-50 transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:shadow-xl border border-transparent group-hover:border-blue/20">
                <div className="w-16 h-16 md:w-20 md:h-20 mb-3">
                  <img
                    src={item.img}
                    alt={item.label}
                    width="80"
                    height="80"
                    loading="lazy"
                    decoding="async"
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
    </>
  );
});

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

        <p className="text-sm md:text-base  text-gray-100 max-w-2xl mx-auto lg:mx-0">
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

export default WireRods;
