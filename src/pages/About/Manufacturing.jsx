// ========== Imports ==========
import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import SEO from "../../components/SEO";

// ========== Hooks ==========
import usePageHero from "../../hooks/usePageHero";

// ========== Assets ==========
import aboutVideo from "../../assets/01-aboutVideo.webm";
import unit1 from "../../assets/Unit-1.webp";
import unit2 from "../../assets/Unit-3.webp";
import image from "../../assets/Manufacturing1.webp";
import video from "../../assets/new235.webm";
import rawimg from "../../assets/RawToRemarkable.webm";
import TotalCapacity from "../../assets/TotalCapacity.webp";
import carbonfootprint from "../../assets/carbon.webp";

import { API_BASE_URL } from "../../lib/api";

// ========== Hardcoded Units ==========
const hardcodedUnits = [
  {
    id: "unit3",

    title: "Unit 3",

    address:
      "Lakhowal Road, Opposite PSPCL House, Kohara, Ludhiana, Punjab - 141112, India",

    image: unit2,

    order: 3,
  },
];

const Manufacturing = () => {
  // ========== Hero Content ==========
  const { heroSrc, heroHeading } = usePageHero(
    "manufacturing-process",
    "Manufacturing Process",
    aboutVideo,
  );

  // ========== Server Units State ==========
  const [serverUnits, setServerUnits] = useState([]);

  // ========== Fetch Units ==========
  const fetchUnits = useCallback(async () => {
    try {
      const API_URL = API_BASE_URL;

      const res = await axios.get(`${API_URL}/api/units`);

      const data = res.data?.data || res.data;

      if (Array.isArray(data)) {
        setServerUnits(data);
      }
    } catch (err) {
      console.error("Error fetching units:", err);
    }
  }, []);

  // ========== Initial Units Load ==========
  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  // ========== Units List ==========
  const unitsList = useMemo(() => {
    const mappedServer = serverUnits.map((u, i) => ({
      id: u._id || `server-unit-${i}`,

      title: u.title,

      address: u.address,

      image: u.image || unit1,

      order: u.order || 0,
    }));

    return [
      ...mappedServer,

      ...hardcodedUnits.filter(
        (h) => !mappedServer.some((s) => s.title === h.title),
      ),
    ].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [serverUnits]);

  // ========== Active Unit State ==========
  const [activeUnitId, setActiveUnitId] = useState(null);

  // ========== Default Active Unit ==========
  useEffect(() => {
    if (
      unitsList.length > 0 &&
      (!activeUnitId || !unitsList.find((u) => u.id === activeUnitId))
    ) {
      setActiveUnitId(unitsList[0].id);
    }
  }, [unitsList, activeUnitId]);

  // ========== Metric Data ==========
  const metricData = {
    capacity: {
      title: "Total Capacity",

      image: TotalCapacity,
    },

    carbon: {
      title: "Carbon Footprint",

      image: carbonfootprint,
    },
  };

  // ========== Active Metric State ==========
  const [activeMetric, setActiveMetric] = useState("capacity");

  const currentMetric = metricData[activeMetric];

  // ========== Current Unit ==========
  const currentUnit =
    unitsList.find((u) => u.id === activeUnitId) ||
    unitsList[0] ||
    hardcodedUnits[0];

  // ========== InView Animation ==========
  const { ref, inView } = useInView({
    threshold: 0.4,

    triggerOnce: true,
  });

  // ========== Animation Variants ==========
  const container = {
    hidden: {},

    visible: {
      transition: {
        staggerChildren: 0.18,
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
  /* ================= COMPONENT ================= */

  return (
    <>
      <SEO
        title="Integrated Manufacturing | Renny Strips Limited"
        description="Explore Renny Strips Limited’s integrated manufacturing of HR coils, ERW pipes, scaffolding systems, wire rods, and sustainable steel production."
        keywords="Integrated Manufacturing, Renny Strips Limited, HR coils, ERW pipes, scaffolding systems, steel manufacturing India, billet casting, wire rods, sustainable steel production"
        url="https://rennystrips.com/manufacturing-units"
      />
      <div className="relative flex flex-col font-helvetica">
        {/* ================= BANNER ================= */}
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

        {/* ================= INTEGRATED MANUFACTURING ================= */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="m-6 md:m-10 flex flex-col items-center justify-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-[32px] md:text-[48px] font-bold w-full text-center"
          >
            Integrated Manufacturing
            <motion.div
              variants={fadeUp}
              className="w-64 md:w-125 h-0.5 bg-blue mx-auto rounded-full mb-10 mt-4"
            />
          </motion.h2>

          <motion.h2
            variants={fadeUp}
            className="text-[20px] md:text-[27px] font-bold mb-5 w-full text-center"
          >
            Intelligent Engineering. Infinite Possibilities.
          </motion.h2>

          <motion.p variants={fadeUp} className="text-left mb-10">
            Renny Strips Ltd. operates an integrated steel manufacturing
            ecosystem built for precision, performance and sustainability. Our
            process begins with raw material melting, billet casting and hot
            rolling to produce narrow HR coils and wire rods, forming the base
            for ERW pipes, scaffolding systems, formwork components and forged
            parts. Advanced tubing mills, coating lines and multi-stage
            processing ensure consistent mechanical properties, durability and
            high structural integrity.
          </motion.p>

          <motion.div
            variants={imageZoom}
            className="w-full h-[300px] md:h-[550px] rounded-4xl overflow-hidden mb-10"
          >
            <img src={image} alt="" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={container}
          >
            <motion.p variants={fadeUp} className="text-left mb-5">
              Our in-house design and engineering centre drives product
              innovation through custom component development, 3D CAD modelling,
              structural analysis, reverse engineering and rapid prototyping.
              Powered by AutoCAD, SolidWorks and CAM tools for CNC/VMC
              programming, we ensure seamless integration from design to
              production.
            </motion.p>

            <motion.p variants={fadeUp} className="text-left mb-5">
              With a robust technology backbone, induction furnaces, CCM,
              rolling mills, CNC machines, robotic welding, electro-galvanizing
              facilities and DiFOC-enabled digital furnace control we
              manufacture products across diverse grades (235–460 MPa),
              thicknesses, diameters and profiles. This enables high
              customizability and fast scale-up for varied industry needs.
            </motion.p>

            <motion.p variants={fadeUp} className="text-left mb-5">
              Our integrated framework, internal logistics and stringent quality
              controls ensure efficient processing, precise forming, secure
              packaging and timely dispatch, <br /> delivering high-performance
              steel solutions for global markets.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* ================= UNITS ================= */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full space-y-8 px-6 md:px-10"
        >
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-4"
          >
            {unitsList.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setActiveUnitId(unit.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all  ${
                  activeUnitId === unit.id
                    ? "bg-blue text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {unit.title}
              </button>
            ))}
          </motion.div>

          <motion.div
            variants={imageZoom}
            className="w-full h-[300px] md:h-[500px] rounded-4xl overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentUnit.image}
                src={currentUnit.image}
                alt={currentUnit.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="text-left border-2 w-full md:w-[55%] bg-blue text-white px-5 py-3 rounded-3xl md:rounded-4xl mb-10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentUnit.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-semibold mb-2">
                  {currentUnit.title}
                </h3>
                <p className="text-white leading-relaxed">
                  {currentUnit.address}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* ================= MANUFACTURING PROCESS VIDEO ================= */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="px-6 md:px-10"
        >
          <motion.h2
            variants={fadeUp}
            className="text-[32px] md:text-[48px] font-bold w-full text-center"
          >
            Our Manufacturing Process
            <motion.div
              variants={fadeUp}
              className="w-64 md:w-140 h-0.5 bg-blue mx-auto rounded-full mb-10 mt-4"
            />
          </motion.h2>

          <motion.div
            variants={imageZoom}
            className="w-full h-[300px] md:h-[650px] rounded-4xl overflow-hidden mb-10"
          >
            <video
              muted
              autoPlay
              loop
              playsInline
              src={video}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.section>

        {/* ================= RAW TO REMARKABLE ================= */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="px-6 md:px-10"
        >
          <motion.h2
            variants={fadeUp}
            className="text-[32px] md:text-[48px] font-bold w-full text-center"
          >
            From Raw to Remarkable
            <motion.div
              variants={fadeUp}
              className="w-64 md:w-130 h-0.5 bg-blue mx-auto rounded-full mb-10 mt-4"
            />
          </motion.h2>

          <motion.div
            variants={imageZoom}
            className="w-full h-[300px] md:h-[650px] rounded-4xl overflow-hidden mb-10"
          >
            <video
              src={rawimg}
              alt=""
              autoPlay
              loop
              muted
              className="w-full h-full object-fill"
            />
          </motion.div>
        </motion.section>
        {/*=================  Carbon Footprint  ================= */}
        <section
          ref={ref}
          className="flex flex-col lg:flex-row bg-gray-200  items-center justify-center w-full min-h-screen overflow-hidden "
        >
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:w-[40%] w-full h-auto lg:h-[450px]  flex items-center justify-center px-6 md:px-10 py-16"
          >
            <div className="space-y-16">
              {/* Total Capacity */}
              <motion.div
                onClick={() => setActiveMetric("capacity")}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`text-2xl md:text-4xl text-center w-full max-w-[350px] font-bold border-2 px-5 py-7 rounded-4xl cursor-pointer transition-all
              ${
                activeMetric === "capacity"
                  ? "bg-blue text-white"
                  : "text-gray-900 hover:bg-blue hover:text-white"
              }
            `}
              >
                Total Capacity
                <p className="mt-2 text-3xl">
                  +
                  {activeMetric === "capacity" ? (
                    <CountUp
                      key="capacity"
                      start={0}
                      end={199200}
                      duration={1.8}
                      separator=","
                    />
                  ) : (
                    "199,200"
                  )}{" "}
                  TPA
                </p>
              </motion.div>

              {/* Carbon Footprint */}
              <motion.h2
                onClick={() => setActiveMetric("carbon")}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`text-2xl md:text-4xl text-center w-full max-w-[350px] font-bold leading-relaxed border-2 px-5 py-7 rounded-4xl cursor-pointer transition-all
              ${
                activeMetric === "carbon"
                  ? "bg-blue text-white"
                  : "text-black hover:bg-blue hover:text-white"
              }
            `}
              >
                Carbon Footprint
                <p className="mt-2 text-3xl">
                  +
                  {activeMetric === "carbon" ? (
                    <CountUp
                      key="carbon"
                      start={0}
                      end={77938.18}
                      decimals={2}
                      duration={1.8}
                      separator=","
                    />
                  ) : (
                    "77,938.18"
                  )}{" "}
                  tCO₂e
                </p>
              </motion.h2>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="lg:w-3/4 w-full h-[400px] my-10 lg:h-screen overflow-hidden lg:mr-1"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentMetric.image}
                src={currentMetric.image}
                alt={currentMetric.title}
                className="w-full h-full rounded-4xl object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Manufacturing;
