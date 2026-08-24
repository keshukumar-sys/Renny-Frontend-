const msBilletsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://rennystrips.com/#organization",
      "name": "Renny Strips Limited",
      "url": "https://rennystrips.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rennystrips.com/assets/RennyLogo-BDsLMpd2.webp"
      },
      "sameAs": [
        "https://x.com/rennystrips?t=Zv74JfuWaVw3CHAxPHAQSA&s=08",
        "https://www.facebook.com/rennypvtltd",
        "https://www.instagram.com/rennystrips/",
        "https://www.linkedin.com/company/rennystrips/"
      ]
    },
    {
      "@type": "Service",
      "@id": "https://rennystrips.com/ms-billets#service",
      "serviceType": "MS Billets Manufacturing and Supply",
      "name": "MS Billets",
      "url": "https://rennystrips.com/ms-billets",
      "image": "https://renny-assets-storage.s3.ap-south-1.amazonaws.com/images/1775735548955_manufacturingProcess-1.png",
      "description": "Renny Strips manufactures high-quality MS billets for steel rolling, fabrication, and industrial applications.",
      "provider": {
        "@id": "https://rennystrips.com/#organization"
      },
      "areaServed": "IN",
      "audience": {
        "@type": "BusinessAudience"
      }
    },
    {
      "@type": "ItemPage",
      "@id": "https://rennystrips.com/ms-billets#itempage",
      "url": "https://rennystrips.com/ms-billets",
      "name": "MS Billets Manufacturer and Supplier | Renny Strips",
      "mainEntity": {
        "@id": "https://rennystrips.com/ms-billets#service"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://rennystrips.com/ms-billets#webpage",
      "url": "https://rennystrips.com/ms-billets",
      "name": "MS Billets Manufacturer and Supplier | Renny Strips",
      "description": "Renny Strips manufactures high-quality MS billets for steel rolling, fabrication, and industrial applications.",
      "about": {
        "@id": "https://rennystrips.com/ms-billets#service"
      },
      "breadcrumb": {
        "@id": "https://rennystrips.com/ms-billets#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://rennystrips.com/ms-billets#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rennystrips.com/" },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://rennystrips.com/products" },
        { "@type": "ListItem", "position": 3, "name": "MS Billets", "item": "https://rennystrips.com/ms-billets" }
      ]
    }
  ]
}

export default msBilletsSchema;
