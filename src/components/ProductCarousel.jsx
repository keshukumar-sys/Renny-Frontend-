import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

// images (keep yours)
import MS from '../assets/product-1.webp';
import Scaffolding from '../assets/product-2.webp';
import ERW from '../assets/product-3.webp';
import Coil from '../assets/hr-coil.webp';
import rods from '../assets/product-5.webp';

// mobile-optimized images
import MS_Mobile from '../assets/product-1-Mobile.webp';
import Scaffolding_Mobile from '../assets/product-2-Mobile.webp';
import ERW_Mobile from '../assets/product-3-Mobile.webp';
import Coil_Mobile from '../assets/hr-coil-Mobile.webp';
import rods_Mobile from '../assets/product-5-Mobile.webp';

const ProductCarousel = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  // Commented out old products array to preserve history:
  /*
  const products = [
    {
      title: 'ERW Pipes & Tubes',
      image: ERW,
      mobileImage: ERW_Mobile,
      link: '/erw-pipes-and-tubes',
      desc: 'Electric Resistance Welded pipes& tubes for infrastructure, construction, and fluid transport ',
    },
    {
      title: 'Scaffolding & Formwork Systems',
      image: Scaffolding,
      mobileImage: Scaffolding_Mobile,
      link: '/scaffolding-formwork',
      desc: 'Engineered support systems for safe and efficient construction sites ',
    },
    {
      title: 'HR Coils',
      image: Coil,
      mobileImage: Coil_Mobile,
      link: '/narrow-hrcoil',
      desc: 'Hot-rolled coils for pipes, tubes, and fabrication applications',
    },
    {
      title: 'Wire Rods',
      image: rods,
      mobileImage: rods_Mobile,
      link: '/wire-rods',
      desc: 'Precision-drawn wire rods for construction and industrial use',
    },
    {
      title: 'MS Billets',
      image: MS,
      mobileImage: MS_Mobile,
      link: '/ms-billets',
      desc: 'High-grade mild steel billets for downstream rolling and structural applications',
    },
  ];
  */

  const products = [
    {
      title: 'ERW Pipes & Tubes',
      image: ERW,
      mobileImage: ERW_Mobile,
      link: '/erw-pipes-and-tubes',
      desc: 'Electric Resistance Welded pipes& tubes for infrastructure, construction, and fluid transport ',
      width: 1264,
      height: 842,
      mobileWidth: 948,
      mobileHeight: 631,
    },
    {
      title: 'Scaffolding & Formwork Systems',
      image: Scaffolding,
      mobileImage: Scaffolding_Mobile,
      link: '/scaffolding-formwork',
      desc: 'Engineered support systems for safe and efficient construction sites ',
      width: 1365,
      height: 768,
      mobileWidth: 819,
      mobileHeight: 460,
    },
    {
      title: 'HR Coils',
      image: Coil,
      mobileImage: Coil_Mobile,
      link: '/narrow-hrcoil',
      desc: 'Hot-rolled coils for pipes, tubes, and fabrication applications',
      width: 1536,
      height: 1024,
      mobileWidth: 703,
      mobileHeight: 469,
    },
    {
      title: 'Wire Rods',
      image: rods,
      mobileImage: rods_Mobile,
      link: '/wire-rods',
      desc: 'Precision-drawn wire rods for construction and industrial use',
      width: 1365,
      height: 768,
      mobileWidth: 704,
      mobileHeight: 396,
    },
    {
      title: 'MS Billets',
      image: MS,
      mobileImage: MS_Mobile,
      link: '/ms-billets',
      desc: 'High-grade mild steel billets for downstream rolling and structural applications',
      width: 1365,
      height: 768,
      mobileWidth: 819,
      mobileHeight: 460,
    },
  ];

  // 🔹 Scroll to slide
  const scrollToIndex = (index) => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.offsetWidth;

    container.scrollTo({
      left: index * width,
      behavior: 'smooth',
    });
  };

  // 🔹 Buttons
  const nextSlide = () => {
    const next = currentIndex + 1 >= products.length ? 0 : currentIndex + 1;

    setCurrentIndex(next);
    scrollToIndex(next);
  };

  const prevSlide = () => {
    const prev = currentIndex - 1 < 0 ? products.length - 1 : currentIndex - 1;

    setCurrentIndex(prev);
    scrollToIndex(prev);
  };
  // 🔹 Sync index on manual scroll (optimized)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const width = container.offsetWidth;
          if (width === 0) return;

          const index = Math.round(container.scrollLeft / width);
          setCurrentIndex(index);

          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 🔹 Auto slide when visible
  useEffect(() => {
    if (!inView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1 >= products.length ? 0 : prev + 1;
        scrollToIndex(next);
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [inView]);

  // 🔹 Progress bar
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={ref} className="w-full font-helvetica">
      <div className="relative w-full h-[60vh] sm:h-[75vh] md:h-[85vh] overflow-hidden">
        {/* Slides */}
        <div
          ref={containerRef}
          className="flex w-full h-full overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {products.map((item, index) => (
            <section
              key={index}
              onClick={() => navigate(item.link)}
              className="min-w-full h-full snap-start relative cursor-pointer"
            >
              {/* Image */}
              
              <picture className="absolute inset-0 w-full h-full">
                <source
                  media="(max-width: 767px)"
                  srcSet={item.mobileImage}
                  width={item.mobileWidth}
                  height={item.mobileHeight}
                  type="image/webp"
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={item.image}
                  width={item.width}
                  height={item.height}
                  type="image/webp"
                />
                <img
                  src={item.image}
                  alt={item.title}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </picture>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-10 md:left-20 right-4 sm:right-20 z-[99999] text-white max-w-2xl">
                <motion.h2
                  className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4 z-40"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                >
                  {item.title}
                </motion.h2>

                <p className="text-sm sm:text-base text-gray-200 mb-4 line-clamp-3 sm:line-clamp-none z-40">
                  {item.desc}
                </p>

                <button className="border border-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-white hover:text-black transition z-999">
                  Know More →
                </button>
              </div>
            </section>
          ))}
        </div>

        {/* Left Button - Hidden on tiny mobile screens to avoid overlapping text, visible from sm up */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="hidden sm:flex absolute left-2 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 
                 items-center justify-center 
                 w-10 h-10 md:w-14 md:h-14
                 text-white hover:scale-110 active:scale-95
                 transition-all duration-300 bg-black/20 sm:bg-transparent rounded-full"
        >
          <RiArrowLeftLine className="text-lg md:text-2xl font-bold" />
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="hidden sm:flex absolute right-2 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 
                 items-center justify-center 
                 w-10 h-10 md:w-14 md:h-14
                 text-white hover:scale-110 active:scale-95
                 transition-all duration-300 bg-black/20 sm:bg-transparent rounded-full"
        >
          <RiArrowRightLine className="text-lg md:text-2xl font-bold" />
        </button>
      </div>
    </section>
  );
};

export default ProductCarousel;
