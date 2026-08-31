import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_BASE_URL } from "../../lib/api";

// Asset Imports
import adoptionSchool from "../../assets/Adoption_School.webp";
import medicalSupport from "../../assets/Medical.webp";
import publicPond from "../../assets/Public_Pond.webp";

const hardcodedProjects = [
  {
    img: medicalSupport,
    title: "Medical Support by Conducting Medical Camps",
    content:
      "In rural areas like Kohora, BPL families often face significant barriers to accessing healthcare. Renny Strips Ltd. is actively addressing this issue by organizing health check-up camps, offering services such as eye check-up, women and children’s nutrition assessments & gynecological check-up for women. Along with these services, Renny Strips Ltd. distributes free medicines and works to raise awareness about healthcare, improving access to essential medical care and promoting better health practices in these",
    infrastructure: [],
    pointsTitle: "Medical Support Details"
  },
  {
    img: publicPond,
    title: "Rainwater Harvesting",
    content:
      "A rainwater harvesting project was initiated through the adoption of a village pond in Raian Village. Another step towards community development. Renny Strips Ltd. has adopted a public pond. Renny is doing complete maintenance of the pond along with Rain Water Harvestation, so that the villagers can get easy access to water for agriculture, irrigation and daily use.",
    infrastructure: [],
    pointsTitle: "Community Development"
  },
];

const FeaturedProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [serverProjects, setServerProjects] = useState([]);

  const fetchEsgProjects = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/esg-projects`);
      const data = res.data?.data || res.data;
      if (Array.isArray(data)) {
        setServerProjects(data);
      }
    } catch (err) {
      console.error("Error fetching ESG projects:", err);
    }
  }, []);

  useEffect(() => {
    fetchEsgProjects();
  }, [fetchEsgProjects]);

  const projects = (() => {
    const mappedServer = serverProjects.map(p => ({
      img: p.img || p.image,
      title: p.title,
      content: p.content || p.description,
      infrastructure: p.points || p.infrastructure || [],
      pointsTitle: p.pointsTitle || "Infrastructure Development",
      order: p.order || 0
    }));

    return [
      ...mappedServer,
      ...hardcodedProjects.filter(h => !mappedServer.some(s => s.title === h.title))
    ].sort((a, b) => (a.order || 0) - (b.order || 0));
  })();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 max-w-[1440px] mx-auto bg-white">
      {/* Header Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
        className="mb-16 flex flex-col items-center"
      >
        <div className="mb-6 w-fit flex flex-col items-center">
          <h2
            className="font-bold pb-2 whitespace-nowrap text-center text-3xl md:text-5xl lg:text-[48px]"
            style={{
              fontFamily: "var(--font-helvetica)",
              lineHeight: "1.2",
              background: "linear-gradient(90deg, #000000 0%, #00A63E 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            Featured Projects
          </h2>
          <div className="w-full h-0.5 bg-blue mx-auto rounded-full mt-1" />
        </div>

        <p
          className="text-[16px] md:text-[18px] text-[#333] text-center max-w-4xl"
          style={{ fontFamily: "var(--font-helvetica)" }}
        >
          Our featured projects showcase real-world actions that involve sustainability, empower communities, and promote responsible growth.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 w-full"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="w-full flex flex-col cursor-pointer group"
            onClick={() => setSelectedProject(project)}
            whileHover={{ y: -8 }}
          >
            {/* ... inside the projects.map loop ... */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[2rem] mb-6 shadow-xl bg-gray-100">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{
                  /* FIX: This ensures the top of the image is visible in the card */
                  objectPosition: project.title.includes("Medical")
                    ? "top"
                    : "center",
                }}
              />

              <div className="absolute inset-0 bg-black/20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2 rounded-full text-white font-bold tracking-wider text-[12px] shadow-xl">
                  READ MORE
                </div>
              </div>
            </div>
            {/* ... rest of the code ... */}
            <h4
              className="text-lg md:text-[20px] font-bold text-center px-4 group-hover:text-[#00A63E] transition-colors duration-300"
              style={{ fontFamily: "var(--font-helvetica)" }}
            >
              {project.title}
            </h4>
          </motion.div>
        ))}
      </motion.div>

      {/* Pop-up Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-[12px]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center transition-all group"
              >
                <span className="text-2xl font-light group-hover:rotate-90 transition-transform duration-300">
                  ✕
                </span>
              </button>

              {/* Left Side: 50% Image (Original/Clear) */}
              <div className="w-full md:w-1/2 h-[350px] md:h-auto overflow-hidden">
                <img
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Side: 50% Content Area */}
              <div className="w-full md:w-1/2 p-8 md:p-14 overflow-y-auto">
                <div className="w-fit mb-8">
                  <h3
                    className="text-3xl md:text-4xl font-bold "
                    style={{
                      fontFamily: "var(--font-helvetica)",
                      background:
                        "linear-gradient(90deg, #000000 0%, #00A63E 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {selectedProject.title}
                  </h3>
                  <div className="w-full h-0.5 bg-blue mx-auto rounded-full mt-1" />
                </div>

                <div
                  className="text-gray-600 text-lg  space-y-6"
                  style={{ fontFamily: "var(--font-helvetica)" }}
                >
                  <p>{selectedProject.content}</p>

                  {/* Infrastructure List with Black Bullets */}
                  {selectedProject.infrastructure &&
                    selectedProject.infrastructure.length > 0 && (
                      <div className="pt-2">
                        <h4 className="text-black font-bold mb-4 text-xl">
                          {selectedProject.pointsTitle || "Infrastructure Development"}
                        </h4>
                        <ul className="space-y-3">
                          {selectedProject.infrastructure.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-[16px]"
                            >
                              {/* Black Bullet Point */}
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedProjects;