// ========== Imports ==========
import React,{ useState, useEffect, useCallback, Suspense, lazy, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../../components/SEO";
import SchemaMarkup from "../../components/SchemaMarkup";
import erwPipesSchema from "../../schema/erwPipesSchema";

// ========== Hooks ==========
import usePageHero from "../../hooks/usePageHero";

// ========== Assets ==========
import banner from "../../assets/erw.webm";
import bannerPoster from "../../assets/erwPoster.webp";
import bannerPoster_Mobile from "../../assets/erwPoster_Mobile.webp";

import coreStrength1 from "../../assets/core-strength-13-1.webp";
import coreStrengh2 from "../../assets/core-strength-14-1.webp";
import coreStrength3 from "../../assets/core-strength-15-1.webp";
import coreStrength4 from "../../assets/core-strength-16-1.webp";
import coreStrength5 from "../../assets/core-strength-17-1.webp";
import coreStrength6 from "../../assets/core-strength-18-1.webp";

import Application1 from "../../assets/Application9-1.webp";
import Application2 from "../../assets/Application10-1.webp";
import Application3 from "../../assets/Application11-1.webp";
import Application4 from "../../assets/Application12-1.webp";
import Application5 from "../../assets/Application13-1.webp";
import Application6 from "../../assets/Application14-1.webp";

import bannerImg from "../../assets/pipes.webp";

import manufacturingProcess from "../../assets/manufacturingProcess-4.webp";

// import ProductEnquiryModal from "../../components/ProductEnquiryModal";
import Information from "../../assets/Information4-1.webp";
import products1 from "../../assets/product3.webp";
import products2 from "../../assets/product2.webp";
import products3 from "../../assets/product1.webp";
import Information_Mobile from "../../assets/Information4-1-Mobile.webp";
import products1_Mobile from "../../assets/product3-Mobile.webp";
import products2_Mobile from "../../assets/product2-Mobile.webp";
import products3_Mobile from "../../assets/product1-Mobile.webp";

import { API_BASE_URL } from "../../lib/api";

const ProductEnquiryModal = lazy(()=> import("../../components/ProductEnquiryModal"));

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

  const cards = [
    {
      img: coreStrength1,
      title: "Premium MS Black Pipes",
      desc: "Manufactured from high-quality mild steel, ensuring high strength, durability, and long service life for industrial applications",
      bg: "bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white",
    },
    {
      img: coreStrengh2,
      title: "Advanced Manufacturing Precision",
      desc: "Produced using modern processing techniques, delivering consistent dimensions, superior finish, and reliable performance",
      bg: "bg-white hover:bg-blue",
      textHover: "group-hover:text-white",
    },
    {
      img: coreStrength3,
      title: "High-Strength Hollow Sections",
      desc: "Engineered for lightweight construction with high load-bearing capacity, offering enhanced seismic resistance and structural stability.",
      bg: "bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white",
    },
    {
      img: coreStrength4,
      title: "Hot Dip Galvanized Protection",
      desc: "GI pipes are processed with hot dip galvanizing (min. 385 GSM zinc coating) for excellent corrosion resistance and extended lifespan",
      bg: "bg-white hover:bg-blue",
      textHover: "group-hover:text-white",
    },
    {
      img: coreStrength5,
      title: " Performance in Harsh Environments",
      desc: "Designed to withstand humid, coastal, and extreme conditions, providing termite resistance, fire safety, and long-term durability.",
      bg: "bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white",
    },
    {
      img: coreStrength6,
      title: "Versatile Applications & Custom Sizes",
      desc: "Suitable for construction, scaffolding, infrastructure, and engineering, with standard and customized sizes for diverse project needs",
      bg: "bg-white hover:bg-blue",
      textHover: "group-hover:text-white",
    },
  ];

  const tabs = [
    "MANUFACTURING PROCESS",
    "PRODUCT SPECIFICATIONS",
    "CORE STRENGTH",
    "APPLICATIONS",
  ];
  const products = [
    "Renny MS Black Round Pipes",
    "Renny Hollow Section Pipes",
    "Renny GI Pipes & Tubes",
  ];
   const imageZoom = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.18 },
    },
  };

