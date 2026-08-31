import BlogCard from "../../components/BlogCard.jsx";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import SEO from "../../components/SEO";
import { RiArrowDownSLine } from "react-icons/ri";

// Assets
import blogsbanner from "../../assets/blogsbanner.webp";
import MobileMediaVideo from "../../assets/MobileMediaVideo.webm";
import newsvideo from "../../assets/newsvideo.webm";
import usePageHero from "../../hooks/usePageHero";
import PageSpinner from "../../components/PageSpinner.jsx";

import { API_BASE_URL } from "../../lib/api";

const Blogs = () => {
  const { heroSrc, heroHeading } = usePageHero("blog", "Blogs");
  const [blogsData, setBlogsData] = useState([]);
  const [activeBlog, setActiveBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [sortType, setSortType] = useState("All");
  const [dateSortOrder, setDateSortOrder] = useState("newest");
  const [open, setOpen] = useState(false);

  const leftRefs = useRef([]);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/blogs`,
        );
        const fetchedBlogs = res.data.data || [];
        setBlogsData(fetchedBlogs);
        console.log(fetchedBlogs);

        if (fetchedBlogs.length > 0) {
          setActiveBlog(fetchedBlogs[0]);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const filteredBlogs = blogsData
    .filter((blog) => {
      // Prioritize display date field
      const blogDate = blog.date || blog.publishedAt || blog.createdAt;
      if (sortType === "All") return true;
      return new Date(blogDate).getFullYear().toString() === sortType;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date || a.publishedAt || a.createdAt);
      const dateB = new Date(b.date || b.publishedAt || b.createdAt);
      return dateSortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  const [inViewIndexes, setInViewIndexes] = useState([]);

  useEffect(() => {
    const observers = leftRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInViewIndexes((prev) => [...new Set([...prev, index])]);
          }
        },
        { threshold: 0.2 },
      );
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach((obs) => obs && obs.disconnect());
  }, [filteredBlogs]);

  if (loading) return <PageSpinner />;
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
  return (
    <>
      <SEO
        title="Blogs & Industry Insights | Renny Strips"
        description="Explore Renny Strips blogs on steel industry insights, manufacturing trends, leadership perspectives, and company updates."
        keywords="Renny Strips blog, steel industry insights, manufacturing blogs, industrial trends, steel company articles, leadership insights, steel sector updates"
        url="https://rennystrips.com/blog"
        image={heroSrc}
      />
      <div className="font-helvetica  min-h-screen">
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
              src={heroSrc || ""}
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

        {/* =============SPOTLIGHT=============== */}

        <section className="flex items-center justify-center px-[15px] md:px-6">
          <div className="relative h-[500px] md:h-[550px] w-full max-w-6xl mt-12 md:mt-20 rounded-4xl overflow-hidden">
            {/* Background Video - Optimized for Mobile */}
            <video
              key={isMobile ? "mobile" : "desktop"}
              src={isMobile ? MobileMediaVideo : newsvideo}
              autoPlay
              loop
              muted
              playsInline
              /* 🔹 CRITICAL: object-cover makes the video fill the entire div without stretching */
              className="absolute inset-0 w-full h-full object-fill z-0"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 z-10" />

            {/* Content Container */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full px-18 text-center ">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center space-y-4"
              >
                <h2 className="text-2xl md:text-5xl font-bold text-white leading-tight">
                  Insights & Stories <br className="md:hidden" /> From Our
                  Journey
                </h2>

                <h3 className="text-lg md:text-2xl font-medium text-white/90">
                  Explore Articles, Updates & Industry Trends
                </h3>

                <p className="text-white/80 text-sm md:text-lg leading-relaxed max-w-[280px] md:max-w-2xl">
                  Discover expert insights, company updates, and industry
                  knowledge through our latest blogs. From steel innovations to
                  business growth, every article reflects the expertise and
                  vision behind Renny Strips.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        <motion.div
          className="flex flex-col lg:flex-row mb-20 mt-12 md:mt-20 gap-8 px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        >
          {/* Left Panel */}
          <div className="lg:w-1/3 space-y-4">
            <div className="bg-white rounded-2xl shadow p-4 mb-4 flex gap-2 flex-wrap">
              {["All", "2026", "2025", "2024"].map((year) => (
                <button
                  key={year}
                  className={`px-4 py-2 rounded-2xl font-medium transition ${sortType === year ? "bg-blue text-white" : "bg-gray-100"}`}
                  onClick={() => setSortType(year)}
                >
                  {year}
                </button>
              ))}

              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="px-4 py-2 pr-10 rounded-2xl bg-gray-100 font-medium text-sm flex items-center justify-between gap-2 w-[180px]"
                >
                  {dateSortOrder === "newest" ? "Newest First" : "Oldest First"}
                  <span className="text-xl flex items-center">
                    <RiArrowDownSLine />
                  </span>
                </button>

                {open && (
                  <div className="absolute mt-2 w-full bg-white rounded-2xl shadow-lg z-50 ">
                    {[
                      { label: "Newest First", value: "newest" },
                      { label: "Oldest First", value: "oldest" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setDateSortOrder(option.value);
                          setOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 font-medium transition ${dateSortOrder === option.value ? "bg-blue text-white" : "bg-gray-100"}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-4 space-y-4 max-h-[90vh] overflow-y-auto">
              {filteredBlogs.length === 0 && (
                <p className="text-gray-500">No blogs found.</p>
              )}
              {filteredBlogs.map((blog, index) => {
                const isActive = activeBlog?._id === blog._id;
                return (
                  <motion.div
                    key={blog._id}
                    ref={(el) => (leftRefs.current[index] = el)}
                    className={`relative flex items-center gap-4 w-full p-3 rounded-2xl text-left ${isActive ? "bg-gray-100" : "bg-transparent"} cursor-pointer group`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={
                      inViewIndexes.includes(index) ? { opacity: 1, x: 0 } : {}
                    }
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <Link 
                      to={`/blog/${blog.slug}`} 
                      className="absolute inset-0 z-10" 
                      onClick={(e) => { e.preventDefault(); setActiveBlog(blog); }}
                      aria-label={`Read more about ${blog.title}`}
                    ></Link>
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-20 w-1 bg-blue rounded-full" />
                    )}
                    <img
                      src={blog.mainImage}
                      alt={blog.title}
                      className="w-36 h-20 object-fill rounded-2xl relative z-0"
                    />
                    <p className="text-sm font-medium line-clamp-2 relative z-0">
                      {blog.title}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:w-2/3 bg-white rounded-2xl shadow p-6">
            <AnimatePresence mode="wait">
              {activeBlog && (
                <motion.div
                  key={activeBlog._id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center"
                >
                  <img
                    src={activeBlog.mainImage}
                    alt={activeBlog.title}
                    className="w-full h-82 object-fit rounded-2xl mb-6"
                  />
                  <h2 className="text-2xl font-bold mb-2 text-center">
                    {activeBlog.title}
                  </h2>
                  <p className="text-gray-500 mb-4">
                    {new Date(
                      activeBlog.date ||
                        activeBlog.publishedAt ||
                        activeBlog.createdAt,
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-gray-700 mb-6 leading-relaxed text-center max-w-3xl">
                    {activeBlog.excerpt}
                  </p>
                  <Link
                    to={`/blog/${activeBlog.slug}`}
                    className="inline-block px-6 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition"
                  >
                    Read Full Article →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Blogs;
