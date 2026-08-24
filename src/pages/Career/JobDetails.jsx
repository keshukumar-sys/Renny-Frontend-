// ========== Imports ==========
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../../components/SEO";

import axios from "axios";

import { motion } from "framer-motion";

import { MdWorkOutline, MdCurrencyRupee, MdBusiness } from "react-icons/md";

// ========== Utilities ==========
import { buildApiUrl } from "../../lib/api";

// ========== Assets ==========
import banner from "../../assets/careerBanner.webp";

const JobDetails = () => {
  // ========== Route Params ==========
  const { jobId } = useParams();

  // ========== State ==========
  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  const [loadError, setLoadError] = useState("");

  // ========== Fetch Job Details ==========
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);

        const res = await axios.get(buildApiUrl("/api/career/jobs"));

        if (res.data.success) {
          const foundJob = res.data.data.find((j) => j._id === jobId);

          setJob(foundJob);
        }
      } catch {
        setLoadError("We could not load this job right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  // ========== Loading State ==========
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-pulse text-[#292c44] font-bold">
          Loading Position Details...
        </div>
      </div>
    );
  }

  // ========== Error State ==========
  if (!job) {
    return (
      <div className="min-h-screen font-helvetica flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-400">
            {loadError || "Position Not Found"}
          </h2>

          <Link to="/careers" className="text-blue-600 underline mt-4 block">
            Back to Job Board
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      {" "}
      <SEO
        title={`${job.title} Job Opening | Careers at Renny Strips`}
        description={`Apply for the ${job.title} role at Renny Strips. Explore opportunities in ${job.department}, steel manufacturing, engineering, and operations.`}
        keywords={`${job.title}, ${job.department} jobs, Renny Strips careers, steel manufacturing jobs, industrial jobs India, engineering careers, production jobs`}
        url={`https://rennystrips.com/careers/${jobId}`}
        image="https://rennystrips.com/og-careers.jpg"
      />
      <section className="w-full font-helvetica bg-gray-100 ">
        {/* Banner */}
        <motion.section
          className="relative h-[50vh] md:h-[100vh] w-full overflow-hidden mb-12"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <img
            src={banner}
            alt="Career Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            className="relative z-10 text-white text-4xl md:text-6xl lg:text-7xl font-bold flex items-end justify-start h-full py-10 px-6 md:px-10"
          >
            Job Details
          </motion.h1>
        </motion.section>

        <div className="max-w-4xl mx-auto text-center mb-20 px-4">
          {/* ================= HEADER ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">
              {job.department}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 text-[#292c44]">
              {job.title}
            </h2>
          </motion.div>

          {/* ================= GRID 1 : JOB INFO ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-12"
          >
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
                Job Type
              </p>
              <div className="flex items-center justify-center gap-2 font-bold text-[#292c44]">
                <MdWorkOutline />
                {job.jobType}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
                Salary Range
              </p>
              <div className="flex items-center justify-center gap-2 font-bold text-green-600">
                <MdCurrencyRupee />
                {job.salary || "Disclosed on Interview"}
              </div>
            </div>

            <Link
              to={`/careers/${jobId}/apply`}
              className="justify-self-center md:justify-self-end"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-3 bg-[#292c44] text-white rounded-xl font-bold transition shadow-lg shadow-[#292c44]/20"
              >
                Apply Now
              </motion.button>
            </Link>
          </motion.div>

          {/* ================= GRID 2 : CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-12 text-left w-full"
          >
            {/* About Company */}
            <div className="mb-10">
              <h2 className="flex items-center gap-2 text-lg font-bold mb-4 text-[#292c44]">
                <MdBusiness className="text-blue-500" /> About Company
              </h2>
              {/* whitespace-pre-wrap is critical here to show paragraphs */}
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                {job.aboutCompany}
              </p>
            </div>

            {/* Detailed Job Description */}
            <div className="mb-12">
              <h3 className="text-lg font-bold mb-4 text-[#292c44]">
                Position Overview
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                {job.description}
              </p>
            </div>

            {/* Bottom Apply Button */}
            <div className="flex flex-col items-center pt-8 border-t border-gray-50">
              <p className="text-sm text-gray-400 mb-6 italic">
                Ready to make an impact? We're looking for talent like you.
              </p>
              <Link to={`/careers/${jobId}/apply`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-[#292c44] text-white rounded-2xl font-black uppercase tracking-widest text-xs transition shadow-xl shadow-[#292c44]/20"
                >
                  Send Application
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default JobDetails;
