const wireRodsSchema = {
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
      "@id": "https://rennystrips.com/wire-rods#service",
      "serviceType": "Wire Rod Manufacturing and Supply",
      "name": "Wire Rods",
      "url": "https://rennystrips.com/wire-rods",
      "image": "https://renny-assets-storage.s3.ap-south-1.amazonaws.com/images/1775737773373_manufacturingProcess-2.png",
      "description": "Renny Strips manufactures premium-quality wire rods for construction, engineering, industrial fabrication, fasteners, welding electrodes, and downstream steel applications.",
      "provider": { "@id": "https://rennystrips.com/#organization" },
      "areaServed": "IN",
      "audience": { "@type": "BusinessAudience" }
    },
    {
      "@type": "ItemPage",
      "@id": "https://rennystrips.com/wire-rods#itempage",
      "url": "https://rennystrips.com/wire-rods",
      "name": "Wire Rod Manufacturer and Supplier | Renny Strips",
      "mainEntity": { "@id": "https://rennystrips.com/wire-rods#service" }
    },
    {
      "@type": "WebPage",
      "@id": "https://rennystrips.com/wire-rods#webpage",
      "url": "https://rennystrips.com/wire-rods",
      "name": "Wire Rod Manufacturer and Supplier | Renny Strips",
      "description": "Renny Strips manufactures high-quality wire rods for construction, engineering, fabrication, and industrial steel applications.",
      "about": { "@id": "https://rennystrips.com/wire-rods#service" },
      "breadcrumb": { "@id": "https://rennystrips.com/wire-rods#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://rennystrips.com/wire-rods#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rennystrips.com/" },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://rennystrips.com/products" },
        { "@type": "ListItem", "position": 3, "name": "Wire Rods", "item": "https://rennystrips.com/wire-rods" }
      ]
    }
  ]
}


export default wireRodsSchema;
