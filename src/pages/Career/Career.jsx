// ========== Imports ==========
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdSearch,
  MdOutlineBusinessCenter,
  MdFilterList,
  MdLocationOn,
  MdClose,
} from 'react-icons/md';
import SEO from '../../components/SEO';

import { useNavigate } from 'react-router-dom';

// ========== Hooks ==========
import usePageHero from '../../hooks/usePageHero';

// ========== Components ==========
import CareerCarousel from '../../components/CareerCarousel';

// ========== Utilities ==========
import { buildApiUrl } from '../../lib/api';

// ========== Assets ==========
import banner from '../../assets/careerBanner.webp';
import popup from '../../assets/careerPopup2.webp';
// import popup from "../../assets/careerPopup.webp"
import makeUsGreat from '../../assets/Our_People_make_us_Great._IN.webp';
import amazingCulture from '../../assets/Amazing_Culture!_IN.webp';
import wereCertified from "../../assets/We're_Certified!_IN.webp";

// ========== Job Types ==========
const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Trainee'];

// ========== Departments ==========
const departments = [
  'All',
  'Finance',
  'Engineering',
  'IT & Software',
  'Operations',
  'Sales & Marketing',
  'Quality Control',
];

const badgeImages = [
  { src: makeUsGreat, alt: 'Our People make us Great' },
  { src: amazingCulture, alt: 'Amazing Culture' },
  { src: wereCertified, alt: "We're Certified" },
];

const isPrerender =
  typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap';

