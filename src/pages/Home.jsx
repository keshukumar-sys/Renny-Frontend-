import React, {
  useState,
  useEffect,
  useRef,
  lazy,
  Suspense,
  useCallback,
} from 'react';
// import { motion, useScroll, useSpring } from 'framer-motion';
import { motion } from 'framer-motion';
import { RiArrowDownSLine } from 'react-icons/ri';

import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Added for integration

import HomepageBanner from '../assets/HomepageBanner.webm';
import HeroPoster from '../assets/HeroPoster.webp';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';
import homeSchema from '../schema/homeSchema';

import MS from '../assets/product-1.webp';
import Scaffolding from '../assets/product-2.webp';
import ERW from '../assets/product-3.webp';
import Coil from '../assets/hr-coil.webp';
import rods from '../assets/product-5.webp';
import popup from '../assets/careerPopup2.webp';
import popup_Mobile from '../assets/careerPopup2-Mobile.webp';
import sustainability2 from '../assets/CBAM.webm';

import CountUp from 'react-countup';

import icons1 from '../assets/1a-about.svg';
import icons2 from '../assets/2a-about.svg';
import icons3 from '../assets/3a-about.svg';

import blog1 from '../assets/blog1.webp';
import blog2 from '../assets/blog2.webp';
import blog3 from '../assets/blog3.webp';
import blog4 from '../assets/blog4.webp';
import blog1_Mobile from '../assets/blog1-Mobile.webp';
import blog2_Mobile from '../assets/blog2-Mobile.webp';
import blog3_Mobile from '../assets/blog3-Mobile.webp';
import blog4_Mobile from '../assets/blog4-Mobile.webp';

import { AnimatePresence } from 'framer-motion';
import AboutUs from '../assets/about-3.webp';
import AboutUsMobile from '../assets/about-3-Mobile.webp';
import {
  MdClose,
} from "react-icons/md";
// import MockData
import latestNews from '../data/latestNews.json';
import latestBlogs from '../data/latestBlogs.json';

// import SustainabilitySlider from '../components/SustainabilitySlider';
// import MapPage from './MapPage';
import { buildApiUrl } from '../lib/api';
// import ProductCarousel from '../components/ProductCarousel';

const MapPage = lazy(() => import('./MapPage'));
const SustainabilitySlider = lazy(
  () => import('../components/SustainabilitySlider')
);
const ProductCarousel = lazy(() => import('../components/ProductCarousel'));

