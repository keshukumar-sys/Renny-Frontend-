import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Asset Imports
import environmentalImg from '../../assets/environment.webp';
import socialImg from '../../assets/Social.webp';
import governanceImg from '../../assets/Governance.webp';

/* --------------------------------------------------------------------------
    REUSABLE ANIMATION COMPONENT: ScrollReveal
    (Included here to prevent "ReferenceError")
-------------------------------------------------------------------------- */
const ScrollReveal = ({ children, delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: delay * 0.15,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </motion.div>
  );
};

/* --------------------------------------------------------------------------
    COMPONENT: SustainabilityPillars
-------------------------------------------------------------------------- */
const SustainabilityPillars = () => {
  const pillars = [
    {
      title: "E - Environmental",
      img: environmentalImg,
      color: "text-[#19d366]",
      offset: false,
      delay: 0.1
    },
    {
      title: "S - Social",
      img: socialImg,
      color: "text-[#292c44]",
      offset: true,
      delay: 0.2
    },
    {
      title: "G - Governance",
      img: governanceImg,
      color: "text-[#19d366]",
      offset: false,
      delay: 0.3
    }
  ];

  return (
    <section className="px-6 pb-20 font-helvetica md:px-16 lg:px-24 md:pb-32 w-full bg-white">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal delay={1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start p-0 md:p-12">
            
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                className={`flex flex-col ${pillar.offset ? "md:mt-24" : ""}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15, 
                  delay: pillar.delay 
                }}
              >
                <h3 
                  className={`${pillar.color} text-2xl md:text-[28px] font-medium mb-6`} 
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  {pillar.title}
                </h3>

                <motion.div 
                  whileHover={{ scale: 1.02 }} 
                  className="cursor-pointer overflow-hidden rounded-2xl shadow-lg border border-gray-100"
                >
                  <img 
                    src={pillar.img} 
                    alt={pillar.title} 
                    className="w-full object-center h-[300px] md:h-[450px]" 
                  />
                </motion.div>
              </motion.div>
            ))}

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SustainabilityPillars;