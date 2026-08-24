// React
import React, { useState } from 'react';

// Icons
import {
  FiCheckCircle,
  FiFileText,
  FiBarChart2,
  FiShield,
  FiHome,
  FiAward,
  FiBriefcase,
  FiDollarSign,
  FiBox,
  FiPackage,
  FiDatabase,
  FiTrendingUp,
  FiInfo,
  FiCheckSquare,
  FiCpu,
  FiClock,
  FiLink2,
  FiChevronLeft,
  FiChevronRight,
  FiGlobe,
  FiTruck,
  FiMapPin,
} from 'react-icons/fi';
import { FiChevronDown } from 'react-icons/fi';
import { FaLeaf, FaQuoteLeft } from 'react-icons/fa';
import { PiColumnsBold, PiSquaresFourBold } from 'react-icons/pi';
// Animation libraries
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

// Image assets
import heroSrc from '../../assets/CBAMHero.webp';
import CBAMImage from '../../assets/CBAM1.webp';
import CBAMImage1 from '../../assets/What Changed in 2026.webp';
import CBAMImage2 from '../../assets/CBAM.svg';
import logo from '../../assets/Co2.webp';
import CostSavingCalculator from '../../assets/CBAM Cost Saving Calculator.webp';
import global from '../../assets/Global_5.webp';
import img1 from '../../assets/1.webp';
import img2 from '../../assets/3.webp';
import HowToComply from '../../assets/How To Comply.webp';
import R from '../../assets/R.webp';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import cbamSchema from "../../schema/cbamSchema";
// import CredentialCard1 from "../../components/CredentialCard1"

// Animation viewport settings
const viewportConfig = {
  once: true,
  amount: 0.25,
};

// Container animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 60, scale: 0.9, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const logoVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: 'easeOut' },
  },
};

const textContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Content animation variants

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const lineExtend = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.2,
      ease: 'easeInOut',
    },
  },
};

const timelineContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3, // Creates the sequential timeline chain effect
    },
  },
};

const slideLeft = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: 'easeOut',
    },
  },
};

const slideRight = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: 'easeOut',
    },
  },
};

// Image animation variants
const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 1.05,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
      delay: 0.5, // Waits slightly for the steps to complete their cycle
    },
  },
};

const imageZoom = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
};

// DATA ARRAYS
const credentials = [
  {
    icon: FiCheckCircle,
    text: (
      <>
        Nearly <span className="font-semibold text-green">40%</span> lower
        emissions than conventional industry benchmarks.
      </>
    ),
  },
  {
    icon: FiAward,
    text: (
      <>
        <span className="font-semibold text-green">22 MW </span>Captive Solar Plant powering 30% of energy needs with renewable power.
      </>
    ),
  },
  {
    icon: FiShield,
    text: (
      <>
        Greenhouse gas emissions independently verified by{' '}
        <span className="font-semibold text-green">TÜV Rheinland.</span>
      </>
    ),
  },
  {
    icon: FiFileText,
    text: (
      <>
        Verified under{' '}
        <span className="font-semibold text-green">ISO 14064-3:2019</span> and
        the Greenhouse Gas Protocol.
      </>
    ),
  },
  {
    icon: FiBarChart2,
    text: (
      <>
        Emission intensity reported at{' '}
        <span className="font-semibold text-green">0.395 tCO₂e</span> per tonne
        for the Steel Division and{' '}
        <span className="font-semibold text-green">0.065 tCO₂e</span> per tonne
        for the Infra Division.
      </>
    ),
  },
];

const cards = [
  {
    icon: FiBriefcase,
    title: 'Conventional Steel\nCarbon Impact',
    value: '~€165.79',
    unit: 'per MT',
    valueColor: 'text-slate-800',
    border: 'border-orange-500',
    iconBg: 'bg-slate-100',
  },
  {
    icon: FiCheckCircle,
    title: 'Renny Green Steel\nCarbon Impact',
    value: '~€48.11',
    unit: 'per MT',
    valueColor: 'text-green',
    border: 'border-green',
    iconBg: 'bg-green/10',
  },
  {
    icon: FiDollarSign,
    title: 'Estimated Savings',
    value: '~€117.67',
    unit: 'per MT',
    valueColor: 'text-blue',
    border: 'border-blue',
    iconBg: 'bg-blue-50',
  },
];

const products = [
  {
    title: 'Structural Steel',
    description:
      'Steel products used in construction, infrastructure, and industrial applications.',
    image: img1,
    Icon: PiColumnsBold, // Clean structural beam representation
  },
  {
    title: 'Construction Material',
    description:
      'Cement and other construction materials essential for building and infrastructure.',
    image: img2,
    Icon: PiSquaresFourBold, // Clean material block layout
  },
];

const stepsData = [
  {
    id: '01',
    title: 'Collect',
    description: 'Capture operational and emissions data seamlessly.',
    icon: FiDatabase,
  },
  {
    id: '02',
    title: 'Monitor',
    description:
      'Track emissions across fuel, electricity, processes, and raw materials.',
    icon: FiTrendingUp,
  },
  {
    id: '03',
    title: 'Verify',
    description:
      'Validate and authenticate product-level carbon footprints digitally.',
    icon: FiShield,
  },
  {
    id: '04',
    title: 'Report',
    description: 'Generate CBAM-ready reports with accuracy and transparency.',
    icon: FiFileText,
  },
];

const featureItems = [
  {
    icon: FiCheckSquare,
    text: (
      <>
        <span className="text-green font-bold">Independently verified</span>{' '}
        emissions reporting.
      </>
    ),
  },
  {
    icon: FiCpu,
    text: (
      <>
        <span className="text-green font-bold">AI-driven</span> monitoring
        systems.
      </>
    ),
  },
  {
    icon: FiClock,
    text: (
      <>
        <span className="text-green font-bold">Real-time</span> operational data
        collection.
      </>
    ),
  },
  {
    icon: FiLink2,
    text: (
      <>
        <span className="text-green font-bold">Digital traceability</span>{' '}
        systems.
      </>
    ),
  },
  {
    icon: FiTrendingUp,
    text: (
      <>
        <span className="text-green font-bold">Automated reporting</span>{' '}
        capabilities that provide quick access to verified emissions insights
        and compliance documentation.
      </>
    ),
  },
];

