// ========== Imports ==========
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from 'react';
import axios from 'axios';
import { Link, Links } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ========== Components ==========
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import scaffoldingSchema from '../../schema/scaffoldingSchema';
// import ProductEnquiryModal from "../../components/ProductEnquiryModal";
const ProductEnquiryModal = lazy(
  () => import('../../components/ProductEnquiryModal')
);

// ========== Hooks ==========
import usePageHero from '../../hooks/usePageHero';

// ========== Assets ==========
import coreStrength1 from '../../assets/core-strength-7-1.webp';
import coreStrength2 from '../../assets/core-strength-8-1.webp';
import coreStrength3 from '../../assets/core-strength-9-1.webp';
import coreStrength4 from '../../assets/core-strength-10-1.webp';
import coreStrength5 from '../../assets/core-strength-11-1.webp';
import coreStrength6 from '../../assets/core-strength-12-1.webp';

import Application1 from '../../assets/Application15-1.webp';
import Application2 from '../../assets/Application16-1.webp';
import Application3 from '../../assets/Application17-1.webp';
import Application4 from '../../assets/Application18-1.webp';
import Application5 from '../../assets/Application19-1.webp';
import Application6 from '../../assets/Application20-1.webp';

import manufacturingProcess from '../../assets/manufacturingProcess-6.webp';
import manufacturingProcess_Mobile from '../../assets/manufacturingProcess-6-Mobile.webp';

import img3 from '../../assets/imgg.webp';
import img3_Mobile from '../../assets/imgg-Mobile.webp';

import Information from '../../assets/Information5-1.webp';

import CBAM from '../../assets/CBAM.webm';

import video from '../../assets/newsvideo.webm';

import bannerVideo from '../../assets/Scaffolding.webm';
import bannerPoster from '../../assets/ScaffoldingBanner.webp';
import bannerPoster_Mobile from '../../assets/ScaffoldingBanner_Mobile.webp';

import mobileview from '../../assets/MobileMediaVideo.webm';

import product1 from '../../assets/productRange1-Coupler.webp';
import product2 from '../../assets/productRange2-Jack.webp';
import product3 from '../../assets/productRange3-Nuts.webp';
import product4 from '../../assets/productRange4-Tube.webp';
import product5 from '../../assets/productRange5-Edge protection system & barriers.webp';
import product6 from '../../assets/productRange6-Formwork accessories.webp';
import product7 from '../../assets/productRange7-Formwork panel.webp';
import product8 from '../../assets/productRange8-Props and shoring systems at work.webp';
import product9 from '../../assets/productRange9- scaffolding system.webp';
import product10 from '../../assets/productRange10-fastner.webp';
import product11 from '../../assets/productRange11-ringlock system.jpg.webp';
import product12 from '../../assets/productRange12-cuplock system.jpg.webp';
import product13 from '../../assets/productRange13-frame scaffolding.webp';
import product14 from '../../assets/productRange14-silver_kwikstage.webp';
import product15 from '../../assets/productRange15-access tower.webp';
import { API_BASE_URL } from '../../lib/api';

const imageZoom = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: 'easeOut' },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};
const scaleFade = {
  hidden: { opacity: 0, scale: 0.92, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
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
      ease: 'easeOut',
    },
  },
};

const tabs = [
  'MANUFACTURING PROCESS',
  'PRODUCT SPECIFICATIONS & RANGE',
  'CORE STRENGTH',
  'APPLICATIONS',
];