// const products = [
//     { title: 'MS Billets', image: MS, link: '/MS-billets' },
//     { title: 'Wire Rods', image: rods, link: '/wire-rods' },
//     { title: 'HR Coils', image: Coil, link: '/narrow-hrcoil' },
//     { title: 'ERW Pipes', image: ERW, link: '/erw-pipes-and-tubes' },
//     {
//       title: 'Scaffolding & Formwork Systems',
//       image: Scaffolding,
//       link: '/scaffolding-formwork',
//     },
//   ];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const listItem = {
  hidden: { x: -20 },
  visible: { opacity: 1, x: 0 },
};
const fadeUp = {
  hidden: { y: 30 },
  visible: { opacity: 1, y: 0 },
};
const scaleFade = {
  hidden: { scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const Home = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  // --- BACKEND INTEGRATION STATES ---
  const [newsData, setNewsData] = useState([]);
  const [activeNews, setActiveNews] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [contentError, setContentError] = useState('');

  const fetchHomeData = useCallback(async () => {
    try {
      const [newsRes, blogsRes] = await Promise.all([
        axios.get(buildApiUrl('/api/news')),
        axios.get(buildApiUrl('/api/blogs')),
      ]);
      // setShowPopup(true); // Show popup after fetching data (Commented out to decouple from API latency)

      const getLatestDate = (item) =>
        new Date(item.publishedAt || item.date || item.createdAt);

      // ================= Latest 5 News =================
      const newsArray = newsRes.data.data || newsRes.data.news || newsRes.data;

      if (Array.isArray(newsArray) && newsArray.length > 0) {
        const latestNews = [...newsArray]
          .sort((a, b) => getLatestDate(b) - getLatestDate(a))
          .slice(0, 5);
        console.log('latestNews: ', latestNews);
        setNewsData(latestNews);
        setActiveNews(latestNews[0]); // newest item
      } else {
        setNewsData([]);
        setActiveNews(null);
      }

      // ================= Latest 5 Blogs =================
      const blogArray =
        blogsRes.data.data || blogsRes.data.blogs || blogsRes.data;

      if (Array.isArray(blogArray) && blogArray.length > 0) {
        const latestBlogs = blogArray.slice(0, 5);
        // console.log("latestBlogs: ",latestBlogs)
        setBlogs(latestBlogs);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error('Error fetching homepage content:', error);
      setContentError('Some homepage content is temporarily unavailable.');
    }
  }, []);

  useEffect(() => {
    let popupTimeoutId;
    const onPageLoaded = () => {
      // Show Hero Video

      // Load News & Blogs

      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          fetchHomeData();
        });
      } else {
        setTimeout(() => {
          fetchHomeData();
        }, 1000);
      }

      // Trigger automatic popup after a predictable delay (800ms) to allow initial paint (LCP) to finish
      const isPrerender = typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap';
      if (!isPrerender) {
        popupTimeoutId = setTimeout(() => {
          setShowPopup(true);
        }, 800);
      }
    };
    // const onPageLoaded = ()=>{
    //   setShowVideo(true);
    //   setNewsData(latestNews);
    //   setActiveNews(latestNews[0]);
    //   setBlogs(latestBlogs);
    // }

    if (document.readyState === 'complete') {
      onPageLoaded();
    } else {
      window.addEventListener('load', onPageLoaded);
    }

    return () => {
      window.removeEventListener('load', onPageLoaded);
      if (popupTimeoutId) {
        clearTimeout(popupTimeoutId);
      }
    };
  }, []);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  // const { ref, inView } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.5,
  // });

  const [openIndex, setOpenIndex] = useState(null);
  const toggleCard = useCallback((index) => {
    setOpenIndex((openIndex) => (openIndex === index ? null : index));
  }, []);

  const [viewKey, setViewKey] = useState(0);
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const containerRef = useRef(null);
  const sustainabilityVideoRef = useRef(null);

  const scrollToNext = () => {
    const nextSection = document.getElementById('next-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <SchemaMarkup schema={homeSchema} />
      <SEO
        title="Green Structural Steel Company in India | Renny Strips"
        description="Renny Strips is a green structural steel company in India delivering low-carbon structural steel solutions for strong, sustainable infrastructure."
        keywords="structural steel company, structural steel manufacturer, green steel, CBAM, structural steel fabricators"
        url="https://rennystrips.com"
        image={HomepageBanner}
      />

      {/* ========== AUTOMATIC POPUP MODAL ========== */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            {/* Click backdrop to close */}
            <div
              className="absolute inset-0"
              onClick={() => setShowPopup(false)}
            />

            {/* Popup Container */}
            {/* Commented out old container to preserve history:
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative z-10 max-w-lg w-full flex items-center justify-center"
            >
            */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative z-10 max-w-lg w-full flex items-center justify-center aspect-[3/2]"
            >
              {/* Close (X) Icon Button */}
              {/* Commented out old close button to keep history:
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#292c44] hover:bg-gray-100 rounded-full transition"
                aria-label="Close modal"
              >
                <MdClose className="text-2xl" />
              </button>
              */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#292c44] hover:bg-gray-100 rounded-full transition z-20"
                aria-label="Close modal"
              >
                <MdClose className="text-2xl" />
              </button>

              {/* Popup Image Only */}
              {/* Commented out old image to keep history:
              <img
                src={popup}
                alt="Popup Announcement"
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
              */}
              <picture className="w-full flex justify-center">
                {/* Commented out old mobile source to keep history:
                <source
                  media="(max-width: 767px)"
                  srcSet={popup}
                  width="1536"
                  height="1024"
                  type="image/webp"
                />
                */}
                <source
                  media="(max-width: 767px)"
                  srcSet={popup_Mobile}
                  width="665"
                  height="443"
                  type="image/webp"
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={popup}
                  width="512"
                  height="314"
                  type="image/webp"
                />
                <img
                  src={popup}
                  alt="Popup Announcement" 
                  width="512"
                  height="314"
                  fetchpriority="high"
                  className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl aspect-[3/2]"
                />
              </picture>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="relative flex flex-col font-helvetica ">
        {/* 1. Banner Section */}
        <HeroSection HomepageBanner={HomepageBanner} HeroPoster={HeroPoster} />

        {/* 2. About Us Section */}
        <AboutSection />

        {/* 3. Our Products Section */}
        <ProductsSection />

        {/* 4. Our Network Section */}
        <NetworkSection
          // inView={inView}
          viewKey={viewKey}
          staggerContainer={staggerContainer}
          listItem={listItem}
        />

        {/* 5. Features Section */}
        <FeaturesSection openIndex={openIndex} toggleCard={toggleCard} />

        {/* 6. News and Investor Section - BACKEND INTEGRATED */}
        <NewsSection
          newsData={newsData}
          activeNews={activeNews}
          setActiveNews={setActiveNews}
          contentError={contentError}
          fadeUp={fadeUp}
          scaleFade={scaleFade}
          staggerContainer={staggerContainer}
          listItem={listItem}
        />

        {/* 7. Sustainability Section */}
        <SustainabilitySection
          sustainabilityVideoRef={sustainabilityVideoRef}
        />

        {/* 8. Blog Section - BACKEND INTEGRATED */}
        <BlogSection blogs={blogs} formatDate={formatDate} />
      </div>
    </>
  );
};

const HeroSection = React.memo(({ HomepageBanner, HeroPoster }) => {
  const [loadVideo, setLoadVideo] = useState(false);
  const videoRef = React.useRef(null);

  useEffect(() => {
    const isPrerender =
      typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap";
    if (isPrerender) return;

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

  useEffect(() => {
    if (loadVideo && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay was prevented:", err);
      });
    }
  }, [loadVideo]);

  return (
    <section className="w-full min-h-screen relative flex items-center py-12 md:py-0 overflow-hidden">
      <div className="w-full flex flex-col nest-hub:flex-row items-center justify-center px-4 md:px-0 gap-6 md:gap-0">
        {/* Left Content */}
        <motion.div
          className="flex flex-col justify-center h-auto ml-0 md:ml-10 mb-2  text-center md:text-left"
          initial={{ opacity: 1, x: -40 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            willChange: 'transform',
          }}
        >
          <h1
            className="
    font-semibold
    text-blue
    font-jost
    leading-tight

    text-[28px]

    iphone-SE:text-[36px]
    iphone-SE:mt-8
    iphone-XR:text-[56px]
    iphone-12pro:text-[50px]
    iphone-14promax:text-[60px]

    samsungGalaxy-S8:text-[45px]
    samsungGalaxy-S20:text-[60px]

    ipad-mini:text-[80px]
    ipad-pro:text-[80px]
    nest-hub:mb-30
    nest-hub:ml-5

  "
          >
            Building <br />
            <span className="font-semibold text-gray-500 bg-clip-text">
              A Future
            </span>
            <br />
            <span className="text-blue">Together</span>
          </h1>
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="w-full mr-0 md:mr-1 max-w-full relative flex flex-col items-start"
          initial={{ opacity: 1, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          style={{
            willChange: 'transform',
          }}
        >
          {/* Video Container - Preserved your hover logic and desktop widths */}
          <div className="w-full flex items-center justify-center mt-4 md:mt-8 pr-0 md:pr-[5%] pl-0 md:pl-[2%]">
            {loadVideo ? (
              <video
                ref={videoRef}
                className="w-[90%] md:w-[600px]  xl:w-[500px] h-48 sm:h-64 md:h-75 md:mt-10
                     ml-0 md:ml-20 mb-4 rounded-2xl md:rounded-4xl object-cover 
                     transition-all duration-700 ease-out 
                     hover:scale-110 lg:hover:w-[calc(100vw-460px)] 
                    "
                src={HomepageBanner}
                poster={HeroPoster}
                width="500"
                height="300"
                autoPlay
                preload="none"
                loop
                muted
                playsInline
                style={{
                  willChange: 'transform',
                }}
              />
            ) : (
              <img
                className="w-[90%] md:w-[600px]  xl:w-[500px] h-48 sm:h-64 md:h-75 md:mt-10
                     ml-0 md:ml-20 mb-4 rounded-2xl md:rounded-4xl object-cover 
                     transition-all duration-700 ease-out 
                     hover:scale-110 lg:hover:w-[calc(100vw-460px)] 
                    "
                src={HeroPoster}
                alt="Homepage Banner Poster"
                width="500"
                height="300"
                fetchpriority="high"
                decoding="async"
                loading="eager"
                style={{
                  willChange: 'transform',
                }}
              />
            )}
          </div>

          <div className="flex flex-col w-full items-center md:items-start nest-hub:items-center nest-hub:justify-center nest-hub:text-center">
            <p
              className="
                  md:text-xl
        text-gray-600
        text-[20px]
        iphone-12pro:text-[22px]
        iphone-14promax:text-[26px]
        ipad-mini:text-[28px]
        iphone-SE:text-[15px]
        ipad-mini:text-center
        ipad-mini:px-10
        nest-hub:text-[22px]
        nest-hub-max:text-2xl
        mt-4 md:mt-8
        mb-4 md:mb-6
        text-center md:text-left
      "
            >
              Renny Strips Limited is a vertically integrated structural steel
              company and certified green steel manufacturer delivering ERW
              Pipes & Tubes, Scaffolding & Formwork Systems, Narrow-Width HR
              Coils, Wire Rods across the globe. Proudly awarded the 
              5-Star Green Steel Manufacturing Rating.
            </p>

            {/* Centered CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:mb-10">
              <Link
                to="/catelogue-download"
                className="w-full sm:w-auto bg-blue text-white px-6 sm:px-7 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1 text-center text-sm sm:text-base whitespace-nowrap"
              >
                Download Brochure
              </Link>

              <Link
                to="https://renny-assets-storage.s3.ap-south-1.amazonaws.com/documents/1770374581565_DRHP.pdf"
                className="w-full sm:w-auto bg-blue text-white px-6 sm:px-7 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1 text-center text-sm sm:text-base whitespace-nowrap"
              >
                Download IPO Documents
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

const AboutSection = React.memo(() => {
  return (
    <>
      <motion.section
        className="flex flex-col h-full items-center justify-center font-helvetica min-h-[100vh] md:h-full overflow-hidden"
        id="next-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: {} }}
      >
        <div className="relative w-full min-h-[100vh] md:h-full overflow-hidden">
          <picture className="absolute inset-0">
            {/* Desktop Image */}
            
            <source
              media="(min-width: 768px)"
              srcSet={AboutUs}
              width="1920"
              height="1080"
              type="image/webp"
            />

            {/* Mobile Image (default) */}
            <img
              src={AboutUsMobile}
              alt="About Us"
              width="796"
              height="448"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </picture>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/80"></div>

          {/* Flex Column Container for Mobile / Centered Flex Layout for Desktop */}
          <div className="absolute inset-0 flex flex-col md:flex md:flex-col md:items-center md:justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 z-10">
            {/* Scrollable Text Wrapper on Mobile / Balanced Centered Container on Desktop */}
            <div className="bg-transparent rounded-xl px-6 py-8 md:px-8 lg:px-12 md:py-6 lg:py-8 max-w-5xl lg:max-w-4xl xl:max-w-5xl w-full text-center flex-1 overflow-y-auto md:flex-none md:overflow-visible mx-auto">
              <motion.h2
                className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-2 lg:mb-3"
                initial={{ y: 30, filter: 'blur(1px)' }}
                whileInView={{ y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                About Renny Strips Ltd.
              </motion.h2>
              <motion.h3
                className="text-xl sm:text-2xl md:text-2xl lg:text-3xl text-white mb-6 lg:mb-8 font-light tracking-wide"
                initial={{ y: 30, filter: 'blur(1px)' }}
                whileInView={{ y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                A Legacy Structural Steel Company Since 1996
              </motion.h3>

              <motion.p
                className="text-sm sm:text-base md:text-base lg:text-lg text-white mb-4 lg:mb-6 leading-relaxed"
                initial={{ y: 30, filter: 'blur(1px)' }}
                whileInView={{ y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                Founded in 1996 by Mr. Binny Gupta and headquartered in
                Ludhiana, Punjab, Renny Strips Limited is one of India's leading
                integrated structural steel companies. With three induction
                furnaces and a melting capacity of{' '}
                <span className="font-bold">199,200 TPA</span>, we leverage
                advanced technologies such as CNC machining and robotic welding
                to deliver precision-engineered steel solutions across India.
              </motion.p>

              <motion.p
                className="text-sm sm:text-base md:text-base lg:text-lg text-white mb-4 lg:mb-6 leading-relaxed"
                initial={{ y: 30, filter: 'blur(1px)' }}
                whileInView={{ y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                Our diverse product portfolio includes ERW Pipes & Tubes,
                Scaffolding & Formwork Systems, Narrow Width HR Coils, Wire
                Rods, and MS Billets, serving infrastructure, construction, and
                industrial sectors. As a trusted structural steel company,
                sustainability remains at the core of our operations, supported
                by a 22 MW solar power plant supplying 30% of our energy needs
                and manufacturing processes aligned with CBAM standards.
              </motion.p>

              <motion.p
                className="text-sm sm:text-base md:text-base lg:text-lg text-white leading-relaxed"
                initial={{ y: 30, filter: 'blur(1px)' }}
                whileInView={{ y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                Achieving 40% lower emissions than industry averages, Renny is
                committed to becoming a leading green structural steel company
                in India
              </motion.p>
            </div>

            {/* CTA Button Wrapper */}
            <div className="relative md:static z-20 w-full px-4 text-center shrink-0 pt-4 md:pt-2 lg:pt-2">
              <Link
                to="/company-overview"
                className="inline-flex items-center justify-center gap-2 border border-white px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 text-xs sm:text-sm md:text-base text-white font-medium hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap group"
              >
                <span>Learn More About Us</span>
                <span className="text-sm sm:text-base md:text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
});

const ProductsSection = React.memo(() => {
  return (
    <>
      <section className="w-full font-helvetica">
        {/* Heading */}
        <motion.h2
          className="text-3xl text-blue py-8 sm:text-4xl md:text-[48px] font-bold  w-full text-center"
          initial={{ y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Our Products
          <div className="w-36 sm:w-48 md:w-60 h-0.5 bg-blue mx-auto rounded-full" />
        </motion.h2>

        {/* Horizontal Scroll Container */}
        <Suspense
          fallback={
            <div className="w-full h-[60vh] sm:h-[75vh] md:h-[85vh] bg-gray-50/30 animate-pulse rounded-2xl flex items-center justify-center">
              <div className="text-gray-400 text-sm">Loading Products...</div>
            </div>
          }
        >
          <ProductCarousel />
        </Suspense>
      </section>
    </>
  );
});

const NetworkSection = React.memo(
  ({
    // inView,
    viewKey,
    staggerContainer,
    listItem,
  }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.5,
    });

    // const [viewKey, setViewKey] = useState(0);

    return (
      <>
        <motion.section
          className="flex flex-col items-center font-helvetica bg-white justify-center px-4 sm:px-6 py-12 md:py-16 panel"
          initial={{ y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.h2
            className="text-3xl text-blue sm:text-4xl md:text-[48px] font-bold ml-0 md:ml-20 w-full text-center"
            initial={{ y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            Our Network
            <div className="w-36 sm:w-48 md:w-60 h-0.5 bg-blue mx-auto rounded-full" />
          </motion.h2>
          <Suspense
            fallback={
              <div className="w-full aspect-video max-w-5xl mx-auto bg-gray-50/30 animate-pulse rounded-2xl flex items-center justify-center mt-6">
                <div className="text-gray-400 text-sm">
                  Loading Network Map...
                </div>
              </div>
            }
          >
            <MapPage />
          </Suspense>

          <motion.div
            ref={ref}
            className="flex flex-wrap items-center justify-center gap-6 mt-8 md:mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            style={{
              willChange: 'transform',
            }}
          >
            {[
              { value: 1000, suffix: '+', label: 'SKUs', duration: 2 },
              {
                value: 199200,
                suffix: ' TPA',
                label: 'Annual Production',
                duration: 3,
                separator: ',',
              },
              { value: 1000, suffix: '+', label: 'Work Force', duration: 2 },
              {
                value: 22,
                suffix: ' MW',
                label: 'Captive Solar Power',
                duration: 2,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="border-t-2 border-b-2 px-4 sm:px-6 py-4 text-center w-full sm:w-auto"
                variants={listItem}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  willChange: 'transform',
                }}
              >
                <p
                  className="text-3xl sm:text-4xl md:text-5xl font-light text-blue min-w-[180px]"
                  style={{
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {inView ? (
                    <CountUp
                      key={viewKey}
                      end={item.value}
                      duration={item.duration}
                      separator={item.separator}
                    />
                  ) : (
                    0
                  )}
                  {item.suffix}
                </p>

                <p className="text-base sm:text-lg md:text-xl text-blue-900 mt-2">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </>
    );
  }
);

const FeaturesSection = React.memo(({ openIndex, toggleCard }) => {
  return (
    <>
      <section className="flex justify-center px-6 py-16 font-helvetica bg-[#f0f6ff]">
        <motion.section
          className="flex justify-center w-full"
          initial={{ y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10  w-full"
            style={{
              willChange: 'transform',
            }}
          >
            {[
              {
                id: 0,
                icon: icons1,
                alt: 'Innovation',
                title: 'Precision Engineering and Manufacturing',
                desc: 'Specializes in manufacturing high-precision, safety-critical components as per specifications.',
              },
              {
                id: 1,
                icon: icons2,
                alt: 'Sustainability',
                title: 'Fabrication and Forging',
                desc: 'Advanced sheet metal processing with EN 1090 & ISO 3834 compliance.',
              },
              {
                id: 2,
                icon: icons3,
                alt: 'Quality',
                title: 'Customized Excellence',
                desc: 'Tailored solutions backed by an in-house raw material ecosystem.',
              },
              {
                id: 3,
                icon: icons1,
                alt: 'Innovation',
                title: 'CNC Machining and Finishing',
                desc: 'Automated precision machining for consistent, high-quality output.',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className={`rounded-2xl border overflow-hidden transition-all duration-500 cursor-pointer ${openIndex === i ? 'bg-gray-600 text-white shadow-xl' : 'bg-white text-gray-800 border-gray-200 shadow-md hover:bg-gray-600 hover:text-white'}`}
                style={{
                  willChange: 'transform',
                }}
                onClick={() => toggleCard(i)}
              >
                <div className="px-8 pt-10 pb-6 flex flex-col items-center text-center relative">
                  <img
                    src={card.icon}
                    alt={card.alt}
                    width="72"
                    height="72"
                    loading="lazy"
                    decoding="async"
                    className={`h-18 w-18 mb-6 transition-all duration-500 ${openIndex === i ? 'scale-110 brightness-0 invert' : ''}`}
                  />
                  <h3 className="text-lg font-semibold mb-4">{card.title}</h3>
                  <RiArrowDownSLine
                    className={`text-2xl transition-transform absolute bottom-4`}
                    style={{
                      transform:
                        openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </div>
                <div
                  className={`px-8 overflow-hidden transition-all duration-500 ${openIndex === i ? 'max-h-48 pb-10 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-sm text-white">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </section>
    </>
  );
});

const NewsSection = React.memo(
  ({
    newsData,
    activeNews,
    setActiveNews,
    contentError,
    fadeUp,
    listItem,
    staggerContainer,
    scaleFade,
  }) => {
    return (
      <>
        <section className="font-helvetica bg-gray-100 py-14 md:py-20 px-4 sm:px-6 panel">
          {contentError && (
            <div className="mx-auto mb-6 max-w-6xl rounded-xl bg-white px-4 py-3 text-sm text-[#292c44] shadow-sm">
              {contentError}
            </div>
          )}
          {/* Heading */}
          <motion.h2
            className="text-3xl text-blue sm:text-4xl md:text-[48px] font-bold ml-0 md:ml-20 mb-8 md:mb-10 w-full text-center"
            initial={{ y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            News & Investor Relations
            <div className="w-40 sm:w-60 md:w-140 h-0.5 bg-blue mx-auto rounded-full mb-6 md:mb-10" />
          </motion.h2>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* ================= NEWS LIST (LEFT) ================= */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="w-full lg:w-1/4 bg-white rounded-2xl shadow p-4 space-y-3"
              style={{
                willChange: 'transform',
              }}
            >
              {newsData.length > 0 ? (
                newsData.map((news) => (
                  <motion.button
                    key={news._id}
                    variants={listItem}
                    onClick={() => setActiveNews(news)}
                    whileHover={{ scale: 1.02 }}
                    className={`group relative flex items-center gap-3 sm:gap-4 w-full p-3 rounded-2xl text-left transition ${
                      activeNews?._id === news._id
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {activeNews?._id === news._id && (
                      <motion.span
                        layoutId="active-indicator-home"
                        className="absolute left-0 top-0 h-full w-1 bg-black rounded-r"
                      />
                    )}

                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded flex-shrink-0"
                    />

                    <p className="text-sm font-medium line-clamp-2">
                      {news.title}
                    </p>
                  </motion.button>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400 text-sm italic">
                  Fetching latest updates...
                </div>
              )}
            </motion.div>

            {/* ================= NEWS PREVIEW (CENTER) ================= */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="w-full lg:w-2/4 bg-white rounded-2xl shadow p-4 sm:p-6 min-h-auto lg:min-h-[500px] flex items-center justify-center"
              style={{
                willChange: 'transform',
              }}
            >
              <AnimatePresence mode="wait">
                {activeNews ? (
                  <motion.div
                    key={activeNews._id}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="flex flex-col items-center text-center w-full"
                    style={{
                      willChange: 'transform',
                    }}
                  >
                    <motion.img
                      variants={scaleFade}
                      src={activeNews.imageUrl}
                      alt={activeNews.title}
                      width={256}
                      height={256}
                      className="w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-contain rounded-2xl mb-4 sm:mb-6 shadow-sm"
                    />

                    <motion.h2
                      variants={fadeUp}
                      className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"
                    >
                      {activeNews.title}
                    </motion.h2>

                    <motion.p
                      variants={fadeUp}
                      className="text-sm sm:text-base text-gray-700 mb-5 sm:mb-6 leading-relaxed text-justify lg:text-center"
                    >
                      {activeNews.description}
                    </motion.p>

                    <motion.div
                      variants={fadeUp}
                      style={{
                        willChange: 'transform',
                      }}
                    >
                      <a
                        href={activeNews.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 sm:px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition font-bold text-sm sm:text-base"
                      >
                        Read Full Article →
                      </a>
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className="animate-pulse text-gray-300 font-bold uppercase tracking-widest text-sm">
                    Loading Preview...
                  </div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ================= INVESTOR RELATIONS (RIGHT) ================= */}
            <motion.div
              className="w-full lg:w-1/4 bg-white rounded-2xl shadow p-4 sm:p-6 flex flex-col items-center justify-start"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
              style={{
                willChange: 'transform',
              }}
            >
              <h2 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6 text-center">
                Investor Relations
              </h2>

              <div className="flex flex-col gap-4 mb-6">
                {[
                  { title: 'Financials', path: '/financials' },
                  { title: 'Industry Report', path: '/industry-report' },
                  { title: 'IPO Documents', path: '/ipo' },
                  { title: 'IPO Audio Visual', path: '/ipo-audio-visual' },
                  { title: 'Our Policies', path: '/our-policies' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:shadow transition"
                    variants={{
                      hidden: { x: 20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    style={{
                      willChange: 'transform',
                    }}
                  >
                    <span className="text-sm mr-10 font-medium">
                      {item.title}
                    </span>
                    <Link to={item.path}>
                      <button className="bg-blue text-white px-4 py-2 rounded-lg text-xs hover:bg-blue-800 transition font-bold">
                        View
                      </button>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* <div className="mt-auto flex justify-around border-t pt-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 font-bold tracking-tighter uppercase">
                    BSE
                  </p>
                  <p className="text-sm font-semibold text-[#292C44]">₹93.90</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 font-bold tracking-tighter uppercase">
                    NSE
                  </p>
                  <p className="text-sm font-semibold text-[#292C44]">₹93.63</p>
                </div>
              </div> */}
            </motion.div>
          </div>
        </section>
      </>
    );
  }
);

const SustainabilitySection = React.memo(({ sustainabilityVideoRef }) => {
  return (
    <>
      <section className="flex flex-col items-center font-helvetica justify-center px-4 sm:px-6 py-12 md:py-16 bg-white panel min-h-screen lg:h-screen">
        <motion.h2
          className="text-3xl font-helvetica text-blue sm:text-4xl md:text-[48px] ml-0 md:ml-20 font-bold mb-8 md:mb-10 w-full text-center"
          initial={{ x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Engineering Sustainable Steel{' '}
          <span className="font-semibold text-gray-500 bg-clip-text">
            for a Greener Tomorrow
          </span>
          <div className="w-40 sm:w-64 md:w-200 h-0.5 bg-blue mx-auto rounded-full mb-6 md:mb-10" />
        </motion.h2>

        <motion.div
          className="flex flex-col lg:flex-row items-stretch justify-center gap-6 sm:gap-8 md:gap-10 w-full"
          initial={{ y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} // Reduced amount for better mobile triggering
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            willChange: 'transform',
          }}
        >
          {/* Slider Container */}
          <motion.div
            className="w-full lg:w-3/5" // Removed fixed h-80 to allow content to dictate height
            initial={{ y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              willChange: 'transform',
            }}
          >
            <Suspense
              fallback={
                <div className="w-full h-[580px] lg:h-[328px] bg-gray-50/30 animate-pulse rounded-3xl lg:rounded-4xl flex items-center justify-center">
                  <div className="text-gray-400 text-sm">
                    Loading Sustainability Info...
                  </div>
                </div>
              }
            >
              <SustainabilitySlider />
            </Suspense>
          </motion.div>

          {/* Video Container */}
          <motion.div
            className="w-full lg:w-2/5 flex"
            initial={{ x: 20, scale: 0.98 }} // Reduced X and scale for smoother mobile entry
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            onAnimationComplete={() => {
              if (sustainabilityVideoRef.current) {
                sustainabilityVideoRef.current.play().catch((err) => {
                  console.warn('Autoplay failed:', err);
                });
              }
            }}
            style={{
              willChange: 'transform',
            }}
          >
            <video
              ref={sustainabilityVideoRef}
              src={sustainability2}
              className="w-full h-auto aspect-video lg:aspect-auto lg:h-full object-fill shadow-lg rounded-3xl lg:rounded-4xl"
              width="640"
              height="360"
              muted={true}
              loop={true}
              autoPlay={true}
              playsInline={true}
              preload="none"
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
});

const BlogSection = React.memo(({ blogs, formatDate }) => {
  return (
    <>
      <motion.section
        className="bg-gray-100 px-6 py-10 font-helvetica panel"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
          },
        }}
      >
        <motion.h2
          className="text-[48px] text-blue font-bold w-full text-center"
          initial={{ y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Blogs
          <div className="w-25 h-0.5 bg-blue mx-auto rounded-full mb-10" />
        </motion.h2>

        <motion.div
          className="mx-auto flex flex-col lg:flex-row gap-10"
          initial={{ scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          style={{
            willChange: 'transform',
          }}
        >
          {/* Latest Blog */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl text-blue font-bold mb-6 w-full text-left">
              Latest Blog
            </h2>
            {blogs.length > 0 ? (
              <Link
                to={`/blog/${blogs[0].slug}`}
                className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                {/* FIX: Use mainImage to match your Mongoose Schema */}
                <picture className="w-full h-64 md:h-80 block overflow-hidden">
                  {!blogs[0].mainImage && (
                    <>
                      
                      <source
                        media="(max-width: 767px)"
                        srcSet={blog1_Mobile}
                        width="761"
                        height="428"
                        type="image/webp"
                      />
                      <source
                        media="(min-width: 768px)"
                        srcSet={blog1}
                        width="1280"
                        height="720"
                        type="image/webp"
                      />
                    </>
                  )}
                  {/* Commented out old image to keep history:
                  <img
                    src={blogs[0].mainImage || blog1}
                    alt={blogs[0].title}
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-fill   object-center"
                  />
                  */}
                  <img
                    src={blogs[0].mainImage || blog1}
                    alt={blogs[0].title}
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-fill   object-center"
                  />
                </picture>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-blue group-hover:text-blue-900 transition">
                    {blogs[0].title}
                  </h2>
                  <span className="block text-sm text-gray-500 mt-2">
                    {formatDate(
                      blogs[0].date ||
                        blogs[0].publishedAt ||
                        blogs[0].createdAt
                    )}
                  </span>
                  <p className="text-gray-600 mt-4 line-clamp-4">
                    {blogs[0].excerpt}
                  </p>
                  <span className="inline-block mt-4 font-medium text-blue group-hover:text-blue-900 transition">
                    Read More →
                  </span>
                  </div>
              </Link>
            ) : (
              <div className="text-gray-400 italic">No blogs published.</div>
            )}
          </div>

          {/* Other Blogs */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl text-blue font-bold mb-6 w-full text-left">
              Other Blogs
            </h2>
            <div className="space-y-6">
              {blogs.length > 1
                ? blogs.slice(1, 4).map((blog, index) => (
                    <Link
                      key={blog._id}
                      to={`/blog/${blog.slug}`}
                      className="group flex gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* FIX: Use mainImage and flex-shrink-0 for perfect fitting */}
                      <picture className="w-42 h-24 block overflow-hidden rounded-md flex-shrink-0 bg-gray-100">
                        {!blog.mainImage && (
                          <>
                            {/* Commented out old sources to keep history:
                            <source
                              media="(max-width: 767px)"
                              srcSet={
                                [blog2_Mobile, blog3_Mobile, blog4_Mobile][
                                  index
                                ]
                              }
                              type="image/webp"
                            />
                            <source
                              media="(min-width: 768px)"
                              srcSet={[blog2, blog3, blog4][index]}
                              type="image/webp"
                            />
                            */}
                            <source
                              media="(max-width: 767px)"
                              srcSet={
                                [blog2_Mobile, blog3_Mobile, blog4_Mobile][
                                  index
                                ]
                              }
                              width="761"
                              height="428"
                              type="image/webp"
                            />
                            <source
                              media="(min-width: 768px)"
                              srcSet={[blog2, blog3, blog4][index]}
                              width="1280"
                              height="720"
                              type="image/webp"
                            />
                          </>
                        )}
                        <img
                          src={blog.mainImage || [blog2, blog3, blog4][index]}
                          alt={blog.title}
                          width={168}
                          height={96}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </picture>
                      <div>
                        <h2 className="font-semibold text-gray-800 group-hover:text-blue-900 transition line-clamp-2">
                          {blog.title}
                        </h2>
                        <span className="block text-sm text-gray-500 mt-1">
                          {formatDate(
                            blog.date || blog.publishedAt || blog.createdAt
                          )}
                        </span>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <span className="text-sm font-medium text-blue group-hover:text-blue-900 transition">
                          Read More →
                        </span>
                      </div>
                    </Link>
                  ))
                : blogs.length === 1 && (
                    <div className="text-gray-400 italic">
                      Check back soon for more!
                    </div>
                  )}
            </div>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
});

export default Home;