const mockLogos = {
  tuv: (
    <svg
      viewBox="0 0 100 100"
      className="w-12 h-12 text-[#005A9C]"
      fill="currentColor"
    >
      <path d="M50 15L15 75h70L50 15zm0 18l23 40H27l23-40zM40 60h20v4H40v-4z" />
    </svg>
  ),
  iso: (
    <div className="w-12 h-12 rounded-full bg-[#0a3a60] text-white flex flex-col items-center justify-center font-bold text-[10px] tracking-tighter">
      <span>ISO</span>
      <span className="text-[7px]">14064-3</span>
    </div>
  ),
  ghg: (
    <div className="w-12 h-12 rounded-full border-4 border-green flex items-center justify-center">
      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-green/50 to-green animate-pulse" />
    </div>
  ),
  nisst: (
    <div className="w-12 h-12 bg-[#1e293b] text-[#10b981] font-black rounded flex items-center justify-center text-xs">
      NISST
    </div>
  ),
};

const certData = [
  {
    id: 0,
    logo: mockLogos.tuv,
    title: 'TÜV Rheinland',
    accentText: 'Verified',
    subTitle: 'Greenhouse Gas Assessment.',
    docTitle: 'Verified Greenhouse Gas Assessment',
    docBadge: 'VERIFIED',
    docDesc:
      'Independently verified greenhouse gas emissions assessment for reliable reporting.',
    footerUrl: 'www.tuv.com',
  },
  {
    id: 1,
    logo: mockLogos.iso,
    title: 'ISO 14064-3:2019',
    accentText: 'Verification.',
    subTitle: '',
    docTitle: 'ISO 14064-3:2019 Specification',
    docBadge: 'VERIFICATION',
    docDesc:
      'Verification of greenhouse gas statements for ISO 14064-3:2019 compliance standards.',
    footerUrl: 'www.iso.org',
  },
  {
    id: 2,
    logo: mockLogos.ghg,
    title: 'Greenhouse Gas Protocol',
    accentText: 'Compliance.',
    subTitle: '',
    docTitle: 'GREENHOUSE GAS PROTOCOL',
    docBadge: 'COMPLIANT',
    docDesc:
      'Aligned with the globally recognized Greenhouse Gas Protocol for corporate accounting.',
    footerUrl: 'www.ghgprotocol.org',
  },
  {
    id: 3,
    logo: mockLogos.nisst,
    title: '5-Star Green Steel Manufacturing Rating by',
    accentText: 'NISST',
    subTitle: ', Ministry of Steel, Government of India.',
    docTitle: '5-STAR GREEN STEEL MANUFACTURING RATING',
    docBadge: '★★★★★',
    docDesc:
      'Recognized for excellence in sustainable clean energy steel manufacturing practices.',
    footerUrl: 'www.steel.gov.in',
  },
];

const pillarData = [
  {
    icon: FiGlobe,
    title: 'Global Market Presence',
    description:
      'Serving customers in key international markets with a strong focus on Europe.',
  },
  {
    icon: FiTruck,
    title: 'Export-Ready Ecosystem',
    description:
      'Integrated, efficient, and scalable operations designed to meet global quality and logistics standards.',
  },
  {
    icon: FiFileText,
    title: 'Carbon Transparency',
    description:
      'Providing verified emissions data and clear traceability to support decarbonization and stakeholder trust.',
  },
  {
    icon: FiShield,
    title: 'Compliance-Driven Operations',
    description:
      'Aligned with international regulations and CBAM requirements to ensure seamless compliance across markets.',
  },
];

const testimonialData = [
  {
    id: 0,
    quote:
      "Renny's commitment to quality and CBAM compliance gives us complete confidence. Their transparency and reliability make them a valued partner in our supply chain.",
    name: 'Rajesh Mehta',
    role: 'Head – Procurement',
    company: 'Larsen & Toubro',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 1,
    quote:
      'The real-time emissions data and product-level transparency from Renny have simplified our CBAM reporting and helped us achieve our sustainability goals with complete confidence.',
    name: 'Amit Agarwal',
    role: 'VP – Supply Chain',
    company: 'Tata Projects',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    quote:
      'Consistent quality, on-time delivery, and a strong focus on sustainability—Renny stands out as a partner who truly understands our business and values.',
    name: 'Sandeep Jain',
    role: 'Head – Procurement',
    company: 'Jindal Stainless',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    quote:
      'Their carbon-tracking dashboard sets a new benchmark for corporate transparency. Navigating international regulatory landscape audits has never been more fluid.',
    name: 'Arun Sharma',
    role: 'Director – Sustainability',
    company: 'GMR Group',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  },
];

const faqData = [
  {
    id: 1,
    question: 'Is CBAM a tax?',
    answer:
      'The Carbon Border Adjustment Mechanism (CBAM) functions like a tax on carbon emissions embedded in specific goods imported into the EU, ensuring that foreign products face equivalent carbon pricing to internal EU alternatives.',
  },
  {
    id: 2,
    question: 'How does CBAM work?',
    answer:
      'Importers buy electronic certificates representing the embedded carbon price of their goods. The cost matches the EU Emissions Trading System (ETS) allowance prices, adjusting dynamically for any carbon price already paid in the originating jurisdiction.',
  },
  {
    id: 3,
    question: 'Does CBAM apply to finished goods?',
    answer:
      'CBAM targets iron, steel, cement, aluminum, fertilizers, electricity, and hydrogen, covering both foundational raw substances and select downstream industrial finished goods derived directly from them.',
  },
  {
    id: 4,
    question:
      'Which greenhouse gas emissions are covered under CBAM, and what reporting metrics are used for different product categories?',
    answer:
      'It covers direct emissions released during industrial synthesis alongside specific indirect emissions (like electricity consumed in manufacturing). Importers measure embedded intensity metrics using specific metric tons of CO2 equivalent ($tCO_2e$) per ton of output.',
  },
  {
    id: 5,
    question: 'What CBAM services does RENNY provide?',
    answer:
      'RENNY provides end-to-end software integration to automate direct emission tracking, cross-border supply chain verification matrices, compliance documentation compilation, and real-time ledger auditing tools tailored to international customs standards.',
  },
];

