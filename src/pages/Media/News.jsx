import newsbanner from "../../assets/newsbanner.webp";
import newsvideo from "../../assets/newsvideo.webm";
import MobileMediaVideo from "../../assets/MobileMediaVideo.webm";
import usePageHero from "../../hooks/usePageHero";
import PageSpinner from "../../components/PageSpinner.jsx";
import mobileNewsVideo from "../../assets/MobileMediaVideo.webm";
import SEO from "../../components/SEO";

import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { API_BASE_URL } from "../../lib/api";

const News = () => {
  const { heroSrc, heroHeading } = usePageHero("news-room", "News Room");
  const [newsData, setNewsData] = useState([]);
  const [activeNews, setActiveNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState(newsvideo);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVideoSrc(mobileNewsVideo);
      } else {
        setVideoSrc(newsvideo);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // ---------------- FETCH NEWS ----------------
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/news`);
        const data = await res.json();

        const formatted = data.map((item) => ({
          id: item._id,
          title: item.title,
          desc: item.description,
          link: item.externalLink,
          img: item.imageUrl,
          order: item.order,
          date: item.date,
        }));

        setNewsData(formatted);
        setActiveNews(formatted[0] || null);
      } catch (err) {
        console.error("NEWS FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // ---------------- ANIMATIONS ----------------

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

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const listItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const scaleFade = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  /* Removed unused inView */

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // ---------------- LOADING STATE ----------------
  if (loading || !activeNews) {
    return <PageSpinner />;
  }

  // ---------------- UI ----------------
  return (
    <>
      <SEO
        title="News Room | Latest News & Media Updates | Renny Strips"
        description="Stay updated with Renny Strips news, announcements, media coverage, company updates, and industry developments."
        keywords="Renny Strips news, company announcements, steel industry news, press releases, manufacturing updates, media coverage, corporate news"
        url="https://rennystrips.com/news-room"
        image={heroSrc}
      />

      <div className="min-h-screen font-helvetica">
        {/* Banner */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageZoom}
          className="relative h-[100vh] w-full overflow-hidden mb-10"
        >
          {heroSrc &&
          (heroSrc.endsWith(".webm") || heroSrc.endsWith(".mp4")) ? (
            <video
              key={heroSrc}
              src={heroSrc}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <img
              key={heroSrc || "fallback"}
              src={heroSrc || newsvideo}
              alt="Hero Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          <motion.h1
            variants={fadeUp}
            className="relative z-10 text-white text-4xl md:text-7xl font-bold
                        flex items-end justify-start h-full py-10 px-6 md:px-10"
          >
            {heroHeading}
          </motion.h1>
        </motion.section>

        {/* Spotlight */}
        <section className="flex items-center justify-center px-4 md:px-6 w-full">
          <div className="relative min-h-[450px] md:h-[550px] w-full max-w-6xl mt-12 md:mt-20 rounded-3xl md:rounded-4xl overflow-hidden shadow-2xl">
            {/* Conditional Video Rendering */}
            <video
              key={videoSrc} // Forces re-render on source swap
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-fill z-0"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10" />

            {/* Content Wrapper - Absolute inset forces it to fill the parent for centering */}
            <div className="absolute inset-0 z-20 flex items-center justify-center p-6 md:p-16">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4 md:space-y-6 w-full flex flex-col items-center justify-center"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl md:text-5xl font-bold text-white text-center leading-tight"
                >
                  Showcasing Our Journey
                </motion.h2>

                <motion.h3
                  variants={itemVariants}
                  className="text-xl md:text-3xl font-semibold text-white/90 text-center"
                >
                  Through the Spotlight
                </motion.h3>

                <motion.p
                  variants={itemVariants}
                  className="text-white/80 text-center text-sm md:text-lg leading-relaxed max-w-3xl mx-auto px-8 md:px-0"
                >
                  At Renny Strips, our work and leadership continue to inspire
                  stories of growth, innovation, and resilience. From
                  prestigious awards to industry recognitions, our journey has
                  been highlighted across respected media platforms.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* NEWS PANEL */}
        <div className="flex flex-col lg:flex-row gap-8 mb-40 mt-16 px-6">
          {/* Left Panel */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:w-1/3 bg-white rounded-2xl shadow p-4 space-y-3"
          >
            {newsData.map((news) => (
              <motion.button
                key={news.id}
                variants={listItem}
                onClick={() => setActiveNews(news)}
                whileHover={{ scale: 1.02 }}
                className={`group relative flex items-center gap-4 w-full p-3 rounded-2xl text-left transition ${
                  activeNews.id === news.id ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
              >
                {activeNews.id === news.id && (
                  <motion.span
                    layoutId="active-indicator-news"
                    className="absolute left-0 top-0 h-full w-1 bg-black rounded-r"
                  />
                )}

                <motion.img
                  src={news.img}
                  alt={news.title}
                  className="w-16 h-16 object-cover rounded"
                  whileHover={{ scale: 1.05 }}
                />

                <p className="text-sm font-medium line-clamp-2">{news.title}</p>
              </motion.button>
            ))}
          </motion.div>

          {/* Right Panel */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:w-2/3 bg-white rounded-2xl shadow p-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNews.id}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex flex-col items-center text-center"
              >
                <motion.img
                  variants={scaleFade}
                  src={activeNews.img}
                  alt={activeNews.title}
                  className="w-72 h-72 object-cover rounded-2xl mb-6"
                />

                <motion.h2
                  variants={fadeUp}
                  className="text-2xl font-bold mb-4"
                >
                  {activeNews.title}
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  className="text-gray-700 mb-6 leading-relaxed max-w-3xl"
                >
                  {activeNews.desc}
                </motion.p>

                <motion.div variants={fadeUp}>
                  <Link
                    to={activeNews.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
                  >
                    Read Full Article →
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default News;
