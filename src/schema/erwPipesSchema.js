
const erwPipesSchema ={
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://rennystrips.com/#organization",
      "name": "Renny Strips Limited",
      "url": "https://rennystrips.com/",
      "logo": { "@type": "ImageObject", "url": "https://rennystrips.com/assets/RennyLogo-BDsLMpd2.webp" },
      "sameAs": [
        "https://x.com/rennystrips?t=Zv74JfuWaVw3CHAxPHAQSA&s=08",
        "https://www.facebook.com/rennypvtltd",
        "https://www.instagram.com/rennystrips/",
        "https://www.linkedin.com/company/rennystrips/"
      ]
    },
    {
      "@type": "Service",
      "@id": "https://rennystrips.com/erw-pipes-and-tubes#service",
      "serviceType": "ERW Pipes and Tubes Manufacturing and Supply",
      "name": "ERW Pipes and Tubes",
      "url": "https://rennystrips.com/erw-pipes-and-tubes",
      "image": "https://renny-assets-storage.s3.ap-south-1.amazonaws.com/images/1775738107821_manufacturingProcess-4.png",
      "description": "Renny Strips manufactures high-quality ERW Pipes and Tubes for construction, infrastructure, engineering, industrial fabrication, and structural applications.",
      "provider": { "@id": "https://rennystrips.com/#organization" },
      "areaServed": "IN",
      "audience": { "@type": "BusinessAudience" }
    },
    {
      "@type": "ItemPage",
      "@id": "https://rennystrips.com/erw-pipes-and-tubes#itempage",
      "url": "https://rennystrips.com/erw-pipes-and-tubes",
      "name": "ERW Pipes and Tubes Manufacturer and Supplier | Renny Strips",
      "mainEntity": { "@id": "https://rennystrips.com/erw-pipes-and-tubes#service" }
    },
    {
      "@type": "WebPage",
      "@id": "https://rennystrips.com/erw-pipes-and-tubes#webpage",
      "url": "https://rennystrips.com/erw-pipes-and-tubes",
      "name": "ERW Pipes and Tubes Manufacturer and Supplier | Renny Strips",
      "description": "Renny Strips manufactures premium-quality ERW Pipes and Tubes for construction, structural, engineering, fabrication, and industrial applications.",
      "about": { "@id": "https://rennystrips.com/erw-pipes-and-tubes#service" },
      "breadcrumb": { "@id": "https://rennystrips.com/erw-pipes-and-tubes#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://rennystrips.com/erw-pipes-and-tubes#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rennystrips.com/" },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://rennystrips.com/products" },
        { "@type": "ListItem", "position": 3, "name": "ERW Pipes and Tubes", "item": "https://rennystrips.com/erw-pipes-and-tubes" }
      ]
    }
  ]
}



export default erwPipesSchema