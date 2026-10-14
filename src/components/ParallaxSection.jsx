import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import parallaxImg from '../assets/RENNY.webp';
import parallaxImgMobile from '../assets/RENNY-Mobile.webp';


const CinematicParallax = () => {
  const ref = useRef(null);


  // Track scroll progress relative to section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax vertical movement (dramatic)
  const y = useTransform(scrollYProgress, [0, 1], ['-150px', '150px']);

  // Subtle zoom effect on background
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  // Text opacity fade
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Text vertical slide
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative w-full aspect-[1260/452] max-h-[452px] min-h-[220px] overflow-hidden">
      {/* Parallax Image */}
      <div className="absolute inset-0 w-full h-full p-0 md:py-10 md:px-20 flex items-center justify-center">
        <picture className="w-full h-full">
          <source media="(max-width: 767px)" srcSet={parallaxImgMobile} type="image/webp" />
          <source media="(min-width: 768px)" srcSet={parallaxImg} type="image/webp" />
          <motion.img
            src={parallaxImg}
            alt="Renny Strips Parallax Section"
            loading="lazy" // Prevents jump when image finishes downloading
            width="1260"
            height="452"
            className="w-full h-full object-contain pointer-events-none"
            style={{ y, scale }}
          />
        </picture>
      </div>
      {/* Dark overlay for cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

      {/* Bold centered text */}
      <motion.div
        className="relative z-10 flex items-center justify-center h-full"
        style={{ opacity, y: textY }}
      ></motion.div>

      {/* Optional subheading */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center z-10"
        style={{ opacity, y: textY }}
      ></motion.div>
    </section>
  );
};

export default CinematicParallax;