const Career = () => {
  // ========== Hero Content ==========
  const { heroSrc, heroHeading } = usePageHero('careers', 'Careers', banner);

  // ========== State ==========
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [activeDepartment, setActiveDepartment] = useState('All');

  const [activeType, setActiveType] = useState('Full-time');

  const [search, setSearch] = useState('');
  // Popup state (true so it appears automatically when user visits the page, false during prerendering)
  const [showPopup, setShowPopup] = useState(!isPrerender);

  // Carousel Active Index State (Fixed Reference)
  const [currentSlide, setCurrentSlide] = useState(0);

  // ========== Navigation ==========
  const navigate = useNavigate();

  // ========== Auto-slide for Badge Carousel ==========
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % badgeImages.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  // ========== Fetch Jobs ==========
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(buildApiUrl('/api/career/jobs'));

        if (res.data.success) {
          setJobsData(res.data.data);
        }
      } catch {
        setErrorMessage('We could not load current openings right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
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
        ease: 'easeOut',
      },
    },
  };

  // ========== Filtered Jobs ==========
  const filteredJobs = jobsData.filter((job) => {
    return (
      (activeDepartment === 'All' || job.department === activeDepartment) &&
      job.jobType === activeType &&
      job.title.toLowerCase().includes(search.toLowerCase())
    );
  });
  return (
    <>
      <SEO
        title="Careers at Renny Strips | Steel Manufacturing Jobs"
        description="Explore career opportunities at Renny Strips in steel manufacturing, engineering, production, and industrial innovation."
        keywords="Renny Strips careers, steel jobs, engineering jobs, manufacturing careers"
        url="https://rennystrips.com/careers"
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative z-10 max-w-lg w-full flex items-center justify-center"
            >
              {/* Close (X) Icon Button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#292c44] hover:bg-gray-100 rounded-full transition"
                aria-label="Close modal"
              >
                <MdClose className="text-2xl" />
              </button>

              {/* Popup Image Only */}
              <img
                src={popup}
                alt="Popup Announcement"
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section className="w-full font-helvetica bg-[#f8f9fa] font-helvetica">
        {/* HERO */}
        <section className="relative h-[100vh] md:h-[100vh] overflow-hidden">
          {heroSrc &&
          (heroSrc.endsWith('.webm') || heroSrc.endsWith('.mp4')) ? (
            <video
              key={heroSrc}
              src={heroSrc}
              autoPlay
              loop
              alt="Career Banner"
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <img
              key={heroSrc || 'fallback'}
              src={heroSrc || banner}
              alt="Career Banner"
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
        </section>

        {/* ========== WHERE TALENT MEETS OPPORTUNITY SECTION ========== */}
        <section className="bg-white py-16 md:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            {/* Centered Heading */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-[#292c44] tracking-tight">
                Where Talent Meets Opportunity
              </h2>
            </motion.div>

            {/* Split Grid: Left Text, Right Carousel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Side: Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed text-left"
              >
                <p>
                  At Renny, our people first culture is the foundation of
                  everything we do. We work like a family built on trust,
                  respect, collaboration, and the belief that every voice
                  deserves to be heard.
                </p>
                <p>
                  As a Great Place To Work® Certified organization with 93%
                  employee participation, our workplace reflects the confidence
                  and commitment of our people.
                </p>
                <p>According to LinkedIn’s Cities on the Rise 2026 report, Ludhiana ranks #2 among India’s cities on the rise, reflecting its growing opportunities, dynamic economy, and strong career potential.
Proudly rooted in Ludhiana, Renny Strips Ltd. is growing alongside the city.
Here, growth is more than a business goal,it’s an opportunity for our people to grow with us.
Ludhiana is rising. 
Renny Strips Ltd. is growing. Your career can rise with us.</p>
                <p>
                  Here, you're empowered to learn, grow, lead, and make a
                  meaningful impact.
                </p>
                <p className="font-bold text-[#292c44] text-lg pt-2">
                  Join Renny, where people come first, careers flourish, and the
                  future is built together.
                </p>
              </motion.div>

              {/* Right Side: Image Auto Scroller with 3 Dots */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center w-full"
              >
                {/* Full Coverage Image Slide Container */}
                <div className="relative w-full max-w-lg aspect-[16/10] bg-gray-50 rounded-3xl border border-gray-100 shadow-md overflow-hidden p-0">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide}
                      src={badgeImages[currentSlide].src}
                      alt={badgeImages[currentSlide].alt}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover block"
                    />
                  </AnimatePresence>
                </div>

                {/* Interactive 3 Dots Navigation */}
                <div className="flex items-center gap-3 mt-6">
                  {badgeImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? 'w-8 bg-[#292c44]'
                          : 'w-3 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
          {/* SIDEBAR */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-6 border border-gray-100 h-fit lg:sticky lg:top-24"
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 mb-2">
                <MdSearch /> Search
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jobs"
                className="w-full px-4 py-3 bg-gray-50 rounded-xl font-bold text-sm outline-none"
              />
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 mb-3">
                <MdFilterList /> Department
              </div>
              <div className="flex flex-col gap-2">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setActiveDepartment(dept)}
                    className={`text-left px-4 py-2 rounded-lg font-bold text-sm transition ${
                      activeDepartment === dept
                        ? 'bg-[#292c44] text-white'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 mb-3">
                <MdOutlineBusinessCenter /> Job Type
              </div>
              <div className="flex flex-wrap gap-2">
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase transition ${
                      activeType === type
                        ? 'bg-[#292c44] text-white'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* JOB LIST */}
          <section>
            {errorMessage && (
              <div className="mb-6 rounded-2xl bg-white px-5 py-4 text-sm font-medium text-[#292c44] shadow-sm">
                {errorMessage}
              </div>
            )}
            {loading ? (
              <div className="py-24 text-center text-gray-300 font-bold">
                Loading opportunities…
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="py-24 text-center text-gray-400 font-bold">
                No positions found
              </div>
            ) : (
              <AnimatePresence>
                <div className="flex flex-col gap-6">
                  {filteredJobs.map((job) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-3xl p-8 border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-sm hover:shadow-xl transition"
                    >
                      <div>
                        <h2 className="text-2xl font-bold text-[#292c44]">
                          {job.title}
                        </h2>
                        <p className="text-sm font-bold text-gray-400 uppercase mt-1">
                          {job.department} • {job.jobType} • {job.location}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-xs font-black uppercase text-green-600 bg-green-50 px-3 py-1 rounded-md">
                          <MdLocationOn /> Open
                        </span>
                        <button
                          onClick={() => navigate(`/careers/${job._id}`)}
                          //add hover and tap effects to button
                          className="px-10 py-3 bg-[#292c44] text-white rounded-xl font-bold transition shadow-lg shadow-[#292c44]/20"
                        >
                          Apply
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </section>
        </div>

        {/* Success Stories */}
        {/* <section className="bg-[#eff6ff] py-10">
          <div className=" mx-auto px-6"> */}
        {/* Heading */}
        {/* <motion.h2
              className="text-[32px] md:text-[48px] font-bold mb-5 w-full text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Success Stories
              <div className="w-32 md:w-76 h-0.5 bg-blue mx-auto rounded-full mb-10" />
            </motion.h2>
            <h2 className="text-2xl text-center font-bold text-[#292c44] mb-3">
              Where careers are built to last
            </h2>

            <span className="block max-w-3xl mx-auto text-center text-sm md:text-base text-black leading-relaxed md:leading-7">
              At RENNY Strips, we invest in our people with the same commitment
              we bring to our products. Through hands-on experience,
              collaboration, and real-world challenges, we create an environment
              where talent grows, innovation thrives, and long-term careers are
              built on trust and expertise. Our teams work on meaningful
              projects that shape industries while continuously developing their
              skills, confidence, and professional capabilities.
            </span> */}

        {/* Carousel here */}
        {/* <CareerCarousel />
          </div>
        </section> */}
      </section>
    </>
  );
};

export default Career;