const ERW = () => {

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

 
  const [pageData, setPageData] = useState(null);
  const { heroSrc, heroHeading } = usePageHero(
    "erw-pipes",
    "ERW Pipes & Tubes",
    banner,
  );

  const fetchData = useCallback(async () => {
    try {
        const baseURL = API_BASE_URL;
        const res = await axios.get(`${baseURL}/api/product-content/erw-pipes`);
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
    pageData?.capacity || "Annualised Capacity: 37,476 MTPA";

  const displayDescription = useMemo(
      () =>
    pageData?.description &&
    pageData.description.length > 0 &&
    pageData.description[0].trim() !== ""
      ? pageData.description
      : [
          "Renny Strips manufactures high-quality Electric Resistance Welded (ERW) steel pipes and tubes in square, rectangular, and round configurations. Built from in-house HR coils, every pipe benefits from end- to-end quality control starting from steel melting all the way to the finished product. Our diverse size range and multiple thickness options make these pipes suitable for structural, industrial, and general engineering applications across India.",
        ],[pageData?.description])
  const displayHighlightsImg = pageData?.highlightsImage || bannerImg;
  const displayHighlights = useMemo(
      () =>
    pageData?.highlights &&
    pageData.highlights.length > 0 &&
    pageData.highlights[0]?.text?.trim() !== ""
      ? pageData.highlights
      : [
          { text: "Fully Integrated Supply Chain" },
          { text: "Precision Welding" },
          { text: "Dimensional \n Accuracy" },
          { text: "Versatile \n Range" },
          { text: "BIS \n Certified" },
        ],[pageData?.highlights]);
  const displayManufacturingImg = 
    pageData?.manufacturingImage || manufacturingProcess;
  const displayManufacturingDesc = useMemo(
      () =>
    pageData?.manufacturingProcess &&
    pageData.manufacturingProcess.length > 0 &&
    pageData.manufacturingProcess[0].trim() !== ""
      ? pageData.manufacturingProcess
      : [
          "The manufacturing advantage at Renny Strips lies in full backward integration. The journey begins at our steel melting shop, where raw materials are melted in induction furnaces to produce MS billets. These billets are then hot-rolled into narrow-width HR coils at our in-house rolling mill. The HR coils are subsequently slit and trimmed to precise widths before being fed into our ERW pipe mills.",
          "At the pipe mill, the steel strip is progressively formed into a tubular shape. The longitudinal edges are welded using high-frequency ERW technology, producing a strong, uniform seam. The welded pipes then pass through a sizing mill for final dimensional accuracy. End operations such as beveling, threading, or plain-end finishing are carried out based on customer and application requirements.",
          "This steel-to-pipe integration eliminates dependency on external coil suppliers, gives us complete control over chemistry and mechanical properties, and significantly reduces production costs.",
        ],[pageData?.manufacturingProcess]);
  const displayCards = useMemo(
      () =>
    pageData?.coreStrengths &&
    pageData.coreStrengths.length > 0 &&
    pageData.coreStrengths[0]?.title?.trim() !== ""
      ? pageData.coreStrengths
      : cards,[pageData?.coreStrengths]);
  const displaySpecs = useMemo(
      () =>
    pageData?.specifications &&
    pageData.specifications.length > 0 &&
    pageData.specifications[0]?.parameter?.trim() !== ""
      ? pageData.specifications
      : [
          { parameter: "Thickness Range", details: "1.50 mm to 5.00 mm" },
          { parameter: "Grades", details: "YS235-YS460, E250, E350" },
          {
            parameter: "Square Sections",
            details:
              "50.00 mm x 50.00 mm, 60.00 mm x 60.00 mm, 72.00 mm x 72.00 mm",
          },
          {
            parameter: "Rectangular Sections",
            details:
              "60.00 mm x 40.00 mm, 80.00 mm x 40.00 mm, 96.00 mm x 48.00 mm",
          },
          {
            parameter: "Round Pipes",
            details: "33.7 mm to 88.9 mm outer diameter",
          },
          {
            parameter: "Standards",
            details:
              "IS 4923:2017, IS 18573:2024, IS 1161:2014, IS 1239 Part 1:2004, IS 3601:2006",
          },
        ],[pageData?.specifications])
  const displayAppIntro = pageData?.applicationsIntro || null;
  const displayApps = useMemo(
      () =>
    pageData?.applications &&
    pageData.applications.length > 0 &&
    pageData.applications[0]?.label?.trim() !== ""
      ? pageData.applications
      : [
          { img: Application1, label: "Infrastructure & Construction" },
          { img: Application2, label: "Solar Energy" },
          { img: Application3, label: "Automobile & Engineering" },
          { img: Application4, label: "Furniture & General Fabrication" },
          { img: Application5, label: "Agriculture" },
          { img: Application6, label: "Industrial" },
        ],[pageData?.applications]);



  return (
    <>
      <SchemaMarkup schema={erwPipesSchema} />
      <SEO
        title="ERW Pipes & Tubes Manufacturer in India | Renny Strips"
        description="Renny Strips manufactures high-quality Electric Resistance Welded (ERW) steel pipes and tubes in India with superior strength and consistent dimensions."
        keywords="erw pipe, erw tubes, ms erw pipe, galvanized pipes"
        url="https://rennystrips.com/erw-pipes-and-tubes"
        image={heroSrc}
      />
      <div className="relative w-full overflow-x-hidden font-helvetica">
        {/* ================= BANNER SECTION ================= */}
        <HeroBanner
          heroSrc={heroSrc}
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

          <ProductSpecifications
            displaySpecs={displaySpecs}
            activeTab={activeTab}
          />

          <Applications
          activeTab={activeTab}
            displayAppIntro={displayAppIntro}
            displayApps={displayApps}
            fadeUp={fadeUp}
          />

               
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ================= MORE PRODUCTS SECTION ================= */}
        <MoreProducts products={products} />

        {/* ================= Get Detailed Information ================= */}
        <GetDetailedInformation Information={Information} Information_Mobile={Information_Mobile} />
        
      </div>
    </>
  );
};

const HeroBanner = React.memo(
  ({
    heroSrc,
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
          {loadVideo && heroSrc &&
          (heroSrc.endsWith(".webm") || heroSrc.endsWith(".mp4")) ? (
            <video
              key={heroSrc}
              src={heroSrc}
              
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
    )
  });

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
          <div className="bg-white text-black pt-10 pb-10">
            <div className="px-6 md:px-20">
              <motion.h2
                className="text-[32px] text-blue md:text-[48px] font-bold w-full text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                {pageData?.title || "Vertically Integrated ERW Pipes & Tubes"}
                <div className="w-36 sm:w-24 md:w-100 h-0.5 bg-blue mx-auto rounded-full mb-8 md:mb-10" />
              </motion.h2>

              <motion.div
                className="mx-auto md:text-left"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <div className="font-bold text-md">
                  <p>{displayCapacity}</p>
                </div>
                {displayDescription.map((desc, idx) => (
                  <span
                    key={idx}
                    className="block text-gray-600 text-md font-normal mt-4"
                  >
                    {desc}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ================= WINDOW (IMAGE SECTION) ================= */}
          <section className="px-4 md:px-10 lg:px-20 pb-10">
            <motion.div
              className="relative w-full min-h-[50vh] flex items-center min-[879px]:items-end justify-center py-10 md:py-0 bg-cover bg-center bg-scroll md:bg-fixed rounded-[30px] md:rounded-[60px] overflow-hidden"
              style={{ backgroundImage: `url('${displayHighlightsImg}')` }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {/* Background Overlay */}
              <div className="absolute inset-0 bg-black/50 min-[879px]:bg-black/30 z-0" />

              {/* Responsive Container:
        - flex-col + items-center: stacks in 1 column & centers everything (Mobile/Tablet)
        - min-[879px]:flex-row + items-end: goes horizontal (Laptop/Desktop)
    */}
              <div className="relative z-10 flex flex-col min-[879px]:flex-row items-center min-[879px]:items-end justify-center gap-10 min-[879px]:gap-0 px-6 min-[879px]:pb-20 w-full">
                {displayHighlights.map((highlight, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className={`
            flex items-center justify-center min-[879px]:items-start h-full w-full min-[879px]:w-auto
            /* Border-right: Appears only on laptop screens and larger */
            min-[879px]:border-r-4 border-blue-500
            text-white px-6
          `}
                  >
                    <p className="text-[18px] md:text-[20px] lg:text-[22px] font-bold leading-tight text-center min-[879px]:text-left w-full min-[879px]:max-w-[180px] whitespace-pre-line drop-shadow-md">
                      {highlight.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        </section>
      );
  }
);

{/* MANUFACTURING PROCESS */}
const ManufacturingProcess = React.memo(
  ({ displayManufacturingImg, displayManufacturingDesc, activeTab }) => (
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
          width={1200}
          height={675}
          loading="lazy"
          decoding="async"
          className="w-full h-auto rounded-xl shadow-lg object-cover aspect-video md:aspect-auto"
        />
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
  ));

  {/* CORE STRENGTH */}
  const CoreStrength = React.memo(
  ({ displayCards, cards, sectionVariants, fadeUp , activeTab}) => (
    <>
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
                alt="Core Strength Image"
                width={64}
                height={64}
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
  )
  );

  {/* PRODUCT SPECIFICATIONS */}
  const ProductSpecifications = React.memo(
  ({ displaySpecs, activeTab }) => (
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
                <tr
                  key={idx}
                  className="hover:bg-gray-50 transition-colors"
                >
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
    )
);

{/* APPLICATIONS */}
  const Applications = React.memo(
  ({ displayAppIntro, displayApps, fadeUp, activeTab }) => (
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
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain group-hover:drop-shadow-md"
                    style={
                      item.scale
                        ? { transform: `scale(${item.scale})` }
                        : {}
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
    )
);

const MoreProducts = React.memo(({ products }) => {
  return (
    <section className="w-full py-12 px-6 md:px-20 bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Renny MS Black Round Pipes",
                image: products1,
                mobileImage: products1_Mobile,
              },
              {
                title: "Renny Hollow Section Pipes",
                image: products2,
                mobileImage: products2_Mobile,
              },
              {
                title: "Renny GI Pipes & Tubes",
                image: products3,
                mobileImage: products3_Mobile,
              },
            ].map((product) => (
              <div
                key={product.title}
                className="relative h-[300px] rounded-2xl overflow-hidden group cursor-pointer"
              >
                {/* Background Image */}
                <picture className="absolute inset-0 w-full h-full block overflow-hidden">
                  {/* Desktop Image */}
                  <source
                    media="(min-width: 768px)"
                    srcSet={product.image}
                    width="933"
                    height="525"
                    type="image/webp"
                  />
                  {/* Mobile Image (default) */}
                  <img
                    src={product.mobileImage}
                    alt={product.title}
                    width="933"
                    height="525"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </picture>

                {/* Overlay */}

                {/* Centered Text */}
                <div className="absolute inset-0 flex items-end justify-center bg-black/20 z-10 text-center px-4">
                  <h2 className="text-white text-xl md:text-xl mb-5  font-semibold">
                    {product.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </section>
        );
});

const GetDetailedInformation = React.memo(({ Information, Information_Mobile }) => {
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
              Looking for more information? We’re here to help. Reach out and
              get all the answers you need.
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
            <picture className="w-full max-w-md lg:max-w-xl block overflow-hidden rounded-2xl md:rounded-3xl">
              {/* Desktop Image */}
              <source
                media="(min-width: 768px)"
                srcSet={Information}
                width="637"
                height="510"
                type="image/webp"
              />
              {/* Mobile Image (default) */}
              <img
                src={Information_Mobile}
                alt="Detailed product information"
                loading="lazy"
                decoding="async"
                width="637"
                height="510"
                className="
                 w-full
                 h-64
                 md:h-80
                 lg:h-[30rem]
                 object-cover
               "
              />
            </picture>
          </div>
        </section>
  )});

export default ERW;
