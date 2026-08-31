import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/* -------------------- CARD ANIMATION -------------------- */

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/* -------------------- COMPONENT -------------------- */

const EventCard = ({ event }) => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [userInteracted, setUserInteracted] = useState(false);

  const inView = useInView(ref, {
    margin: '-20% 0px',
    once: false,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Only auto-play/pause if the user has NOT interacted
    if (!userInteracted) {
      if (inView) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  }, [inView, userInteracted]);

  return (
    <motion.article
      ref={ref}
      variants={cardVariants}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
    >
      <video
        ref={videoRef}
        src={event.video}
        controls
        preload="metadata"
        playsInline
        muted
        className="w-full h-[260px] object-cover"
        onPlay={() => setUserInteracted(true)}
        onPause={() => setUserInteracted(true)}
      />

      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">{event.date}</p>
        <h3 className="text-xl font-bold mb-3">{event.title}</h3>
        <p className="text-gray-700 leading-relaxed line-clamp-4">
          {event.desc}
        </p>
      </div>
    </motion.article>
  );
};

export default EventCard;
