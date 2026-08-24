import React, { useEffect, useRef, useState } from "react";
// Loaded as a URL, not an inline component. The map is ~135 KB of path data —
// inlining it put that weight into the static HTML of every page that renders
// the map. Fetched at runtime it stays a separately cached asset instead.
import worldMapUrl from "../assets/Map.svg?url";
import countryLookup from "../data/countriesData";

// react-snap sets this UA while prerendering. The map is decorative and
// interaction-only, so it is skipped there and injected on the client instead.
const isPrerender =
  typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap";

// ─── Derive ID → continent key from countryLookup ────────────────────────────
// Converts display labels ("North America") to internal keys ("northAmerica")
const toContinentKey = (label) => {
  const map = {
    "North America": "northAmerica",
    "South America": "southAmerica",
    Europe: "europe",
    Africa: "africa",
    Asia: "asia",
    Antarctica: "antarctica",
  };
  return map[label] ?? label.toLowerCase();
};

// Built from countryLookup at module load — single source of truth.
// e.g. { "Saudi Arabia": "asia", "Germany": "europe", ... }
const ID_TO_CONTINENT = Object.fromEntries(
  Object.entries(countryLookup).map(([id, { continent }]) => [
    id,
    toContinentKey(continent),
  ]),
);

// ─── Continent metadata ───────────────────────────────────────────────────────
const continentData = {
  northAmerica: {
    name: "North America",
    countries: ["Panama", "USA"],
  },
  southAmerica: {
    name: "South America",
    countries: ["Uruguay", "South America"],
  },
  europe: {
    name: "Europe",
    countries: [
      "Germany",
      "Sweden",
      "United Kingdom",
      "Poland",
      "Italy",
      "Spain",
      "Romania",
      "Croatia",
      "Czech Republic",
    ],
  },
  africa: {
    name: "Africa",
    countries: ["Tunisia", "Kenya", "Nigeria", "South Africa"],
  },
  asia: {
    name: "Asia",
    countries: [
      "Israel",
      "Qatar",
      "Saudi Arabia",
      "United Arab Emirates",
      "Turkey",
    ],
  },
};

