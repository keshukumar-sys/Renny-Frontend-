import { useState, useEffect } from "react";
import axios from "axios";
import { buildApiUrl } from "../lib/api";

/**
 * Fetches CMS hero banner data for a given page.
 * @param {string} pageName - Plain name as stored by admin CMS (e.g. "financials", "governance")
 * @param {string} defaultHeading - Fallback heading text if CMS returns none
 * @param {string} fallbackAsset - Local fallback asset (image/video) to use during loading or if CMS fails
 * @returns {{ heroSrc, heroHeading }}
 */
const usePageHero = (pageName, defaultHeading = "", fallbackAsset = null) => {
  const [heroSrc, setHeroSrc] = useState(fallbackAsset);
  const [heroHeading, setHeroHeading] = useState(defaultHeading);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const apiUrl = buildApiUrl(`/api/page/${pageName}`);
        const response = await axios.get(apiUrl);
        const sections = response.data?.data;
        console.log("Fetched sections:", sections);

        if (Array.isArray(sections) && sections.length > 0) {
          const heroSection =
            sections.find((s) => s.sectionName?.toLowerCase().includes("hero")) ||
            sections[0];

          const cmsBannerUrl = heroSection?.mediaUrl;
          console.log("CMS Banner URL:", cmsBannerUrl);
          if (cmsBannerUrl) {
            setHeroSrc(cmsBannerUrl);
          } else {
            setHeroSrc(fallbackAsset);
          }
          if (heroSection?.heading) setHeroHeading(heroSection.heading);
        } else {
          setHeroSrc(fallbackAsset);
        }
      } catch {
        setHeroSrc(fallbackAsset);
      }
    };
    fetchHero();
  }, [pageName, fallbackAsset]);

  return { heroSrc, heroHeading };
};

export default usePageHero;
