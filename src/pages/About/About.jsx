// React & External Libraries
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import axios from "axios";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

// Hooks
import usePageHero from "../../hooks/usePageHero";

// Components
import SEO from "../../components/SEO";
import MapPage from "../MapPage";

// Assets - Video
import aboutVideo from "../../assets/01-aboutVideo.webm";

// Assets - Timeline Images
import t1996 from "../../assets/1996.webp";
import t2005 from "../../assets/2005.webp";
import t2016 from "../../assets/2016.webp";
import t2018 from "../../assets/2018.webp";
import t2019 from "../../assets/2019.webp";
import t2021 from "../../assets/2021.webp";
import t2023 from "../../assets/2023.webp";
import t2024 from "../../assets/2024.webp";
import t2025 from "../../assets/2025.webp";

// Assets - Gallery Images
import g2 from "../../assets/g2.webp";
import g21 from "../../assets/g2-1.webp";
import g3 from "../../assets/g3.webp";
import g31 from "../../assets/g3-1.webp";

// Assets - Banner
import banner from "../../assets/Image.webp";

// ==========Timeline Data==========
const timelineData = [
  {
    year: "1996",
    title:
      "Renny Strips Limited was incorporated in 1996 in Ludhiana, Punjab, marking the foundation of its journey in the steel industry. The company began operations with the trading of MS billets, establishing its initial presence in the raw material segment of the steel value chain. This phase laid the groundwork for future expansion, enabling the company to build supplier relationships, understand market dynamics, and develop the operational expertise that would later support its transition into integrated manufacturing.",
    image: t1996,
  },
  {
    year: "2005",
    title:
      "In 2005, Renny Strips Limited marked a significant transition from trading to manufacturing by setting up its first rolling mill at Unit I. This milestone enabled the company to commence production of wire rods, moving upstream in the steel value chain. The addition of manufacturing capabilities strengthened operational control, improved margins, and ensured consistent product quality. It also laid the foundation for backward and forward integration, positioning the company for scalable growth in diverse industrial applications.",
    image: t2005,
  },
  {
    year: "2016",
    title:
      "In 2016, Renny Strips Limited marked a key milestone in its global expansion by exporting galvanized iron fully threaded rods to the United Arab Emirates. This achievement reflected the company’s growing manufacturing capabilities and adherence to international quality standards. Entering the U.A.E. market not only diversified its revenue streams but also strengthened its presence in overseas markets, laying the groundwork for further exports across multiple regions and reinforcing its position as a globally competitive steel manufacturer.",
    image: t2016,
  },
  {
    year: "2018",
    title:
      "In 2018, Renny Strips Limited strengthened its manufacturing backbone by installing a continuous casting machine along with an additional rolling mill at Unit I. This development marked a critical step toward backward integration, enabling the company to produce billets in-house and directly feed them into rolling operations. The upgrade enhanced production efficiency, ensured better quality control, reduced dependency on external suppliers, and significantly improved the company’s ability to scale operations in line with growing market demand.",
    image: t2018,
  },
  {
    year: "2019",
    title:
      "In 2019, Renny Strips Limited further strengthened its backward integration by setting up a continuous casting machine along with an induction melting furnace at Unit II. This development enabled in-house melting of raw materials and direct casting of billets, significantly enhancing control over the production cycle. The integration improved cost efficiency, ensured consistent metallurgical quality, and reduced reliance on external billet sourcing, positioning the company for higher scalability and operational resilience.",
    image: t2019,
  },
  {
    year: "2021",
    title:
      "In 2021, Renny Strips Limited undertook a strategic expansion of Unit I to enhance its production capacity and operational efficiency. This development involved scaling existing infrastructure, optimizing process flows, and strengthening downstream capabilities to support a wider product range. The expansion reinforced the company’s commitment to integrated manufacturing, enabling higher output, improved turnaround times, and better responsiveness to market demand, while further consolidating its position in the steel processing and value-added segments.",
    image: t2021,
  },
  {
    year: "2023",
    title:
      "In 2023, Renny Strips Limited enhanced its infrastructure by installing a 66 KVA substation at Unit I, strengthening its power reliability and operational efficiency. This upgrade ensured a stable and uninterrupted electricity supply for energy-intensive manufacturing processes, particularly in rolling and casting operations. The addition of dedicated power infrastructure reduced dependency on external fluctuations, improved productivity, and supported higher capacity utilization, reinforcing the company’s commitment to scalable and efficient industrial operations.",
    image: t2023,
  },
  {
    year: "2024",
    title:
      "In 2024, Renny Strips Limited marked a significant milestone by commencing the production of hot rolled (HR) coils, expanding its product portfolio within the flat steel segment. This development strengthened the company’s forward integration, enabling it to cater to a broader range of industries including pipe manufacturing, structural applications, and downstream processing. The addition of HR coil production enhanced value addition, improved market competitiveness, and reinforced the company’s position as a comprehensive, end-to-end steel manufacturing enterprise.",
    image: t2024,
  },
  {
    year: "2025",
    title:
      "In 2025, Renny Strips Limited achieved a major milestone with the establishment of Unit III, marking its entry into the production of ERW pipes and tubes, along with scaffolding and formwork systems. This expansion significantly strengthened forward integration and value-added capabilities. The company also expanded its global footprint by exporting scaffolding systems to 13 countries. Additionally, land acquisition for the proposed Unit IV and the initiation of a 22 MW solar power plant highlighted its commitment to sustainable and future-ready growth.",
    image: t2025,
  },
];