const cards = [
  {
    img: coreStrength1,
    title: 'High Strength & Load Capacity',
    desc: 'Manufactured from high-grade steel to withstand heavy loads and ensure structural stability.',
    bg: 'bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white',
  },
  {
    img: coreStrength2,
    title: 'Precision Engineering',
    desc: 'Accurate machining and modular design ensure perfect fit, secure joints, and easy on-site assembly',
    bg: 'bg-white hover:bg-blue',
    textHover: 'group-hover:text-white',
  },
  {
    img: coreStrength3,
    title: 'Corrosion-Resistant Durability',
    desc: 'Galvanized and weather-resistant finish ensures long life even in harsh site conditions.',
    bg: 'bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white',
  },
  {
    img: coreStrength4,
    title: 'Universal Compatibility',
    desc: 'Designed to fit most scaffolding and formwork systems across diverse construction applications.',
    bg: 'bg-white hover:bg-blue',
    textHover: 'group-hover:text-white',
  },
  {
    img: coreStrength5,
    title: 'Efficient & Reusable',
    desc: 'Quick-lock assembly, ergonomic design, and reusable components improve site efficiency and reduce labor.',
    bg: 'bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white',
  },
  {
    img: coreStrength6,
    title: 'Certified & Customizable',
    desc: 'Tested to international standards (EN, AS, ISO) with custom solutions available for specific project needs.',
    bg: 'bg-white hover:bg-blue',
    textHover: 'group-hover:text-white',
  },
];
const products = [
  { title: 'Scaffolding System', image: product9 },
  { title: 'Formwork Panel', image: product7 },
  { title: 'Props And Shoring Systems', image: product8 },
  { title: 'Jack', image: product2 },
  { title: 'Coupler', image: product1 },
  { title: 'Nuts', image: product3 },
  { title: 'Tube', image: product4 },
  { title: 'Edge Protection System & Barriers', image: product5 },
  { title: 'Formwork Accessories', image: product6 },
  { title: 'Fastner', image: product10 },
  { title: 'Ringlock Systems', image: product11 },
  { title: 'Cuplock Systems', image: product12 },
  { title: 'Frame Scaffolding', image: product13 },
  { title: 'Kwikstage Systems', image: product14 },
  { title: 'Access Towers', image: product15 },
];

const fadeUpSection = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

