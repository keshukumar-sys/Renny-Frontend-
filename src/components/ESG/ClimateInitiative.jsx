import React from 'react';
import { motion } from 'framer-motion';

// Asset Imports
import initiativeLeaf from '../../assets/Initaitive_Leaf.webp';
import goodLifeImg from '../../assets/Good_Life.webp';

const ClimateInitiative = () => {
  // Animation Variants
  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      
      {/* 4. Climate Action Initiative Section */}
      <section className="py-20 px-6 md:px-16 lg:px-24 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-12 lg:gap-24">
          
          {/* Text Left - Increased width for more content */}
          <motion.div 
            className="w-full md:w-3/5 flex flex-col items-start text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={slideInLeft}
          >
            <div className="mb-8 w-fit">
              <h2 
                className="font-bold pb-2 text-3xl md:text-5xl lg:text-[48px]"
                style={{ 
                  fontFamily: 'var(--font-helvetica)', 
                  background: "linear-gradient(90deg, #000000 0%, #00A63E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                Climate Action Initiative
              </h2>
              {/* Reference Underline Style */}
              <div className="w-full h-0.5 bg-blue mx-auto rounded-full mt-1" />
            </div>

            <p className="text-[16px] md:text-[18px]  text-[#333] " style={{ fontFamily: 'var(--font-helvetica)' }}>
           Renny Strips Limited advances climate action through sustainable manufacturing, vertically integrated operations, and renewable energy adoption. Its 22 MW captive solar power plant currently meets nearly 30% of the Company's energy requirement, helping reduce carbon emissions and strengthen its commitment to cleaner steel production. Recognized with a 5-Star Green Steel Rating by the Ministry of Steel, Government of India, Renny continues to align with global sustainability initiatives, including CBAM, to support a more sustainable and low-carbon industrial future.
            </p>
          </motion.div>

          {/* Image Right - Slightly smaller to prioritize text area */}
          <motion.div 
            className="w-full md:w-2/5 flex justify-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={slideInRight}
          >
            <div className="overflow-hidden rounded-2xl shadow-xl w-full">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                src={initiativeLeaf} 
                alt="Climate Initiative" 
                className="w-full object-cover h-[300px] md:h-[450px] cursor-pointer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Shaping A Good Life Section */}
      <section className="py-20 px-6 md:px-16 lg:px-24 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-12 lg:gap-24">
          
          {/* Text Left */}
          <motion.div 
            className="w-full md:w-3/5 flex flex-col items-start text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={slideInLeft}
          >
            <div className="mb-8 w-fit">
              <h2 
                className="font-bold pb-2 text-3xl md:text-5xl lg:text-[48px]"
                style={{ 
                  fontFamily: 'var(--font-helvetica)', 
                  background: "linear-gradient(90deg, #000000 0%, #00A63E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                Shaping A Good Life
              </h2>
              {/* Reference Underline Style */}
              <div className="w-full h-0.5 bg-blue mx-auto rounded-full mt-1" />
            </div>

            <p className="text-[16px] md:text-[18px] text-[#333] " style={{ fontFamily: 'var(--font-helvetica)' }}>
              Renny’s commitment to a Better, Greener & Stronger Community is evident through various initiatives, from public asset building to healthcare. These efforts reflect Renny’s deep dedication to uplifting the community and fostering sustainable development. As we grow, our focus remains on providing meaningful support and creating infrastructure that serves generations to come.
            </p>
          </motion.div>

          {/* Image Right */}
          <motion.div 
            className="w-full md:w-2/5 flex justify-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={slideInRight}
          >
            <div className="overflow-hidden rounded-2xl shadow-xl w-full">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                src={goodLifeImg} 
                alt="Shaping Good Life" 
                className="w-full object-cover h-[300px] md:h-[450px] cursor-pointer"
              />
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ClimateInitiative;