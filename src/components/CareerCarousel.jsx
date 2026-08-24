import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { buildApiUrl } from '../lib/api';

// Sub-component to manage individual card flip state
const CareerCard = ({ story }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="group perspective-1000 w-full max-w-md mx-auto h-[500px] cursor-pointer">
      <div
        className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => !isFlipped && setIsFlipped(true)}
      >
        
        {/* --- FRONT SIDE (Image & Name) --- */}
        <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden shadow-xl border-4 border-white">
          <img
            src={story.image}
            alt={story.name}
            className="h-full w-full object-cover"
          />
          {/* Transparent Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h4 className="text-2xl font-bold">{story.name}</h4>
            <p className="text-sm opacity-90">{story.role}</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-gray font-semibold">Click to read story</p>
          </div>
        </div>

        {/* --- BACK SIDE (The Quote) --- */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-blue text-white rounded-3xl p-8 flex flex-col shadow-xl">
          {/* Close Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent re-triggering the parent click
              setIsFlipped(false);
            }}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            ✕
          </button>

          <span className="text-6xl opacity-20 font-serif leading-none">“</span>
          
          <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
            <p className="text-lg italic leading-relaxed">
              {story.quote}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/20">
            <p className="font-bold">{story.name}</p>
            <p className="text-xs opacity-70">{story.role}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

const CareerCarousel = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get(buildApiUrl('/api/success-stories'));
        const fetchedData = res.data.data || res.data;
        if (fetchedData && Array.isArray(fetchedData)) {
          setStories(fetchedData.sort((a, b) => (a.order || 0) - (b.order || 0)));
        }
      } catch {
        setStories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  if (loading || !stories.length) return null;

  return (
    <section className="bg-[#eff6ff] py-16 overflow-hidden">
      {/* Required CSS for the flip effect */}
      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        /* Hide Arrows on Mobile */
        .swiper-button-next, .swiper-button-prev { display: none !important; }
        @media (min-width: 768px) {
          .swiper-button-next, .swiper-button-prev { display: flex !important; color: #6a7282 !important; }
        }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 10px; }
      `}</style>

      <div className="container mx-auto px-6">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          navigation={true}
          className="pb-14 !overflow-visible"
        >
          {stories.map((story) => (
            <SwiperSlide key={story._id || story.id}>
              <CareerCard story={story} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CareerCarousel;