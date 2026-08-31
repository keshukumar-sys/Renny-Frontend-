import SustainabilityContent from "../../components/ESG/SustainabilityContent";
import SustainabilityPillars from "../../components/ESG/SustainabilityPillars";
import ClimateInitiative from "../../components/ESG/ClimateInitiative";
import FeaturedProjects from "../../components/ESG/FeaturedProjects";
import Environmental from "../../components/ESG/EnvironmentalAndReport";
import SEO from "../../components/SEO";
import heroSrc from "../../assets/Sustainability1.webp";

const Sustainability = () => {
  return (
    <>
      <SEO
        title="Sustainability & ESG Initiatives | Renny Strips"
        description="Explore Renny Strips’ sustainability efforts, ESG practices, energy efficiency, and environmentally responsible steel manufacturing."
        keywords="Renny Strips sustainability, ESG initiatives, sustainable steel manufacturing, environmental responsibility, green manufacturing, energy efficiency, steel industry sustainability"
        url="https://rennystrips.com/sustainability"
        image={heroSrc}
      />
      <SustainabilityContent />
      <SustainabilityPillars />
      <ClimateInitiative />
      <FeaturedProjects />
      <Environmental />
    </>
  );
};

export default Sustainability;
