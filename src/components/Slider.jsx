import React, { useEffect, useState } from 'react';

import Banner1 from '../assets/Banner1.webp';
import Banner2 from '../assets/Banner2.webp';
import Banner3 from '../assets/Banner3.webp';
import Banner4 from '../assets/Banner4.webp';

const Slider = () => {
  const images = [Banner1, Banner2, Banner3, Banner4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt="banner"
        className="w-full h-full object-contain transition-all duration-700"
      />

      {/* Left side dots */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentIndex === index ? 'bg-[#FFD166] scale-110' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      <button
        className="absolute bottom-12 left-20 
                   bg-white text-black 
                   px-7 py-3 rounded-md 
                   font-semibold 
                   hover:bg-gray-200 transition 
                   z-20"
      >
        More About Us
      </button>
    </div>
  );
};

export default Slider;