const CredentialCard1 = ({ item, reverse }) => {
  const Icon = item.icon;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{
        scale: 1.03,
        y: -8,
        transition: { duration: 0.35, ease: 'easeOut' },
      }}
      className={`w-[350px] h-[175px] p-6 flex items-center gap-5 bg-white/80 backdrop-blur-md border border-green-100 rounded-[24px] shadow-[0_15px_40px_rgba(16,185,129,0.08)] hover:shadow-[0_25px_60px_rgba(16,185,129,0.18)] transition-all duration-350 ${
        reverse ? 'flex-row-reverse text-right' : ''
      }`}
    >
      {/* Fixed Icon Size */}
      <div className="w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 flex items-center justify-center shadow-inner">
        <Icon size={24} className="text-green-600" />
      </div>

      {/* Centered Text Container */}
      <div className="text-gray-700 text-[18px] leading-[1.6] font-medium max-w-[220px]">
        {item.text}
      </div>
    </motion.div>
  );
};

const CBAM = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCredential, setSelectedCredential] = useState(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % certData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + certData.length) % certData.length);
  };
  const [currentIndex, setCurrentIndex] = useState(1); // Default focused centered element matching image configuration

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonialData.length) % testimonialData.length
    );
  };

  // Helper logic to capture structural viewport positioning (Left side, Centered focus, Right side)
  const getVisibleCards = () => {
    const len = testimonialData.length;
    const leftIndex = (currentIndex - 1 + len) % len;
    const rightIndex = (currentIndex + 1) % len;
    return [
      { ...testimonialData[leftIndex], position: 'left' },
      { ...testimonialData[currentIndex], position: 'center' },
      { ...testimonialData[rightIndex], position: 'right' },
    ];
  };
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <SchemaMarkup schema={cbamSchema} />
      <SEO
        title="Carbon Border Adjustment Mechanism (CBAM) | Renny Strips"
        description="Explore CBAM requirements, its impact on steel imports and how Renny Strips supports European buyers with verified data, traceability and reporting."
        keywords="carbon border adjustment mechanism, CBAM, EU CBAM, CBAM compliance, CBAM steel, CBAM for steel, CBAM India, CBAM requirements, CBAM reporting, CBAM emissions, CBAM carbon emissions, low carbon steel, CBAM-ready steel, steel exports to Europe, carbon compliance, verified emissions data"
        url="https://rennystrips.com/cbam"
        image={heroSrc}
      />

      <div className="relative w-full  overflow-x-hidden font-helvetica">
        {/* Hero Banner */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={imageZoom}
          className="relative h-screen w-full overflow-hidden"
        >
          <img
            src={heroSrc}
            alt="Hero Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />

          <motion.div
            variants={containerVariants}
            className="relative z-10 flex flex-col justify-end h-full px-6 md:px-10 pb-10 max-w-5xl"
          >
            <motion.h1
              variants={fadeUp}
              className="text-white text-4xl md:text-7xl font-bold"
            >
              CBAM-Ready Steel for a Low-Carbon Future
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-white text-lg md:text-2xl max-w-3xl"
            >
              Lower carbon footprint. Verified emissions data. Stronger
              compliance for European imports.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* WHAT IS CBAM */}
        <section className="bg-gray-100 py-10 sm:py-14 lg:py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className=" mx-auto px-4 sm:px-6 lg:px-8"
          >
            <motion.h2
              variants={fadeUp}
              className="text-[32px]  md:text-[48px] font-bold w-full text-center py-3 "
            >
              What is CBAM?
              <div className="w-64 md:w-90 h-0.5 bg-blue mx-auto mt-1" />
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-black-700 text-center md:text-[17px]"
            >
              The Carbon Border Adjustment Mechanism (CBAM) is a European Union
              regulation that imposes carbon-related costs on imported goods
              based on their embedded emissions. It promotes low-carbon
              manufacturing and greater carbon transparency across global supply
              chains.
            </motion.p>

            <motion.div variants={imageReveal} className="my-10">
              <img
                src={CBAMImage}
                alt="Quality Centre Inspection Process"
                className="w-full rounded-3xl h-auto object-contain"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* What Changed in 2026 */}
        <section className="bg-white py-10 sm:py-14 lg:py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className=" mx-auto px-4 sm:px-6 lg:px-8"
          >
            <motion.h2
              variants={fadeUp}
              className="text-[32px]  md:text-[48px] font-bold w-full text-center py-3 "
            >
              What Changed in 2026
              <div className="w-64 md:w-90 h-0.5 bg-blue mx-auto mt-1" />
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-black-700 text-center md:text-[17px]"
            >
              In 2026, the EU CBAM entered full enforcement. Importers must buy
              certificates based on verified emissions using the EU ETS price
              and submit annual declarations. Only authorised declarants can
              import covered goods. A 50-tonne threshold exempts small
              importers, and verified emissions data is now required, making
              accurate reporting essential.
            </motion.p>

            <motion.div variants={imageReveal} className="my-10">
              <img
                src={CBAMImage1}
                alt="What Changed in 2026"
                className="w-full rounded-3xl h-auto object-contain"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* DOES CBAM APPLY TO YOU */}
        <section className="relative bg-[#F5F5F5] py-12 sm:py-16 md:py-24 overflow-hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto px-4 sm:px-6 lg:px-12"
          >
            {/* Top Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-10 md:mb-16 lg:mb-20 items-start">
              <motion.div variants={slideLeft}>
                <motion.h2
                  variants={fadeUp}
                  className="text-3xl mt-20 sm:text-4xl md:text-5xl lg:text-7xl font-bold text-black leading-tight tracking-tight"
                >
                  Does CBAM <br /> Apply To You?
                </motion.h2>
              </motion.div>

              <motion.div variants={slideRight}>
                <motion.p
                  variants={fadeUp}
                  className="text-[#2D334A] text-justify sm:text-xs md:text-lg lg:text-lg max-w-2xl leading-relaxed"
                >
                  CBAM applies to manufacturers and importers exporting products
                  such as structural steel and construction materials to Europe.
                  Under the CBAM Omnibus simplification adopted in October 2025,
                  importers bringing in more than 50 tonnes of CBAM-covered
                  goods (cumulative, per year) must register as authorised CBAM
                  declarants and disclose the embedded emissions of their
                  imports.
                  <br />
                  This replaces the earlier €150-per-consignment exemption with
                  a single mass-based threshold, so exposure is now tied to
                  volume rather than shipment value.
                  <br />
                  If your imports from Renny Strips exceed this threshold,
                  you'll need verified, product-level emissions data which is
                  exactly what our CBAM compliance dashboard is built to
                  provide.
                </motion.p>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              variants={imageReveal}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.4 },
              }}
              className="my-6 md:my-10 overflow-hidden rounded-2xl sm:rounded-3xl"
            >
              <motion.img
                src={CBAMImage2}
                alt="CBAM Compliance"
                className="w-full h-auto object-contain"
                whileHover={{
                  scale: 1.05,
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* CBAM Benefit */}
        <section
          ref={ref}
          className="relative overflow-hidden bg-white min-h-screen flex items-center"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
            <div
              className="absolute right-0 top-0 h-full w-full"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(0,0,0,.08) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative z-10  mx-auto px-6 lg:px-8 w-full"
          >
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* LEFT CONTENT */}
              <motion.div variants={slideLeft}>
                <motion.h2
                  variants={fadeUp}
                  className="text-[32px]  md:text-[48px] font-bold w-full  py-3 "
                >
                  Renny’s CBAM Benefit
                </motion.h2>

                <motion.div
                  variants={fadeUp}
                  className="mt-4 w-[240px] h-[2px] bg-[#CFCFCF] relative"
                >
                  <div className="absolute left-0 top-0 w-14 h-full bg-[#162456]" />
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="mt-8 text-[#2D3652] text-base md:text-lg leading-relaxed"
                >
                  <p>
                   Lower carbon. Greater control. A smarter way to stay CBAM-ready.With 90% of its raw material produced in-house, Renny ensures greater control over quality and consistency while following a sustainable manufacturing approach.
                  </p>

                  <p className="mt-8">
                   Its 22 MW captive solar plant meets 30% of its energy needs, and its steel is 5-Star Green Steel Rated helping customers build a more responsible, lower-carbon and CBAM-ready supply chain.
                  </p>
                </motion.div>
              </motion.div>

              {/* RIGHT CONTENT */}
              <motion.div
                variants={slideRight}
                className="relative flex flex-col items-center justify-center  h-[90vh] text-center"
              >
                {/* TOP LABEL */}
                <motion.p
                  variants={fadeUp}
                  className="text-[12px] tracking-[3px] font-semibold text-green uppercase"
                >
                  Renny Strips' Green Steel
                </motion.p>

                {/* 0.6385 */}
                <motion.div variants={fadeUp} className="mt-1">
                  <h3 className="text-green font-extrabold leading-none text-[65px] md:text-[70px]">
                    {inView && (
                      <CountUp
                        start={0}
                        end={0.6385}
                        decimals={4}
                        duration={2.5}
                      />
                    )}
                  </h3>

                  <div className="text-[#162456] text-[22px] md:text-[24px] font-bold tracking-[2px]">
                    tCO₂/MT
                  </div>
                </motion.div>

                {/* VS */}
                <motion.div
                  variants={fadeUp}
                  className="flex items-center gap-4 my-5 w-full max-w-[280px]"
                >
                  <div className="flex-1 h-[1px] bg-green" />
                  <span className="font-bold text-[#162456] text-[30px]">
                    vs
                  </span>
                  <div className="flex-1 h-[1px] bg-[#9CA3AF]" />
                </motion.div>

                {/* INDUSTRY LABEL */}
                <motion.p
                  variants={fadeUp}
                  className="uppercase tracking-[3px] text-[11px] text-[#80889A] font-semibold"
                >
                  Conventional Industry Average
                </motion.p>

                {/* 2.2 */}
                <motion.div variants={fadeUp}>
                  <h3 className="text-[#081B58] font-extrabold leading-none mt-2 text-[65px] md:text-[70px]">
                    {inView && (
                      <CountUp
                        start={0}
                        end={2.2}
                        decimals={1}
                        duration={2.5}
                      />
                    )}
                  </h3>

                  <div className="text-[#081B58] text-[22px] md:text-[24px] font-bold tracking-[2px]">
                    tCO₂/MT
                  </div>
                </motion.div>

                {/* Divider */}
                <motion.div
                  variants={fadeUp}
                  className="h-10 w-[2px] bg-[#C8CDD5] my-3"
                />

                {/* €118 */}
                <motion.div
                  variants={fadeUp}
                  className="relative flex flex-col items-center mb-20"
                >
                  <div className="absolute -z-10 text-[130px] md:text-[170px] font-black text-[#DDE8DF] leading-none">
                    €{inView && <CountUp start={0} end={118} duration={2.5} />}
                  </div>

                  <p className="mt-10 uppercase tracking-[1.5px] text-green font-bold text-[14px]">
                    Carbon-Linked Import Exposure Reduction
                  </p>

                  <p className="text-[#081B58] text-[36px] md:text-[44px] font-bold leading-tight">
                    per metric ton
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Carbon Credentials */}
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#F9FFFC] via-[#F3FFF7] to-[#ECFEFF]">
          {/* Background Glows */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-green-200/30 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[500px] bg-blue-200/20 rounded-full blur-[100px]" />
          </div>

          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <h2 className="text-[32px]  md:text-[48px] font-bold w-full text-center py-3 ">
              Renny's Carbon Credentials
            </h2>

            <div className="mt-1 flex justify-center">
              <div className="w-136 h-[2px] bg-black relative"></div>
            </div>
          </motion.div>

          <div className="relative max-w-7xl mx-auto px-4 z-10">
            {/* Desktop Balanced Layout with Stagger Animation */}
            <motion.div
              className="hidden lg:block relative h-[650px]"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {/* Logo with Pulsing Glow Animation */}
              <motion.div
                className="absolute inset-0 flex justify-center items-center"
                variants={logoVariant}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="relative"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 bg-green-400/30 blur-[80px] rounded-full"
                  />
                  <img
                    src={logo}
                    alt="Renny Logo"
                    className="w-[500px] relative z-10"
                  />
                </motion.div>
              </motion.div>

              {/* Cards Positioned around Center */}
              <div className="absolute top-0 left-[15%]">
                <CredentialCard1 item={credentials[0]} />
              </div>
              <div className="absolute top-0 right-[15%]">
                <CredentialCard1 item={credentials[2]} />
              </div>
              <div className="absolute top-[40%] -left-5">
                <CredentialCard1 item={credentials[1]} />
              </div>
              <div className="absolute top-[40%] -right-5">
                <CredentialCard1 item={credentials[3]} />
              </div>
              <div className="absolute bottom-0 left-[35%]">
                <CredentialCard1 item={credentials[4]} />
              </div>
            </motion.div>

            {/* Mobile/Tablet Responsive */}
            <div className="lg:hidden space-y-6">
              {credentials.map((item, index) => (
                <CredentialCard1 key={index} item={item} />
              ))}
            </div>
          </div>
        </section>

        <AnimatePresence>
          {selectedCredential && (
            <motion.div
              className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCredential(null)} // Close on backdrop click
            >
              <motion.div
                className="relative bg-white rounded-2xl max-w-xl w-full p-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              >
                {/* Close Icon */}
                <button
                  onClick={() => setSelectedCredential(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
                  aria-label="Close"
                >
                  <FiX size={22} />
                </button>

                <h3 className="text-2xl font-bold mb-6">Carbon Credential</h3>

                <div className="text-gray-700 leading-8">
                  {selectedCredential.text}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cost Saving Calculator */}
        <section className="py-12 bg-white overflow-hidden selection:bg-green/20">
          <div className="max-w-7xl mx-auto sm:px-6">
            {/* Heading */}
            <motion.div
              variants={textContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="text-center mb-10"
            >
              <motion.h2
                variants={fadeUp}
                className="text-[32px]  md:text-[48px] font-bold w-full text-center py-3 "
              >
                CBAM Cost Saving Calculator
                <div className="w-64 md:w-130 h-0.5 bg-blue mx-auto mt-1" />
              </motion.h2>

              {/* Kept this original element but removed heavy styles to let the h2 absolute border handle styling gracefully */}
              <motion.div variants={fadeUp} className="hidden" />

              <motion.p
                variants={fadeUp}
                className="mt-6 text-gray-500 text-sm sm:text-base tracking-wide"
              >
                Real savings through lower carbon emissions.
              </motion.p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid lg:grid-cols-[1fr_1.3fr] gap-6 items-stretch"
            >
              {/* LEFT IMAGE */}
              <motion.div
                variants={slideLeft}
                className="rounded-xl overflow-hidden shadow-sm border border-gray-100 min-h-[340px] lg:min-h-auto relative"
              >
                <motion.img
                  src={CostSavingCalculator}
                  alt="Cost Saving Calculator"
                  className="w-full h-full object-cover absolute inset-0"
                  whileHover={{
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                />
              </motion.div>

              {/* RIGHT SIDE */}
              <motion.div
                variants={slideRight}
                className="flex flex-col justify-between gap-5"
              >
                {/* Top Cards */}
                <motion.div
                  variants={staggerContainer}
                  className="grid sm:grid-cols-3 gap-4"
                >
                  {cards.map((card, index) => {
                    const Icon = card.icon;

                    return (
                      <motion.div
                        key={index}
                        variants={fadeUp}
                        whileHover={{
                          y: -4,
                        }}
                        className={`bg-white rounded-xl border-b-[3px] ${card.border} shadow-sm px-4 py-6 text-center flex flex-col justify-between min-h-[220px]`}
                      >
                        <div>
                          <div
                            className={`w-12 h-12 rounded-full ${card.iconBg} flex items-center justify-center mx-auto mb-4 border border-gray-50`}
                          >
                            <Icon size={22} className="text-[#1d2b4f]" />
                          </div>

                          <h3 className="text-xs font-semibold text-gray-700 tracking-wide leading-tight whitespace-pre-line">
                            {card.title}
                          </h3>
                        </div>

                        <div className="mt-4">
                          <div
                            className={`text-2xl xl:text-3xl font-bold tracking-tight ${card.valueColor}`}
                          >
                            <CountUp
                              end={parseFloat(
                                String(card.value).replace(/[^\d.-]/g, '')
                              )}
                              duration={2}
                              separator=","
                              decimals={
                                String(card.value).includes('.')
                                  ? String(card.value).split('.')[1].length
                                  : 0
                              }
                              prefix="€"
                              enableScrollSpy
                              scrollSpyOnce
                            />
                          </div>

                          <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 mt-0.5">
                            {card.unit}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Bottom Savings */}
                <motion.div
                  variants={fadeUp}
                  whileHover={{
                    scale: 1.005,
                  }}
                  className="rounded-xl border border-green/20 bg-gradient-to-br from-green/20 to-[#f0f4eb] p-6 shadow-sm flex-grow flex items-center"
                >
                  <div className="flex items-center justify-between gap-6 w-full">
                    <div className="flex items-center gap-4 sm:gap-5">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green/20 border border-green/10 flex items-center justify-center shrink-0">
                        <FiHome size={26} className="text-green" />
                      </div>

                      <div>
                        <p className="text-gray-600 text-xs sm:text-sm font-medium tracking-wide">
                          Estimated Savings per 25 MT Export Container
                        </p>

                        <h3 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-green mt-1 tracking-tight">
                          ~
                          <CountUp
                            end={2941.75}
                            duration={2.5}
                            separator=","
                            decimals={2}
                            prefix="€"
                            enableScrollSpy
                            scrollSpyOnce
                          />
                        </h3>
                      </div>
                    </div>

                    <FiPackage
                      size={100}
                      className="text-green/40 hidden md:block shrink-0 stroke-[1.2]"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Footer */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="flex justify-center items-center gap-1.5 mt-8 text-gray-400 text-xs text-center px-4"
            >
              <FiInfo className="text-gray-400 shrink-0" size={14} />

              <p className="leading-normal">
                Savings are indicative and based on current CBAM carbon pricing
                assumptions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Covered Under CBAM */}
        <section className="py-10 bg-gray-100 overflow-hidden">
          <div className=" mx-auto sm:px-6">
            {/* Header */}
            <motion.div
              variants={textContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="text-center mb-14"
            >
              <motion.h2
                variants={fadeUp}
                className="text-[32px]  md:text-[48px] font-bold w-full text-center py-3 "
              >
                Products Covered Under CBAM
                <div className="w-74 md:w-150 h-0.5 bg-blue mx-auto mt-1" />
              </motion.h2>
            </motion.div>

            {/* Cards Grid Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto"
            >
              {products.map((product, index) => {
                const IconComponent = product.Icon;

                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group"
                  >
                    {/* Image Section */}
                    <div className="h-[240px] sm:h-[280px] w-full overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Content Section with Intersecting Floating Badge */}
                    <div className="relative pt-12 pb-10 px-6 sm:px-10 text-center flex-grow flex flex-col items-center bg-white">
                      {/* Absolute Badge Container Intersecting the Image Frame */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="w-16 h-16 rounded-full bg-[#f3f5f9] border-[4px] border-white shadow-md flex items-center justify-center text-[#1d2b4f]">
                          <IconComponent size={24} />
                        </div>
                      </div>

                      {/* Title & Accent underline */}
                      <h3 className="text-xl font-bold text-[#1d2b4f] tracking-tight">
                        {product.title}
                      </h3>

                      <div className="w-8 h-[2px] bg-[#1d2b4f] my-3.5 rounded-full" />

                      {/* Description */}
                      <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                        {product.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* How To Comply - Importer Steps */}
        <section className="bg-white py-10  mx-auto font-sans overflow-hidden">
          {/* Header Section */}
          <motion.div
            className="text-center mb-20 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
          >
            <div className="text-green text-2xl mb-3">
              <FaLeaf />
            </div>
            <h2 className="text-[32px]  md:text-[48px] font-bold w-full text-center py-3 ">
              How To Comply – Importer Steps
              <div className="w-64 md:w-130 h-0.5 bg-blue mx-auto mt-1" />
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-green mt-3 mb-4">
              Every Ton Accounted For. Every Emission Visible.
            </h3>
            <p className="text-slate-500 text-justify max-w-3xl  leading-relaxed text-sm md:text-base">
              Renny's AI-powered emissions platform captures, monitors, and
              verifies carbon data in line with CBAM requirements, delivering
              real-time visibility and product-level traceability.
            </p>
          </motion.div>

          {/* Timeline Steps Section */}
          <motion.div
            className="relative isolate grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 max-w-7xl mx-auto"
            variants={timelineContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {stepsData.map((step, idx) => {
              const IconComponent = step.icon;

              return (
                <motion.div
                  key={step.id}
                  variants={fadeUp}
                  className="relative flex flex-col items-center text-center  px-4"
                >
                  {/* Icon */}
                  <div className="relative mb-5 flex items-center justify-center">
                    <div className="relative z-10 w-20 h-20 rounded-full border-2 border-green bg-white shadow-sm flex items-center justify-center text-green text-2xl">
                      <IconComponent />
                    </div>
                  </div>

                  {/* Connector (Desktop Only) */}
                  {idx < stepsData.length - 1 && (
                    <div className="hidden lg:block absolute top-[40px] left-1/2 w-full pointer-events-none">
                      {/* Left dashed line */}
                      <div className="absolute left-[40px] right-[50%] border-t border-dashed border-green" />

                      {/* Middle dot */}
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-green" />
                      {/* Right dashed line */}
                      <div className="absolute left-[50%] right-0 border-t border-dashed border-green" />
                    </div>
                  )}

                  <span className="mt-2 text-green font-bold tracking-wider text-2xl mb-1">
                    {step.id}
                  </span>

                  <h4 className="text-xl font-bold text-slate-800 mb-3">
                    {step.title}
                  </h4>

                  <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Dashboard Graphic Container */}
          <motion.div
            className="w-full flex justify-center mt-6"
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-900">
              <img
                src={HowToComply}
                alt="Renny CBAM Compliance Dashboard Interface View"
                className="w-full h-auto object-cover block"
              />
            </div>
          </motion.div>
        </section>

        {/* R */}
        <section className="bg-white py-16 px-6 md:px-12 max-w-7xl mx-auto font-sans overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Side: Masked Image / Brand Asset */}
            <motion.div
              className="lg:col-span-5 flex justify-center lg:justify-start"
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <div className="max-w-md lg:max-w-full w-full">
                <img
                  src={R}
                  alt="Renny Brand Identity Landscape Visualization"
                  className="w-full h-auto object-contain block"
                />
              </div>
            </motion.div>

            {/* Right Side: Content & Feature Rows */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Header Typography */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="mb-8"
              >
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight relative mb-4">
                  How Renny Provides Your Data
                  <span className="absolute bottom-[-10px] left-0 w-24 h-[3px] bg-black rounded-full" />
                </h2>
                <p className="text-slate-700 font-medium text-base mt-6">
                  Renny provides data through:
                </p>
              </motion.div>

              {/* List Layout */}
              <motion.div
                className="flex flex-col"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
              >
                {featureItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={slideRight}
                      className="flex items-start py-5 border-b border-slate-100 last:border-0 group"
                    >
                      {/* Circular Icon Shield */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green/10 border border-green/10 flex items-center justify-center text-green text-xl shadow-sm transition-all duration-300 group-hover:bg-green group-hover:text-white mr-5">
                        <IconComponent />
                      </div>

                      {/* Feature Text String */}
                      <p className="text-slate-600 text-[15px] md:text-base pt-2.5 leading-relaxed">
                        {item.text}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Certifications and Documents */}
        <section className="bg-gray-100 py-20 px-6 md:px-12 max-w-7xl mx-auto font-sans overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side Column: Copy Info & Sidebar Triggers */}
            <div className="lg:col-span-5 flex flex-col">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight relative pb-4">
                  Certifications &<br />
                  Verified Documents
                  <span className="absolute bottom-0 left-0 w-20 h-[3px] bg-black rounded-full" />
                </h2>
              </motion.div>

              {/* Verification Sidebar List Rows */}
              <motion.div
                className="space-y-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
              >
                {certData.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    variants={slideLeft}
                    onClick={() => setActiveIndex(index)}
                    className={`flex items-center p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      activeIndex === index
                        ? 'bg-white border-slate-100 shadow-md shadow-slate-100/50'
                        : 'border-transparent hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex-shrink-0 mr-5 bg-white w-14 h-14 rounded-full shadow-sm flex items-center justify-center border border-slate-50">
                      {cert.logo}
                    </div>
                    <p className="text-slate-700 text-sm md:text-[15px] font-medium leading-relaxed">
                      {cert.title}{' '}
                      <span className="text-green font-bold">
                        {cert.accentText}
                      </span>
                      {cert.subTitle && ` ${cert.subTitle}`}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Side Column: Stacked 3D Document Carousel Viewport */}
            <motion.div
              className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[520px] select-none"
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {/* Carousel Track Platform wrapper */}
              <div className="relative w-full max-w-[340px] md:max-w-[400px] h-[450px] flex items-center justify-center">
                {/* Interactive Carousel Cards */}
                {certData.map((cert, index) => {
                  // Calculate positional offset layer index relative to the active selection index
                  let offset = index - activeIndex;
                  if (offset < -1) offset += certData.length;
                  if (offset > certData.length - 2) offset -= certData.length;

                  const isActive = offset === 0;
                  const isLeft = offset === -1;
                  const isRight = offset === 1;
                  const isVisible = isActive || isLeft || isRight;

                  if (!isVisible) return null;

                  return (
                    <motion.div
                      key={cert.id}
                      style={{ transformOrigin: 'center bottom' }}
                      animate={{
                        x: isLeft ? -140 : isRight ? 140 : 0,
                        scale: isActive ? 1 : 0.82,
                        zIndex: isActive ? 30 : 10,
                        opacity: isActive ? 1 : 0.45,
                        rotateY: isLeft ? 12 : isRight ? -12 : 0,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 28,
                      }}
                      className="absolute w-[280px] md:w-[320px] bg-white rounded-2xl shadow-xl border border-slate-100 p-6 flex flex-col items-center text-center h-[440px] pointer-events-none md:pointer-events-auto"
                    >
                      {/* Decorative Frame Border Layout lines */}
                      <div className="absolute inset-2 border border-slate-100 rounded-xl pointer-events-none" />

                      {/* Top Branding Header Anchor */}
                      <div className="mb-6 mt-4 flex justify-center scale-90">
                        {cert.logo}
                      </div>

                      {/* Core Document Form Metadata Labels */}
                      <div className="flex-1 flex flex-col justify-center px-2">
                        <h4 className="text-slate-800 font-bold text-lg md:text-xl leading-snug tracking-tight mb-4">
                          {cert.docTitle}
                        </h4>

                        <div className="mb-5">
                          <span className="inline-block px-8 py-1.5 rounded bg-[#0066cc] text-white font-extrabold text-xs tracking-widest uppercase shadow-sm">
                            {cert.docBadge}
                          </span>
                        </div>

                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed px-1">
                          {cert.docDesc}
                        </p>
                      </div>

                      {/* Bottom Verification Certificate Signature Layout */}
                      <div className="w-full mt-auto border-t border-slate-50 pt-3 flex flex-col items-center">
                        <div className="w-24 h-6 mb-1 opacity-60">
                          <svg
                            viewBox="0 0 100 30"
                            className="w-full h-full text-slate-400 stroke-current fill-none stroke-2"
                          >
                            <path d="M10 20c15-20 20 15 35-5s10-10 25 5 15-25 20-5" />
                          </svg>
                        </div>
                        <span className="text-[10px] text-slate-300 tracking-wider font-mono">
                          {cert.footerUrl}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Left Carousel Control Arrow Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-[-40px] md:left-[-70px] z-40 bg-white hover:bg-slate-50 text-slate-700 p-3 rounded-full shadow-lg border border-slate-100 transition-all active:scale-95"
                  aria-label="Previous certification"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>

                {/* Right Carousel Control Arrow Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-[-40px] md:right-[-70px] z-40 bg-white hover:bg-slate-50 text-slate-700 p-3 rounded-full shadow-lg border border-slate-100 transition-all active:scale-95"
                  aria-label="Next certification"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Pagination Dots Tracker Track */}
              <div className="flex items-center space-x-2.5 mt-6">
                {certData.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveIndex(dotIdx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === dotIdx
                        ? 'w-6 bg-[#0F172A]'
                        : 'w-2 bg-slate-200'
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Global Supply Footprints*/}
        <section className="bg-white py-16 px-4 max-w-7xl mx-auto font-sans overflow-hidden">
          {/* Header Section */}
          <motion.div
            className="text-center mb-16 flex flex-col items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.h2
              variants={fadeUp}
              className="text-[32px]  md:text-[48px] font-bold w-full text-center py-3 "
            >
              Global Supply Footprints
              <div className="w-56 sm:w-74 md:w-120 h-0.5 bg-[#000000] mx-auto rounded-full mb-8 md:mb-10" />
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-slate-600 max-w-4xl text-justify leading-relaxed text-sm md:text-[15px]"
            >
              Renny serves international markets and supports global
              infrastructure, construction, automotive, and industrial
              customers. Its integrated manufacturing ecosystem, export
              readiness, carbon transparency, and compliance-focused operations
              support customers across carbon-regulated markets, particularly
              Europe.
            </motion.p>
          </motion.div>

          {/* 4 Pillar Pillars Section */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-y-0 mb-16 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {pillarData.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className={`flex flex-col items-center text-center px-6 relative ${
                    idx !== 3 ? 'lg:border-r lg:border-slate-200' : ''
                  }`}
                >
                  {/* Soft Green Circled Icon */}
                  <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center text-green text-2xl border border-green/20 shadow-sm mb-4">
                    <IconComponent />
                  </div>

                  <h4 className="text-sm md:text-base font-bold text-emerald-800 mb-2">
                    {pillar.title}
                  </h4>

                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-[240px]">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Map Graphics Canvas Section with Overlay Metrics Floating Footer */}
          <motion.div
            className="w-full flex justify-center mt-6 relative"
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-900 relative">
              <img
                src={global}
                alt="Renny Global Transport Logistics Map Overlay Network"
                className="w-full h-auto object-cover block"
              />

              {/* Embedded Floating Bottom Metrics Strip Dashboard */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-emerald-950/25 backdrop-blur-md rounded-2xl p-4 md:p-6  grid grid-cols-2 lg:grid-cols-4 gap-4 text-white z-10">
                {/* Stat 1 */}
                <div className="flex items-center space-x-3 border-r border-emerald-800/50 pr-2 last:border-0">
                  <div className="text-xl md:text-2xl text-emerald-400">
                    <FiGlobe />
                  </div>
                  <div>
                    <div className="text-sm md:text-xl font-bold">50+</div>
                    <div className="text-[10px] md:text-xs text-emerald-300">
                      Countries Served
                    </div>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex items-center space-x-3 lg:border-r border-emerald-800/50 pr-2 last:border-0">
                  <div className="text-xl md:text-2xl text-emerald-400">
                    <FiMapPin />
                  </div>
                  <div>
                    <div className="text-[11px] md:text-xs font-semibold leading-tight">
                      Strong Presence in
                    </div>
                    <div className="text-xs md:text-sm font-bold text-emerald-300">
                      Europe{' '}
                      <span className="text-[10px] font-normal text-white">
                        and Other Key Markets
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex items-center space-x-3 border-r border-emerald-800/50 pr-2 last:border-0">
                  <div className="text-xl md:text-2xl text-emerald-400">
                    <FiTruck />
                  </div>
                  <div>
                    <div className="text-[11px] md:text-sm font-bold leading-tight">
                      Reliable Global
                    </div>
                    <div className="text-xs md:text-sm font-bold text-emerald-300">
                      Logistics Network
                    </div>
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="flex items-center space-x-3 last:border-0">
                  <div className="text-xl md:text-2xl text-emerald-400">
                    <FaLeaf />
                  </div>
                  <div>
                    <div className="text-[11px] md:text-xs font-semibold leading-tight">
                      Supporting a
                    </div>
                    <div className="text-xs md:text-sm font-bold text-emerald-300">
                      Sustainable{' '}
                      <span className="text-[10px] font-normal text-white">
                        Global Future
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Testimonials */}
        {/* <section className="bg-gray-100 py-20 px-4 max-w-7xl mx-auto font-sans overflow-hidden">
        <motion.div
          className="text-center mb-16 flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-extrabold text-[#1E293B] tracking-tight relative pb-4 mb-6"
          >
            Customer Testimonials
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-[2px] bg-slate-400" />
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-slate-500 max-w-2xl text-center leading-relaxed text-sm md:text-[15px]"
          >
            Hear from global partners who trust Renny for quality, compliance,
            and sustainable steel solutions.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative max-w-6xl mx-auto flex items-center justify-center px-4 md:px-12"
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <button
            onClick={prevSlide}
            className="absolute left-0 md:left-4 z-30 bg-white hover:bg-slate-50 text-slate-700 p-3 rounded-full border border-slate-100 shadow-md transition-all active:scale-95"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 md:right-4 z-30 bg-white hover:bg-slate-50 text-slate-700 p-3 rounded-full border border-slate-100 shadow-md transition-all active:scale-95"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center min-h-[440px]">
            <AnimatePresence mode="popLayout" initial={false}>
              {getVisibleCards().map((item) => {
                const isCenter = item.position === "center";
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: isCenter ? 1 : 0.6,
                      scale: isCenter ? 1.03 : 0.96,
                      y: isCenter ? -4 : 4,
                    }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`bg-white border rounded-3xl p-6 md:p-8 flex flex-col justify-between h-[390px] transition-shadow duration-300 ${
                      isCenter
                        ? "border-slate-100 shadow-xl shadow-slate-100/70 z-20"
                        : "border-slate-100/70 shadow-sm z-10 hidden md:flex"
                    }`}
                  >
                    <div>
                      <div className="text-blue-950 text-3xl mb-4 transform scale-x-[-1]">
                        <FaQuoteLeft />
                      </div>

                      <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed font-normal">
                        {item.quote}
                      </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100/80 flex items-center">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover mr-4 border border-slate-100"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                          {item.role}
                        </p>
                        <p className="text-xs font-bold text-slate-700">
                          {item.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="flex items-center justify-center space-x-2 mt-10">
          {testimonialData.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIndex(dotIdx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === dotIdx
                  ? "w-5 bg-[#0F172A]"
                  : "w-2 bg-slate-200"
              }`}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </section> */}

        {/* FAQ */}
        <section className="bg-white py-20 px-6 md:px-12 max-w-5xl mx-auto font-sans overflow-hidden">
          {/* Centered Heading */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#000000] tracking-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>

          {/* Accordion Rows Wrapper */}
          <motion.div
            className="border-t border-slate-200"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {faqData.map((item) => {
              const isOpen = openId === item.id;

              return (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  className="border-b border-slate-200"
                >
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between py-6 md:py-8 text-left group transition-colors duration-200 hover:text-emerald-600"
                  >
                    <span className="text-sm md:text-[15px] font-bold text-slate-900 pr-6 leading-relaxed group-hover:text-emerald-600 transition-colors duration-200">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="flex-shrink-0 text-slate-500 text-lg md:text-xl group-hover:text-emerald-600"
                    >
                      <FiChevronDown />
                    </motion.div>
                  </button>

                  {/* Collapsible Panel Section */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: {
                            height: { duration: 0.35, ease: 'easeOut' },
                            opacity: { duration: 0.25, delay: 0.05 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.3, ease: 'easeIn' },
                            opacity: { duration: 0.15 },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pr-12 text-slate-500 text-sm md:text-[15px] leading-relaxed font-normal">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default CBAM;
