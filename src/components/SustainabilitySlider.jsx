import React, { useState, useEffect } from 'react';

import sustainability1 from '../assets/Sustainability1.webp';
import sustainability3 from '../assets/Sustainability3.webp';
import sustainability4 from '../assets/Sustainability4.webp';
import sustainability1_Mobile from '../assets/Sustainability1-Mobile.webp';
import sustainability3_Mobile from '../assets/Sustainability3-Mobile.webp';
import sustainability4_Mobile from '../assets/Sustainability4-Mobile.webp';

const SustainabilitySlider = () => {
  const [current, setCurrent] = useState(0);

  // Commented out old slides array to preserve history:
  /*
  const slides = [
    {
      title: 'CBAM & Sustainable Market Access',
      description:
        "Renny Strips aligns with the EU's Carbon Border Adjustment Mechanism (CBAM), enabling export-ready green steel with a documented, significantly lower carbon footprint. Our in-house production model ensures rapid execution and competitive ROI for global buyers.",
      image: sustainability1,
    },
    {
      title: 'Industry-Best Low-Emission Standards',
      description:
        "Our vertically integrated ecosystem, powered by a 22 MW solar plant, meets nearly 30% of our energy needs making Renny Strips one of India's most energy-efficient structural steel companies.",
      image: sustainability3,
    },
    {
      title: 'Circular Economy & Responsible Stewardship',
      description:
        'Renny Strips prioritizes waste reduction, scrap recycling, and collaboration with local environmental bodies embodying the principles of a true circular economy in steel manufacturing.',
      image: sustainability4,
    },
  ];
  */

  const slides = [
    {
      title: 'CBAM & Sustainable Market Access',
      description:
        "Renny Strips aligns with the EU's Carbon Border Adjustment Mechanism (CBAM), enabling export-ready green steel with a documented, significantly lower carbon footprint. Our in-house production model ensures rapid execution and competitive ROI for global buyers.",
      image: sustainability1,
      mobileImage: sustainability1_Mobile,
      width: 1080,
      height: 1080,
      mobileWidth: 798,
      mobileHeight: 798,
    },
    {
      title: 'Industry-Best Low-Emission Standards',
      description:
        "Our vertically integrated ecosystem, powered by a 22 MW solar plant, meets nearly 30% of our energy needs making Renny Strips one of India's most energy-efficient structural steel companies.",
      image: sustainability3,
      mobileImage: sustainability3_Mobile,
      width: 1080,
      height: 1080,
      mobileWidth: 798,
      mobileHeight: 798,
    },
    {
      title: 'Circular Economy & Responsible Stewardship',
      description:
        'Renny Strips prioritizes waste reduction, scrap recycling, and collaboration with local environmental bodies embodying the principles of a true circular economy in steel manufacturing.',
      image: sustainability4,
      mobileImage: sustainability4_Mobile,
      width: 1224,
      height: 1224,
      mobileWidth: 798,
      mobileHeight: 798,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl lg:rounded-4xl shadow-2xl bg-white">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full shrink-0 h-full">
            <div className="flex flex-col lg:flex-row h-full">
              {/* Image Container: Order 1 on mobile, Order 2 on desktop */}
              <div className="w-full lg:w-2/5 h-114 lg:h-82 order-1 lg:order-2 shrink-0 overflow-hidden">
                {/* Commented out old image to preserve history:
                <img
                  src={slide.image}
                  alt={slide.title}
                  width="400"
                  height="300"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                */}
                <picture className="w-full h-full block animate-none">
                  <source
                    media="(max-width: 767px)"
                    srcSet={slide.mobileImage}
                    width={slide.mobileWidth}
                    height={slide.mobileHeight}
                    type="image/webp"
                  />
                  <source
                    media="(min-width: 768px)"
                    srcSet={slide.image}
                    width={slide.width}
                    height={slide.height}
                    type="image/webp"
                  />
                  <img
                    src={slide.image}
                    alt={slide.title}
                    width={slide.width}
                    height={slide.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover aspect-square"
                  />
                </picture>
              </div>

              {/* Text Container: Order 2 on mobile, Order 1 on desktop */}
              <div className="w-full lg:w-3/5 p-8 lg:p-10 flex flex-col justify-center order-2 lg:order-1">
                <h3 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6 text-gray-900">
                  {slide.title}
                </h3>
                <p className="text-gray-700 text-md lg:text-base leading-relaxed">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Indicators (Dots) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === i ? 'w-6 bg-blue-900' : 'w-2 bg-gray-300'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SustainabilitySlider;
