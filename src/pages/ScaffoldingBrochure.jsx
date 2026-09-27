import React from 'react';
import SEO from "../components/SEO";

const ScaffoldingBrochure = () => {
  return (
    <>
      <SEO
        title="Scaffolding Brochure | Renny Strips"
        description="Renny Strips scaffolding brochure."
        url="https://rennystrips.com/scaffolding-brochure"
        noIndex={true}
      />
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-100">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-blue text-center tracking-tight leading-none">
          Coming Soon
        </h1>
      </div>
    </>
  );
};

export default ScaffoldingBrochure;
