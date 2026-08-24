// ========== Imports ==========
import { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import axios from "axios";
import { motion } from "framer-motion";

// ========== Components ==========
import InvestorSidebar from "../../components/InvestorSidebar";

// ========== Hooks ==========
import usePageHero from "../../hooks/usePageHero";

import { API_BASE_URL } from "../../lib/api";

const IPOAV = () => {
  // ========== State ==========
  const [videos, setVideos] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // ========== Hero Content ==========
  const { heroSrc, heroHeading } = usePageHero(
    "ipo-audio-visual",
    "IPO Audio Visual",
  );

  // ========== Theme Styles ==========
  const brandColor = "#292C44";

  const mainHeadingFont =
    "font-['Helvetica','Arial',sans-serif] text-2xl lg:text-[37px] font-semibold";

  // ========== Google Drive Preview URL ==========
  const getDrivePreviewUrl = (url) => {
    if (!url) return "";

    const match =
      url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);

    if (!match || !match[1]) return "";

    return `https://drive.google.com/file/d/${match[1]}/preview`;
  };

  // ========== Fetch Videos ==========
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/ipo-av`,
        );

        setVideos(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching IPO videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
      <SEO
        title="IPO Audio Visual | Investor Relations | Renny Strips"
        description="Watch Renny Strips IPO presentations, investor videos, and corporate media for shareholders, investors, and stakeholders."
        keywords="Renny Strips IPO audio visual, investor presentation videos, IPO media, investor relations videos, corporate presentation, shareholder communication"
        url="https://rennystrips.com/ipo-audio-visual"
        image={heroSrc}
      />
      <div className="font-['Helvetica','Arial',sans-serif]">
        {/* Banner */}
        <motion.section
          className="relative h-[50vh] md:h-[100vh] w-full overflow-hidden mb-12"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          {heroSrc &&
          (heroSrc.toLowerCase().endsWith(".webm") ||
            heroSrc.toLowerCase().endsWith(".mp4")) ? (
            <video
              key={heroSrc}
              src={heroSrc}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : heroSrc ? (
            <img
              key={heroSrc}
              src={heroSrc}
              alt="IPO Audio Visual Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : null}

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            className="relative z-10 text-white text-4xl md:text-6xl lg:text-7xl font-bold flex items-end justify-start h-full py-10 px-6 md:px-10"
          >
            {heroHeading}
          </motion.h1>
        </motion.section>

        {/* ---------------- CONTENT ---------------- */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-20 pb-32 bg-white px-6"
        >
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="col-span-1 lg:col-span-8">
              <div
                className="inline-block text-white px-5 py-1.5 rounded-md mb-6 font-semibold text-[13px] tracking-wide"
                style={{ backgroundColor: brandColor }}
              >
                INVESTOR RELATIONS
              </div>

              <h2 className={`${mainHeadingFont} mb-12 text-gray-900`}>
                IPO Audio Visual
              </h2>

              {/* ---------------- VIDEO GRID ---------------- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {isLoading ? (
                  <div className="col-span-full text-gray-400 animate-pulse">
                    Loading library...
                  </div>
                ) : videos.length > 0 ? (
                  videos.map((video, i) => {
                    const url = video?.videoUrl || "";
                    const type = video?.type;

                    return (
                      <motion.div
                        key={video?._id || i}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col"
                      >
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-black">
                          {/* ===== FILE UPLOAD (S3 / LOCAL) ===== */}
                          {type === "file" && url ? (
                            <video
                              controls
                              preload="metadata"
                              playsInline
                              className="w-full h-full object-cover"
                            >
                              <source 
                                src={url} 
                                type={url?.toLowerCase().endsWith(".webm") ? "video/webm" : "video/mp4"} 
                              />
                              Your browser does not support the video tag.
                            </video>
                          ) : type === "link" && url ? (
                            /* ===== EXTERNAL LINK ===== */
                            <iframe
                              src={
                                url.includes("drive.google.com")
                                  ? getDrivePreviewUrl(url)
                                  : url
                              }
                              title={video?.title || "Video"}
                              frameBorder="0"
                              allow="autoplay; encrypted-media"
                              allowFullScreen
                              className="w-full h-full"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-500 italic text-sm">
                              Video link unavailable
                            </div>
                          )}
                        </div>

                        <h3 className="mt-5 text-center text-[16px] font-bold text-gray-800 leading-snug">
                          {video?.title || "Untitled Video"}
                        </h3>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="col-span-full p-10 text-center text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    No audio-visual materials have been uploaded yet.
                  </div>
                )}
              </div>
            </div>

            {/* ---------------- SIDEBAR ---------------- */}
            <div className="col-span-1 lg:col-span-4">
              <InvestorSidebar />
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default IPOAV;
