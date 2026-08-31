import { useState, useEffect } from "react";
import WorldSVG from "../assets/Map3.svg?react";
import countryLookup from "../data/countriesData";
const COLORS = {
  base: "#05267e",
  hover: "#6a7282",
  selected: "#6a7282",
};

export default function WorldMapSVG() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [zoom, setZoom] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });

  // ✅ INITIAL SETUP (ONLY ONCE)
  useEffect(() => {
    const paths = document.querySelectorAll("svg path");

    paths.forEach((path) => {
      path.style.fill = COLORS.base;
      path.style.cursor = countryLookup[path.id] ? "pointer" : "default";
    });
  }, []);

  // 🎯 CLICK HANDLER
  const handleClick = (e) => {
    const target = e.target;
    if (target.tagName !== "path") return;

    const countryName = target.id;

    if (!countryLookup[countryName]) return;

    // 🔥 Reset all to base color
    document.querySelectorAll("svg path").forEach((p) => {
      p.style.fill = COLORS.base;
    });

    // 🎨 Highlight selected
    target.style.fill = COLORS.selected;

    // 🔍 Zoom logic
    const bbox = target.getBBox();
    const svg = target.ownerSVGElement;
    const viewBox = svg.viewBox.baseVal;

    const centerX = bbox.x + bbox.width / 2;
    const centerY = bbox.y + bbox.height / 2;

    setZoom({
      scale: 4,
      x: viewBox.width / 2 - centerX,
      y: viewBox.height / 2 - centerY,
    });

    setSelectedCountry(countryName);
  };

  return (
    <div style={{ display: "flex", gap: "40px" }}>
      {/* MAP */}
      <div style={{ width: "70%", overflow: "hidden" }}>
        <motion.div
          animate={zoom}
          transition={{ type: "spring", stiffness: 80 }}
          style={{ transformOrigin: "center center" }}
        >
          <WorldSVG
            style={{
              width: "100%",
              height: "500px",
              display: "block",
            }}
            onClick={handleClick}
            onMouseOver={(e) => {
              const target = e.target;
              const country = target.id;

              if (target.tagName === "path" && countryLookup[country]) {
                target.style.fill = COLORS.hover;

                setHovered({
                  name: country,
                  x: e.clientX,
                  y: e.clientY,
                });
              }
            }}
            onMouseMove={(e) => {
              if (hovered) {
                setHovered((prev) => ({
                  ...prev,
                  x: e.clientX,
                  y: e.clientY,
                }));
              }
            }}
            onMouseOut={(e) => {
              const target = e.target;
              const country = target.id;

              if (target.tagName === "path" && countryLookup[country]) {
                // 🔥 restore only if not selected
                if (country !== selectedCountry) {
                  target.style.fill = COLORS.base;
                }
              }

              setHovered(null);
            }}
          />
        </motion.div>

        {/* TOOLTIP */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: "fixed",
              top: hovered.y + 10,
              left: hovered.x + 10,
              background: "#6a7282",
              color: "white",
              padding: "6px 10px",
              borderRadius: "6px",
              fontSize: "12px",
              pointerEvents: "none",
              zIndex: 1000,
            }}
          >
            {hovered.name}
          </motion.div>
        )}
      </div>

      {/* INFO PANEL */}
      <div style={{ minWidth: "250px" }}>
        {selectedCountry ? (
          <>
            <h2 style={{ color: COLORS.base }}>{selectedCountry}</h2>
            <p style={{ color: "#6a7282" }}>
              Continent: {countryLookup[selectedCountry].continent}
            </p>

            <button
              onClick={() => {
                setZoom({ scale: 1, x: 0, y: 0 });
                setSelectedCountry(null);

                // 🔥 Reset all to base
                document.querySelectorAll("svg path").forEach((p) => {
                  p.style.fill = COLORS.base;
                });
              }}
              style={{
                marginTop: "10px",
                padding: "6px 10px",
                background: COLORS.base,
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          </>
        ) : (
          <p style={{ color: "#6a7282" }}></p>
        )}
      </div>
    </div>
  );
}
