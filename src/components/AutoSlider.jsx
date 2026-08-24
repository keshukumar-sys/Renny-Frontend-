import { useEffect, useState } from "react";
import msBilletsSection2 from "../assets/ms billets section 2.webp";
import img from "../assets/forging-billets.webp";

const images = [msBilletsSection2, img];

const AutoSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-full relative overflow-hidden">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000
            ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
};

export default AutoSlider;
