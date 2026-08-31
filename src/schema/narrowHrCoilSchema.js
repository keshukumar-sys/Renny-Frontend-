
const narrowHrCoilSchema ={
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
      "@id": "https://rennystrips.com/narrow-hrcoil#service",
      "serviceType": "Narrow HR Coil Manufacturing and Supply",
      "name": "Narrow HR Coil",
      "url": "https://rennystrips.com/narrow-hrcoil",
      "image": "https://renny-assets-storage.s3.ap-south-1.amazonaws.com/images/1775738968905_manufacturingProcess-3.png",
      "description": "Renny Strips manufactures high-quality Narrow HR Coils for pipe manufacturing, cold rolling, steel processing, fabrication, and industrial applications.",
      "provider": { "@id": "https://rennystrips.com/#organization" },
      "areaServed": "IN",
      "audience": { "@type": "BusinessAudience" }
    },
    {
      "@type": "ItemPage",
      "@id": "https://rennystrips.com/narrow-hrcoil#itempage",
      "url": "https://rennystrips.com/narrow-hrcoil",
      "name": "Narrow HR Coil Manufacturer and Supplier | Renny Strips",
      "mainEntity": { "@id": "https://rennystrips.com/narrow-hrcoil#service" }
    },
    {
      "@type": "WebPage",
      "@id": "https://rennystrips.com/narrow-hrcoil#webpage",
      "url": "https://rennystrips.com/narrow-hrcoil",
      "name": "Narrow HR Coil Manufacturer and Supplier | Renny Strips",
      "description": "Renny Strips manufactures premium-quality Narrow HR Coils for steel processing, fabrication, pipe manufacturing, and industrial applications.",
      "about": { "@id": "https://rennystrips.com/narrow-hrcoil#service" },
      "breadcrumb": { "@id": "https://rennystrips.com/narrow-hrcoil#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://rennystrips.com/narrow-hrcoil#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rennystrips.com/" },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://rennystrips.com/products" },
        { "@type": "ListItem", "position": 3, "name": "Narrow HR Coil", "item": "https://rennystrips.com/narrow-hrcoil" }
      ]
    }
  ]
}






export default narrowHrCoilSchema