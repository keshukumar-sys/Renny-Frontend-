// ========== Imports ==========
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import SEO from "../../components/SEO";
import { API_BASE_URL } from "../../lib/api";

// ========== Hooks ==========
import usePageHero from "../../hooks/usePageHero";

// ========== Assets ==========
import designCentreBanner from "../../assets/Design-Center-Banner.webp";
// import designCenterImage from "../../assets/DesignCentre-Frame.webp";
import designCenterImage from "../../assets/DesignCentre-Frame-1.webp";

const DesignCentre = () => {
  // ========== Hero Content ==========
  const { heroSrc, heroHeading } = usePageHero(
    "design-centre",
    "Design Centre",
    designCentreBanner,
  );

  // ========== CMS Page Data ==========
  const [cmsData, setCmsData] = useState(null);

  // ========== API Configuration ==========
  const API_URL = API_BASE_URL;

  const DATA_API = useMemo(() => `${API_URL}/api/design-centre`, [API_URL]);

  // ========== Fetch CMS Data ==========
  const fetchCmsData = useCallback(async () => {
    try {
      const res = await axios.get(DATA_API);

      if (res.data.success && res.data.data) {
        setCmsData(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching Design Centre data:", err);
    }
  }, [DATA_API]);

  // ========== Initial Data Load ==========
  useEffect(() => {
    fetchCmsData();
  }, [fetchCmsData]);

  // ========== Unified Data Object ==========
  const data = useMemo(
    () => ({
      introTitle: cmsData?.introTitle || "Design Centre",

      introParagraphsTop: cmsData?.introParagraphsTop?.length
        ? cmsData.introParagraphsTop
        : [
            "The Design Centre at Renny Strips Ltd is the nucleus of our engineering innovation, enabling the development of highly customized, project-specific solutions in scaffolding, formwork systems, steel structures, solar frameworks, livestock enclosures, and precision tubes. Our in-house design team undertakes a wide spectrum of functions, including custom component development, 3D CAD modeling, structural load and stress analysis, reverse engineering, die and fixture design, as well as product validation through prototyping and pilot runs.",
          ],

      introImage: cmsData?.introImage || designCenterImage,

      introParagraphsBottom: cmsData?.introParagraphsBottom?.length
        ? cmsData.introParagraphsBottom
        : [
            "Equipped with advanced design platforms such as AutoCAD, SolidWorks, and CAM tools for CNC/VMC programming, the centre ensures precise design execution and seamless integration with manufacturing. Our flexible design process allows us to modify material grades (ranging from 235 MPa to 460 MPa), wall thicknesses, diameters, profiles, finishes, and connection mechanisms delivering fully engineered systems rather than off-the-shelf components. Close collaboration with in-house forging, fabrication, and tube-forming teams ensures rapid transition from concept to production, while custom-developed Poka-Yoke fixtures and gauges guarantee quality, consistency, and repeatability in every solution we deliver.",
          ],

      stats: cmsData?.stats?.length
        ? cmsData.stats
        : [
            { title: "Total Number of Engineers", desc: "Lorem" },
            { title: "Total number of Products", desc: "100+ SKUs" },
          ],

      innovationHeading:
        cmsData?.innovationHeading || "Strive to be Pioneer in Innovation",

      innovationParagraphs: cmsData?.innovationParagraphs?.length
        ? cmsData.innovationParagraphs
        : [
            "Renny Strips Limited continues to strengthen its leadership in innovation by deploying advanced manufacturing technologies across its integrated structural production facilities. The Company operates modern continuous rolling mills for precise dimensional control, automated ERW pipe lines for high-strength tubular products, CNC-based cutting and bending systems for improved accuracy, and robotic welding facilities to ensure consistent weld quality, higher productivity, and enhanced structural integrity. These systems are supported by automated material handling solutions and advanced quality inspection equipment, enabling tighter tolerances, reduced rework, and improved yield efficiency. In addition, the commissioning of a 22 MW solar power plant reflects the Company’s focus on energy-efficient operations and sustainable manufacturing. Through continuous technological upgrades and process optimisation, Renny Strips Limited remains committed to delivering high-performance structural solutions while setting new benchmarks in efficiency, quality, and environmental responsibility.",
          ],
    }),
    [cmsData],
  );

  // ========== Animation Variants ==========
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
      {" "}
      <SEO
        title="Design Centre | Renny Strips Limited Design Centre for steel innovation"
        description="Explore Renny Strips Limited’s Design Centre for steel innovation, engineering expertise, customized products, and advanced manufacturing solutions."
        keywords="Design Centre, Renny Strips Limited, steel innovation, engineering solutions, customized steel products, product development, manufacturing excellence"
        url="https://rennystrips.com/design-centre"
      />
      <section className="w-full font-helvetica  bg-gray-100 text-[#292c44]">
        {/* ---------------- HERO ---------------- */}
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

        {/* ---------------- INTRO SECTION ---------------- */}
        <section className="w-full bg-gray-100 py-16 px-6 md:px-10 lg:px-16">
          {/* Heading */}
          <motion.h2
            className="text-[32px] md:text-[48px] font-bold mb-10 w-full text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {data.introTitle}
            <div className="w-48 md:w-70 h-0.5 bg-blue mx-auto rounded-full mb-10" />
          </motion.h2>

          {/* Top Paragraphs */}
          <div className="space-y-6">
            {data.introParagraphsTop.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                className="text-black-700   "
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="my-10"
          >
            <img
              src={data.introImage}
              alt="Design Centre Innovation"
              className="w-full h-auto object-contain max-h-[650px] mx-auto rounded-4xl shadow-xl"
            />
          </motion.div>

          {/* Bottom Paragraphs */}
          <div className="space-y-6">
            {data.introParagraphsBottom.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                className="text-black-700 md:text-[17px]  "
              >
                {para}
              </motion.p>
            ))}
          </div>
        </section>

        {/* ---------------- INNOVATION SECTION ---------------- */}
        <section className="w-full bg-white py-16 px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[25%_70%] gap-16 items-start">
            {/* LEFT SIDE */}
            <div className="flex flex-col gap-12">
              {data.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  className="relative w-full max-w-xs group"
                >
                  <div className="absolute -bottom-4 -left-4 w-full h-full bg-[#292c44] transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
                  <div className="relative bg-[#292c44] text-white px-8 py-10 shadow-lg">
                    <p className="uppercase text-lg font-bold tracking-wide mb-4">
                      {stat.title}
                    </p>
                    <p className="text-lg  text-white/80">{stat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[32px] md:text-[42px] font-semibold text-black mb-6">
                {data.innovationHeading}
              </h2>

              <div className="space-y-6 mb-8">
                {data.innovationParagraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-gray-700 text-sm md:text-[17px]  "
                  >
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </section>
    </>
  );
};

export default DesignCentre;