import { API_BASE_URL } from "../../lib/api";

const About = () => {
  // ==========Page Hero==========
  const { heroSrc, heroHeading } = usePageHero(
    "company-overview-2",
    "Company Overview",
    aboutVideo,
  );

  // ==========Dynamic Timeline Data==========
  const [serverTimelineData, setServerTimelineData] = useState([]);

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const API_URL = API_BASE_URL;

        const res = await axios.get(`${API_URL}/api/timeline`);

        if (
          res.data?.success &&
          Array.isArray(res.data?.data) &&
          res.data.data.length > 0
        ) {
          const mappedData = res.data.data
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((item) => ({
              ...item,
              title: item.content,
            }));

          setServerTimelineData(mappedData);
        }
      } catch (err) {
        console.error(
          "Timeline data loading error, falling back to local data:",
          err,
        );
      }
    };

    fetchTimelineData();
  }, []);

  const displayTimelineData = [
    ...serverTimelineData,
    ...timelineData.filter(
      (h) => !serverTimelineData.some((s) => s.year === h.year),
    ),
  ].sort((a, b) => parseInt(a.year) - parseInt(b.year));

  // ==========Timeline State==========
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const resumeTimeoutRef = useRef(null);

  // ==========Animation Variants==========
  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const listItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  // ==========Auto Timeline==========
  useEffect(() => {
    if (isPaused) return;

    const timeout = setTimeout(() => {
      setActiveIndex((prev) =>
        prev === displayTimelineData.length - 1 ? 0 : prev + 1,
      );
    }, 3500);

    return () => clearTimeout(timeout);
  }, [activeIndex, isPaused, displayTimelineData.length]);

  const handleTimelineClick = (index) => {
    setActiveIndex(index);
    setIsPaused(true);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  // ==========Network Section InView==========
  const { ref: networkRef, inView: networkInView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  // ==========CountUp Animation==========
  const { ref: statsRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const [viewKey, setViewKey] = useState(0);

  useEffect(() => {
    if (inView) {
      setViewKey((prev) => prev + 1);
    }
  }, [inView]);

  // ==========Gallery Slider Data==========
  const galleryImages = [
    { desktop: g2, mobile: g21 },
    { desktop: g3, mobile: g31 },
  ];

  // ==========Gallery Slider State==========
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);
  const x = useMotionValue(0);

  // ==========Mobile Screen Detection==========
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ==========Slider Utilities==========
  const slideWidth = () => containerRef.current?.offsetWidth || 0;

  const snapTo = (index) => {
    const clamped = Math.max(0, Math.min(index, galleryImages.length - 1));

    setCurrentSlide(clamped);

    const width = slideWidth();

    x.set(-clamped * width);
  };

  const nextSlide = () => snapTo(currentSlide + 1);

  const prevSlide = () => snapTo(currentSlide - 1);

  const handleDragEnd = (e, info) => {
    const width = slideWidth();
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    let newIndex = currentSlide;

    if (Math.abs(offset) > width / 4 || Math.abs(velocity) > 500) {
      newIndex = offset < 0 ? currentSlide + 1 : currentSlide - 1;
    }

    snapTo(newIndex);
  };

  // ==========Sync Slide Position==========
  useEffect(() => {
    const width = slideWidth();

    x.set(-currentSlide * width);
  }, [currentSlide]);

  // ==========Auto Slide Transition==========
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === galleryImages.length - 1 ? 0 : prev + 1,
      );
    }, 3600);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  // ==========Animation Presets==========
  const imageZoom = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.18,
      },
    },
  };
  return (
    <>
      <SEO
        title="Company Overview | Renny Strips Limited"
        description="Explore Renny Strips Limited’s integrated steel manufacturing, exports, HR coils, ERW pipes, scaffolding systems, wire rods, and production capabilities."
        keywords="Renny Strips Limited, steel manufacturer India, HR coils, ERW pipes, scaffolding systems, wire rods, steel company Ludhiana, integrated steel manufacturer"
        url="https://rennystrips.com/company-overview"
      />
      <div className="w-full bg-black text-white font-helvetica">
        {/* ================= HERO ================= */}
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
              src={heroSrc || aboutVideo}
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

        {/* ================= COMPANY OVERVIEW ================= */}
        <section className="relative min-h-screen overflow-hidden">
          <img
            src={banner}
            alt="About Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative z-10 mx-auto grid grid-cols-1 lg:grid-cols-[65%_35%] gap-16 px-6 md:px-16 py-20">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold">
                Renny Strips Ltd: One of India’s Key Manufacturers of Customized
                Green Steel Solutions
              </h2>

              <p className="text-gray-200 leading-relaxed">
                Founded in 1996, Renny Strips Limited is a fully integrated
                structural products manufacturer headquartered in Ludhiana,
                Punjab. The Company operates 3 integrated manufacturing units,
                providing end-to-end finished products. Renny operates three
                induction furnaces with a total melting capacity of 199,200 TPA
                (versus an industry average of 65,000–75,000 TPA), supported by
                two continuous casting lines and two rolling mills producing MS
                billets, wire rods, and narrow-width HR coils. A downstream unit
                manufactures ERW black and galvanized pipes and tubes, along
                with scaffolding and formwork systems, using largely in-house
                inputs, positioning Renny among the few vertically integrated
                players in India across this value chain. The Company’s
                scaffolding and formwork portfolio exceeds 1,000 SKUs, supplied
                to customers across 5 continents and serves the construction,
                automotive, water, oil & gas, and fabrication sectors.
              </p>
            </motion.div>

            <motion.div
              ref={statsRef}
              className="flex flex-col items-center space-y-10"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {[
                { value: 1000, label: "SKUs" },
                { value: 199200, label: "Annual Production", separator: "," },
                { value: 1000, label: "Workforce" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl md:text-5xl text-sky-400">
                    {inView ? (
                      <CountUp
                        key={viewKey}
                        end={item.value}
                        separator={item.separator}
                      />
                    ) : (
                      0
                    )}
                    +
                  </p>
                  <p className="text-orange-400">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= TIMELINE ================= */}
        <section className="bg-[#F8F8F8]  text-black pb-20">
          <div className="mx-auto px-6  md:px-16">
            <motion.h2
              className="text-[32px]  md:text-[48px] font-bold w-full text-center py-3 "
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Timeline
              <div className="w-36 sm:w-34 md:w-40 h-0.5 bg-[#000000] mx-auto rounded-full mb-8 md:mb-10" />
            </motion.h2>

            <div className="relative">
              <div className="relative w-full">
                {/* Horizontal line */}
                <div className="absolute top-[53px] left-0 w-full h-[2px] bg-gray-300" />

                {/* Timeline items */}
                <div className="relative flex justify-between items-center  overflow-x-auto md:overflow-visible gap-6 w-full">
                  {displayTimelineData.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleTimelineClick(index)}
                      className="flex flex-col items-center relative shrink-0"
                    >
                      {/* Year */}
                      <span
                        className={`mb-6 text-sm font-medium ${
                          activeIndex === index
                            ? "text-blue scale-110 font-extrabold"
                            : "text-gray-400"
                        }`}
                      >
                        {item.year}
                      </span>

                      {/* Dot */}
                      <span
                        className={`w-5 h-5 rounded-full z-10 mb-10 transition-all ${
                          activeIndex === index
                            ? "bg-blue scale-110"
                            : "bg-gray-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              key={activeIndex}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <h3 className="text-3xl font-semibold mb-4">
                  {displayTimelineData[activeIndex]?.year}
                </h3>
                <p className="whitespace-pre-line text-gray-700">
                  {displayTimelineData[activeIndex]?.title}
                </p>
              </div>

              <img
                src={displayTimelineData[activeIndex]?.image}
                alt="Timeline Img"
                className="h-[300px] md:h-[420px] w-full object-cover bg-blue rounded-xl"
              />
            </motion.div>
          </div>
        </section>

        {/* ================= GALLERY ================= */}
        <section
          ref={containerRef}
          className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden"
        >
          <motion.div
            className="flex h-full cursor-grab active:cursor-grabbing"
            drag="x"
            style={{ x }}
            dragConstraints={{
              left: -((galleryImages.length - 1) * slideWidth()),
              right: 0,
            }}
            onDragEnd={handleDragEnd}
          >
            {galleryImages.map((imgObj, index) => (
              <motion.div
                key={index}
                className="min-w-full h-full relative"
                animate={{
                  opacity: index === currentSlide ? 1 : 0.5,
                  scale: index === currentSlide ? 1 : 0.98,
                }}
                transition={{ duration: 0.5 }}
              >
                <img
                  /* 🔹 CONDITIONAL RENDERING HERE 🔹 */
                  src={isMobile ? imgObj.mobile : imgObj.desktop}
                  alt="Renny strips factory img"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Left Arrow - Hidden on small mobile for cleaner look if preferred */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 text-white flex items-center justify-center"
          >
            <RiArrowLeftLine className="text-2xl md:text-3xl" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 text-white flex items-center justify-center"
          >
            <RiArrowRightLine className="text-2xl md:text-3xl" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {galleryImages.map((_, i) => (
              <div
                key={i}
                onClick={() => snapTo(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === currentSlide ? "w-6 bg-blue-900" : "w-2 bg-white/60"
                }`}
              />
            ))}
          </div>
        </section>

        {/* ================= NETWORK ================= */}
        <motion.section
          className="flex flex-col items-center font-helvetica bg-white justify-center px-4 sm:px-6 py-12 md:py-16 panel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h2
            className="text-3xl text-blue sm:text-4xl md:text-[48px] font-bold ml-0 md:ml-20 w-full text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Network
            <div className="w-36 sm:w-48 md:w-60 h-0.5 bg-blue mx-auto rounded-full" />
          </motion.h2>

          <MapPage />

          <motion.div
            ref={networkRef}
            className="flex flex-wrap items-center justify-center gap-6 mt-8 md:mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={staggerContainer}
          >
            {[
              { value: 1000, suffix: "+", label: "SKUs", duration: 2 },
              {
                value: 199200,
                suffix: " TPA",
                label: "Annual Production",
                duration: 3,
                separator: ",",
              },
              { value: 1000, suffix: "+", label: "Work Force", duration: 2 },
              {
                value: 22,
                suffix: " MW",
                label: "Captive Solar Power",
                duration: 2,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="border-t-2 border-b-2 px-4 sm:px-6 py-4 text-center w-full sm:w-auto"
                variants={listItem}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <p className="text-3xl sm:text-4xl md:text-5xl font-light text-blue">
                  {networkInView ? (
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
      </div>
    </>
  );
};

export default About;
