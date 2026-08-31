import banner from "../../assets/Scaffolding.webm";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../lib/api";
import product1 from "../../assets/productRange1-Coupler.webp";
import product2 from "../../assets/productRange2-Jack.webp";
import product3 from "../../assets/productRange3-Nuts.webp";
import product4 from "../../assets/productRange4-Tube.webp";
import product5 from "../../assets/productRange5-Edge protection system & barriers.webp";
import product6 from "../../assets/productRange6-Formwork accessories.webp";
import product7 from "../../assets/productRange7-Formwork panel.webp";
import product8 from "../../assets/productRange8-Props and shoring systems at work.webp";
import product9 from "../../assets/productRange9- scaffolding system.webp";
import product10 from "../../assets/productRange10-fastner.webp";
import product11 from "../../assets/productRange11-ringlock system.jpg.webp";
import product12 from "../../assets/productRange12-cuplock system.jpg.webp";
import product13 from "../../assets/productRange13-frame scaffolding.webp";
import product14 from "../../assets/productRange14-silver_kwikstage.webp";
import product15 from "../../assets/productRange15-access tower.webp";
import information from "../../assets/Information5-1.webp";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import usePageHero from "../../hooks/usePageHero";
import bannerVideo from "../../assets/Scaffolding.webm";
const ProductRange = () => {
  const [fetchedProducts, setFetchedProducts] = useState({
    range: [],
    scaffoldSystems: [],
    formworkPanel: null,
    propsShoring: null
  });

  const { heroSrc, heroHeading } = usePageHero("product-range", "Scaffolding & Formwork System", bannerVideo);

  useEffect(() => {
    const fetchScaffoldingData = async () => {
      try {
        const baseURL = API_BASE_URL;
        const res = await axios.get(`${baseURL}/api/scaffolding`);
        if (res.data && res.data.success) {
          const allData = res.data.data;

          // Filter by page and section matching ScaffoldingAdmin configs
          // Using more robust filtering (case-insensitive and trimmed)
          const pageData = allData.filter((item) => 
            item.page?.trim().toLowerCase() === "page 1"
          );

          setFetchedProducts({
            range: pageData.filter((item) => 
              item.section?.trim().toLowerCase() === "carousel"
            ),
            scaffoldSystems: pageData.filter((item) => 
              item.section?.trim().toLowerCase() === "scaffolding system" || 
              item.section?.trim().toLowerCase() === "scaffolding systems"
            ),
            formworkPanel: pageData.find((item) => 
              item.section?.trim().toLowerCase() === "formwork panel"
            ),
            propsShoring: pageData.find((item) => 
              item.section?.trim().toLowerCase() === "props & shoring systems" ||
              item.section?.trim().toLowerCase() === "props and shoring systems" 
            ),
          });
        }
      } catch (err) {
        console.error("Error fetching Scaffolding products:", err);
      }
    };
    fetchScaffoldingData();
  }, []);

  const products = [
    { title: "Scaffolding System", image: product9 },
    { title: "Formwork Panel", image: product7 },
    { title: "Props And Shoring Systems", image: product8 },
    { title: "Jack", image: product2 },
    { title: "Coupler", image: product1 },
    { title: "Nuts", image: product3 },
    { title: "Tube", image: product4 },
    { title: "Edge Protection System & Barriers", image: product5 },
    { title: "Formwork Accessories", image: product6 },
    { title: "Fastner", image: product10 },
    { title: "Ringlock Systems", image: product11 },
    { title: "Cuplock Systems", image: product12 },
    { title: "Frame Scaffolding", image: product13 },
    { title: "Kwikstage Systems", image: product14 },
    { title: "Access Towers", image: product15 },
  ];

  const scaffoldSystems = [
    {
      title: "Ringlock Systems",
      description:
        "Versatile, high-load-capacity modular scaffolding for complex structures. Rosette connection enables multi-directional configuration.",
      application:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum modi veniam dicta quam, nam facere adipisci eum facilis tempore debitis.",
      image: product11,
    },
    {
      title: "Cuplock Systems",
      description:
        "Industry-standard quick-connect scaffolding with self-locking cups. Ideal for high-rise buildings and large-scale projects.",
      application:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum modi veniam dicta quam, nam facere adipisci eum facilis tempore debitis.",
      image: product12,
    },
    {
      title: "Frame Scaffolding",
      description:
        "Pre-fabricated walk-through and ladder frames for straightforward access requirements. Quick to erect and dismantle.",
      application:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum modi veniam dicta quam, nam facere adipisci eum facilis tempore debitis.",
      image: product13,
    },
    {
      title: "Kwikstage Systems",
      description:
        "Wedge-lock scaffolding for medium to heavy-duty applications. Known for speed of assembly and structural reliability.",
      application:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum modi veniam dicta quam, nam facere adipisci eum facilis tempore debitis.",
      image: product14,
    },
    {
      title: "Access Towers",
      description:
        "Mobile and static aluminium/steel towers for safe working at height. Used in maintenance, painting, and inspection tasks.",
      application:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum modi veniam dicta quam, nam facere adipisci eum facilis tempore debitis.",

      image: product15,
    },
  ];
  const formworkPanel = {
    title: "Formwork Panel",
    description:
      "Steel formwork panels for casting concrete walls, columns, slabs, and foundations. Available in standard and custom sizes with high reuse cycles.",
    application:
      "Used for wall shuttering, slab casting, columns, and foundation concrete support.",
    image: product7,
  };

  const propsShoring = {
    title: "Props & Shoring Systems",
    description:
      "Adjustable steel props and heavy-duty shoring towers for temporary vertical load support during concrete curing.",
    application:
      "Telescopic adjustment allows precise height control for slab, beam, and elevated support work.",
    image: product8,
  };

  const displayRange =
    fetchedProducts.range?.length > 0 && fetchedProducts.range[0].image
      ? fetchedProducts.range
      : products;
  const displayScaffoldSystems =
    fetchedProducts.scaffoldSystems?.length > 0 && fetchedProducts.scaffoldSystems[0].title
      ? fetchedProducts.scaffoldSystems
      : scaffoldSystems;
  const displayFormworkPanel = (fetchedProducts.formworkPanel && fetchedProducts.formworkPanel.title) ? fetchedProducts.formworkPanel : formworkPanel;
  const displayPropsShoring = (fetchedProducts.propsShoring && fetchedProducts.propsShoring.title) ? fetchedProducts.propsShoring : propsShoring;

  // ================= ANIMATION VARIANTS FOR PRODUCT RANGE SECTIONS =================

  // Parent stagger for repeated section rows
  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  // Standard fade up for headings + text blocks
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 60,
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

  // Left image reveal
  const slideLeft = {
    hidden: {
      opacity: 0,
      x: -80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Right image reveal
  const slideRight = {
    hidden: {
      opacity: 0,
      x: 80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Slight zoom + fade for premium section image feel
  const scaleFade = {
    hidden: {
      opacity: 0,
      scale: 0.94,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: "easeOut",
      },
    },
  };

  // Text content stagger inside each product block
  const textStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  // Alternate row animation helper
  const rowVariant = (index) => ({
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -80 : 80,
      y: 40,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  });

  return (
    <div className="relative w-full overflow-x-hidden font-helvetica">
      {/* ================= BANNER SECTION ================= */}
      <section className="relative h-[50vh] md:h-[100vh] overflow-hidden">
        {heroSrc && (heroSrc.endsWith('.webm') || heroSrc.endsWith('.mp4') || heroSrc.includes('Scaffolding.mp4')) ? (
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
            key={heroSrc || 'fallback'}
            src={heroSrc || bannerVideo}
            alt="Hero Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative z-10 h-full flex items-end px-6 md:px-10 py-12 text-white text-4xl md:text-6xl font-bold">
          {heroHeading}
        </h1>
      </section>
      {/* ================= INTRO SECTION ================= */}
      <section className="w-full bg-white px-20 py-10">
        <div className="px-6 md:px-20">
          <motion.h2
            className="text-[32px] text-blue md:text-[48px] font-bold w-full text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            Product Range
            <div className="w-36 sm:w-24 md:w-70 h-0.5 bg-blue mx-auto rounded-full mb-8 md:mb-10" />
          </motion.h2>
        </div>

        {/* ================= PRODUCTS SECTION ================= */}
        <section className="w-full bg-white ">
          <div className="w-full overflow-hidden">
            <div className="flex w-max animate-scroll gap-6">
              {[...displayRange, ...displayRange].map((product, index) => (
                <div
                  key={`${product._id || product.title}-${index}`}
                  className="relative min-w-[220px] sm:min-w-[240px] md:min-w-[260px] lg:min-w-[280px] h-[200px] rounded-2xl overflow-hidden group cursor-pointer flex-shrink-0"
                >
                  {/* Background Image */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 flex items-end justify-center bg-black/40 z-10 text-center px-4">
                    <h2 className="text-white text-lg md:text-xl mb-5 font-semibold">
                      {product.title}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
      {/* ================= SCAFFOLDING SYSTEM SECTION ================= */}
      <section className="w-full min-h-screen bg-gray-100 px-20 py-12">
        {/* ================= HEADING ================= */}
        <motion.div
          className="px-6 md:px-20"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-[32px] text-blue md:text-[48px] font-bold w-full text-center">
            Scaffolding System
            <div className="w-36 sm:w-24 md:w-90 h-0.5 bg-blue mx-auto rounded-full mb-8 md:mb-10" />
          </h2>
        </motion.div>

        {/* ================= SCAFFOLDING SYSTEM GRID ================= */}
        <motion.div
          className="flex flex-col gap-20 w-full"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {displayScaffoldSystems.map((item, index) => (
            <motion.div
              key={item._id || item.title}
              variants={rowVariant(index)}
              className={`w-full flex flex-col md:flex-row gap-6 items-start ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* IMAGE */}
              <motion.img
                src={item.image}
                alt={item.title}
                variants={scaleFade}
                className="w-full md:w-1/2 rounded-xl h-[320px] object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              />

              {/* CONTENT */}
              <motion.div className="w-full md:w-1/2" variants={textStagger}>
                <motion.h2
                  variants={fadeUp}
                  className="font-bold text-2xl mb-4 mt-2"
                >
                  {item.title}
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  className="text-gray-600 text-lg leading-8 font-normal"
                >
                  {item.description}
                </motion.p>

                <motion.h2
                  variants={fadeUp}
                  className="font-bold text-xl mb-4 mt-2"
                >
                  Application :
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  className="text-gray-600 text-lg leading-8 font-normal"
                >
                  {item.application}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= FORMWORK PANEL ================= */}
      <section className="w-full bg-white px-20 py-12">
        {/* HEADING */}
        <motion.div
          className="px-6 md:px-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-[32px] text-blue md:text-[48px] font-bold w-full text-center">
            Formwork Panel
            <div className="w-36 sm:w-24 md:w-90 h-0.5 bg-blue mx-auto rounded-full mb-8 md:mb-10" />
          </h2>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          className="w-full flex flex-col md:flex-row gap-6 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* IMAGE */}
          <motion.div
            className="w-full md:w-1/2 h-[320px] md:h-[380px] rounded-2xl overflow-hidden"
            variants={slideLeft}
          >
            <motion.img
              src={displayFormworkPanel.image}
              alt={displayFormworkPanel.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          {/* TEXT */}
          <motion.div className="w-full md:w-1/2" variants={textStagger}>
            <motion.h2
              variants={fadeUp}
              className="font-bold text-2xl mb-4 mt-2"
            >
              {displayFormworkPanel.title}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-gray-600 text-lg leading-8"
            >
              {displayFormworkPanel.description}
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-bold text-xl mb-4 mt-6"
            >
              Application :
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-gray-600 text-lg leading-8"
            >
              {displayFormworkPanel.application}
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= PROPS & SHORING ================= */}
      <section className="w-full bg-gray-100 px-20 py-12">
        {/* HEADING */}
        <motion.div
          className="px-6 md:px-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-[32px] text-blue md:text-[48px] font-bold w-full text-center">
            Props & Shoring Systems
            <div className="w-36 sm:w-24 md:w-130 h-0.5 bg-blue mx-auto rounded-full mb-8 md:mb-10" />
          </h2>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          className="w-full flex flex-col md:flex-row-reverse gap-6 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* IMAGE */}
          <motion.div
            className="w-full md:w-1/2 h-[320px] md:h-[380px] rounded-2xl overflow-hidden"
            variants={slideRight}
          >
            <motion.img
              src={displayPropsShoring.image}
              alt={displayPropsShoring.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          {/* TEXT */}
          <motion.div className="w-full md:w-1/2" variants={textStagger}>
            <motion.h2
              variants={fadeUp}
              className="font-bold text-2xl mb-4 mt-2"
            >
              {displayPropsShoring.title}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-gray-600 text-lg leading-8"
            >
              {displayPropsShoring.description}
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-bold text-xl mb-4 mt-6"
            >
              Application :
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-gray-600 text-lg leading-8"
            >
              {displayPropsShoring.application}
            </motion.p>
          </motion.div>
        </motion.div>
      </section>
      {/* ================= Get Detailed Information ================= */}
      <section className="bg-blue text-white w-full py-20 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* LEFT CONTENT */}
        <div className="w-1/2">
          <motion.h2
            className="text-[1.75rem] md:text-[2.5rem] font-bold text-left mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get Detailed Information
            <div className="w-32 ml-8 md:w-100 h-0.5 bg-white rounded-full mt-2" />
          </motion.h2>

          <p className="text-sm md:text-base leading-7 text-gray-100 max-w-2xl">
            Looking for more information? We’re here to help. Reach out and get
            all the answers you need.
          </p>

          <Link
            to="/contact-us"
            className="inline-block px-8 py-4 hover:text-white bg-gray-400 text-black rounded-full mt-8 font-medium hover:scale-105 transition"
          >
            Contact Us
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[520px] h-[320px] md:h-[380px] lg:h-[420px] rounded-3xl overflow-hidden ">
            <img
              src={information}
              alt="Detailed product information"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductRange;
