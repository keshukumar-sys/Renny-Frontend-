const scaffoldingSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://rennystrips.com/#organization',
      name: 'Renny Strips Limited',
      url: 'https://rennystrips.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rennystrips.com/assets/RennyLogo-BDsLMpd2.webp',
      },
      sameAs: [
        'https://x.com/rennystrips?t=Zv74JfuWaVw3CHAxPHAQSA&s=08',
        'https://www.facebook.com/rennypvtltd',
        'https://www.instagram.com/rennystrips/',
        'https://www.linkedin.com/company/rennystrips/',
      ],
    },
    {
      '@type': 'Service',
      '@id': 'https://rennystrips.com/scaffolding-formwork#service',
      serviceType: 'Scaffolding and Formwork Manufacturing and Supply',
      name: 'Scaffolding and Formwork Systems',
      url: 'https://rennystrips.com/scaffolding-formwork',
      image:
        'https://renny-assets-storage.s3.ap-south-1.amazonaws.com/images/1776155959141_manufacturingProcess-6.png',
      description:
        'Renny Strips manufactures high-quality scaffolding and formwork systems for construction, infrastructure, industrial, commercial, and engineering projects.',
      provider: { '@id': 'https://rennystrips.com/#organization' },
      areaServed: 'IN',
      audience: { '@type': 'BusinessAudience' },
    },
    {
      '@type': 'ItemPage',
      '@id': 'https://rennystrips.com/scaffolding-formwork#itempage',
      url: 'https://rennystrips.com/scaffolding-formwork',
      name: 'Scaffolding and Formwork Manufacturer and Supplier | Renny Strips',
      mainEntity: {
        '@id': 'https://rennystrips.com/scaffolding-formwork#service',
      },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://rennystrips.com/scaffolding-formwork#webpage',
      url: 'https://rennystrips.com/scaffolding-formwork',
      name: 'Scaffolding and Formwork Manufacturer and Supplier | Renny Strips',
      description:
        'Renny Strips manufactures premium-quality scaffolding and formwork systems for construction, infrastructure, engineering, and industrial applications.',
      about: { '@id': 'https://rennystrips.com/scaffolding-formwork#service' },
      breadcrumb: {
        '@id': 'https://rennystrips.com/scaffolding-formwork#breadcrumb',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://rennystrips.com/scaffolding-formwork#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://rennystrips.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Products',
          item: 'https://rennystrips.com/products',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Scaffolding and Formwork',
          item: 'https://rennystrips.com/scaffolding-formwork',
        },
      ],
    },
  ],
};

export default scaffoldingSchema;
