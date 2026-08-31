const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://rennystrips.com/#organization",
      name: "Renny Strips Limited",
      url: "https://rennystrips.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://rennystrips.com/assets/RennyLogo-BDsLMpd2.webp",
      },
      image: "https://rennystrips.com/assets/RennyLogo-BDsLMpd2.webp",
      description:
        "Renny Strips Limited is a leading integrated steel manufacturing company in India specializing in ERW pipes, scaffolding and formwork systems, wire rods, billets, and engineered steel solutions. Founded in 1996, the company serves domestic and international markets through advanced manufacturing facilities, innovation, quality excellence, and sustainable steel production.",
      email: "info@rennystrips.com",
      telephone: "+91-82880-01300",
      foundingDate: "1996",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Lakhowal Road, Opposite PSPCL, Kohara",
        addressLocality: "Ludhiana",
        addressRegion: "Punjab",
        postalCode: "141112",
        addressCountry: "IN",
      },
      sameAs: [
        "https://x.com/rennystrips?t=Zv74JfuWaVw3CHAxPHAQSA&s=08",
        "https://www.facebook.com/rennypvtltd",
        "https://www.instagram.com/rennystrips/",
        "https://www.linkedin.com/company/rennystrips/",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://rennystrips.com/#localbusiness",
      name: "Renny Strips Limited",
      url: "https://rennystrips.com/",
      image: "https://rennystrips.com/assets/RennyLogo-BDsLMpd2.webp",
      telephone: "+91-82880-01300",
      email: "info@rennystrips.com",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Lakhowal Road, Opposite PSPCL, Kohara",
        addressLocality: "Ludhiana",
        addressRegion: "Punjab",
        postalCode: "141112",
        addressCountry: "IN",
      },
      parentOrganization: {
        "@id": "https://rennystrips.com/#organization",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://rennystrips.com/#website",
      url: "https://rennystrips.com/",
      name: "Renny Strips Limited",
      publisher: {
        "@id": "https://rennystrips.com/#organization",
      },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": "https://rennystrips.com/#webpage",
      url: "https://rennystrips.com/",
      name: "Renny Strips Limited | Steel Manufacturer in India",
      description:
        "Renny Strips Limited is a leading steel manufacturer in India offering ERW pipes, scaffolding systems, formwork solutions, wire rods, billets, and engineered steel products for domestic and international industries.",
      isPartOf: {
        "@id": "https://rennystrips.com/#website",
      },
      about: {
        "@id": "https://rennystrips.com/#organization",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://rennystrips.com/assets/RennyLogo-BDsLMpd2.webp",
      },
    },
  ],
};


export default homeSchema