const Scaffolding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [fetchedData, setFetchedData] = useState({
    products: [],
  });
  const [pageData, setPageData] = useState(null);
  const { heroSrc, heroHeading } = usePageHero(
    'scaffolding',
    'Scaffolding & Formwork System',
    bannerVideo
  );
  const displayRange =
    fetchedData.range?.length > 0 && fetchedData.range[0].image
      ? fetchedData.range
      : products;

  const fetchData = useCallback(async () => {
    try {
      const baseURL = API_BASE_URL;
      const res = await axios.get(`${baseURL}/api/product-content/scaffolding`);
      if (res.data && res.data.success) {
        setPageData(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching scaffolding page data:', err);
    }
  }, []);

  useEffect(() => {
    const onPageLoaded = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(fetchData);
      } else {
        setTimeout(fetchData, 1000);
      }
    };

    if (document.readyState === 'complete') {
      onPageLoaded();
    } else {
      window.addEventListener('load', onPageLoaded);
    }

    return () => {
      window.removeEventListener('load', onPageLoaded);
    };
  }, []);

  const displayDescription = useMemo(
    () =>
      pageData?.description?.length > 0 && pageData.description[0].trim() !== ''
        ? pageData.description
        : [
            'Renny Strips is one of India’s few fully integrated manufacturers of scaffolding and formwork systems producing everything from the raw steel billet to the final engineered component under one roof. With over 1,000 SKUs spanning multiple scaffolding systems, formwork panels, shoring solutions, and accessories, we serve construction projects of every scale and complexity.',
            'Our scaffolding and formwork products are engineered for safety, speed of assembly, and reusability, making them the preferred choice for contractors, rental companies, and infrastructure developers.',
          ],
    [pageData?.description]
  );

  const displayHighlightsImg = pageData?.highlightsImage || img3;
  const displayHighlights = useMemo(
    () =>
      pageData?.highlights?.length > 0 &&
      (typeof pageData.highlights[0] === 'string'
        ? pageData.highlights[0].trim() !== ''
        : pageData.highlights[0]?.text?.trim() !== '')
        ? pageData.highlights.map((item) =>
            typeof item === 'string' ? { text: item } : item
          )
        : [
            { text: 'Complete Backward Integration' },
            { text: '1,000+ \n SKUs' },
            { text: 'Engineered for Safety' },
            { text: 'Rapid \n Assembly' },
            { text: 'Reusable \n And Durable' },
            { text: 'ISO & CE \n Certified' },
          ],
    [pageData?.highlights]
  );

  const displayManufacturingImg =
    pageData?.manufacturingImage || manufacturingProcess;
  const displayManufacturingDesc = useMemo(
    () =>
      pageData?.manufacturingProcess?.length > 0 &&
      pageData.manufacturingProcess[0].trim() !== ''
        ? pageData.manufacturingProcess
        : [
            'The scaffolding and formwork manufacturing process at Renny Strips showcases the full power of our backward integration. Raw materials are melted in our induction furnaces to produce MS billets. These billets are hot-rolled into wire rods or HR coils, which are then processed further depending on the end product.',
            'For tubular components (scaffold tubes, props, jack bodies), HR coils are slit and formed into ERW pipes at our pipe mill. For forged components (couplers, jacks, fasteners), wire rods or steel blanks are forged, press-formed, cast, or machined at our fabrication unit (Unit III). Formwork panels are fabricated from steel plates and sections, welded, and finished to precise dimensional tolerances.',
            'Every component from a simple wing nut to a complete ringlock system is manufactured with steel whose chemistry and mechanical properties we control from the melt stage. This is a level of integration few scaffolding manufacturers in India can match.',
          ],
    [pageData?.manufacturingProcess]
  );

  const displayCards = useMemo(
    () =>
      pageData?.coreStrengths?.length > 0 &&
      pageData.coreStrengths[0]?.title?.trim() !== ''
        ? pageData.coreStrengths
        : cards,
    [pageData?.coreStrengths]
  );

  const displaySpecs = useMemo(
    () =>
      pageData?.specifications?.length > 0 &&
      pageData.specifications[0]?.parameter?.trim() !== ''
        ? pageData.specifications
        : [
            {
              parameter: 'Quality Management System',
              details: 'ISO 9001:2015',
            },
            {
              parameter: 'Structural Steel CE Marking (EXC 2)',
              details: 'EN 1090-1:2009 + A1:2011',
            },
            {
              parameter: 'Welding Certificate for Structural Steel Execution',
              details: 'EN 1090-2:2018 + A1:2024',
            },
            {
              parameter: 'Welding Process Inspection',
              details: 'EN ISO 3834-2',
            },
            {
              parameter:
                'Environmental Management for manufacture and export of pipes, tubes, scaffolding and formwork accessories',
              details: 'ISO 14001:2015',
            },
            {
              parameter:
                'Occupational Health & Safety for manufacture and export of pipes, tubes, scaffolding and formwork accessories',
              details: 'ISO 45001:2018',
            },
          ],
    [pageData?.specifications]
  );

  const displayApps = useMemo(
    () =>
      pageData?.applications?.length > 0 &&
      pageData.applications[0]?.label?.trim() !== ''
        ? pageData.applications
        : [
            { img: Application1, label: 'High-Rise Construction' },
            { img: Application2, label: 'Infrastructure Projects' },
            { img: Application3, label: 'Industrial Construction' },
            { img: Application4, label: 'Formwork for Concrete' },
            { img: Application5, label: 'Maintenance & Access' },
            { img: Application6, label: 'Events & Temporary Structures' },
          ],
    [pageData?.applications]
  );

  return (
    <>
      <SchemaMarkup schema={scaffoldingSchema} />
      <SEO
        title="Green Scaffolding & Formwork Manufacturer in India | Renny"
        description="Renny is a fully integrated manufacturer of scaffolding and formwork systems in India, delivering green steel solutions for safe, durable construction."
        keywords="scaffolding, formwork, scaffolding materials, scaffold towers"
        url="https://rennystrips.com/scaffolding-formwork"
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
          displayDescription={displayDescription}
          displayHighlights={displayHighlights}
          displayHighlightsImg={displayHighlightsImg}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
        />
        {/* ================= TABS SECTION ================= */}
        <section className="w-full py-12 px-4 sm:px-6 md:px-20 min-h-screen">
          {/* Tabs - Now includes horizontal scroll on mobile for better UX */}
          <motion.div
            className="flex overflow-x-auto no-scrollbar md:flex-wrap md:justify-center gap-4 mb-10 pb-2 md:pb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            {tabs.map((tab, index) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`px-5 py-3 font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-blue border-b-2 border-blue'
                    : 'text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-black'
                }`}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>

          {/* Tab Content Container (Keeps all sections mounted simultaneously) */}
          <div className="w-full">
            <ManufacturingTab
              displayManufacturingImg={displayManufacturingImg}
              displayManufacturingDesc={displayManufacturingDesc}
              containerVariants={containerVariants}
              slideLeft={slideLeft}
              slideRight={slideRight}
              activeTab={activeTab}
            />

            <CoreStrengthTab
              displayCards={displayCards}
              cards={cards}
              sectionVariants={sectionVariants}
              fadeUp={fadeUp}
              activeTab={activeTab}
            />

            <ProductSpecificationTab
              displayRange={displayRange}
              displaySpecs={displaySpecs}
              containerVariants={containerVariants}
              fadeUp={fadeUp}
              activeTab={activeTab}
            />

            <ApplicationsTab
              displayApps={displayApps}
              containerVariants={containerVariants}
              fadeUp={fadeUp}
              activeTab={activeTab}
            />
          </div>
        </section>
        {/* ================= CBAM SECTION ================= */}
        <CBAMSection
          CBAM={CBAM}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
        />

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
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
      const handleLoad = () => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => setLoadVideo(true));
        } else {
          setTimeout(() => setLoadVideo(true), 1000);
        }
      };

      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
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
        {loadVideo &&
        heroSrc &&
        (heroSrc.endsWith('.webm') || heroSrc.endsWith('.mp4')) ? (
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
              srcSet={
                heroSrc &&
                !(heroSrc.endsWith('.webm') || heroSrc.endsWith('.mp4'))
                  ? heroSrc
                  : bannerPoster
              }
              width="1440"
              height="800"
              type="image/webp"
            />
            {/* Mobile Poster */}
            <img
              src={
                heroSrc &&
                !(heroSrc.endsWith('.webm') || heroSrc.endsWith('.mp4'))
                  ? heroSrc
                  : bannerPoster_Mobile
              }
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
    mt-6 mr-5
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
          {/* <Link to="/scaffolding-brochure">
            <button
              className="
    mt-6
    inline-flex
    items-center
    gap-2
    px-6
    py-3
    rounded-xl
    
    bg-blue/15
    backdrop-blur-md
    border
    border-white/30
    
    text-white
    font-medium
    text-sm
    tracking-wide
    
    shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]
    shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)]
    transition-all
    duration-300
    
    hover:bg-white/25
    hover:border-white/40
    hover:-translate-y-0.5
    hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
    active:translate-y-0
  "
            >
              Download Brochure
            </button>
          </Link> */}
        </div>
        <Suspense fallback={null}>
          <ProductEnquiryModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            productName={heroHeading}
          />
        </Suspense>
      </motion.section>
    );
  }
);

const ProductIntro = React.memo(
  ({
    pageData,
    displayDescription,
    displayHighlights,
    displayHighlightsImg,
    containerVariants,
    itemVariants,
  }) => {
    return (
      <>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .scaffolding-highlights-bg {
            background-image: url('${img3_Mobile || displayHighlightsImg}');
          }
          @media (min-width: 768px) {
            .scaffolding-highlights-bg {
              background-image: url('${displayHighlightsImg}');
            }
          }
        `,
          }}
        />
        <section className="bg-white">
          {/* ================= WHITE INTRO SECTION ================= */}
          <div className="bg-white text-black pt-10 pb-10">
            <div className="px-6 md:px-20">
              <motion.p
                className="text-[32px] text-blue md:text-[48px] font-bold w-full text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                {pageData?.title || 'Scaffolding & Formwork System'}
                <div className="w-36 sm:w-24 md:w-170 h-0.5 bg-blue mx-auto rounded-full mb-8 md:mb-10" />
              </motion.p>

              <motion.div
                className="mx-auto md:text-left"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <div className="font-bold text-md">
                  <p>
                    {pageData?.capacity || 'Annualised Capacity: 14,520 MTPA'}
                  </p>
                </div>
                {displayDescription.map((desc, idx) => (
                  <span
                    key={idx}
                    className="block text-gray-600 text-md font-normal mt-2"
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
              className="relative w-full min-h-[60vh] flex items-center min-[879px]:items-end justify-center py-12 md:py-0 scaffolding-highlights-bg bg-cover bg-center bg-scroll md:bg-fixed rounded-[30px] md:rounded-[60px] overflow-hidden"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {/* Dark Overlay - Transitioning from solid to gradient for desktop */}
              <div className="absolute inset-0 bg-black/50 min-[879px]:bg-gradient-to-t min-[879px]:from-black/80 min-[879px]:to-transparent" />

              {/* Content Container: Flex-col for mobile, Flex-row for 879px+ */}
              <div className="relative z-20 flex flex-col min-[879px]:flex-row items-center min-[879px]:items-end justify-center gap-10 min-[879px]:gap-0 px-6 pb-12 min-[879px]:pb-20 w-full">
                {displayHighlights.map((highlight, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className={`
            flex items-center justify-center min-[879px]:items-start h-full w-full min-[879px]:w-auto
            /* Border Right only on 879px+ for all items */
            min-[879px]:border-r-2 lg:min-[879px]:border-r-4 border-blue-500
            text-white px-6
          `}
                  >
                    <p className="text-[18px] md:text-[20px] lg:text-[24px] font-bold  text-center min-[879px]:text-left w-full min-[879px]:max-w-[200px] whitespace-pre-line drop-shadow-lg">
                      {highlight.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        </section>
      </>
    );
  }
);

{
  /* MANUFACTURING PROCESS */
}
const ManufacturingTab = React.memo(
  ({
    displayManufacturingImg,
    displayManufacturingDesc,
    containerVariants,
    slideLeft,
    slideRight,
    activeTab,
  }) => {
    return (
      <div
        className={activeTab === 'MANUFACTURING PROCESS' ? 'block' : 'hidden'}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={slideLeft} className="w-full">
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
          </motion.div>

          <motion.div variants={slideRight} className="space-y-4">
            {displayManufacturingDesc.map((desc, idx) => (
              <p
                key={idx}
                className="text-gray-600 text-sm md:text-base text-justify md:text-left"
              >
                {desc}
              </p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }
);

{
  /* CORE STRENGTH */
}
const CoreStrengthTab = React.memo(
  ({ displayCards, cards, sectionVariants, fadeUp, activeTab }) => {
    return (
      <div className={activeTab === 'CORE STRENGTH' ? 'block' : 'hidden'}>
        <motion.div
          className="w-full max-w-7xl mx-auto rounded-xl overflow-hidden border border-gray-100 shadow-sm"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Responsive Grid: 1 col (mobile), 2 col (tablet), 3 col (desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {displayCards.map((card, i) => (
              <motion.div
                key={card._id || i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className={`flex flex-col items-center justify-center p-8 transition-all duration-300 group text-center min-h-[280px] ${
                  i % 2 === 0
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white'
                    : 'bg-white hover:bg-blue hover:text-white'
                }`}
              >
                <img
                  src={card.img || cards[i % cards.length]?.img}
                  alt={card.title}
                  loading="lazy"
                  decoding="async"
                  width="80"
                  height="80"
                  className="w-16 h-16 md:w-20 md:h-20 mb-4 transition duration-300 group-hover:brightness-0 group-hover:invert"
                />
                <h2 className="font-bold text-lg md:text-xl mb-2">
                  {card.title}
                </h2>
                <p className="text-sm md:text-base opacity-90 px-4">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }
);

{
  /* PRODUCT SPECIFICATIONS & RANGE */
}
const ProductSpecificationTab = React.memo(
  ({ displayRange, displaySpecs, containerVariants, fadeUp, activeTab }) => {
    return (
      <>
        <div
          className={
            activeTab === 'PRODUCT SPECIFICATIONS & RANGE' ? 'block' : 'hidden'
          }
        >
          {/* ================= SCROLLING PRODUCTS ================= */}

          <section className="w-full bg-white">
            <div className="w-full overflow-hidden">
              <div className="flex w-max animate-scroll gap-6">
                {[...displayRange, ...displayRange].map((product, index) => (
                  <div
                    key={`${product._id || product.title}-${index}`}
                    className="relative w-[260px] h-[200px] rounded-2xl overflow-hidden group cursor-pointer flex-shrink-0"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      decoding="async"
                      width="260"
                      height="200"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 flex items-end justify-center bg-black/40 z-10 text-center px-4">
                      <h2 className="text-white text-lg md:text-xl mb-5 font-semibold break-words text-center">
                        {product.title}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= TABLE ================= */}
          <section className="text-black pb-14 max-w-7xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-gray-600 text-sm mt-10 md:text-base mb-8 px-2"
            >
              Over 1,000 SKUs ranging from couplers, ringlock systems, formwork
              panels, props, and jacks amongst others in various specifications.
              Detailed specification sheets available on request.
            </motion.p>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[700px] text-left border-collapse">
                <thead>
                  <tr className="bg-blue text-white">
                    <th className="w-1/3 px-6 py-4 text-base md:text-lg font-semibold">
                      Parameter
                    </th>
                    <th className="px-6 py-4 text-base md:text-lg font-semibold border-l border-white/20">
                      Details
                    </th>
                  </tr>
                </thead>

                <motion.tbody
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {displaySpecs.map((spec, index) => (
                    <motion.tr
                      key={spec._id || index}
                      variants={fadeUp}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <th
                        className={`px-6 py-4 ${
                          index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                        } font-bold text-gray-700 text-sm md:text-base`}
                      >
                        {spec.parameter}
                      </th>
                      <td className="px-6 py-4 text-gray-600 text-sm md:text-base">
                        {spec.details}
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          </section>
        </div>
      </>
    );
  }
);

{
  /* APPLICATIONS */
}
const ApplicationsTab = React.memo(
  ({ displayApps, containerVariants, fadeUp, activeTab }) => {
    return (
      <div className={activeTab === 'APPLICATIONS' ? 'block' : 'hidden'}>
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 justify-items-center">
            {displayApps.map((item, index) => (
              <motion.div
                key={item._id || index}
                variants={fadeUp}
                className="flex flex-col items-center group w-full"
              >
                <div className="relative w-full aspect-square max-w-[180px] flex flex-col items-center justify-center rounded-2xl bg-gray-50 transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:shadow-xl border border-transparent group-hover:border-blue/20">
                  <div className="w-16 h-16 md:w-20 md:h-20 mb-3 flex items-center justify-center">
                    <img
                      src={item.img}
                      alt={item.label}
                      loading="lazy"
                      decoding="async"
                      width="80"
                      height="80"
                      className="w-full h-full object-contain group-hover:drop-shadow-md"
                    />
                  </div>
                  <p className="text-center font-bold text-xs md:text-sm text-gray-800 px-2 group-hover:text-blue">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }
);

const CBAMSection = React.memo(({ CBAM, containerVariants, itemVariants }) => {
  return (
    <section className="bg-white min-h-screen w-full py-12 px-4 sm:px-6 md:px-20">
      <motion.h2
        className="text-[28px] sm:text-[32px] text-blue md:text-[48px] font-bold w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        CBAM Benefit
        {/* Responsive Underline */}
        <div className="w-20 sm:w-24 md:w-48 h-1 bg-blue mx-auto rounded-full mt-2 mb-8 md:mb-10" />
      </motion.h2>

      {/* Video Container - Changed h-[90vh] to an aspect-ratio approach for mobile */}
      <div className="w-full md:h-[90vh] rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
        <video
          src={CBAM}
          width="1920"
          height="1080"
          preload="none"
          className="w-full h-auto aspect-video lg:aspect-auto lg:h-full object-fill shadow-lg rounded-3xl lg:rounded-4xl"
          muted={true}
          loop={true}
          autoPlay={true}
          playsInline={true}
        />
      </div>

      {/* ================= SPOTLIGHT SECTION ================= */}
      <section className="flex items-center justify-center w-full">
        <div className="relative min-h-[400px] md:h-[500px] lg:h-[550px] w-full mt-10 md:mt-20 rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl">
          {/* Video Background */}
          <video
            preload="none"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-fill z-0"
          >
            <source src={video} media="(min-width: 768px)" type="video/webm" />
            <source src={mobileview} type="video/webm" />
          </video>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10" />

          {/* Content Wrapper - FIXED: Changed 'relative' to 'absolute inset-0' */}
          <div className="absolute inset-0 z-20 flex items-center justify-center p-6 md:p-16">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              /* Added max-w-[85%] and px-[15%] for mobile to shrink the box. 
       Used items-center to keep the flex items aligned.
    */
              className="space-y-4 md:space-y-6 w-full max-w-[90%] md:max-w-full px-[15px] sm:px-[60px] md:px-0 flex flex-col items-center justify-center"
            >
              <motion.h2
                variants={itemVariants}
                /* Reduced text size slightly for mobile to prevent overflow with the high padding */
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center tracking-tight"
              >
                89% cost saving
              </motion.h2>

              <motion.p
                variants={itemVariants}
                /* text-center centers the lines. 
         text-justify handles the spacing within lines.
         max-w-md on mobile ensures the box stays "smaller".
      */
                className="text-white/90 text-center text-justify-center text-sm sm:text-base md:text-lg  max-w-md md:max-w-2xl mx-auto font-medium"
              >
                Comparing raw material alone compared to default value.
                <span className="block mt-2 text-white/70 text-xs sm:text-sm md:text-base italic text-center">
                  Considering GHG Duty (in Euro) @75 €/Certificate
                </span>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>
    </section>
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

export default Scaffolding;
