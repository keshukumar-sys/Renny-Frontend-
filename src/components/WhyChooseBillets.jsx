import React from "react";
import gold from "../assets/Gold.webp";
import AutoSlider from "../components/AutoSlider";

const WhyChooseBillets = () => {
  const clipShape = "polygon(0 0, 76% 0, 60% 48%, 80% 100%, 0 100%, 0% 50%)";

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* BACKGROUND SLIDER */}
      <div className="absolute inset-0 z-0">
        <AutoSlider />
      </div>

      {/* MAIN SHAPE */}
      <div
        className="absolute inset-0 z-10 flex items-center bg-gradient-to-b from-[#292929] via-[#3A3A3A] to-[#212121]"
        style={{ clipPath: clipShape }}
      >
        {/* ANGLED RIGHT BORDER */}
        <div
          className="absolute pointer-events-none w-[3px] h-[90%] 
             bg-gradient-to-b  to-orange-400 from-yellow-300
             shadow-[0_0_10px_rgba(255,140,0,0.8)]"
          style={{
            right: "18%",
            top: "29%",
            left: "70%",
            width: "3px",
            height: "82%",
            transform: "translateY(-65%) rotate(40deg)",
          }}
        />
         <div
          className="absolute pointer-events-none w-[3px] h-[90%] 
             bg-gradient-to-b  to-orange-400 from-yellow-300
             shadow-[0_0_10px_rgba(255,140,0,0.8)]"
          style={{
            right: "89%",
            top: "100%",
            left: "74%",
            width: "3px",
            height: "104%",
            transform: "translateY(-64%) rotate(136deg)",
          }}
        />

        {/* CONTENT */}
        <div className="w-full max-w-3xl px-8 pr-24">
          <div className="flex flex-col gap-6">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-start gap-4">
                {/* ICON */}
                <img
                  src={gold}
                  alt=""
                  className="w-12 h-12 shrink-0 opacity-90"
                />

                {/* TEXT */}
                <div>
                  <h3 className="text-white font-semibold text-[18px]">
                    Lorem Heading
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mt-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                    magni obcaecati optio asperiores expedita.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseBillets;
