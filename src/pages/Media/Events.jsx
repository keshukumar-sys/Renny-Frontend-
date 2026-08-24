import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import SEO from "../../components/SEO";

import banner from "../../assets/eventsbanner.webp";
import newsvideo from "../../assets/newsvideo.webm";
import MobileMediaVideo from "../../assets/MobileMediaVideo.webm";
import usePageHero from "../../hooks/usePageHero";

import EventCard from "../../components/EventCard";
import PageSpinner from "../../components/PageSpinner.jsx";

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
import { API_BASE_URL } from "../../lib/api";

const Events = () => {
  const { heroSrc, heroHeading } = usePageHero("events", "Events", banner);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Banner parallax
  const { scrollYProgress } = useScroll();
  const bannerY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  // ---------------- FETCH EVENTS ----------------
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/events`);
        const json = await res.json();

        if (!json.success) throw new Error("Failed to fetch events");

        const formatted = json.data.map((item) => ({
          id: item._id,
          title: item.title,
          date: item.date,
          video: item.videoUrl,
          desc: item.description,
          order: item.order,
        }));

        setEventsData(formatted);
      } catch (err) {
        console.error("EVENT FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  // Handle conditional rendering based on window width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const currentVideo = isMobile ? MobileMediaVideo : newsvideo;

  if (loading) {
    return <PageSpinner />;
  }
  return (
    <>
      <SEO
        title="Events & Exhibitions | Renny Strips"
        description="Explore Renny Strips events, exhibitions, trade shows, corporate gatherings, and industry participation highlights."
        keywords="Renny Strips events, steel exhibitions, trade shows, corporate events, industrial expos, manufacturing conferences, company events"
        url="https://rennystrips.com/events"
        image={heroSrc}
      />
      <motion.div className="font-helvetica overflow-hidden min-h-screen">
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
              src={heroSrc || banner}
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

        {/* Spotlight section */}
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
                  Celebrating Moments <br className="md:hidden" /> That Matter
                </h2>

                <h3 className="text-lg md:text-2xl font-medium text-white/90">
                  Through Our Company Events
                </h3>

                {/* The "Mobile Box" Shape */}
                <p className="text-white/80 text-sm md:text-lg leading-relaxed max-w-[280px] md:max-w-2xl">
                  Our events reflect the culture, values, and spirit that define
                  Renny Strips. From industry exhibitions to internal
                  celebrations, each event marks a step in our journey of
                  growth.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Event Cards */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 py-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {eventsData.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default Events;