// ─── Coordinate-based fallback classifier ────────────────────────────────────
// Only runs for paths that carry NO id attribute (i.e. the bulk unnamed paths).
//
// Africa is split into two zones to handle the tricky eastern edge:
//
//   Zone A — Western Africa  (x: 710–1100, y: 470–920)
//             Safe range, no overlap with Arabia or Asia.
//
//   Zone B — Eastern Africa  (x: 1100–1280, y: 600–920)
//             Captures Ethiopia, Somalia, Madagascar (all sit below y ~600).
//             Y floor of 600 keeps the Arabian Peninsula (y ~470–595)
//             correctly classified as Asia.
const getContinentFromPosition = (x, y) => {
  // Bottom strip → Antarctica
  if (y > 940) return "antarctica";

  // West of ~710 → Americas
  if (x < 710) return y < 580 ? "northAmerica" : "southAmerica";

  // Europe: upper-left band
  if (x >= 710 && x < 1070 && y < 470) return "europe";

  // Africa — western band (clear of Arabian Peninsula)
  if (x >= 710 && x < 1100 && y >= 470 && y < 920) return "africa";

  // Africa — eastern band: Ethiopia, Somalia, Madagascar
  // Y >= 600 ensures Arabia (y ~470–595) stays in Asia
  if (x >= 1100 && x < 1280 && y >= 600 && y < 920) return "africa";

  // Oceania: far right, lower half
  if (x >= 1500 && y > 600) return "australia";

  // Everything else → Asia
  // (covers Middle East, South Asia, SE Asia, East Asia)
  return "asia";
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function MapPage() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  // Cache continent paths
const continentMapRef = useRef(new Map());

// Currently highlighted paths
const activePathsRef = useRef([]);

// Currently active continent
const currentContinentRef = useRef(null);

// requestAnimationFrame id
const animationFrameRef = useRef(null);
  const [hoveredContinent, setHoveredContinent] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const tooltipRef = useRef(null);
  const tooltipPosRef = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [svgReady, setSvgReady] = useState(false);

  // Fade-in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // ── Fetch + inject the map markup ──────────────────────────────────────────
  useEffect(() => {
    if (isPrerender) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let cancelled = false;
    fetch(worldMapUrl)
      .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
      .then((markup) => {
        if (cancelled || !wrapperRef.current) return;
        wrapperRef.current.innerHTML = markup;
        setSvgReady(true);
      })
      .catch((err) => console.error("Error loading world map:", err));

    return () => {
      cancelled = true;
    };
  }, []);

  // ── SVG wiring ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!svgReady) return;
    const container = containerRef.current;
    if (!container) return;
    const svg = container.querySelector("svg");
    if (!svg) return;

    let idleHandle = null;

    const initializeSvg = () => {
      // Tag every path with data-continent (and data-country for named ones)
      svg.querySelectorAll("path").forEach((path) => {
        const pathId = path.getAttribute("id");

        let continent = null;
        let countryLabel = null;

        if (pathId && ID_TO_CONTINENT[pathId]) {
          // Named path → use explicit map
          continent = ID_TO_CONTINENT[pathId];
          countryLabel = pathId;
        } else {
          // Unnamed path → use coordinate fallback
          try {
            const box = path.getBBox();
            const cx = box.x + box.width / 2;
            const cy = box.y + box.height / 2;
            continent = getContinentFromPosition(cx, cy);
          } catch (_) {
            // getBBox can throw on invisible/zero-size paths — skip those
          }
        }

        if (continent) {
          path.setAttribute("data-continent", continent);

          if (countryLabel) {
            path.setAttribute("data-country", countryLabel);
          }

          path.style.cursor = "pointer";
          path.style.pointerEvents = "auto";

          // Cache continent paths
          if (!continentMapRef.current.has(continent)) {
            continentMapRef.current.set(continent, []);
          }

          continentMapRef.current.get(continent).push(path);
        }
      });
    };

    if ("requestIdleCallback" in window) {
      idleHandle = window.requestIdleCallback(initializeSvg);
    } else {
      idleHandle = setTimeout(initializeSvg, 50);
    }

    const clearHighlight = () => {
      activePathsRef.current.forEach((path) => {
        path.classList.remove("active-continent");
      });

      activePathsRef.current = [];
      currentContinentRef.current = null;
    };

    const handleMouseOver = (e) => {
      const path = e.target.closest("path");
      if (!path) return;

      const continent = path.dataset.continent;
      if (!continent) return;

      // Skip if already hovering same continent
      if (currentContinentRef.current === continent) {
        return;
      }

      clearHighlight();

      currentContinentRef.current = continent;

      const paths = continentMapRef.current.get(continent) || [];
      paths.forEach((p) => p.classList.add("active-continent"));
      activePathsRef.current = paths;

      tooltipPosRef.current = { x: e.clientX, y: e.clientY };
      setHoveredContinent(continent);
      setHoveredCountry(path.dataset.country || null);
    };

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      tooltipPosRef.current = { x, y };

      if (animationFrameRef.current) return;

      animationFrameRef.current = requestAnimationFrame(() => {
        if (tooltipRef.current) {
          const widthThreshold = window.innerWidth < 640 ? 180 : 220;
          tooltipRef.current.style.left = `${Math.min(tooltipPosRef.current.x + 18, window.innerWidth - widthThreshold)}px`;
          tooltipRef.current.style.top = `${Math.min(tooltipPosRef.current.y + 18, window.innerHeight - 260)}px`;
        }
        animationFrameRef.current = null;
      });
    };

    const handleMouseOut = (e) => {
      if (!e.relatedTarget?.closest?.("path")) {
        clearHighlight();
        setHoveredContinent(null);
        setHoveredCountry(null);
      }
    };

    svg.addEventListener("mouseover", handleMouseOver, { passive: true });
    svg.addEventListener("mousemove", handleMouseMove);
    svg.addEventListener("mouseout", handleMouseOut);

    return () => {
      if (idleHandle) {
        if ("cancelIdleCallback" in window) {
          window.cancelIdleCallback(idleHandle);
        } else {
          clearTimeout(idleHandle);
        }
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
    }

    svg.removeEventListener("mouseover", handleMouseOver);
    svg.removeEventListener("mousemove", handleMouseMove);
    svg.removeEventListener("mouseout", handleMouseOut);
};
  }, [svgReady]);

  const activeData = hoveredContinent ? continentData[hoveredContinent] : null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        background: "#ffffff",
        borderRadius: "20px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease",
        overflow: "visible",
      }}
    >
      {/* ── SVG styles ─────────────────────────────────────────────────────── */}
      <style>{`
        /* Default land fill */
        .map-wrapper svg path {
          fill:           #292c44 !important;
          stroke:         #ffffff !important;
          stroke-width:   0.5px !important;
          transition:     fill 0.2s ease, filter 0.2s ease;
          cursor:         pointer !important;
          pointer-events: auto !important;
        }

        /* Highlighted continent */
        .map-wrapper svg path.active-continent {
          fill:         #6a7282 !important;
          stroke:       #ffffff !important;
          stroke-width: 1px !important;
          filter:       drop-shadow(0 0 6px rgba(106, 114, 130, 0.4)) !important;
        }

        .map-wrapper svg {
          width:          100%;
          height:         auto;
          display:        block;
          pointer-events: auto !important;
        }

        @keyframes tooltipIn {
          from { opacity: 0; transform: translateY(5px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        .map-tooltip { animation: tooltipIn 0.18s ease forwards; }
      `}</style>

      {/* ── Map SVG (injected client-side, see fetch effect above) ────────── */}
      {/* aspect-ratio matches the SVG viewBox (1920×1080) so reserving the box
          before injection keeps the load from shifting the layout. */}
      <div
        ref={wrapperRef}
        className="map-wrapper"
        style={{ aspectRatio: "1920 / 1080" }}
      />

      {/* ── Info card tooltip ─────────────────────────────────────────────── */}
      {hoveredContinent && activeData && (
        <div
          ref={tooltipRef}
          className="map-tooltip"
          style={{
            position: "fixed",
            left: `${Math.min(tooltipPosRef.current.x + 18, window.innerWidth - (window.innerWidth < 640 ? 180 : 220))}px`,
            top: `${Math.min(tooltipPosRef.current.y + 18, window.innerHeight - 260)}px`,

            background: "rgba(4, 20, 70, 0.97)",
            backdropFilter: "blur(14px)",

            padding: window.innerWidth < 640 ? "12px 14px" : "16px 20px",

            borderRadius: "14px",

            boxShadow:
              "0 16px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(5,38,126,0.2)",

            border: "1px solid rgba(5,38,126,0.25)",

            pointerEvents: "none",

            width: window.innerWidth < 640 ? "180px" : "220px",

            maxWidth: "90vw",

            zIndex: 10000,
          }}
        >
          {/* Continent badge */}
          <div
            style={{
              marginBottom: "12px",
              paddingBottom: "8px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span
              style={{
                background: "rgba(106,114,130,0.12)",
                border: "1px solid rgba(106,114,130,0.25)",
                borderRadius: "4px",
                padding: "2px 8px",
                fontSize: "10px",
                color: "#0083FF",
                fontWeight: "600",

                letterSpacing: "0.5px",
              }}
            >
              {activeData.name.toUpperCase()}
            </span>
          </div>

          {/* Header row */}
          <div></div>

          {/* Country list */}
          {activeData.countries.length > 0 && (
            <>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "inline-block",
                    color: "rgba(255, 255, 255, 1)",
                    fontWeight: "700",
                    letterSpacing: "1.2px",
                    marginBottom: "8px",
                    background: "#37446c",
                    textTransform: "uppercase",
                    textAlign: "center",
                    padding: window.innerWidth < 640 ? "3px 6px" : "4px 8px",
fontSize: window.innerWidth < 640 ? "9px" : "10px",
                    borderRadius: "6px",
                  }}
                >
                  {hoveredCountry ? "Countries" : "Countries"}
                </div>
              </div>

              <ul
                style={{
                  margin: 0,
                  padding: "0 0 0 14px",
                  listStyleType: "disc",
               fontSize: window.innerWidth < 640 ? "11px" : "12.5px",
                  lineHeight: "1.7",
                }}
              >
                {activeData.countries.map((c, i) => (
                  <li
                    key={i}
                    style={{
                      color:
                        c === hoveredCountry
                          ? "#6a7282"
                          : "rgba(255,255,255,1)",
                      fontWeight: c === hoveredCountry ? "600" : "400",
                    }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
