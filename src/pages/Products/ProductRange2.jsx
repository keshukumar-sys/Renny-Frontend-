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
const ProductRange2 = () => {
  const [fetchedData, setFetchedData] = useState({
    range: [],
    products: []
  });

  const { heroSrc, heroHeading } = usePageHero("product-range-2", "Scaffolding & Formwork System", bannerVideo);

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
            item.page?.trim().toLowerCase() === "page 2"
          );

          setFetchedData({
            range: pageData.filter((item) => 
              item.section?.trim().toLowerCase() === "carousel"
            ),
            products: pageData.filter((item) => 
              item.section?.trim().toLowerCase() === "product list"
            ),
          });
        }
      } catch (err) {
        console.error("Error fetching Scaffolding products (Range 2):", err);
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
  
  const ScaffoldingProducts = [
    {
      title: "Couplers",
      description:
        "Swivel, fixed, and sleeve couplers for connecting scaffold tubes at various angles. Drop-forged or pressed steel construction for maximum grip strength.",
      application:
        "Used for connecting scaffold tubes securely at multiple angles in scaffolding structures.",
      image: product1,
    },
    {
      title: "Jacks",
      description:
        "Base jacks and U-head jacks for height adjustment and load distribution at the base and top of scaffolding systems. Precision-threaded for fine adjustment.",
      application:
        "Provides accurate height adjustment and stable load transfer in scaffolding and shoring systems.",
      image: product2,
    },
    {
      title: "Nuts",
      description:
        "Wing nuts, prop nuts, and tie rod nuts engineered for secure fastening across scaffolding and formwork assemblies.",
      application:
        "Used for tightening and fastening scaffold and formwork components safely.",
      image: product3,
    },
    {
      title: "Tubes",
      description:
        "Scaffold tubes manufactured from in-house ERW pipe mills. Available in standard 48.3 mm OD as well as custom diameters. Hot-dip galvanised options available.",
      application:
        "Main structural members used in scaffolding systems, support frames, and access platforms.",
      image: product4,
    },
    {
      title: "Edge Protection Systems & Barriers",
      description:
        "Guardrail systems, toe boards, and mesh barriers for fall prevention and perimeter safety on construction sites. Compliant with site safety regulations.",
      application:
        "Used for perimeter protection, fall prevention, and safe working platforms at elevated heights.",
      image: product5,
    },
    {
      title: "Formwork Accessories",
      description:
        "Tie rods, wing nuts, wedge bolts, waler plates, and other ancillary components for secure formwork assembly and alignment.",
      application:
        "Supports safe formwork alignment, concrete wall shuttering, and secure assembly.",
      image: product6,
    },
    {
      title: "Formwork Panel",
      description:
        "Steel formwork panels for casting concrete walls, columns, slabs, and foundations. Available in standard and custom sizes with high reuse cycles.",
      application:
        "Used for wall shuttering, slab casting, columns, and foundation concrete support.",
      image: product7,
    },
    {
      title: "Props & Shoring Systems",
      description:
        "Adjustable steel props and heavy-duty shoring towers for temporary vertical load support during concrete curing.",
      application:
        "Telescopic adjustment allows precise height control for slab, beam, and elevated support work.",
      image: product8,
    },
    {
      title: "Scaffolding Systems",
      description:
        "Heavy-duty modular scaffolding systems for safe access, support, and elevated work across industrial and construction sites.",
      application:
        "Used for temporary platforms, access systems, facade work, and industrial maintenance.",
      image: product9,
    },
    {
      title: "Fasteners",
      description:
        "Bolts, nuts, washers, and pins specifically designed for scaffolding and formwork connections. High-tensile grades for structural reliability.",
      application:
        "Used for strong mechanical fastening in scaffold joints and formwork structures.",
      image: product10,
    },
    {
      title: "Ringlock System",
      description:
        "Modular ringlock scaffolding system with high load-bearing capacity and quick assembly for complex structures.",
      application:
        "Ideal for industrial plants, bridges, high-rise buildings, and circular structures.",
      image: product11,
    },
    {
      title: "Cuplock System",
      description:
        "Versatile cuplock scaffolding system designed for fast erection and dismantling with robust load support.",
      application:
        "Used in slab support, facade scaffolding, access towers, and construction staging.",
      image: product12,
    },
    {
      title: "Frame Scaffolding",
      description:
        "Lightweight and durable frame scaffolding system suitable for construction, plastering, and maintenance work.",
      application:
        "Used in residential, commercial, and painting applications.",
      image: product13,
    },
    {
      title: "Kwikstage System",
      description:
        "Strong and reliable kwikstage scaffolding system for quick setup and safe elevated access.",
      application:
        "Suitable for facade work, bridge access, and industrial shutdown maintenance.",
      image: product14,
    },
    {
      title: "Access Tower",
      description:
        "Mobile and fixed access towers designed for safe vertical access during maintenance and installation tasks.",
      application:
        "Used for electrical, ceiling, HVAC, and maintenance work at height.",
      image: product15,
    },
  ];

  const displayRange =
    fetchedData.range?.length > 0 && fetchedData.range[0].image
      ? fetchedData.range
      : products;
  const displayScaffoldingProducts =
    fetchedData.products?.length > 0 && fetchedData.products[0].title
      ? fetchedData.products
      : ScaffoldingProducts;
  const fadeUpSection = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 },
  };

  const headingReveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6 },
  };

  const underlineGrow = {
    initial: { width: 0 },
    whileInView: { width: "100%" },
    viewport: { once: true },
    transition: { duration: 0.7, delay: 0.2 },
  };

  const imageReveal = (index) => ({
    initial: {
      opacity: 0,
      x: index % 2 === 0 ? -80 : 80,
      scale: 0.95,
    },
    whileInView: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7 },
  });

  const textReveal = (index) => ({
    initial: {
      opacity: 0,
      x: index % 2 === 0 ? 80 : -80,
    },
    whileInView: {
      opacity: 1,
      x: 0,
    },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, delay: 0.15 },
  });

  const textFadeSequence = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay },
  });

  const imageHoverEffect = {
    whileHover: {
      scale: 1.02,
      rotate: 0.3,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    },
  };
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

      {displayScaffoldingProducts.map((product, index) => (
        <motion.section
          key={product._id || index}
          className={`w-full px-6 md:px-20 py-12 ${
            index % 2 === 0 ? "bg-white" : "bg-gray-100"
          }`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {/* ================= HEADING ================= */}
          <div className="px-2 md:px-10">
            <motion.div
              className="w-full text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block">
                <h2 className="text-[30px] md:text-[48px] text-blue font-bold">
                  {product.title}
                </h2>

                {/* Animated underline */}
                <motion.div
                  className="h-0.5 bg-blue rounded-full mt-2 mb-8 md:mb-10"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                />
              </div>
            </motion.div>
          </div>

          {/* ================= CONTENT ================= */}
          <div
            className={`w-full flex flex-col gap-6 items-start ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* ================= IMAGE ================= */}
            <motion.div
              className="w-full md:w-1/2 h-[320px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg"
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -80 : 80,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              whileHover={{
                scale: 1.02,
                rotate: 0.3,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition duration-700 hover:scale-110"
              />
            </motion.div>

            {/* ================= TEXT ================= */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? 80 : -80,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <motion.h2
                className="font-bold text-2xl md:text-3xl mb-4 mt-2 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {product.title}
              </motion.h2>

              <motion.p
                className="text-gray-600 text-base md:text-lg leading-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {product.description}
              </motion.p>

              <motion.h3
                className="font-bold text-xl md:text-2xl mb-4 mt-6 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Application :
              </motion.h3>

              <motion.p
                className="text-gray-600 text-base md:text-lg leading-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {product.application}
              </motion.p>
            </motion.div>
          </div>
        </motion.section>
      ))}
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

export default ProductRange2;
